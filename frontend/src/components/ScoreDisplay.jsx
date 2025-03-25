import React from 'react';

const ScoreDisplay = ({ results }) => {
  // Use the actual results from the API
  const { overall_score, categories, recommendations } = results;

  // Function to determine score color class based on score value
  const getScoreColorClass = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 50) return 'score-medium';
    return 'score-low';
  };

  // Get the best and worst categories
  const categoryEntries = Object.entries(categories);
  const bestCategory = [...categoryEntries].sort((a, b) => b[1].score - a[1].score)[0];
  const worstCategory = [...categoryEntries].sort((a, b) => a[1].score - b[1].score)[0];

  return (
    <div className="results-container">
      {/* Score Overview Section */}
      <div className="score-overview">
        <div className="overall-score-container">
          <div 
            className="overall-score-circle" 
            style={{'--progress': `${overall_score}%`}}
          >
            <span className="overall-score-value">{overall_score}</span>
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
                {bestCategory[0].replace('_', ' ').toUpperCase()} ({bestCategory[1].score})
              </span>
            </div>
            
            <div className="highlight-item">
              <span className="highlight-label">Needs Improvement:</span>
              <span className={`highlight-value ${getScoreColorClass(worstCategory[1].score)}`}>
                {worstCategory[0].replace('_', ' ').toUpperCase()} ({worstCategory[1].score})
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Breakdown */}
      <h3>Category Breakdown</h3>
      <div className="category-grid">
        {Object.entries(categories).map(([category, data]) => {
          const scoreColorClass = getScoreColorClass(data.score);
          
          return (
            <div key={category} className="category-card">
              <h3>{category.replace('_', ' ').toUpperCase()}</h3>
              
              <div className="score-meter-container">
                <div className="score-value">
                  <span className={scoreColorClass}>{data.score}/100</span>
                </div>
                <div className="score-meter" style={{'--score': data.score}}></div>
              </div>
              
              <div className="category-details">
                <div className="issues-count">
                  <span className="issues-label">Issues Found:</span>
                  <span className="issues-value">{data.issues}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recommendations */}
      <div className="recommendations">
        <h3>Recommendations to Improve Your Code</h3>
        {recommendations.length > 0 ? (
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