import React from 'react';
import { Button, ButtonProps } from './button';
import { isRoundButton, showConstructionToast } from '@/lib/construction';

export interface ConstructionButtonProps extends ButtonProps {
  featureName?: string;
  forceConstruction?: boolean;
}

/**
 * A button component that shows a construction message when clicked if it's not rounded
 * or if forceConstruction is true.
 */
const ConstructionButton = React.forwardRef<HTMLButtonElement, ConstructionButtonProps>(
  ({ className, featureName, forceConstruction = false, onClick, children, ...props }, ref) => {
    const isRound = isRoundButton(className);
    const showConstruction = forceConstruction || !isRound;
    
    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
      if (showConstruction) {
        showConstructionToast(featureName);
      }
      
      // Call the original onClick handler if provided
      if (onClick) {
        onClick(e);
      }
    };
    
    return (
      <Button
        ref={ref}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

ConstructionButton.displayName = 'ConstructionButton';

export { ConstructionButton }; 