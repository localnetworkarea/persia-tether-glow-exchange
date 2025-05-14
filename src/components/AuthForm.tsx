
import React, { useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { motion } from "framer-motion";

interface AuthFormProps {
  type: 'login' | 'register';
  onToggleType: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onToggleType }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Add mouse tracking effect for 3D perspective
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      // Apply 3D rotation based on mouse position
      card.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 10}deg)
        translateZ(10px)
      `;
    };
    
    const handleMouseLeave = () => {
      // Reset to default position when mouse leaves
      card.style.transform = `
        perspective(1000px)
        rotateY(0deg)
        rotateX(0deg)
        translateZ(0px)
      `;
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        ref={cardRef}
        className="w-full max-w-md p-8 bg-card border-border shadow-xl transform transition-all duration-300 hover:shadow-2xl"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="relative z-10">
          {/* Enhanced gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-crypto-purple/20 to-crypto-blue/20 rounded-lg blur-xl opacity-50 -z-10"></div>
          
          {/* Floating particles effect */}
          <div className="absolute inset-0 overflow-hidden rounded-lg -z-5">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
          </div>
          
          {/* Card content with enhanced 3D feel */}
          <div className="relative" style={{ transform: 'translateZ(20px)' }}>
            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-crypto-purple to-crypto-blue bg-clip-text text-transparent">
              {type === 'login' ? 'ورود به حساب کاربری' : 'ایجاد حساب جدید'}
            </h2>
            
            {type === 'login' ? (
              <LoginForm onToggleType={onToggleType} />
            ) : (
              <RegisterForm onToggleType={onToggleType} />
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AuthForm;
