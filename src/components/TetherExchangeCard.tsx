
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TetherExchangeCard: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [tab, setTab] = useState('buy');
  
  const handleExchange = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('لطفاً مبلغ معتبر وارد کنید');
      return;
    }
    
    const amountNum = Number(amount);
    const action = tab === 'buy' ? 'خرید' : 'فروش';
    const message = `${action} ${amountNum.toLocaleString()} تتر با موفقیت ثبت شد`;
    
    toast.success(message);
    setAmount('');
  };
  
  const tetherPrice = 52400; // Toman per USDT - normally this would come from an API
  
  return (
    <Card className="w-full max-w-md perspective-container card-3d bg-card border-border shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-center mb-6 bg-gradient-to-r from-crypto-purple to-crypto-teal bg-clip-text text-transparent">
          معاملات تتر (USDT)
        </h3>
        
        <Tabs defaultValue="buy" className="w-full" onValueChange={setTab}>
          <TabsList className="w-full mb-6">
            <TabsTrigger value="buy" className="w-1/2">خرید تتر</TabsTrigger>
            <TabsTrigger value="sell" className="w-1/2">فروش تتر</TabsTrigger>
          </TabsList>
          
          <TabsContent value="buy" className="mt-0">
            <div className="space-y-4">
              <div>
                <label className="text-sm block mb-2">میزان تتر</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="مقدار تتر مورد نظر"
                  className="w-full"
                  dir="rtl"
                />
              </div>
              
              {amount && !isNaN(Number(amount)) && Number(amount) > 0 && (
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">قیمت هر تتر: {tetherPrice.toLocaleString()} تومان</p>
                  <p className="text-sm font-semibold mt-1">
                    مبلغ قابل پرداخت: {(Number(amount) * tetherPrice).toLocaleString()} تومان
                  </p>
                </div>
              )}
              
              <Button onClick={handleExchange} className="w-full animated-gradient-button text-white font-semibold">
                خرید تتر
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="sell" className="mt-0">
            <div className="space-y-4">
              <div>
                <label className="text-sm block mb-2">میزان تتر</label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="مقدار تتر مورد نظر"
                  className="w-full"
                  dir="rtl"
                />
              </div>
              
              {amount && !isNaN(Number(amount)) && Number(amount) > 0 && (
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">قیمت هر تتر: {tetherPrice.toLocaleString()} تومان</p>
                  <p className="text-sm font-semibold mt-1">
                    مبلغ قابل دریافت: {(Number(amount) * tetherPrice).toLocaleString()} تومان
                  </p>
                </div>
              )}
              
              <Button onClick={handleExchange} className="w-full animated-gradient-button text-white font-semibold">
                فروش تتر
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TetherExchangeCard;
