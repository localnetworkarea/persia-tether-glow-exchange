
import { Variants } from 'framer-motion';

// Common animation variants for sections
export const fadeInUpVariants: Variants = {
  hidden: { 
    y: 30, 
    opacity: 0 
  },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

// Container variants for staggered children animations
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    }
  }
};

// Card hover animations
export const cardHoverVariants: Variants = {
  hover: { 
    y: -8, 
    boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)",
    transition: {
      type: "spring",
      stiffness: 300
    }
  },
  tap: {
    scale: 0.98
  }
};

// Button hover animations
export const buttonHoverVariants: Variants = {
  hover: { 
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400
    }
  },
  tap: { 
    scale: 0.98 
  }
};

// Icon rotation animation
export const rotateVariants: Variants = {
  rotate: {
    rotate: 360,
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }
  }
};
