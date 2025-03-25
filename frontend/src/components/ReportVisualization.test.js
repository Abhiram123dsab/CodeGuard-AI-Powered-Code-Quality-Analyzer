import React from 'react';
import { render, screen } from '@testing-library/react';
import ReportVisualization from './ReportVisualization';

describe('ReportVisualization Component', () => {
            const mockReport = {
                score: 85,
                categories: {
                    security: {
                        score: 90,
                        issues: 2,
                        name: 'security'
                    },
                    performance: {
                        score: 75,
                        issues: 5,
                        name: 'performance'
                    }
                }
            };

            test('renders overall score correctly', () => {
                        render( < ReportVisualization analysisData = { mockReport }
                            />);
                            expect(screen.getByText(/85\/100/)).toBeInTheDocument();
                        });

                    test('displays all quality categories', () => {
                            render( < ReportVisualization analysisData = { mockReport }
                                />);
                                expect(screen.getByText('SECURITY')).toBeInTheDocument(); expect(screen.getByText('PERFORMANCE')).toBeInTheDocument();
                            });

                        test('shows issue counts and scores for each category', () => {
                                render( < ReportVisualization analysisData = { mockReport }
                                    />);
                                    expect(screen.getByText('2 issues')).toBeInTheDocument(); expect(screen.getByText('5 issues')).toBeInTheDocument(); expect(screen.getByText('90/100')).toBeInTheDocument(); expect(screen.getByText('75/100')).toBeInTheDocument();
                                });