import React from 'react';

const FileUpload = ({ onUpload }) => {
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="upload-container">
      <label className="upload-button">
        Choose Code File
        <input
          type="file"
          accept=".js,.jsx,.py"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
};

export default FileUpload;