import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ParsedDisplay = ({ parsedData }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    });
  };

  const copyAllToClipboard = () => {
    const text = `${parsedData.var1}\n${parsedData.var5}\n${parsedData.var4}\n${parsedData.var3}\n${parsedData.var2}`;
    copyToClipboard(text);
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
      <div className="pt-4 border-t">
        <Button
          onClick={copyAllToClipboard}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full"
        >
          Copy All
        </Button>
      </div>
    </div>
  );
};

export default ParsedDisplay;