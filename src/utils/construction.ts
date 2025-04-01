import { toast } from "sonner";

/**
 * Shows a toast message for features that are under construction
 * @param featureName - Optional name of the feature
 */
export const showConstructionToast = (featureName?: string) => {
  toast.info(
    featureName
      ? `${featureName} is under construction`
      : "This feature is currently under construction",
    {
      description: "Feel free to contribute to this project!",
      duration: 3000,
    }
  );
};

/**
 * Checks if a button has rounded corners based on its class name
 * Used to detect buttons that should trigger construction messages
 * @param className - The button's class name string
 * @returns True if the button has rounded corners
 */
export const isRoundButton = (className: string = ""): boolean => {
  // Check for Tailwind rounded classes
  if (
    className.includes("rounded-full") ||
    className.includes("rounded-pill") ||
    className.includes("rounded-circle")
  ) {
    return true;
  }

  // Check for specific pixel values (using regex)
  const pxRegex = /rounded-\[(\d+)px\]/;
  const pxMatch = className.match(pxRegex);
  if (pxMatch && parseInt(pxMatch[1], 10) >= 20) {
    return true;
  }

  // Check for rem values (using regex)
  const remRegex = /rounded-\[([\d.]+)rem\]/;
  const remMatch = className.match(remRegex);
  if (remMatch && parseFloat(remMatch[1]) >= 1.25) {
    return true;
  }

  return false;
};

/**
 * Handles clicks for non-round buttons to show a construction toast
 * @param e - Click event
 * @param featureName - Optional name of the feature
 * @param onClick - Original onClick handler (if any)
 */
export const handleNonRoundButtonClick = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  featureName?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
) => {
  // Show construction toast
  showConstructionToast(featureName);
  
  // Call the original onClick handler if provided
  if (onClick) {
    onClick(e);
  }
}; 