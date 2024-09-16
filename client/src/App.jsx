import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './Home'; // Import HomePage component
import UploadFile from './upload';
import DownloadFile from './Download';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/download" element={<DownloadFile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
