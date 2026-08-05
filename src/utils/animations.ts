// Scroll progress tracking and animation utilities

export interface ScrollProgressOptions {
  target?: HTMLElement | Window;
  offset?: [number, number];
  onProgress?: (progress: number) => void;
  throttle?: number;
}

export interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
  onEnter?: (entry: IntersectionObserverEntry) => void;
  onLeave?: (entry: IntersectionObserverEntry) => void;
  onProgress?: (ratio: number, entry: IntersectionObserverEntry) => void;
}

let animationFrameId: number | null = null;
const progressCallbacks: Array<(progress: number) => void> = [];
let lastProgress = 0;
let isScrolling = false;
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Get global scroll progress (0 to 1)
 */
export function getGlobalScrollProgress(): number {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return Math.max(0, Math.min(1, scrollY / docHeight));
}

/**
 * Subscribe to global scroll progress changes
 */
export function subscribeToScrollProgress(callback: (progress: number) => void): () => void {
  progressCallbacks.push(callback);

  if (progressCallbacks.length === 1) {
    startScrollListener();
  }

  return () => {
    const index = progressCallbacks.indexOf(callback);
    if (index > -1) progressCallbacks.splice(index, 1);

    if (progressCallbacks.length === 0) {
      stopScrollListener();
    }
  };
}

function startScrollListener(): void {
  const handleScroll = (): void => {
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(updateProgress);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', handleScroll, { passive: true });

  animationFrameId = requestAnimationFrame(updateProgress);
}

function stopScrollListener(): void {
  window.removeEventListener('scroll', () => {}, { passive: true });
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function updateProgress(): void {
  isScrolling = false;
  const progress = getGlobalScrollProgress();

  if (Math.abs(progress - lastProgress) > 0.001) {
    lastProgress = progress;
    progressCallbacks.forEach(cb => cb(progress));
  }

  if (progressCallbacks.length > 0) {
    animationFrameId = requestAnimationFrame(updateProgress);
  }
}

/**
 * Create an IntersectionObserver for scroll-triggered animations
 */
export function createScrollObserver(
  element: Element,
  options: IntersectionObserverOptions
): IntersectionObserver {
  const {
    root = null,
    rootMargin = '0px',
    threshold = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1],
    triggerOnce = true,
    onEnter,
    onLeave,
    onProgress,
  } = options;

  let hasTriggered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;

        if (entry.isIntersecting) {
          if (!hasTriggered && onEnter) {
            onEnter(entry);
            if (triggerOnce) hasTriggered = true;
          }
          if (onProgress) {
            onProgress(ratio, entry);
          }
        } else if (onLeave) {
          onLeave(entry);
          if (triggerOnce) hasTriggered = false;
        }
      });
    },
    { root, rootMargin, threshold }
  );

  observer.observe(element);

  return observer;
}

/**
 * Element scroll progress (0 to 1 as element enters/exits viewport)
 */
export function getElementScrollProgress(
  element: HTMLElement,
  offset: [number, number] = [0, 1]
): number {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const elementHeight = rect.height;

  const start = offset[0] * viewportHeight;
  const end = offset[1] * viewportHeight;

  const progress = (viewportHeight - rect.top) / (viewportHeight + elementHeight);

  return Math.max(0, Math.min(1, progress));
}

/**
 * Transform a value based on scroll progress with easing
 */
export function interpolate(
  progress: number,
  inputRange: number[],
  outputRange: number[] | string[],
  easing?: (t: number) => number
): number | string {
  const easedProgress = easing ? easing(progress) : progress;

  for (let i = 0; i < inputRange.length - 1; i++) {
    if (easedProgress >= inputRange[i] && easedProgress <= inputRange[i + 1]) {
      const localProgress = (easedProgress - inputRange[i]) / (inputRange[i + 1] - inputRange[i]);
      const start = outputRange[i];
      const end = outputRange[i + 1];

      if (typeof start === 'number' && typeof end === 'number') {
        return start + (end - start) * localProgress;
      }

      return end;
    }
  }

  return outputRange[outputRange.length - 1];
}

/**
 * Easing functions
 */
export const easings = {
  linear: (t: number) => t,
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeIn: (t: number) => Math.pow(t, 3),
  easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  spring: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
  cubicBezier: (x1: number, y1: number, x2: number, y2: number) => (t: number) => {
    // Simplified cubic bezier
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;

    const sampleCurveX = (t: number) => ((ax * t + bx) * t + cx) * t;
    const sampleCurveY = (t: number) => ((ay * t + by) * t + cy) * t;
    const solveCurveX = (x: number) => {
      let t = x;
      for (let i = 0; i < 8; i++) {
        const x2 = sampleCurveX(t) - x;
        if (Math.abs(x2) < 1e-6) return t;
        const dx = (3 * ax * t + 2 * bx) * t + cx;
        if (dx === 0) break;
        t -= x2 / dx;
      }
      return t;
    };
    return sampleCurveY(solveCurveX(t));
  },
};

/**
 * Staggered animation helper
 */
export function stagger(
  index: number,
  baseDelay: number = 0,
  staggerAmount: number = 0.06
): number {
  return baseDelay + index * staggerAmount;
}

/**
 * Reduced motion check
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * RAF-based animation loop helper
 */
export function createAnimationLoop(
  draw: (time: number, deltaTime: number) => void
): { start: () => void; stop: () => void } {
  let lastTime = 0;
  let frameId: number | null = null;
  let running = false;

  const loop = (time: number) => {
    if (!running) return;
    const deltaTime = time - lastTime;
    lastTime = time;
    draw(time, deltaTime);
    frameId = requestAnimationFrame(loop);
  };

  return {
    start: () => {
      if (running) return;
      running = true;
      lastTime = performance.now();
      frameId = requestAnimationFrame(loop);
    },
    stop: () => {
      running = false;
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    },
  };
}

/**
 * CSS custom property animation helper
 */
export function animateCSSProperty(
  element: HTMLElement,
  property: string,
  from: string | number,
  to: string | number,
  duration: number = 500,
  easing: string = 'cubic-bezier(0.22, 1, 0.36, 1)'
): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      if (typeof from === 'number' && typeof to === 'number') {
        element.style.setProperty(property, `${from + (to - from) * eased}px`);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(animate);
  });
}