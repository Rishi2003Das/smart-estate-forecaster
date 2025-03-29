
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search } from "lucide-react";

const HeroSection = () => {
  const [address, setAddress] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Scroll to the property form section
    const formSection = document.getElementById("property-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <div className="relative bg-estate-blue-light min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Smart Estate Forecaster
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in">
            Discover the true value of any property with our advanced AI-powered price prediction model
          </p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto bg-white rounded-lg p-2 flex items-center shadow-lg">
            <input
              type="text"
              placeholder="Enter property address..."
              className="flex-1 border-none outline-none p-3 text-estate-blue rounded-l-lg"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Button type="submit" className="bg-estate-green hover:bg-estate-green/90 text-white rounded-r-lg py-6">
              <Search className="mr-2" size={20} />
              Search
            </Button>
          </form>
          
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center flex-1 max-w-[180px]">
              <div className="text-3xl font-bold text-white">93%</div>
              <div className="text-white/80 text-sm">Accuracy Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center flex-1 max-w-[180px]">
              <div className="text-3xl font-bold text-white">10k+</div>
              <div className="text-white/80 text-sm">Properties Analyzed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center flex-1 max-w-[180px]">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-white/80 text-sm">Data Points Used</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
