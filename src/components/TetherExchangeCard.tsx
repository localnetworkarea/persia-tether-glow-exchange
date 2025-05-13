
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getCurrentUser, getCurrentExchangeRate, getUserProfile, supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const TetherExchangeCard: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [tab, setTab] = useState('buy');
  const [user, setUser] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [exchangeRate, setExchangeRate] = useState<{buy_price: number, sell_price: number}>({
    buy_price: 52000,
    sell_price: 52800
  });
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if user is logged in
        const authUser = await getCurrentUser();
        if (!authUser) {
          return; // User not logged in, but we'll still show the exchange card
        }
        
        setUserId(authUser.id);
        
        // Get user profile
        const profile = await getUserProfile(authUser.id);
        setUser(profile);
        
        // Get current exchange rate
        const rateData = await getCurrentExchangeRate();
        setExchangeRate({
          buy_price: Number(rateData.buy_price),
          sell_price: Number(rateData.sell_price)
        });
      } catch (error) {
        console.error('Error fetching exchange data:', error);
      }
    };
    
    fetchData();
  }, []);
  
  const handleExchange = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error('لطفاً مبلغ معتبر وارد کنید');
      return;
    }
    
    // Check if user is logged in
    if (!userId) {
      toast.error('برای انجام معاملات، لطفاً ابتدا وارد شوید');
      navigate('/auth');
      return;
    }
    
    const amountNum = Number(amount);
    const isBuying = tab === 'buy';
    
    // Check user balance
    if (isBuying) {
      const totalRialCost = amountNum * exchangeRate.buy_price;
      if (user.rial_balance < totalRialCost) {
        toast.error('موجودی تومان شما برای خرید تتر کافی نیست');
        return;
      }
    } else {
      if (user.tether_balance < amountNum) {
        toast.error('موجودی تتر شما برای فروش کافی نیست');
        return;
      }
    }
    
    setLoading(true);
    
    try {
      // Start a transaction
      const { error: transactionError } = await supabase.rpc('execute_exchange', {
        p_user_id: userId,
        p_amount: amountNum,
        p_is_buy: isBuying
      });
      
      if (transactionError) throw transactionError;
      
      // Refresh user data
      const updatedProfile = await getUserProfile(userId);
      setUser(updatedProfile);
      
      const action = isBuying ? 'خرید' : 'فروش';
      const message = `${action} ${amountNum.toLocaleString()} تتر با موفقیت ثبت شد`;
      
      toast.success(message);
      setAmount('');
    } catch (error) {
      console.error('Error during exchange:', error);
      toast.error('خطا در انجام معامله، لطفاً مجدداً تلاش کنید');
    } finally {
      setLoading(false);
    }
  };
  
  const price = tab === 'buy' ? exchangeRate.buy_price : exchangeRate.sell_price;
  
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
                  <p className="text-sm text-muted-foreground">قیمت هر تتر: {price.toLocaleString()} تومان</p>
                  <p className="text-sm font-semibold mt-1">
                    مبلغ قابل پرداخت: {(Number(amount) * price).toLocaleString()} تومان
                  </p>
                </div>
              )}
              
              <Button 
                onClick={handleExchange} 
                className="w-full animated-gradient-button text-white font-semibold"
                disabled={loading}
              >
                {loading ? 'در حال پردازش...' : 'خرید تتر'}
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
                  <p className="text-sm text-muted-foreground">قیمت هر تتر: {price.toLocaleString()} تومان</p>
                  <p className="text-sm font-semibold mt-1">
                    مبلغ قابل دریافت: {(Number(amount) * price).toLocaleString()} تومان
                  </p>
                </div>
              )}
              
              <Button 
                onClick={handleExchange} 
                className="w-full animated-gradient-button text-white font-semibold"
                disabled={loading}
              >
                {loading ? 'در حال پردازش...' : 'فروش تتر'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TetherExchangeCard;
