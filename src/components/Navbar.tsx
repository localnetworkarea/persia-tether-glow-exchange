
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="w-full py-4 px-6 md:px-16 flex items-center justify-between z-10">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-crypto-purple to-crypto-blue bg-clip-text text-transparent">
          تتر اکسچنج
        </h1>
      </div>
      
      <div className="flex items-center space-x-4 space-x-reverse">
        <Button 
          variant="ghost" 
          className="text-white hover:text-primary hover:bg-background/90"
          onClick={() => navigate('/')}
        >
          خانه
        </Button>
        <Button 
          variant="ghost" 
          className="text-white hover:text-primary hover:bg-background/90"
          onClick={() => navigate('/market')}
        >
          بازار
        </Button>
        <Button 
          variant="ghost" 
          className="text-white hover:text-primary hover:bg-background/90"
          onClick={() => navigate('/wallet')}
        >
          کیف پول
        </Button>
        <Button 
          onClick={() => navigate('/auth')}
          className="animated-gradient-button text-white px-6 rounded-full shadow-lg shadow-purple-500/20"
        >
          ورود / ثبت‌نام
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
