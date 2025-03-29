
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      title: "Advanced AI Model",
      description: "Our proprietary machine learning model analyzes over 50 data points to deliver highly accurate property valuations",
      icon: "🧠"
    },
    {
      title: "Real-Time Data",
      description: "Constantly updated with the latest market trends and property sales to ensure up-to-date predictions",
      icon: "📊"
    },
    {
      title: "Location Intelligence",
      description: "Factors in neighborhood quality, school districts, amenities, and other location-specific variables",
      icon: "📍"
    },
    {
      title: "Comprehensive Analysis",
      description: "Takes into account property features, market conditions, economic indicators, and seasonal trends",
      icon: "📈"
    }
  ];
  
  return (
    <div className="bg-estate-gray py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-estate-blue mb-4">How Our AI Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Smart Estate Forecaster uses cutting-edge artificial intelligence to predict property values with up to 93% accuracy.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-estate-blue mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-2">
              <img 
                src="https://images.unsplash.com/photo-1552960394-c81add8de6b8?auto=format&fit=crop&q=80&w=500&ixlib=rb-4.0.3" 
                alt="Data analysis" 
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="md:col-span-3">
              <h3 className="text-2xl font-bold text-estate-blue mb-4">Powered by Data Science</h3>
              <p className="text-gray-700 mb-6">
                Our model leverages millions of property transactions, public records, and market data points to provide accurate predictions. By continuously learning from new data, our AI improves over time.
              </p>
              <ul className="space-y-3">
                {[
                  "Historical sales data analysis",
                  "Comparable property matching",
                  "Neighborhood trend identification",
                  "Market fluctuation adjustments",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-estate-green text-xl mr-3">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
