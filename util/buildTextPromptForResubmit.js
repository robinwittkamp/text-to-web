import { promptTaskDescriptionAndTenSeparateExamples } from '../data/prompts/textPrompts';

const buildTextPromptForResubmit = (undoHistory) => {
  // Item exists in prompt undoHistory
  console.warn('RESUBMIT');
  if (undoHistory.length > 1) {
    const newPromptWithTwoItemHistory = [
      promptTaskDescriptionAndTenSeparateExamples,
      `[Instruction]: ${undoHistory[undoHistory.length - 2].prompt}\n`,
      `[Code]: ${undoHistory[undoHistory.length - 2].completion}\n`,
      `[Instruction]: ${undoHistory[undoHistory.length - 1].prompt}\n`,
      '[Code]:',
    ].join('');

    console.log('Has undoHistory -> newPromptWithTwoItemHistory:');
    console.log(newPromptWithTwoItemHistory);
    return newPromptWithTwoItemHistory;
  }

  // No item exists in prompt undoHistory
  const newPromptWithOneItemHistory = [
    promptTaskDescriptionAndTenSeparateExamples,
    `[Instruction]: ${undoHistory[undoHistory.length - 1].prompt}\n`,
    '[Code]:',
  ].join('');

  console.log('Has undoHistory -> newPromptWithOneItemHistory:');
  console.log(newPromptWithOneItemHistory);
  return newPromptWithOneItemHistory;
};

export default buildTextPromptForResubmit;
