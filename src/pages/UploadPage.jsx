import React, { useState } from 'react';
import './UploadPage.css';

const UploadPage = () => {
  const [className, setClassName] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to Array
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 50 * 1024 * 1024; // Max size 50MB

    const invalidFiles = files.filter(
      (file) => !validTypes.includes(file.type) || file.size > maxSize
    );

    if (invalidFiles.length > 0) {
      const errorMessage = invalidFiles
        .map((file) => {
          if (!validTypes.includes(file.type)) {
            return `${file.name}: Invalid type (only PNG, JPG, JPEG allowed).`;
          }
          if (file.size > maxSize) {
            return `${file.name}: File size exceeds 50MB.`;
          }
          return '';
        })
        .join('\n');

      setError(errorMessage);
      setSelectedFiles([]);
    } else {
      setError('');
      setSelectedFiles(files);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!className.trim()) {
      setError('Class name is required.');
      return;
    }

    if (selectedFiles.length === 0) {
      setError('Please upload at least one file.');
      return;
    }

    // Mock upload process
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setClassName('');
      setSelectedFiles([]);
    }, 3000);
  };

  return (
    <main className='uploadContainer'>
      <div className="upload-page">
        <h1>Upload Dataset</h1>
        <p>
          Upload your dataset for classification. Each group of images must belong
          to a specific class. Provide a class name for the images.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="className">Class Name</label>
            <input
              type="text"
              id="className"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Enter class name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fileUpload">Upload Images</label>
            <input
              type="file"
              id="fileUpload"
              onChange={handleFileChange}
              multiple
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>

          {error && <p className="error">{error}</p>}

          {selectedFiles.length > 0 && (
            <div className="file-preview">
              <h3>Selected Files:</h3>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

          <button type="submit" className="submit-btn">
            Upload Dataset
          </button>
        </form>

        {uploadSuccess && (
          <p className="success">
            Dataset successfully uploaded! Preparing the data for processing.
          </p>
        )}
      </div>
    </main>
  );
};

export default UploadPage;