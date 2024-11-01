import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useEffect, useState } from "react";

const ParsedDisplay = ({ parsedData }) => {
  const [savedOutputs, setSavedOutputs] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedOutputs');
    if (saved) {
      setSavedOutputs(JSON.parse(saved));
    }
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  const copyAllToClipboard = () => {
    const text = `${parsedData.var1}\n${parsedData.var5}\n${parsedData.var4}\n${parsedData.var3}\n${parsedData.var2}`;
    copyToClipboard(text);
  };

  const saveOutput = () => {
    const newOutput = {
      id: Date.now(),
      data: { ...parsedData }
    };
    const updatedOutputs = [...savedOutputs, newOutput];
    setSavedOutputs(updatedOutputs);
    localStorage.setItem('savedOutputs', JSON.stringify(updatedOutputs));
    toast.success("Output saved!");
  };

  const deleteOutput = (id) => {
    const updatedOutputs = savedOutputs.filter(output => output.id !== id);
    setSavedOutputs(updatedOutputs);
    localStorage.setItem('savedOutputs', JSON.stringify(updatedOutputs));
    toast.success("Output deleted!");
  };

  const renderOutputItems = (items) => (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-50 p-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => copyToClipboard(item.value)}
        >
          <div className="text-gray-900 font-medium break-all">
            {item.value}
          </div>
        </motion.div>
      ))}
    </div>
  );

  const items = parsedData ? [
    { value: parsedData.var1 },
    { value: parsedData.var5 },
    { value: parsedData.var4 },
    { value: parsedData.var3 },
    { value: parsedData.var2 },
  ] : [];

  return (
    <div className="space-y-4">
      {parsedData && (
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          {renderOutputItems(items)}
          <div className="pt-4 border-t flex justify-end gap-2">
            <Button
              onClick={saveOutput}
              variant="outline"
              className="w-24 border-2 border-gray-400"
            >
              Save
            </Button>
            <Button
              onClick={copyAllToClipboard}
              className="bg-blue-600 hover:bg-blue-700 text-white w-24"
            >
              Copy
            </Button>
          </div>
        </div>
      )}

      {savedOutputs.length > 0 && (
        <Collapsible className="bg-white rounded-lg shadow-lg">
          <CollapsibleTrigger className="w-full p-4 text-left font-medium hover:bg-gray-50">
            {savedOutputs.map(output => `${output.data.var5} | ${output.data.var3}`).join(", ")}
          </CollapsibleTrigger>
          <CollapsibleContent>
            {savedOutputs.map((output) => (
              <div key={output.id} className="p-6 border-t space-y-4">
                {renderOutputItems([
                  { value: output.data.var1 },
                  { value: output.data.var5 },
                  { value: output.data.var4 },
                  { value: output.data.var3 },
                  { value: output.data.var2 },
                ])}
                <div className="pt-4 border-t flex justify-end gap-2">
                  <Button
                    onClick={() => deleteOutput(output.id)}
                    variant="destructive"
                    className="w-24"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => copyAllToClipboard(output.data)}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-24"
                  >
                    Copy
                  </Button>
                </div>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
};

export default ParsedDisplay;