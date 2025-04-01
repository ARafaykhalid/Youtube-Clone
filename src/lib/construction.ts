import { toast } from 'sonner';

/**
 * Show a toast message for features that are under construction
 * @param featureName Name of the feature that is under construction
 */
export const showConstructionToast = (featureName?: string) => {
  const message = featureName 
    ? `${featureName} feature is under construction. You can contribute to this feature!` 
    : 'This feature is under construction. You can contribute to this feature!';
  
  toast.info(message);
};

/**
 * Check if a button element has rounded corners
 * @param className CSS class string to check
 * @returns true if the button has round or rounded-full class
 */
export const isRoundButton = (className?: string): boolean => {
  if (!className) return false;
  
  return className.includes('rounded-full') || 
         className.includes('rounded-pill') ||
         className.includes('rounded-circle') ||
         /rounded-\[\d+px\]/.test(className) ||
         /rounded-\[\d+rem\]/.test(className);
};

/**
 * Handle click for non-round buttons by showing a construction toast
 * @param featureName Optional name of the feature
 * @param onClick Optional original onClick handler to call
 * @returns onClick event handler
 */
export const handleNonRoundButtonClick = (
  featureName?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
) => {
  return (event: React.MouseEvent<HTMLButtonElement>) => {
    showConstructionToast(featureName);
    
    // Call the original onClick handler if provided
    if (onClick) {
      onClick(event);
    }
  };
}; 