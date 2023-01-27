const buildTextPromptForEditSubmit = (undoHistory) => {
  // Item exists in prompt undoHistory
  console.warn('EDIT SUBMIT');
  if (undoHistory.length > 0) {
    const newPromptWithHistory = [
      // promptTaskDescriptionAndTenSeparateExamples,
      // `[Instruction]: ${undoHistory[undoHistory.length - 1].prompt}\n`,
      `${undoHistory[undoHistory.length - 1].completion}`,
      // `[Instruction]: ${promptInput}\n`,
      // '[Code]:',
    ].join('');

    console.log('Has undoHistory -> newPromptWithHistory:');
    console.log(newPromptWithHistory);
    return newPromptWithHistory;
  }

  // No item exists in prompt undoHistory
  const newPromptWithoutHistory = [
    // promptTaskDescriptionAndTenSeparateExamples,
    // `<button style="background-color: green; color: white; padding: 0.5rem;">Sign up</button>`,
    // `[Instruction]: ${promptInput}\n`,
    // '[Code]:',
  ].join('');

  console.log('No undoHistory -> newPromptWithoutHistory:');
  console.log(newPromptWithoutHistory);
  return newPromptWithoutHistory;
};

export default buildTextPromptForEditSubmit;
