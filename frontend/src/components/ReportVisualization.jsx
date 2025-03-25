import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

export default function ReportVisualization({ analysisData }) {
  const processData = (data) => ({
    categories: Object.entries(data.categories).map(([name, values]) => ({
      name,
      score: values.score,
      issues: values.issues
    })),
    overall: data.overall_score
  });

  const chartData = processData(analysisData);

  return (
    <div className="report-visualization mt-4">
      <h3 className="mb-4">Visual Analysis Report</h3>
      
      <div className="row mb-4">
        <div className="col-md-6">
          <h5>Category Scores</h5>
          <BarChart width={500} height={300} data={chartData.categories}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#8884d8" />
          </BarChart>
        </div>

        <div className="col-md-6">
          <h5>Quality Radar</h5>
          <RadarChart outerRadius={90} width={500} height={300} data={chartData.categories}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </div>
      </div>

      <div className="text-center">
        <div className="overall-score">
          <h4>Overall Code Quality Score</h4>
          <div className="display-4 text-primary">
            {chartData.overall}/100
          </div>
        </div>
      </div>
    </div>
  );
}