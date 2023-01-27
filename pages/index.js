/* eslint-disable react/no-danger */
import { html } from '@codemirror/lang-html';
import {
  faArrowRotateLeft,
  faArrowRotateRight,
  faCircleNotch,
  faCode,
  faMicrophone,
  faPlay,
  faRotate,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { atomone } from '@uiw/codemirror-theme-atomone';
import CodeMirror from '@uiw/react-codemirror';
import { useCallback, useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import fetchCompletion from '../adapters/fetchCompletion';
// import parse from 'html-react-parser';
import fetchEdit from '../adapters/fetchEdit';
import Button from '../components/Button';
import { CustomEditorTheme, CustomEditorView } from '../components/CodeEditor';
import Head from '../components/Head';
import ApiListbox from '../components/ListBox';
import Layout from '../components/PageLayout';
import apis from '../data/apis';
import buildTextPromptForResubmit from '../util/buildTextPromptForResubmit';
import buildTextPromptForSubmit from '../util/buildTextPromptForSubmit';

const Home = () => {
  const [isLightModeUsed, setIsLightModeUsed] = useState(true);
  const [promptInput, setPromptInput] = useState('');
  const [undoHistory, setUndoHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [isFetchingSubmit, setIsFetchingSubmit] = useState(false);
  const [isFetchingResubmit, setIsFetchingResubmit] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [selectedApi, setSelectedApi] = useState(apis[0]);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({
      continuous: true,
      language: 'en-US',
    });

  useEffect(() => {
    const cssProperty = '(prefers-color-scheme: light)';

    setIsLightModeUsed(window.matchMedia(cssProperty).matches);

    window.matchMedia(cssProperty).addEventListener('change', (event) => {
      setIsLightModeUsed(event.matches);
    });

    return () => {
      window.matchMedia(cssProperty).removeEventListener('change', () => {});
    };
  }, []);

  useEffect(() => {
    console.log('undoHistory:', undoHistory);
    console.log('redoHistory:', redoHistory);
  }, [undoHistory, redoHistory]);

  useEffect(() => {
    if (listening && transcript) {
      setPromptInput(transcript);
      // console.log(transcript);
    }
  }, [transcript, listening]);

  // useEffect(() => {
  //   if (undoHistory.length > 0) {
  //     renderedHtmlDiv.innerHTML = undoHistory[undoHistory.length - 1].completion;
  //   }
  // }, [undoHistory]);

  // const cleaningAfterDataWasFetched = () => {
  //   setRedoHistory([]); // delete redo history
  //   setPromptInput(''); // remove text from input field
  //   resetTranscript();
  // };

  const updateUndoHistory = (prompt, completion) => {
    const undoHistoryWithNewEntry = [
      ...undoHistory,
      {
        id: undoHistory.length + 1,
        prompt,
        completion,
      },
    ];

    setUndoHistory(undoHistoryWithNewEntry);
  };

  const handleFetchedSubmitData = (fetchedData) => {
    if (Object.prototype.hasOwnProperty.call(fetchedData, 'completion')) {
      updateUndoHistory(promptInput, fetchedData.completion); // add new entry to undoHistory
      setRedoHistory([]); // delete redo history
      setPromptInput(''); // remove text from input field
    } else if (Object.prototype.hasOwnProperty.call(fetchedData, 'error')) {
      console.error(fetchedData.error);
    } else {
      console.error('API response data is not valid');
    }
  };

  const handleFetchedResubmitData = (fetchedData) => {
    if (Object.prototype.hasOwnProperty.call(fetchedData, 'completion')) {
      const lastItemOfUndoHistory = undoHistory.pop();
      updateUndoHistory(lastItemOfUndoHistory.prompt, fetchedData.completion); // add new entry to undoHistory
      setRedoHistory([]); // delete redo history
    } else if (Object.prototype.hasOwnProperty.call(fetchedData, 'error')) {
      console.error(fetchedData.error);
    } else {
      console.error('API response data is not valid');
    }
  };

  //
  // Button functions
  //

  const onSubmitButtonClick = async () => {
    let data = {};
    // const prompt = buildTextPromptForSubmit(undoHistory, promptInput);

    setIsFetchingSubmit(true);

    if (undoHistory.length > 0 && selectedApi.name === 'GPT-3') {
      console.warn('COMPLETION');
      const lastCompletion = `${undoHistory[undoHistory.length - 1].completion}`;
      data = await fetchEdit(lastCompletion, promptInput, 'gpt3-davinci-edit');
    } else {
      console.warn('COMPLETION');
      const prompt = buildTextPromptForSubmit(undoHistory, promptInput);
      data = await fetchCompletion(prompt, selectedApi.endpointUrl);
    }
    // const data = await fetchCompletion(prompt, selectedApi.endpointUrl);

    await handleFetchedSubmitData(data);
    setIsFetchingSubmit(false);

    resetTranscript();
  };

  const onResubmitButtonClick = async () => {
    let data = {};
    // const prompt = buildTextPromptForResubmit(undoHistory);

    setIsFetchingResubmit(true);

    if (undoHistory.length > 0 && selectedApi.name === 'GPT-3') {
      console.warn('COMPLETION');
      const lastCompletion = `${undoHistory[undoHistory.length - 1].completion}`;
      const lastInput = `${undoHistory[undoHistory.length - 1].prompt}`;
      data = await fetchEdit(lastCompletion, lastInput, 'gpt3-davinci-edit');
    } else {
      console.warn('COMPLETION');
      const prompt = buildTextPromptForResubmit(undoHistory);
      data = await fetchCompletion(prompt, selectedApi.endpointUrl);
    }

    // const data = await fetchCompletion(prompt, selectedApi.endpointUrl);

    await handleFetchedResubmitData(data);
    setIsFetchingResubmit(false);

    resetTranscript();
  };

  const onUndoButtonClick = () => {
    const lastItemOfUndoHistory = undoHistory.pop();
    const redoHistoryWithNewEntry = [lastItemOfUndoHistory, ...redoHistory];
    setRedoHistory(redoHistoryWithNewEntry);
  };

  const onRedoButtonClick = () => {
    const firstItemOfRedoHistory = redoHistory.shift();
    const undoHistoryWithNewEntry = [...undoHistory, firstItemOfRedoHistory];
    setUndoHistory(undoHistoryWithNewEntry);
  };

  const onResetButtonClick = () => {
    setUndoHistory([]);
    setRedoHistory([]);
    setPromptInput('');
    resetTranscript();
  };

  const onEditorChange = useCallback(
    (value, viewUpdate) => {
      console.log('Editor content:', value);
      if (undoHistory.length > 0) {
        const lastItemOfUndoHistory = undoHistory.pop();
        updateUndoHistory(lastItemOfUndoHistory.prompt, value); // add new entry to undoHistory
        // setRedoHistory([]); // delete redo history
      }
    },
    [undoHistory, updateUndoHistory]
  );

  // const onSpeechButtonEnd = () => {
  //   SpeechRecognition.stopListening;
  //   resetTranscript();
  // };

  return (
    <Layout>
      <Head />

      {/* Web/Code view */}
      <div className="w-full flex-auto overflow-scroll">
        {isCodeVisible ? (
          <>
            {/* Generated Code - Container */}
            <div className="mb-64 p-5 md:p-8">
              <span className="block text-xl font-bold text-neutral-400">
                <code>Code view</code>
              </span>
              <div className="mt-2 block">
                {/* <code className="whitespace-pre-wrap">
                  {undoHistory.length > 0 ? undoHistory[undoHistory.length - 1].completion : null}
                </code> */}
                <CodeMirror
                  value={
                    undoHistory.length > 0 ? undoHistory[undoHistory.length - 1].completion : ''
                  }
                  // minHeight="100vh"
                  // height="200px"
                  theme={isLightModeUsed ? 'light' : atomone}
                  onChange={onEditorChange}
                  // placeholder="Your generated code will be displayed here."
                  extensions={[html({ htmlMode: true }), CustomEditorTheme, CustomEditorView]}
                  basicSetup={{
                    drawSelection: false,
                    bracketMatching: false,
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Generated web content - Container */}
            <div className="mb-64 bg-white dark:bg-neutral-900">
              <div
                // className="h-[1000px]"
                // id="renderedHtmlDiv"
                // ref={renderedHtmlDiv}
                dangerouslySetInnerHTML={
                  undoHistory.length > 0
                    ? { __html: undoHistory[undoHistory.length - 1].completion }
                    : { __html: '' }
                }
              >
                {/* {parse(undoHistory.length > 0 ? undoHistory[undoHistory.length - 1].completion : '')} */}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Input - Card */}
      <div className="fixed bottom-4 left-1/2 flex h-56 w-full max-w-4xl -translate-x-1/2 flex-col rounded-3xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800 md:p-5">
        {/* Two rows container */}
        <div className="flex flex-1 flex-col">
          {/* Textarea & Speech button */}
          <div className="flex flex-1 space-x-2">
            {/* Textarea */}
            <textarea
              className="block w-full flex-1 resize-none text-xl placeholder-neutral-400 outline-0 first-line:overflow-auto dark:bg-neutral-800 dark:placeholder-neutral-500 md:text-xl"
              // maxLength="256"
              // rows="2"
              value={promptInput}
              placeholder="Write your instructions"
              onChange={(e) => setPromptInput(e.target.value)}
            />

            {/* Speech button */}
            <Button
              variant="speech"
              // onClick={startListening}
              onTouchStart={startListening}
              onMouseDown={startListening}
              onTouchEnd={SpeechRecognition.stopListening}
              onMouseUp={SpeechRecognition.stopListening}
              disabled={isFetchingSubmit || isFetchingResubmit}
            >
              {listening ? (
                <>
                  <FontAwesomeIcon icon={faMicrophone} className="fa-beat text-2xl" />
                  {/* <span className="">Listening</span> */}
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faMicrophone} className="text-2xl" />
                  {/* <span className="">Voice</span> */}
                </>
              )}
            </Button>
          </div>

          {/* Bottom row */}
          <div className="items-end sm:flex sm:justify-between">
            {/* Bottom left row */}
            <div className="mt-2 flex flex-wrap gap-3">
              {/* Submit button */}
              <Button
                variant="submit"
                onClick={onSubmitButtonClick}
                disabled={isFetchingSubmit || isFetchingResubmit || !promptInput || listening}
              >
                {isFetchingSubmit ? (
                  <>
                    <FontAwesomeIcon icon={faCircleNotch} className="fa-spin text-2xl" />
                    <span className="">Loading</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPlay} className="text-2xl" />
                    <span className="">Submit</span>
                  </>
                )}
              </Button>

              {/* Resubmit button */}
              <Button
                variant="resubmit"
                onClick={onResubmitButtonClick}
                disabled={
                  isFetchingSubmit || isFetchingResubmit || !undoHistory.length || listening
                }
              >
                {isFetchingResubmit ? (
                  <>
                    <FontAwesomeIcon icon={faRotate} className="fa-spin text-xl" />
                    {/* <span className="">Loading</span> */}
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faRotate} className="text-xl" />
                    {/* <span className="">Submit</span> */}
                  </>
                )}
              </Button>

              {/* Undo button */}
              <Button
                variant="undo"
                onClick={onUndoButtonClick}
                disabled={isFetchingSubmit || !undoHistory.length}
              >
                <FontAwesomeIcon icon={faArrowRotateLeft} className="text-xl" />
              </Button>

              {/* Redo button */}
              <Button
                variant="redo"
                onClick={onRedoButtonClick}
                disabled={isFetchingSubmit || !redoHistory.length}
              >
                <FontAwesomeIcon icon={faArrowRotateRight} className="text-xl" />
              </Button>

              {/* Reset button */}
              <Button
                variant="reset"
                onClick={onResetButtonClick}
                disabled={
                  isFetchingSubmit || (!promptInput && !undoHistory.length && !redoHistory.length)
                }
              >
                <FontAwesomeIcon icon={faTrash} className="text-xl" />
              </Button>

              {/* Web/Code toggle button */}
              <button
                // variant="code"
                className={`h-14 w-14 rounded-xl border px-5 py-3 font-bold ${
                  isCodeVisible
                    ? 'border-neutral-600 bg-neutral-500 text-white shadow-inner shadow-neutral-700 hover:border-neutral-500 hover:bg-neutral-400 hover:text-white hover:shadow-neutral-600'
                    : 'border-neutral-300 bg-neutral-100 text-neutral-700 hover:border-neutral-500 hover:bg-neutral-300 hover:text-neutral-900'
                }`}
                type="button"
                onClick={() => setIsCodeVisible(!isCodeVisible)}
              >
                <div className="flex items-center justify-center space-x-3">
                  <FontAwesomeIcon icon={faCode} className="text-xl" />
                </div>
              </button>
            </div>

            {/* Bottom right row */}
            <div className="flex flex-wrap items-end gap-4">
              {/* API Listbox */}
              <div className="mt-2 w-56">
                <ApiListbox options={apis} selected={selectedApi} setSelected={setSelectedApi} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
