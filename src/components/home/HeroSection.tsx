
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { fadeInUpVariants, staggerContainerVariants } from '@/lib/animation';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <motion.section 
      className="py-20 px-6 md:px-16 flex flex-col items-center justify-center text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-crypto-purple to-crypto-blue bg-clip-text text-transparent animated-shadow floating"
          variants={fadeInUpVariants}
        >
          امن‌ترین پلتفرم خرید و فروش تتر در ایران
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground mb-10"
          variants={fadeInUpVariants}
        >
          با بهترین قیمت و کمترین کارمزد، تتر خود را معامله کنید
        </motion.p>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4"
          variants={fadeInUpVariants}
        >
          <Button 
            className="animated-gradient-button text-white px-8 py-6 rounded-full text-lg shadow-lg shadow-purple-500/20"
            onClick={() => navigate('/auth')}
          >
            شروع معاملات
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate('/market')}
            className="px-8 py-6 rounded-full text-lg border-2 border-primary/30 hover:border-primary hover:bg-primary/5"
          >
            مشاهده قیمت لحظه‌ای
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
