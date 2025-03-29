
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface PropertyFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
}

const PropertyForm = ({ onSubmit, loading }: PropertyFormProps) => {
  const currentYear = new Date().getFullYear();
  
  const [formData, setFormData] = useState({
    squareFootage: 1500,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2000,
    location: "Suburban",
    lotSize: 0.25,
    hasGarage: "Yes",
    hasPool: "No",
  });
  
  const handleChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  
  const handleSliderChange = (field: string, value: number[]) => {
    setFormData({
      ...formData,
      [field]: value[0],
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <Card id="property-form" className="border border-gray-200 shadow-md">
      <CardHeader className="bg-estate-blue text-white rounded-t-lg">
        <CardTitle className="text-xl">Property Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Square Footage */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="squareFootage">Square Footage</Label>
              <span className="text-sm text-gray-600">{formData.squareFootage} sq ft</span>
            </div>
            <Slider
              id="squareFootage"
              min={500}
              max={5000}
              step={50}
              value={[formData.squareFootage]}
              onValueChange={(value) => handleSliderChange("squareFootage", value)}
              className="py-4"
            />
          </div>
          
          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Select 
                value={String(formData.bedrooms)} 
                onValueChange={(value) => handleChange("bedrooms", parseInt(value))}
              >
                <SelectTrigger id="bedrooms">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Select 
                value={String(formData.bathrooms)} 
                onValueChange={(value) => handleChange("bathrooms", parseFloat(value))}
              >
                <SelectTrigger id="bathrooms">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((num) => (
                    <SelectItem key={num} value={String(num)}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Year Built */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="yearBuilt">Year Built</Label>
              <span className="text-sm text-gray-600">{formData.yearBuilt}</span>
            </div>
            <Slider
              id="yearBuilt"
              min={1900}
              max={currentYear}
              step={1}
              value={[formData.yearBuilt]}
              onValueChange={(value) => handleSliderChange("yearBuilt", value)}
              className="py-4"
            />
          </div>
          
          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location Type</Label>
            <Select 
              value={formData.location} 
              onValueChange={(value) => handleChange("location", value)}
            >
              <SelectTrigger id="location">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Urban">Urban</SelectItem>
                <SelectItem value="Suburban">Suburban</SelectItem>
                <SelectItem value="Rural">Rural</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Lot Size */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="lotSize">Lot Size (acres)</Label>
              <span className="text-sm text-gray-600">{formData.lotSize} acres</span>
            </div>
            <Slider
              id="lotSize"
              min={0.1}
              max={2}
              step={0.05}
              value={[formData.lotSize]}
              onValueChange={(value) => handleSliderChange("lotSize", value)}
              className="py-4"
            />
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hasGarage">Garage</Label>
              <Select 
                value={formData.hasGarage} 
                onValueChange={(value) => handleChange("hasGarage", value)}
              >
                <SelectTrigger id="hasGarage">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hasPool">Pool</Label>
              <Select 
                value={formData.hasPool} 
                onValueChange={(value) => handleChange("hasPool", value)}
              >
                <SelectTrigger id="hasPool">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-estate-green hover:bg-estate-green/90"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Get Price Prediction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PropertyForm;
