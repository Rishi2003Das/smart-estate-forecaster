
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import PropertyForm from "@/components/PropertyForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import { useState } from "react";

const Index = () => {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [propertyDetails, setPropertyDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Simulate a prediction based on form data
  const handlePrediction = (formData: any) => {
    setLoading(true);
    setPropertyDetails(formData);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Simple formula to simulate a prediction algorithm
      const basePrice = 250000;
      const sqftFactor = formData.squareFootage * 150;
      const bedroomFactor = formData.bedrooms * 15000;
      const bathroomFactor = formData.bathrooms * 12000;
      const yearFactor = (2023 - formData.yearBuilt) * -500;
      const locationFactor = formData.location === "Urban" ? 50000 : 
                            formData.location === "Suburban" ? 25000 : 0;
      
      // Generate a somewhat realistic price with some randomness
      const calculatedPrice = basePrice + sqftFactor + bedroomFactor + 
                            bathroomFactor + yearFactor + locationFactor;
      const randomVariance = calculatedPrice * 0.1 * (Math.random() - 0.5) * 2;
      const finalPrice = Math.max(100000, Math.round(calculatedPrice + randomVariance));
      
      setPrediction(finalPrice);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <PropertyForm onSubmit={handlePrediction} loading={loading} />
          </div>
          <div className="w-full lg:w-1/2">
            <ResultsDisplay 
              prediction={prediction} 
              propertyDetails={propertyDetails} 
              loading={loading} 
            />
          </div>
        </div>
      </div>
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default Index;
