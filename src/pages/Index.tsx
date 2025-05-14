
import React from 'react';
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import SectionsLayout from "@/components/home/SectionsLayout";
import FeaturesSection from "@/components/home/FeaturesSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Background />
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        <SectionsLayout />
        <FeaturesSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
