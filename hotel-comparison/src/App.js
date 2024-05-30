import React, { useState } from 'react';
import './App.css';
import 'react-dates/lib/css/_datepicker.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import Login from './Login';
import axios from 'axios';
import LoadingScreen from './LoadingScreen';

const loadingMessages = [
  'iOL Hotel Page Found',
  'Ratehawk Hotel Page Found',
  'iOL Hotel Data Extracted',
  'RateHawk Hotel Data Extracted',
  'Comparison in progress',
  'Comparison Done',
  'Mapping Data to Excel File',
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [file, setFile] = useState(null);
  const [iolUrl, setIolUrl] = useState('');
  const [ratehawkUrl, setRatehawkUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setDownloadLink('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('iolUrl', iolUrl);
    formData.append('ratehawkUrl', ratehawkUrl);

    try {
      const response = await axios.post('http://localhost:5000/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });
      console.log('Response:', response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadLink(url);

      // Update the file state to the new processed file
      const updatedFile = new File([response.data], file.name, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      setFile(updatedFile);

      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing the data.');
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  const isFormComplete = iolUrl && ratehawkUrl && file;

  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-left">
          <img src="https://www.iol.world/iol-edge/product/b2b/assets/images/iol-x-reverse.svg" className="App-logo" alt="iOL X B2B" />
          <span className="App-title">Rate Comparison</span>
        </div>
        <div className="header-right">
          <div className="user-logo">A</div>
          <i className="fas fa-sign-out-alt logout-icon" onClick={handleLogout}></i>
        </div>
      </header>
      <div className="App-content">
        <div className="input-group">
          <label className="input-label">iOL Hotel URL:</label>
          <input 
            type="text" 
            className="input-text-short" 
            value={iolUrl}
            onChange={(e) => setIolUrl(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <label className="input-label">RateHawk Hotel URL:</label>
          <input 
            type="text" 
            className="input-text-short" 
            value={ratehawkUrl}
            onChange={(e) => setRatehawkUrl(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <label className="input-label">Upload your Template file here:</label>
          <div className="file-input-wrapper">
            <label className="input-file-label">
              <input type="file" className="input-file" onChange={handleFileChange} />
              Choose File
            </label>
            {file && (
              <div className="file-details">
                <span className="file-name">{file.name}</span>
                <i className="fas fa-trash-alt delete-icon" onClick={handleFileRemove}></i>
              </div>
            )}
          </div>
        </div>
        {isFormComplete && (
          <button className="start-button" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Comparing...' : 'Compare'}
          </button>
        )}
        {error && <p className="error">{error}</p>}
        {downloadLink && (
          <button className="download-button">
            <a href={downloadLink} download="Rate-Comparison.xlsx" className="download-link">
              Download Rate Comparison Sheet
            </a>
          </button>
        )}
      </div>
      <footer className="App-footer">
        <p>This portal is serviced and managed by iOL X, a division of iOL™</p>
      </footer>

      {loading && (
        <LoadingScreen messages={loadingMessages} />
      )}
    </div>
  );
}

export default App;
