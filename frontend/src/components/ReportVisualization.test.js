import React from 'react';
import { render, screen } from '@testing-library/react';
import ReportVisualization from './ReportVisualization';
import { describe, test, expect } from '@jest/globals';

describe('ReportVisualization Component', () => {
            const mockReport = {
                overall_score: 85,
                categories: {
                    code_quality: {
                        score: 90,
                        issues: 2,
                        name: 'code_quality'
                    },
                    code_style: {
                        score: 75,
                        issues: 5,
                        name: 'code_style'
                    }
                }
            };

            test('renders overall score correctly', async() => {
                        render( < ReportVisualization analysisData = { mockReport }
                            />);
                            // @ts-ignore
                            const scoreElement = await screen.findByText('85/100'); expect(scoreElement).toBeInTheDocument();
                        });

                    test('displays all quality categories', async() => {
                            render( < ReportVisualization analysisData = { mockReport }
                                />);
                                const securityElement = await screen.findByText('SECURITY');
                                const performanceElement = await screen.findByText('PERFORMANCE');

                                // @ts-ignore
                                expect(securityElement).toBeInTheDocument(); expect(performanceElement).toBeInTheDocument();
                            });

                        test('shows issue counts and scores for each category', async() => {
                                render( < ReportVisualization analysisData = { mockReport }
                                    />);

                                    // Check for issue counts
                                    const securityIssues = await screen.findByText('2 issues');
                                    // @ts-ignore
                                    const performanceIssues = await screen.findByText('5 issues'); expect(securityIssues).toBeInTheDocument(); expect(performanceIssues).toBeInTheDocument();

                                    // Check for category scores
                                    const securityScore = await screen.findByText('90/100');
                                    // @ts-ignore
                                    const performanceScore = await screen.findByText('75/100'); expect(securityScore).toBeInTheDocument(); expect(performanceScore).toBeInTheDocument();
                                });
                        });