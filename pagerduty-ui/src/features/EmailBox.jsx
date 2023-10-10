import React, { useState } from 'react';
import ReactQuill from 'react-quill';

function EmailBox() {
  const [content, setContent] = useState('');

  return (
    <div>
      <ReactQuill value={content} onChange={setContent} />
      <button>Send Email</button>
    </div>
  );
}

export default EmailBox;
