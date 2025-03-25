import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ScoreDisplay from './components/ScoreDisplay';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);
    
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);
      
      // Send the file to the backend API
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'An error occurred during file analysis');
      console.error('Error uploading file:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>CodeGuard - Code Quality Analyzer</h1>
      <p>Upload your code file to analyze its quality and get recommendations for improvement.</p>
      
      <FileUpload onUpload={handleFileUpload} />
      
      {loading && (
        <div className="loading-indicator">
          <p>Analyzing your code...</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      {results && !loading && !error && (
        <ScoreDisplay results={results} />
      )}
    </div>
  );
}

export default App;