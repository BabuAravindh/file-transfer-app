import { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const DownloadFile = () => {
  const [code, setCode] = useState('');

  const handleDownload = async () => {
    try {
      const res = await axios.get(`https://file-transfer-app-s6sb.onrender.com/download/${code}`, {
        responseType: 'blob', // Ensure binary data is handled properly
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); // Change the file name if necessary
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Download failed', error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Download File</h2>
        <input
          type="text"
          placeholder="Enter code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default DownloadFile;
