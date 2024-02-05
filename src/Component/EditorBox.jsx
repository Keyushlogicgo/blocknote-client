// EditorBox.jsx
import React from "react";
import { BlockNoteView, useBlockNote } from "@blocknote/react";

import { Button, Col, Row } from "react-bootstrap";

const uploadToTmpFilesDotOrg_DEV_ONLY = async (file) => {
  const body = new FormData();
  body.append("file", file);

  const ret = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: body,
  });
  return (await ret.json()).data.url.replace(
    "tmpfiles.org/",
    "tmpfiles.org/dl/"
  );
};

const EditorBox = () => {
  const editor = useBlockNote({
    uploadFile: uploadToTmpFilesDotOrg_DEV_ONLY,
  });

  const handleSubmit = () => {
    console.log(editor.domElement);
  };

  return (
    <div className="container">
      <Row className="pt-5">
        <Col xs={12}>
          <BlockNoteView
            className="w-100 h-100"
            editor={editor}
            theme="light"
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </Col>
      </Row>
    </div>
  );
};

export default EditorBox;
