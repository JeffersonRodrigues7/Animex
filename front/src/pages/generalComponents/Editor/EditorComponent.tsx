import { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "./editorComponentStyles.css";

interface Props {
  setContent: Function;
}

const EditorComponent = ({ setContent }: Props) => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  return (
    <>
      <Editor
        editorStyle={{ height: "150px" }}
        placeholder="Novo comentário"
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={(newState) => {
          setEditorState(newState);
          setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
        }}
        toolbar={{
          options: ["inline", "fontSize", "textAlign"],
          inline: {
            options: ["bold", "italic", "underline"],
            bold: { className: "bordered-option-classname" },
            italic: { className: "bordered-option-classname" },
            underline: { className: "bordered-option-classname" },
          },
          fontSize: {
            className: "bordered-option-classname",
          },
          textAlign: {
            inDropdown: false,
            className: undefined,
            component: undefined,
            dropdownClassName: undefined,
            options: ["left", "center", "right", "justify"],
            left: { className: undefined },
            center: { className: undefined },
            right: { className: undefined },
            justify: { className: undefined },
          },
        }}
      />
    </>
  );
};

export default EditorComponent;
