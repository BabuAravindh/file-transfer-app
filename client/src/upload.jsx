import { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [code, setCode] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('https://file-transfer-app-s6sb.onrender.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setCode(res.data.code); // Display the generated code
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Upload File</h2>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {code && <p>Use this code to download the file: {code}</p>}
      </div>
    </div>
  );
};

export default UploadFile;
