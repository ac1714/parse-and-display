import { toast } from "sonner";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ParsedOutput = ({ parsedData }) => {
  const items = [
    { value: parsedData.var1 },
    { value: parsedData.var5 },
    { value: parsedData.var4 },
    { value: parsedData.var3 },
    { value: parsedData.var2 },
  ];

  const saveOutput = () => {
    const savedOutputs = JSON.parse(localStorage.getItem('savedOutputs') || '[]');
    const newOutput = {
      id: Date.now(),
      data: { ...parsedData }
    };
    const updatedOutputs = [...savedOutputs, newOutput];
    localStorage.setItem('savedOutputs', JSON.stringify(updatedOutputs));
    toast.success("Output saved!");
  };

  const copyAllToClipboard = () => {
    const text = items.map(item => item.value).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="space-y-3">
        {items.map((item, index) => (
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
      </div>
      <div className="pt-4 border-t flex justify-end gap-2">
        <Button
          onClick={saveOutput}
          variant="outline"
          className="w-24 border-2 border-green-600"
        >
          Save
        </Button>
        <Button
          onClick={copyAllToClipboard}
          className="bg-green-600 hover:bg-green-700 text-white w-24"
        >
          Copy
        </Button>
      </div>
    </div>
  );
};

export default ParsedOutput;