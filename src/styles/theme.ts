// Global styles and CSS custom properties
// This file is imported in the main layout

// CSS Custom Properties for theming
const root = document.documentElement;

// Theme colors (zinc-based dark theme)
root.style.setProperty('--color-bg', '#000000');
root.style.setProperty('--color-bg-elevated', '#09090b');
root.style.setProperty('--color-text-primary', '#d4d4d8');
root.style.setProperty('--color-text-secondary', '#a1a1aa');
root.style.setProperty('--color-text-muted', '#71717a');
root.style.setProperty('--color-border', '#27272a');
root.style.setProperty('--color-border-hover', '#3f3f46');
root.style.setProperty('--color-accent', '#ffffff');
root.style.setProperty('--color-accent-dim', 'rgba(255, 255, 255, 0.1)');

// Font stacks
root.style.setProperty('--font-sans', 'Inter Variable, Inter, Geist, ui-sans-serif, system-ui, sans-serif');
root.style.setProperty('--font-mono', 'Styrene A, Styrene A Web, ui-sans-serif, system-ui, sans-serif');
root.style.setProperty('--font-serif', 'Styrene A, Styrene A Web, ui-sans-serif, system-ui, sans-serif');

// Spacing scale
root.style.setProperty('--space-1', '0.25rem');
root.style.setProperty('--space-2', '0.5rem');
root.style.setProperty('--space-3', '0.75rem');
root.style.setProperty('--space-4', '1rem');
root.style.setProperty('--space-5', '1.25rem');
root.style.setProperty('--space-6', '1.5rem');
root.style.setProperty('--space-8', '2rem');
root.style.setProperty('--space-10', '2.5rem');
root.style.setProperty('--space-12', '3rem');
root.style.setProperty('--space-16', '4rem');
root.style.setProperty('--space-20', '5rem');

// Animation durations
root.style.setProperty('--duration-fast', '150ms');
root.style.setProperty('--duration-normal', '300ms');
root.style.setProperty('--duration-slow', '500ms');
root.style.setProperty('--duration-slower', '800ms');

// Easing
root.style.setProperty('--ease-out', 'cubic-bezier(0.22, 1, 0.36, 1)');
root.style.setProperty('--ease-spring', 'cubic-bezier(0.34, 1.56, 0.64, 1)');

// Z-index scale
root.style.setProperty('--z-bg', '-10');
root.style.setProperty('--z-content', '10');
root.style.setProperty('--z-nav', '50');
root.style.setProperty('--z-modal', '100');
root.style.setProperty('--z-tooltip', '200');

// Container max-width
root.style.setProperty('--container-max', '80rem');
root.style.setProperty('--container-padding', '1.25rem');

// Focus ring
root.style.setProperty('--focus-ring', '0 0 0 2px #fff, 0 0 0 6px rgba(255, 255, 255, 0.12)');

export {};