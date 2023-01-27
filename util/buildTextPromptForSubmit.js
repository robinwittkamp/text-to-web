import { promptTaskDescriptionAndTenSeparateExamples } from '../data/prompts/textPrompts';

const buildHtmlPromptForSubmit = (undoHistory, promptInput) => {
  // Item exists in prompt undoHistory
  console.warn('SUBMIT');
  if (undoHistory.length > 0) {
    const newPromptWithHistory = [
      promptTaskDescriptionAndTenSeparateExamples,
      `[Instruction]: ${undoHistory[undoHistory.length - 1].prompt}\n`,
      `[Code]: ${undoHistory[undoHistory.length - 1].completion}\n`,
      `[Instruction]: ${promptInput}\n`,
      '[Code]:',
    ].join('');

    console.log('Has undoHistory -> newPromptWithHistory:');
    console.log(newPromptWithHistory);
    return newPromptWithHistory;
  }

  // No item exists in prompt undoHistory
  const newPromptWithoutHistory = [
    promptTaskDescriptionAndTenSeparateExamples,
    `[Instruction]: ${promptInput}\n`,
    '[Code]:',
  ].join('');

  console.log('No undoHistory -> newPromptWithoutHistory:');
  console.log(newPromptWithoutHistory);
  return newPromptWithoutHistory;
};

export default buildHtmlPromptForSubmit;
