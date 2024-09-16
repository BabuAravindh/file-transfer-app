
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import UploadFile from './upload';
import DownloadFile from './Download';
import './App.css'

const App = () => {
  return (
  <BrowserRouter>
   <Routes>
    <Route path='/upload' element={<UploadFile/>}/>
    <Route path='/download' element={<DownloadFile/>}/>
   </Routes>
  </BrowserRouter>
  );
};

export default App;
