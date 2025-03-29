
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ResultsDisplayProps {
  prediction: number | null;
  propertyDetails: any;
  loading: boolean;
}

const ResultsDisplay = ({ prediction, propertyDetails, loading }: ResultsDisplayProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    if (prediction) {
      // Generate historical and future price data for the chart
      const basePrice = prediction;
      const data = [];
      
      // Past 5 years of estimated values
      for (let i = 5; i >= 1; i--) {
        const yearAgo = basePrice * (0.95 ** i); // Assume 5% annual appreciation
        data.push({
          year: new Date().getFullYear() - i,
          value: Math.round(yearAgo),
        });
      }
      
      // Current prediction
      data.push({
        year: new Date().getFullYear(),
        value: basePrice,
        current: true,
      });
      
      // Future 5 years of projected values
      for (let i = 1; i <= 5; i++) {
        const yearLater = basePrice * (1.03 ** i); // Assume 3% annual appreciation
        data.push({
          year: new Date().getFullYear() + i,
          value: Math.round(yearLater),
        });
      }
      
      setChartData(data);
    }
  }, [prediction]);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (!propertyDetails && !prediction && !loading) {
    return (
      <Card className="h-full border border-gray-200 shadow-md flex items-center justify-center">
        <CardContent className="p-12 text-center">
          <div className="text-6xl text-estate-blue/20 mb-4">📊</div>
          <h3 className="text-xl font-medium text-estate-blue mb-2">No Prediction Yet</h3>
          <p className="text-gray-500">
            Fill in the property details form to get a price prediction for your property.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="h-full border border-gray-200 shadow-md flex items-center justify-center">
        <CardContent className="p-12 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-estate-green mx-auto mb-4"></div>
          <h3 className="text-xl font-medium text-estate-blue mb-2">Processing Data</h3>
          <p className="text-gray-500">
            Our AI model is analyzing property details to generate a prediction...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-gray-200 shadow-md h-full">
      <CardHeader className="bg-estate-blue-light text-white rounded-t-lg">
        <CardTitle className="text-xl">Property Valuation Results</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center mb-8">
          <h3 className="text-lg text-gray-600 mb-1">Estimated Value</h3>
          <div className="text-4xl font-bold text-estate-blue">
            {formatCurrency(prediction!)}
          </div>
        </div>
        
        {propertyDetails && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
            <div>
              <span className="text-sm text-gray-500">Square Footage:</span>
              <p className="font-medium">{propertyDetails.squareFootage} sq ft</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Bedrooms:</span>
              <p className="font-medium">{propertyDetails.bedrooms}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Bathrooms:</span>
              <p className="font-medium">{propertyDetails.bathrooms}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Year Built:</span>
              <p className="font-medium">{propertyDetails.yearBuilt}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Location:</span>
              <p className="font-medium">{propertyDetails.location}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Lot Size:</span>
              <p className="font-medium">{propertyDetails.lotSize} acres</p>
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <h3 className="text-lg font-medium text-estate-blue mb-3">Price Trend</h3>
          <div className="h-64">
            {chartData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3282B8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3282B8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" />
                  <YAxis 
                    tickFormatter={(value) => `${Math.floor(value/1000)}k`}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value), "Value"]}
                    labelFormatter={(year) => `Year: ${year}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0A3D62" 
                    fillOpacity={1}
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        
        <div className="text-sm text-gray-500 mt-6">
          <p>This prediction is based on our AI model analysis of property details, market trends, and comparable properties in the area. Actual selling prices may vary based on market conditions and unique property features.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
