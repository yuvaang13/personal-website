// NeuralFieldBackground - Ambient neural network visualization
// Scroll-reactive, performance-optimized canvas animation

interface NeuralNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  connections: number[];
  orbitSpeed: number;
  orbitRadius: number;
  orbitAngle: number;
  pulsePhase: number;
}

type Variant = 'dense' | 'sparse' | 'structured';
type ColorScheme = 'mono' | 'subtle-accent';

export class NeuralFieldBackground {
  private canvas: HTMLCanvasElement | null = null;
  private context: CanvasRenderingContext2D | null = null;
  private container: HTMLElement | null = null;
  private nodes: NeuralNode[] = [];
  private frame = 0;
  private width = 0;
  private height = 0;
  private animationFrame = 0;
  private variant: Variant = 'structured';
  private colorScheme: ColorScheme = 'mono';
  private scrollProgress = 0;
  private prefersReducedMotion = false;
  private resizeObserver: ResizeObserver | null = null;

  constructor(
    canvas: HTMLCanvasElement,
    container: HTMLElement,
    options: { variant?: Variant; colorScheme?: ColorScheme } = {}
  ) {
    this.canvas = canvas;
    this.container = container;
    this.variant = options.variant || 'structured';
    this.colorScheme = options.colorScheme || 'mono';
    this.context = canvas.getContext('2d', { alpha: true });
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.init();
  }

  private init(): void {
    if (!this.canvas || !this.context || !this.container) return;

    this.setupResize();
    this.resize();
    this.createNodes();
    this.draw();
  }

  private setupResize(): void {
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container!);
    window.addEventListener('resize', () => this.resize());
  }

  private resize(): void {
    if (!this.canvas || !this.context || !this.container) return;

    const rect = this.container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = Math.floor(this.width * dpr);
    this.canvas.height = Math.floor(this.height * dpr);
    this.context.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.createNodes();
  }

  private createNodes(): void {
    if (!this.context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = this.width * dpr;
    const h = this.height * dpr;

    const nodeCount = this.variant === 'dense' ? 120 : this.variant === 'sparse' ? 40 : 80;
    this.nodes = Array.from({ length: nodeCount }, (_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = Math.min(w, h) * (0.15 + Math.random() * 0.35);
      const baseX = w / 2 + Math.cos(angle) * radius * (0.7 + Math.random() * 0.6);
      const baseY = h / 2 + Math.sin(angle) * radius * (0.7 + Math.random() * 0.6);

      return {
        x: baseX,
        y: baseY,
        baseX,
        baseY,
        vx: 0,
        vy: 0,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.08 + Math.random() * 0.22,
        connections: [] as number[],
        orbitSpeed: 0.0003 + Math.random() * 0.0008,
        orbitRadius: 5 + Math.random() * 20,
        orbitAngle: Math.random() * Math.PI * 2,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });

    // Create connections
    this.nodes.forEach((a, i) => {
      this.nodes.forEach((b, j) => {
        if (i !== j) {
          const dx = a.baseX - b.baseX;
          const dy = a.baseY - b.baseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = this.variant === 'dense' ? 200 : this.variant === 'sparse' ? 160 : 180;
          if (dist < threshold && Math.random() < 0.3) {
            a.connections.push(j);
          }
        }
      });
    });
  }

  private drawStructuredGrid(): void {
    if (!this.context) return;

    const gridSize = 80;
    const offsetX = (this.frame * 20) % gridSize;
    const offsetY = (this.frame * 15) % gridSize;
    const alpha = 0.02 * (1 - this.scrollProgress * 0.5);

    this.context.strokeStyle = this.colorScheme === 'mono'
      ? `rgba(244, 244, 245, ${alpha})`
      : `rgba(100, 200, 255, ${alpha * 0.5})`;
    this.context.lineWidth = 0.3;

    for (let x = -offsetX; x < this.width; x += gridSize) {
      this.context.beginPath();
      this.context.moveTo(x, 0);
      this.context.lineTo(x, this.height);
      this.context.stroke();
    }
    for (let y = -offsetY; y < this.height; y += gridSize) {
      this.context.beginPath();
      this.context.moveTo(0, y);
      this.context.lineTo(this.width, y);
      this.context.stroke();
    }

    const centerAlpha = 0.04 * (1 - this.scrollProgress * 0.3);
    this.context.strokeStyle = this.colorScheme === 'mono'
      ? `rgba(244, 244, 245, ${centerAlpha})`
      : `rgba(100, 200, 255, ${centerAlpha * 0.5})`;
    this.context.lineWidth = 0.5;
    this.context.beginPath();
    this.context.moveTo(this.width / 2, 0);
    this.context.lineTo(this.width / 2, this.height);
    this.context.stroke();
    this.context.beginPath();
    this.context.moveTo(0, this.height / 2);
    this.context.lineTo(this.width, this.height / 2);
    this.context.stroke();
  }

  private draw(): void {
    if (!this.context || !this.canvas) return;

    if (this.prefersReducedMotion) {
      this.drawStaticFrame();
      return;
    }

    this.frame += 0.003;
    this.context.clearRect(0, 0, this.width, this.height);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = this.width * dpr;
    const h = this.height * dpr;

    // Update nodes
    this.nodes.forEach((node) => {
      node.orbitAngle += node.orbitSpeed;
      const orbitalX = Math.cos(node.orbitAngle) * node.orbitRadius;
      const orbitalY = Math.sin(node.orbitAngle) * node.orbitRadius;

      const scrollInfluence = this.scrollProgress * 100;
      const scrollX = Math.sin(this.frame * 0.5 + node.pulsePhase) * 15 * (1 - this.scrollProgress * 0.5);
      const scrollY = Math.cos(this.frame * 0.7 + node.pulsePhase) * 15 * (1 - this.scrollProgress * 0.5);

      node.vx += (node.baseX + orbitalX + scrollX + scrollInfluence * 0.3 - node.x) * 0.008;
      node.vy += (node.baseY + orbitalY + scrollY - node.y) * 0.008;
      node.vx *= 0.92;
      node.vy *= 0.92;
      node.x += node.vx;
      node.y += node.vy;
    });

    // Draw connections
    this.nodes.forEach((a, i) => {
      a.connections.forEach((j) => {
        if (j > i) {
          const b = this.nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const threshold = this.variant === 'dense' ? 220 : this.variant === 'sparse' ? 180 : 200;

          if (distance < threshold) {
            const opacity = (1 - distance / threshold) * 0.15 * (1 - this.scrollProgress * 0.3);
            const pulse = Math.sin(this.frame * 3 + i) * 0.3 + 0.7;

            this.context!.strokeStyle = this.colorScheme === 'mono'
              ? `rgba(244, 244, 245, ${opacity * pulse})`
              : `rgba(100, 200, 255, ${opacity * pulse * 0.4})`;
            this.context!.lineWidth = 0.5;
            this.context!.beginPath();
            this.context!.moveTo(a.x, a.y);
            this.context!.lineTo(b.x, b.y);
            this.context!.stroke();
          }
        }
      });
    });

    // Draw nodes
    this.nodes.forEach((node) => {
      const pulse = Math.sin(this.frame * 4 + node.pulsePhase) * 0.4 + 0.6;
      const scrollAlpha = 1 - this.scrollProgress * 0.4;
      const alpha = node.alpha * pulse * scrollAlpha;

      this.context!.fillStyle = this.colorScheme === 'mono'
        ? `rgba(244, 244, 245, ${alpha})`
        : `rgba(200, 230, 255, ${alpha})`;
      this.context!.beginPath();
      this.context!.arc(node.x, node.y, Math.max(0.5, node.size * pulse), 0, Math.PI * 2);
      this.context!.fill();
    });

    // Draw structured grid for 'structured' variant
    if (this.variant === 'structured') {
      this.drawStructuredGrid();
    }

    this.animationFrame = requestAnimationFrame(() => this.draw());
  }

  private drawStaticFrame(): void {
    if (!this.context) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = this.width * dpr;
    const h = this.height * dpr;

    this.context.clearRect(0, 0, w, h);

    this.nodes.forEach((a, i) => {
      a.connections.forEach((j) => {
        if (j > i) {
          const b = this.nodes[j];
          const dx = a.baseX - b.baseX;
          const dy = a.baseY - b.baseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const threshold = this.variant === 'dense' ? 220 : this.variant === 'sparse' ? 180 : 200;

          if (distance < threshold) {
            const opacity = (1 - distance / threshold) * 0.1 * (1 - this.scrollProgress * 0.3);
            this.context!.strokeStyle = this.colorScheme === 'mono'
              ? `rgba(244, 244, 245, ${opacity})`
              : `rgba(100, 200, 255, ${opacity * 0.4})`;
            this.context!.lineWidth = 0.5;
            this.context!.beginPath();
            this.context!.moveTo(a.baseX, a.baseY);
            this.context!.lineTo(b.baseX, b.baseY);
            this.context!.stroke();
          }
        }
      });
    });

    this.nodes.forEach((node) => {
      const scrollAlpha = 1 - this.scrollProgress * 0.4;
      this.context!.fillStyle = this.colorScheme === 'mono'
        ? `rgba(244, 244, 245, ${node.alpha * scrollAlpha})`
        : `rgba(200, 230, 255, ${node.alpha * scrollAlpha})`;
      this.context!.beginPath();
      this.context!.arc(node.baseX, node.baseY, node.size, 0, Math.PI * 2);
      this.context!.fill();
    });

    if (this.variant === 'structured') {
      this.drawStructuredGrid();
    }
  }

  public setScrollProgress(progress: number): void {
    this.scrollProgress = Math.max(0, Math.min(1, progress));
  }

  public setVariant(variant: Variant): void {
    this.variant = variant;
    this.createNodes();
  }

  public destroy(): void {
    cancelAnimationFrame(this.animationFrame);
    this.resizeObserver?.disconnect();
    window.removeEventListener('resize', () => this.resize());
  }
}

// Auto-initialize
export function initNeuralFieldBackground(): void {
  const containers = document.querySelectorAll<HTMLElement>('[data-neural-field]');

  containers.forEach((container) => {
    const canvas = container.querySelector<HTMLCanvasElement>('canvas');
    if (!canvas) return;

    const variant = (container.getAttribute('data-variant') as Variant) || 'structured';
    const colorScheme = (container.getAttribute('data-color-scheme') as 'mono' | 'subtle-accent') || 'mono';

    const instance = new NeuralFieldBackground(canvas, container, { variant, colorScheme });

    const updateScrollProgress = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      instance.setScrollProgress((window.scrollY || document.documentElement.scrollTop) / maxScroll);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // Cleanup
    (container as any)._neuralFieldInstance = instance;
  });

  window.addEventListener('beforeunload', () => {
    containers.forEach((container) => {
      const instance = (container as any)._neuralFieldInstance;
      if (instance) instance.destroy();
    });
  });
}

if (typeof window !== 'undefined') {
  (window as any).NeuralFieldBackground = NeuralFieldBackground;
  (window as any).initNeuralFieldBackground = initNeuralFieldBackground;
}