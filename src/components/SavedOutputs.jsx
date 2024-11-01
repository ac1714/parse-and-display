import { useState, useEffect } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const SavedOutputs = () => {
  const [savedOutputs, setSavedOutputs] = useState([]);

  useEffect(() => {
    const loadSavedOutputs = () => {
      const saved = localStorage.getItem('savedOutputs');
      if (saved) {
        setSavedOutputs(JSON.parse(saved));
      }
    };

    loadSavedOutputs();
    window.addEventListener('storage', loadSavedOutputs);
    
    return () => {
      window.removeEventListener('storage', loadSavedOutputs);
    };
  }, []);

  const deleteOutput = (id) => {
    const updatedOutputs = savedOutputs.filter(output => output.id !== id);
    setSavedOutputs(updatedOutputs);
    localStorage.setItem('savedOutputs', JSON.stringify(updatedOutputs));
    toast.success("Output deleted!");
  };

  const copyToClipboard = (data) => {
    const text = `${data.var1}\n${data.var5}\n${data.var4}\n${data.var3}\n${data.var2}`;
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 min-h-[100px]">
      <div className="space-y-4">
        {savedOutputs.map((output) => (
          <div key={output.id} className="bg-white rounded-lg shadow-lg mb-4">
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="w-full p-4 text-left font-medium hover:bg-gray-50">
                {`${output.data.var5} | ${output.data.var3}`}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-6 border-t space-y-4">
                  {[
                    { value: output.data.var1 },
                    { value: output.data.var5 },
                    { value: output.data.var4 },
                    { value: output.data.var3 },
                    { value: output.data.var2 },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 p-4 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        navigator.clipboard.writeText(item.value);
                        toast.success("Copied to clipboard!");
                      }}
                    >
                      <div className="text-gray-900 font-medium break-all">
                        {item.value}
                      </div>
                    </motion.div>
                  ))}
                  <div className="pt-4 border-t flex justify-end gap-2">
                    <Button
                      onClick={() => deleteOutput(output.id)}
                      variant="destructive"
                      className="w-24"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => copyToClipboard(output.data)}
                      className="bg-green-600 hover:bg-green-700 text-white w-24"
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedOutputs;