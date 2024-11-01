import TextParser from "@/components/TextParser";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Text Parser Tool
          </h1>
          <p className="text-lg text-gray-600">
            Parse and reformat your tab-separated text data
          </p>
        </div>
        <TextParser />
      </div>
    </div>
  );
};

export default Index;