
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

// Side fade variants (left/right)
export const fadeInLeftVariants: Variants = {
  hidden: { 
    x: -50, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

export const fadeInRightVariants: Variants = {
  hidden: { 
    x: 50, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
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

// List item variants with index-based delay
export const listItemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

// Scale fade animation for popups and modals
export const scaleFadeVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// Spring animation for elements that need bounce
export const springUpVariants: Variants = {
  hidden: { 
    y: 50,
    opacity: 0 
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15
    }
  }
};
