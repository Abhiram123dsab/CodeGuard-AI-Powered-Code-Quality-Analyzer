import React from 'react';

const ScoreDisplay = ({ results }) => {
  if (!results?.categories) return (
    <div className="error-message">
      <p>No analysis data available</p>
    </div>
  );

  const { score, categories, recommendations = [] } = results;

  // Function to determine score color class based on score value
  const getScoreColorClass = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 50) return 'score-medium';
    return 'score-low';
  };

  // Get the best and worst categories
  const categoryEntries = Object.entries(categories);
  const validEntries = categoryEntries.filter(([_, data]) => data?.score !== undefined);
  const bestCategory = validEntries.length > 0 
    ? validEntries.sort((a, b) => (b[1].score || 0) - (a[1].score || 0))[0] 
    : ['No Data', { score: 0 }];
  const worstCategory = validEntries.length > 0 
    ? validEntries.sort((a, b) => (a[1].score || 0) - (b[1].score || 0))[0]
    : ['No Data', { score: 0 }];

  return (
    <div className="results-container">
      {/* Score Overview Section */}
      <div className="score-overview">
        <div className="overall-score-container">
          <div 
            className="overall-score-circle" 
            style={{'--progress-width': `${score}%`}}
          >
            <span className="overall-score-value">{score}</span>
          </div>
          <div>Overall Score</div>
        </div>
        
        <div className="score-summary">
          <h2>Code Analysis Results</h2>
          <p>Your code has been analyzed across multiple quality dimensions.</p>
          
          <div className="summary-highlights">
            <div className="highlight-item">
              <span className="highlight-label">Strongest Area:</span>
              <span className={`highlight-value ${getScoreColorClass(bestCategory[1].score)}`}>
                {bestCategory[0].replace(/_/g, ' ').toUpperCase()} ({bestCategory[1]?.score ?? 0})
              </span>
            </div>
            
            <div className="highlight-item">
              <span className="highlight-label">Needs Improvement:</span>
              <span className={`highlight-value ${getScoreColorClass(worstCategory[1].score)}`}>
                {worstCategory[0].replace(/_/g, ' ').toUpperCase()} ({worstCategory[1]?.score ?? 0})
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Breakdown */}
      <h3>Category Breakdown</h3>
      <div className="category-grid">
        {Object.entries(categories).map(([category, data]) => {
          const scoreColorClass = getScoreColorClass(data?.score || 0);
          
          return (
            <div key={category} className="category-card">
              <h3>{category.replace(/_/g, ' ').toUpperCase()}</h3>
              
              <div className="score-meter-container">
                <div className="score-value">
                  <span className={scoreColorClass}>{data?.score ?? 0}/100</span>
                </div>
                <div className="score-meter" style={{'--score': data?.score || 0 }}></div>
              </div>
              
              <div className="category-details">
                <div className="issues-count">
                  <span className="issues-label">Issues Found:</span>
                  <span className="issues-value">{data?.issues ?? 'N/A'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendations */}
      <div className="recommendations">
        <h3>Recommendations to Improve Your Code</h3>
        {recommendations?.length > 0 ? (
          <div>
            {recommendations.map((rec, index) => (
              <div key={index} className="recommendation-item">
                <div className="recommendation-icon">💡</div>
                <div className="recommendation-text">{rec}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-recommendations">
            No specific recommendations - your code looks great!
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreDisplay;