import { useState } from "react";
import { parseText } from "@/lib/parseText";
import ParsedOutput from "./ParsedOutput";
import SavedOutputs from "./SavedOutputs";
import { toast } from "sonner";

const TextParser = () => {
  const [input, setInput] = useState("");
  const [parsedData, setParsedData] = useState(null);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    try {
      if (e.target.value.trim()) {
        const parsed = parseText(e.target.value);
        setParsedData(parsed);
      } else {
        setParsedData(null);
      }
    } catch (error) {
      toast.error(error.message);
      setParsedData(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <input
          value={input}
          onChange={handleInputChange}
          className="w-full h-10 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Enter text to parse..."
        />
      </div>
      
      {parsedData && <ParsedOutput parsedData={parsedData} />}
      <SavedOutputs />
    </div>
  );
};

export default TextParser;