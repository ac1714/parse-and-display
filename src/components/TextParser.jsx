import { useState } from "react";
import { parseText } from "@/lib/parseText";
import ParsedDisplay from "./ParsedDisplay";
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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Input Text</h2>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Paste your tab/space-separated text here..."
          className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
        />
        <p className="text-sm text-gray-500 mt-2">
          Format: value1 value2 value3 value4 value5 (separated by tabs or spaces)
        </p>
      </div>
      {parsedData && <ParsedDisplay parsedData={parsedData} />}
    </div>
  );
};

export default TextParser;