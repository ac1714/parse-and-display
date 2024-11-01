export const parseText = (text) => {
  try {
    // First, ensure we have input
    const trimmedText = text.trim();
    if (!trimmedText) {
      throw new Error("Input is empty");
    }

    // Split by multiple spaces and filter out empty strings
    const parts = trimmedText.split(/\s+/).filter(Boolean);

    // Ensure we have at least 5 parts
    if (parts.length < 5) {
      throw new Error("Input must contain at least 5 parts separated by spaces or tabs");
    }

    // First two parts are single words
    const var1 = parts[0];
    const var2 = parts[1];

    // For parts 3-5, we need to handle special cases
    // We know the fourth part is a single word (jdkfs8f-jksdfjs0-sdjf)
    // So we can use it as a delimiter to split the remaining content correctly
    const remainingText = parts.slice(2).join(" ");
    const fourthVarIndex = remainingText.lastIndexOf(parts[parts.length - 2]);
    const beforeFourthVar = remainingText.substring(0, fourthVarIndex).trim();
    const afterFourthVar = remainingText.substring(fourthVarIndex + parts[parts.length - 2].length).trim();

    return {
      var1,
      var2,
      var3: beforeFourthVar,
      var4: parts[parts.length - 2],
      var5: afterFourthVar,
    };
  } catch (error) {
    throw new Error("Failed to parse input. Please ensure the format is correct.");
  }
};