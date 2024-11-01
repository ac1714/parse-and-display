export const parseText = (text) => {
  try {
    // Split by multiple spaces or tabs and filter out empty strings
    const parts = text.trim().split(/[\s\t]+/).filter(Boolean);
    
    if (parts.length !== 5) {
      throw new Error("Input must contain exactly 5 parts separated by spaces or tabs");
    }

    return {
      var1: parts[0],
      var2: parts[1],
      var3: parts[2],
      var4: parts[3],
      var5: parts[4],
    };
  } catch (error) {
    throw new Error("Failed to parse input. Please ensure the format is correct.");
  }
};