
import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface Feature3DCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Feature3DCard: React.FC<Feature3DCardProps> = ({ title, description, icon }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      card.style.transform = `
        perspective(1000px)
        rotateY(${x * 20}deg)
        rotateX(${-y * 20}deg)
        translateZ(10px)
      `;
    };
    
    const handleMouseLeave = () => {
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
    <Card 
      ref={cardRef}
      className="h-full transition-all duration-200 ease-out bg-gradient-to-br from-card to-muted/50 border border-primary/10 shadow-xl overflow-hidden animated-shadow"
    >
      <CardContent className="p-6">
        <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-full bg-primary/20 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Feature3DCard;
