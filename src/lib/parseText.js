export const parseText = (text) => {
  try {
    // First, ensure we have input
    const trimmedText = text.trim();
    if (!trimmedText) {
      throw new Error("Input is empty");
    }

    // Match exactly 5 parts, allowing multiple spaces between parts and spaces within parts
    const matches = trimmedText.match(/^(\S+)\s+(\S+)\s+([^\s](?:.*?[^\s])?)\s+(\S+)\s+(.+?)$/);
    
    if (!matches) {
      throw new Error("Input must contain exactly 5 parts separated by spaces or tabs");
    }

    // matches[0] is the full string, so we start from index 1
    return {
      var1: matches[1],
      var2: matches[2],
      var3: matches[3],
      var4: matches[4],
      var5: matches[5].trim(),
    };
  } catch (error) {
    throw new Error("Failed to parse input. Please ensure the format is correct.");
  }
};