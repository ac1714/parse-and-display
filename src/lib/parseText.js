export const parseText = (text) => {
  try {
    const trimmedText = text.trim();
    if (!trimmedText) {
      throw new Error("Input is empty");
    }

    // Split by multiple spaces and filter out empty strings
    const parts = trimmedText.split(/\s+/).filter(Boolean);

    // Ensure we have exactly 5 parts
    if (parts.length < 5) {
      throw new Error("Input must contain exactly 5 parts");
    }

    // First two variables are single words
    const var1 = parts[0];
    const var2 = parts[1];

    // Find the index of var4 (the unique identifier pattern)
    const var4Index = parts.findIndex(part => /^[\w-]+$/.test(part) && part.includes('-'));
    if (var4Index === -1) {
      throw new Error("Could not find the identifier pattern (var4)");
    }

    // Extract var3 (everything between var2 and var4)
    const var3 = parts.slice(2, var4Index).join(" ");
    
    // var4 is the identifier
    const var4 = parts[var4Index];
    
    // var5 is everything after var4
    const var5 = parts.slice(var4Index + 1).join(" ");

    return {
      var1,
      var2,
      var3,
      var4,
      var5,
    };
  } catch (error) {
    throw new Error("Failed to parse input. Please ensure the format is correct.");
  }
};