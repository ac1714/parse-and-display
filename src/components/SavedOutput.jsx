import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "sonner";

const SavedOutput = ({ output, onDelete, onCopy }) => (
  <div className="bg-white rounded-lg shadow-lg mb-4">
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
              onClick={onDelete}
              variant="destructive"
              className="w-24"
            >
              Delete
            </Button>
            <Button
              onClick={onCopy}
              className="bg-green-600 hover:bg-green-700 text-white w-24"
            >
              Copy
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
);

export default SavedOutput;