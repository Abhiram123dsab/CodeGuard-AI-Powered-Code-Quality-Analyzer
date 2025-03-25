import React from 'react';
import { render, screen } from '@testing-library/react';
import ReportVisualization from './ReportVisualization';

describe('ReportVisualization Component', () => {
            const mockReport = {
                overallScore: 85,
                categories: [
                    { name: 'Security', score: 90, issues: 2 },
                    { name: 'Performance', score: 75, issues: 5 }
                ]
            };

            test('renders overall score correctly', () => {
                        render( < ReportVisualization report = { mockReport }
                            />);
                            expect(screen.getByText(/85/)).toBeInTheDocument();
                        });

                    test('displays all quality categories', () => {
                            render( < ReportVisualization report = { mockReport }
                                />);
                                expect(screen.getByText('Security')).toBeInTheDocument(); expect(screen.getByText('Performance')).toBeInTheDocument();
                            });

                        test('shows issue counts for each category', () => {
                                render( < ReportVisualization report = { mockReport }
                                    />);
                                    expect(screen.getByText('2 issues')).toBeInTheDocument(); expect(screen.getByText('5 issues')).toBeInTheDocument();
                                });
                        });