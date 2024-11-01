import { toast } from "sonner";
import { useEffect, useState } from "react";
import OutputDisplay from "./OutputDisplay";
import SavedOutput from "./SavedOutput";

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

  const copyAllToClipboard = (data = parsedData) => {
    const text = `${data.var1}\n${data.var5}\n${data.var4}\n${data.var3}\n${data.var2}`;
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

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {savedOutputs.length > 0 && (
          <h2 className="text-lg font-semibold text-gray-900">Saved Outputs</h2>
        )}
        {savedOutputs.map((output) => (
          <SavedOutput
            key={output.id}
            output={output}
            onDelete={() => deleteOutput(output.id)}
            onCopy={() => copyAllToClipboard(output.data)}
          />
        ))}
      </div>

      {parsedData && (
        <OutputDisplay 
          items={[
            { value: parsedData.var1 },
            { value: parsedData.var5 },
            { value: parsedData.var4 },
            { value: parsedData.var3 },
            { value: parsedData.var2 },
          ]}
          onSave={saveOutput}
          onCopyAll={() => copyAllToClipboard()}
        />
      )}
    </div>
  );
};

export default ParsedDisplay;