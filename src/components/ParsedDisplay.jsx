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
    { value: parsedData.var1 },
    { value: parsedData.var5 },
    { value: parsedData.var4 },
    { value: parsedData.var3 },
    { value: parsedData.var2 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex justify-end mb-4">
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
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-50 p-4 rounded-md"
          >
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