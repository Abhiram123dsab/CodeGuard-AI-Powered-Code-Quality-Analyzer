import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import './App.css';
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
        const errorData = await response.json();
        throw new Error(errorData.detail || `API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      // Transform backend response to match frontend expectations
      const transformedData = {
        score: data.overall_score || 0,
        categories: data.categories?.reduce((acc, category) => ({
          ...acc,
          [category.name.toLowerCase()]: {
            score: category.score,
            issues: category.issues
          }
        }), {}) || {},
        recommendations: data.recommendations?.length 
          ? data.recommendations 
          : ['No specific recommendations available']
      };
      setResults(transformedData);
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