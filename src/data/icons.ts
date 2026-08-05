import type { Highlight } from './profile';

export const iconMap: Record<string, string> = {
  trophy: 'trophy',
  brain: 'brain',
  code2: 'code-2',
  users: 'users',
  microscope: 'microscope',
  'graduation-cap': 'graduation-cap',
  mail: 'mail',
  github: 'github',
  'map-pin': 'map-pin',
  'arrow-up-right': 'arrow-up-right',
  'external-link': 'external-link',
};

export function getIconName(name: string): string {
  return iconMap[name] || name;
}

export const highlightIcons: Record<string, string> = {
  trophy: 'trophy',
  brain: 'brain',
  code2: 'code-2',
  users: 'users',
  microscope: 'microscope',
  'graduation-cap': 'graduation-cap',
};