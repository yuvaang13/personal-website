// Scroll-driven animation component for Astro
// This is a client-side script that can be used with Astro's client:load or client:visible

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  stagger?: number;
}

interface ScrollProgressOptions {
  target?: HTMLElement;
  onProgress?: (progress: number) => void;
  offset?: [number, number];
}

export class ScrollReveal {
  private observer: IntersectionObserver | null = null;
  private elements: Map<Element, ScrollRevealOptions> = new Map();
  private animatedElements: WeakSet<Element> = new WeakSet();

  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private init(): void {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry) => {
      const options = this.elements.get(entry.target);
      if (!options) return;

      if (entry.isIntersecting) {
        this.animateElement(entry.target, options);
      } else if (!options.triggerOnce) {
        this.resetElement(entry.target, options);
      }
    });
  }

  private animateElement(element: Element, options: ScrollRevealOptions): void {
    if (this.animatedElements.has(element) && options.triggerOnce) return;

    const delay = options.delay || 0;
    const stagger = options.stagger || 0;

    // Handle staggered children
    if (element.children.length > 0 && stagger > 0) {
      Array.from(element.children).forEach((child, index) => {
        setTimeout(() => {
          this.applyRevealAnimation(child as HTMLElement, options);
        }, delay * 1000 + index * stagger * 1000);
      });
    } else {
      setTimeout(() => {
        this.applyRevealAnimation(element as HTMLElement, options);
      }, delay * 1000);
    }

    this.animatedElements.add(element);
  }

  private applyRevealAnimation(element: HTMLElement, options: ScrollRevealOptions): void {
    const direction = options.direction || 'up';
    const distance = options.distance || 40;

    // Set initial state
    element.style.opacity = '0';
    element.style.transform = this.getInitialTransform(direction, distance);
    element.style.transition = 'opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), transform 800ms cubic-bezier(0.22, 1, 0.36, 1), filter 800ms cubic-bezier(0.22, 1, 0.36, 1)';
    element.style.filter = 'blur(8px)';
    element.style.willChange = 'opacity, transform, filter';

    // Force reflow
    element.offsetHeight;

    // Animate to visible
    requestAnimationFrame(() => {
      element.style.opacity = '1';
      element.style.transform = 'translate(0, 0) scale(1)';
      element.style.filter = 'blur(0px)';
    });
  }

  private getInitialTransform(direction: string, distance: number): string {
    switch (direction) {
      case 'up': return `translateY(${distance}px)`;
      case 'down': return `translateY(-${distance}px)`;
      case 'left': return `translateX(${distance}px)`;
      case 'right': return `translateX(-${distance}px)`;
      default: return `translateY(${distance}px)`;
    }
  }

  private resetElement(element: Element, options: ScrollRevealOptions): void {
    const direction = options.direction || 'up';
    const distance = options.distance || 40;

    element.style.opacity = '0';
    element.style.transform = this.getInitialTransform(direction, distance);
    element.style.filter = 'blur(8px)';
    this.animatedElements.delete(element);
  }

  observe(element: Element, options: ScrollRevealOptions = {}): void {
    const mergedOptions: ScrollRevealOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px',
      triggerOnce: true,
      delay: 0,
      direction: 'up',
      distance: 40,
      stagger: 0,
      ...options,
    };

    this.elements.set(element, mergedOptions);

    if (this.observer) {
      this.observer.observe(element);
    }
  }

  unobserve(element: Element): void {
    this.elements.delete(element);
    if (this.observer) {
      this.observer.unobserve(element);
    }
  }

  disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.elements.clear();
    this.animatedElements = new WeakSet();
  }
}

export class ScrollProgressTracker {
  private target: HTMLElement | Window;
  private onProgress: (progress: number) => void;
  private offset: [number, number];
  private frameId: number | null = null;
  private lastProgress = -1;

  constructor(options: ScrollProgressOptions) {
    this.target = options.target || window;
    this.onProgress = options.onProgress || (() => {});
    this.offset = options.offset || [0, 1];
  }

  start(): void {
    if (typeof window === 'undefined') return;
    this.loop();
  }

  stop(): void {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  private loop = (): void => {
    const progress = this.calculateProgress();

    if (Math.abs(progress - this.lastProgress) > 0.001) {
      this.lastProgress = progress;
      this.onProgress(progress);
    }

    this.frameId = requestAnimationFrame(this.loop);
  };

  private calculateProgress(): number {
    if (this.target === window) {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      return Math.max(0, Math.min(1, scrollY / docHeight));
    }

    const element = this.target as HTMLElement;
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const elementHeight = rect.height;

    const start = this.offset[0] * viewportHeight;
    const end = this.offset[1] * viewportHeight;

    const progress = (viewportHeight - rect.top) / (viewportHeight + elementHeight);

    return Math.max(0, Math.min(1, progress));
  }
}

// Global instance for easy access
let globalScrollReveal: ScrollReveal | null = null;

export function getScrollReveal(): ScrollReveal {
  if (!globalScrollReveal) {
    globalScrollReveal = new ScrollReveal();
  }
  return globalScrollReveal;
}

export function initScrollAnimations(): void {
  getScrollReveal();

  // Auto-observe elements with data-scroll-reveal attribute
  if (typeof document !== 'undefined') {
    document.querySelectorAll('[data-scroll-reveal]').forEach((el) => {
      const options: ScrollRevealOptions = {
        direction: (el.getAttribute('data-direction') as 'up' | 'down' | 'left' | 'right') || 'up',
        distance: parseInt(el.getAttribute('data-distance') || '40', 10),
        delay: parseFloat(el.getAttribute('data-delay') || '0'),
        stagger: parseFloat(el.getAttribute('data-stagger') || '0'),
        triggerOnce: el.getAttribute('data-once') !== 'false',
      };
      getScrollReveal().observe(el, options);
    });

    // Auto-observe stagger containers
    document.querySelectorAll('[data-stagger-container]').forEach((container) => {
      const stagger = parseFloat(container.getAttribute('data-stagger') || '0.06');
      const delayChildren = parseFloat(container.getAttribute('data-delay-children') || '0');
      const children = container.children;

      Array.from(children).forEach((child, index) => {
        getScrollReveal().observe(child, {
          direction: 'up',
          distance: 30,
          delay: delayChildren + index * stagger,
          stagger: 0,
          triggerOnce: true,
        });
      });
    });
  }
}

// CSS-based scroll progress indicator
export function createScrollProgressIndicator(): HTMLElement {
  const indicator = document.createElement('div');
  indicator.id = 'scroll-progress-indicator';
  indicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: linear-gradient(90deg, #fff, #71717a);
    z-index: 9999;
    transform-origin: left;
    transform: scaleX(0);
    pointer-events: none;
  `;
  document.body.appendChild(indicator);

  const tracker = new ScrollProgressTracker({
    onProgress: (progress) => {
      indicator.style.transform = `scaleX(${progress})`;
    },
  });
  tracker.start();

  return indicator;
}