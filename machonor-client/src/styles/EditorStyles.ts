import { css } from 'styled-components';

const EditorStyle = css`
  pre {
    padding: 10px;
    background-color: #eee;
    white-space: pre-wrap;
  }

  :not(pre) > code {
    font-family: monospace;
    background-color: #eee;
    padding: 3px;
  }

  blockquote {
  border-left: 2px solid #ddd;
  margin-left: 0;
  margin-right: 0;
  padding-left: 10px;
  color: #aaa;
  font-style: italic;
}

  blockquote[dir='rtl'] {
    border-left: none;
    padding-left: 0;
    padding-right: 10px;
    border-right: 2px solid #ddd;
  }

  table {
    border-collapse: collapse;
  }

  td {
    padding: 10px;
    border: 2px solid #ddd;
  }

  input {
    box-sizing: border-box;
    font-size: 0.85em;
    width: 100%;
    padding: 0.5em;
    border: 2px solid #ddd;
    background: #fafafa;
  }

  input:focus {
    outline: 0;
    border-color: blue;
  }

  [data-slate-editor] > * + * {
    margin-top: 1em;
  }
`;

export default EditorStyle;