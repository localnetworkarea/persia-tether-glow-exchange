
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Feature3DCard from "@/components/Feature3DCard";
import TetherExchangeCard from "@/components/TetherExchangeCard";
import { Grid2X2, Columns2 } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Index = () => {
  const navigate = useNavigate();
  
  // Animation controls for various sections
  const heroControls = useAnimation();
  const featuresControls = useAnimation();
  const sectionsControls = useAnimation();
  
  // Refs to track when elements are in view
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [sectionsRef, sectionsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  // Trigger animations when elements come into view
  useEffect(() => {
    if (heroInView) {
      heroControls.start("visible");
    }
    
    if (featuresInView) {
      featuresControls.start("visible");
    }
    
    if (sectionsInView) {
      sectionsControls.start("visible");
    }
  }, [
    heroInView, heroControls,
    featuresInView, featuresControls,
    sectionsInView, sectionsControls
  ]);
  
  // Hero section animation variants
  const heroVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      }
    }
  };
  
  const heroItemVariants = {
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
  
  // Features section animation variants
  const featuresContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  };
  
  const featureItemVariants = {
    hidden: { 
      y: 30, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
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
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section 
          className="py-20 px-6 md:px-16 flex flex-col items-center justify-center text-center"
          ref={heroRef}
          initial="hidden"
          animate={heroControls}
          variants={heroVariants}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-crypto-purple to-crypto-blue bg-clip-text text-transparent animated-shadow floating"
              variants={heroItemVariants}
            >
              امن‌ترین پلتفرم خرید و فروش تتر در ایران
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-10"
              variants={heroItemVariants}
            >
              با بهترین قیمت و کمترین کارمزد، تتر خود را معامله کنید
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              variants={heroItemVariants}
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
        
        {/* 2D Sections Layout */}
        <motion.section 
          className="py-12 px-6 md:px-16 bg-card/50 rounded-t-3xl"
          ref={sectionsRef}
          initial="hidden"
          animate={sectionsControls}
          variants={featuresContainerVariants}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="flex items-center justify-center gap-2 mb-10"
              variants={featureItemVariants}
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
                variants={featureItemVariants}
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
                variants={featureItemVariants}
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
        
        {/* Features Section */}
        <motion.section 
          className="py-20 px-6 md:px-16 bg-background"
          ref={featuresRef}
          initial="hidden"
          animate={featuresControls}
          variants={featuresContainerVariants}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="flex items-center justify-center gap-2 mb-10"
              variants={featureItemVariants}
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
                  variants={featureItemVariants}
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
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
