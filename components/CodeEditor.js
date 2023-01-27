import { EditorView } from '@codemirror/view';

const FontSizeTheme = EditorView.theme({
  '&': {
    fontSize: '1.125rem',
  },
  '&.cm-editor.cm-focused': {
    outline: '0',
  },
});

export const CustomEditorTheme = [FontSizeTheme];

export const CustomEditorView = EditorView.lineWrapping;
