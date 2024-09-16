
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1>File Transfer App</h1>
      <div className="button-container">
        <Link to="/upload" className="homepage-btn upload-btn">
          Upload File
        </Link>
        <Link to="/download" className="homepage-btn download-btn">
          Download File
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
