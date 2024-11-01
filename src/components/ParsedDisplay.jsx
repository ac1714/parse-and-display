import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ParsedDisplay = ({ parsedData }) => {
  const copyToClipboard = () => {
    const text = `${parsedData.var1}\n${parsedData.var5}\n${parsedData.var4}\n${parsedData.var3}\n${parsedData.var2}`;
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  if (!parsedData) return null;

  const items = [
    { label: "Variable 1", value: parsedData.var1 },
    { label: "Variable 5", value: parsedData.var5 },
    { label: "Variable 4", value: parsedData.var4 },
    { label: "Variable 3", value: parsedData.var3 },
    { label: "Variable 2", value: parsedData.var2 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Parsed Output</h2>
        <Button
          onClick={copyToClipboard}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Copy All
        </Button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 p-4 rounded-md"
          >
            <div className="text-sm text-gray-500 mb-1">{item.label}</div>
            <div className="text-gray-900 font-medium break-all">
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ParsedDisplay;