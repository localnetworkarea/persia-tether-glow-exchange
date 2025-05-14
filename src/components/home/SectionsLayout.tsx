
import React from 'react';
import { motion } from 'framer-motion';
import { Grid2X2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import TetherExchangeCard from "@/components/TetherExchangeCard";
import { useNavigate } from 'react-router-dom';
import { fadeInUpVariants, staggerContainerVariants } from '@/lib/animation';

const SectionsLayout = () => {
  const navigate = useNavigate();

  return (
    <motion.section 
      className="py-12 px-6 md:px-16 bg-card/50 rounded-t-3xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainerVariants}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex items-center justify-center gap-2 mb-10"
          variants={fadeInUpVariants}
        >
          <motion.div
            animate={{ 
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Grid2X2 className="w-6 h-6 text-crypto-purple" />
          </motion.div>
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-crypto-indigo to-crypto-purple bg-clip-text text-transparent">
            بخش‌های ویژه
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <motion.div 
            className="space-y-8"
            variants={fadeInUpVariants}
          >
            <motion.div 
              className="bg-card border border-border/50 p-8 rounded-2xl shadow-lg shadow-crypto-purple/5 card-3d"
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-crypto-purple to-crypto-blue bg-clip-text text-transparent">
                معاملات آنلاین تتر
              </h3>
              <TetherExchangeCard />
            </motion.div>
          </motion.div>
          
          {/* Right Column */}
          <motion.div 
            className="bg-card border border-border/50 p-8 rounded-2xl shadow-lg shadow-crypto-purple/5 card-3d"
            variants={fadeInUpVariants}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.25)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-crypto-indigo to-crypto-teal bg-clip-text text-transparent">
              همین حالا ثبت‌نام کنید
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              با ثبت نام در تتر اکسچنج، به سادگی معاملات ارز دیجیتال خود را آغاز کنید
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className="animated-gradient-button text-white px-8 py-6 w-full rounded-xl text-lg shadow-lg shadow-purple-500/20"
                onClick={() => navigate('/auth')}
              >
                ثبت‌نام رایگان
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default SectionsLayout;
