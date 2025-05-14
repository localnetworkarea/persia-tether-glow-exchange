
import React from 'react';
import { motion } from 'framer-motion';
import { Columns2 } from 'lucide-react';
import Feature3DCard from "@/components/Feature3DCard";
import { fadeInUpVariants, staggerContainerVariants } from '@/lib/animation';

const FeaturesSection = () => {
  const features = [
    {
      title: "امنیت بالا",
      description: "امن‌ترین پلتفرم معاملاتی با استفاده از رمزنگاری پیشرفته و احراز هویت دو مرحله‌ای",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "کارمزد پایین",
      description: "پایین‌ترین کارمزدهای معاملاتی در بازار ارزهای دیجیتال ایران",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "پشتیبانی ۲۴/۷",
      description: "پشتیبانی کامل و آنلاین در تمام روزهای هفته از طریق تیکت و چت آنلاین",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    }
  ];

  return (
    <motion.section 
      className="py-20 px-6 md:px-16 bg-background"
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
              rotateY: [0, 360]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Columns2 className="w-6 h-6 text-crypto-purple" />
          </motion.div>
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-crypto-indigo to-crypto-purple bg-clip-text text-transparent">
            ویژگی‌های برتر
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUpVariants}
              custom={index}
            >
              <Feature3DCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
