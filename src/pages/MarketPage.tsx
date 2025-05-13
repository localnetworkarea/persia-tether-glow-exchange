
import React from 'react';
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-12 px-6 md:px-16">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-10">
              <SquareSplitHorizontal className="w-6 h-6 text-crypto-purple" />
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-crypto-indigo to-crypto-purple bg-clip-text text-transparent">
                قیمت لحظه‌ای تتر
              </h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Section */}
              <Card className="card-3d bg-card border-border shadow-lg overflow-hidden h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-crypto-indigo to-crypto-teal bg-clip-text text-transparent">
                    قیمت‌های معاملاتی
                  </h3>
                  
                  <div className="flex flex-col gap-6">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">قیمت خرید</p>
                      <h3 className="text-3xl font-bold text-foreground">{marketData.buyPrice.toLocaleString()} <span className="text-sm">تومان</span></h3>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">قیمت فروش</p>
                      <h3 className="text-3xl font-bold text-foreground">{marketData.sellPrice.toLocaleString()} <span className="text-sm">تومان</span></h3>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">تغییرات ۲۴ ساعته</p>
                      <h3 className={`text-3xl font-bold ${marketData.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {marketData.change24h >= 0 ? '+' : ''}{marketData.change24h}%
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Right Section */}
              <Card className="card-3d bg-card border-border shadow-lg overflow-hidden h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-crypto-purple to-crypto-blue bg-clip-text text-transparent">
                    آمار ۲۴ ساعت گذشته
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-6">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">بالاترین قیمت (۲۴ ساعت)</p>
                      <p className="text-xl font-semibold">{marketData.dailyHigh.toLocaleString()} تومان</p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">پایین‌ترین قیمت (۲۴ ساعت)</p>
                      <p className="text-xl font-semibold">{marketData.dailyLow.toLocaleString()} تومان</p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">حجم معاملات (۲۴ ساعت)</p>
                      <p className="text-xl font-semibold">{marketData.volume24h.toLocaleString()} تتر</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section className="py-12 px-6 md:px-16 bg-card/50 rounded-t-3xl mt-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-8">
              <SquareSplitVertical className="w-6 h-6 text-crypto-purple" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-crypto-indigo to-crypto-purple bg-clip-text text-transparent">
                چرا تتر؟
              </h2>
            </div>
            
            <div className="bg-card border border-border/50 p-8 rounded-2xl shadow-lg shadow-crypto-purple/5 card-3d">
              <p className="text-muted-foreground leading-relaxed">
                تتر (Tether) یک ارز دیجیتال باثبات است که ارزش آن معادل یک دلار آمریکا است. این ارز به دلیل ثبات قیمتی، گزینه مناسبی برای افرادی است که می‌خواهند از نوسانات قیمتی رایج در بازار ارزهای دیجیتال دوری کنند. تتر به عنوان یک پل بین ارزهای فیات سنتی و ارزهای دیجیتال عمل می‌کند.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default MarketPage;
