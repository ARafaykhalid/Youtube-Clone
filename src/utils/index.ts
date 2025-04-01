// Re-export all utilities
export * from './formatters';
export * from './construction';
export * from './images';

/**
 * Utility for conditionally joining class names
 * @param inputs - Class names or conditions
 * @returns Joined class names string
 */
export function cn(...inputs: (string | boolean | undefined | null)[]): string {
  return inputs.filter(Boolean).join(' ');
} 