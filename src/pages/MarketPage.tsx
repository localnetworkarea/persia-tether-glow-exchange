
import React, { useEffect } from 'react';
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { SquareSplitHorizontal, SquareSplitVertical } from 'lucide-react';

const MarketPage = () => {
  const marketData = {
    buyPrice: 52400,
    sellPrice: 52200,
    dailyHigh: 53100,
    dailyLow: 51800,
    volume24h: 1250000,
    change24h: 1.2,
  };
  
  // Animation controls for various sections
  const mainTitleControls = useAnimation();
  const priceCardControls = useAnimation();
  const statsCardControls = useAnimation();
  const infoSectionControls = useAnimation();
  
  // Refs to track when elements are in view
  const [mainTitleRef, mainTitleInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [priceCardRef, priceCardInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [statsCardRef, statsCardInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [infoSectionRef, infoSectionInView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  // Trigger animations when elements come into view
  useEffect(() => {
    if (mainTitleInView) {
      mainTitleControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.7, ease: "easeOut" }
      });
    }
    
    if (priceCardInView) {
      priceCardControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.7, delay: 0.2, ease: "easeOut" }
      });
    }
    
    if (statsCardInView) {
      statsCardControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.7, delay: 0.4, ease: "easeOut" }
      });
    }
    
    if (infoSectionInView) {
      infoSectionControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.7, ease: "easeOut" }
      });
    }
  }, [
    mainTitleInView, mainTitleControls,
    priceCardInView, priceCardControls,
    statsCardInView, statsCardControls,
    infoSectionInView, infoSectionControls
  ]);
  
  // Price item entry animation variants
  const priceItemVariants = {
    hidden: { opacity: 0, y: 20 },
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-12 px-6 md:px-16">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="flex items-center justify-center gap-2 mb-10"
              ref={mainTitleRef}
              initial={{ y: -30, opacity: 0 }}
              animate={mainTitleControls}
            >
              <SquareSplitHorizontal className="w-6 h-6 text-crypto-purple" />
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-crypto-indigo to-crypto-purple bg-clip-text text-transparent">
                قیمت لحظه‌ای تتر
              </h1>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Section */}
              <motion.div
                ref={priceCardRef}
                initial={{ x: -50, opacity: 0 }}
                animate={priceCardControls}
              >
                <Card className="card-3d bg-card border-border shadow-lg overflow-hidden h-full hover:shadow-crypto-purple/10 transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-crypto-indigo to-crypto-teal bg-clip-text text-transparent">
                      قیمت‌های معاملاتی
                    </h3>
                    
                    <div className="flex flex-col gap-6">
                      <motion.div 
                        className="bg-muted/30 p-4 rounded-lg hover:bg-muted/40 transition-colors duration-300"
                        custom={0} 
                        initial="hidden" 
                        animate="visible"
                        variants={priceItemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-sm text-muted-foreground mb-1">قیمت خرید</p>
                        <h3 className="text-3xl font-bold text-foreground">{marketData.buyPrice.toLocaleString()} <span className="text-sm">تومان</span></h3>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-muted/30 p-4 rounded-lg hover:bg-muted/40 transition-colors duration-300"
                        custom={1} 
                        initial="hidden" 
                        animate="visible"
                        variants={priceItemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-sm text-muted-foreground mb-1">قیمت فروش</p>
                        <h3 className="text-3xl font-bold text-foreground">{marketData.sellPrice.toLocaleString()} <span className="text-sm">تومان</span></h3>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-muted/30 p-4 rounded-lg hover:bg-muted/40 transition-colors duration-300"
                        custom={2} 
                        initial="hidden" 
                        animate="visible"
                        variants={priceItemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-sm text-muted-foreground mb-1">تغییرات ۲۴ ساعته</p>
                        <h3 className={`text-3xl font-bold ${marketData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {marketData.change24h >= 0 ? '+' : ''}{marketData.change24h}%
                        </h3>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              {/* Right Section */}
              <motion.div
                ref={statsCardRef}
                initial={{ x: 50, opacity: 0 }}
                animate={statsCardControls}
              >
                <Card className="card-3d bg-card border-border shadow-lg overflow-hidden h-full hover:shadow-crypto-blue/10 transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-crypto-purple to-crypto-blue bg-clip-text text-transparent">
                      آمار ۲۴ ساعت گذشته
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-6">
                      <motion.div 
                        className="bg-muted/30 p-4 rounded-lg hover:bg-muted/40 transition-colors duration-300"
                        custom={0} 
                        initial="hidden" 
                        animate="visible"
                        variants={priceItemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-sm text-muted-foreground mb-1">بالاترین قیمت (۲۴ ساعت)</p>
                        <p className="text-xl font-semibold">{marketData.dailyHigh.toLocaleString()} تومان</p>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-muted/30 p-4 rounded-lg hover:bg-muted/40 transition-colors duration-300"
                        custom={1}
                        initial="hidden" 
                        animate="visible"
                        variants={priceItemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-sm text-muted-foreground mb-1">پایین‌ترین قیمت (۲۴ ساعت)</p>
                        <p className="text-xl font-semibold">{marketData.dailyLow.toLocaleString()} تومان</p>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-muted/30 p-4 rounded-lg hover:bg-muted/40 transition-colors duration-300"
                        custom={2}
                        initial="hidden" 
                        animate="visible"
                        variants={priceItemVariants}
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-sm text-muted-foreground mb-1">حجم معاملات (۲۴ ساعت)</p>
                        <p className="text-xl font-semibold">{marketData.volume24h.toLocaleString()} تتر</p>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
        
        <motion.section 
          className="py-12 px-6 md:px-16 bg-card/50 rounded-t-3xl mt-6"
          ref={infoSectionRef}
          initial={{ y: 50, opacity: 0 }}
          animate={infoSectionControls}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <SquareSplitVertical className="w-6 h-6 text-crypto-purple" />
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-crypto-indigo to-crypto-purple bg-clip-text text-transparent">
                چرا تتر؟
              </h2>
            </div>
            
            <motion.div 
              className="bg-card border border-border/50 p-8 rounded-2xl shadow-lg shadow-crypto-purple/5 card-3d"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.p 
                className="text-muted-foreground leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                تتر (Tether) یک ارز دیجیتال باثبات است که ارزش آن معادل یک دلار آمریکا است. این ارز به دلیل ثبات قیمتی، گزینه مناسبی برای افرادی است که می‌خواهند از نوسانات قیمتی رایج در بازار ارزهای دیجیتال دوری کنند. تتر به عنوان یک پل بین ارزهای فیات سنتی و ارزهای دیجیتال عمل می‌کند.
              </motion.p>
            </motion.div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketPage;
