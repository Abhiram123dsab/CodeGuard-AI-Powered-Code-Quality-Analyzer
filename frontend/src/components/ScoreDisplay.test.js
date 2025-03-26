import React from 'react';
import { render, screen } from '@testing-library/react';
import ScoreDisplay from './ScoreDisplay';

// @ts-ignore
describe('ScoreDisplay Component', () => {
            const mockResults = {
                overall_score: 75,
                categories: {
                    code_quality: { score: 90, issues: 3 },
                    code_style: { score: 80, issues: 4 },
                    naming: { score: 85, issues: 2 },
                    modularity: { score: 88, issues: 1 }
                },
                recommendations: ['Sample recommendation']
            };

            // @ts-ignore
            test('renders overall score correctly', () => {
                        render( < ScoreDisplay results = { mockResults }
                            />);
                            // @ts-ignore
                            expect(screen.getByText('75')).toBeInTheDocument();
                        });

                    // @ts-ignore
                    test('displays category breakdown', () => {
                            render( < ScoreDisplay results = { mockResults }
                                />);
                                // @ts-ignore
                                expect(screen.getByText('CODE QUALITY')).toBeInTheDocument(); expect(screen.getByText('CODE STYLE')).toBeInTheDocument();
                            });

                        // @ts-ignore
                        test('shows recommendations when available', () => {
                                render( < ScoreDisplay results = { mockResults }
                                    />);
                                    // @ts-ignore
                                    expect(screen.getByText('Sample recommendation')).toBeInTheDocument();
                                });

                            // @ts-ignore
                            test('handles missing results', () => {
                                    render( < ScoreDisplay results = { null }
                                        />);
                                        // @ts-ignore
                                        expect(screen.getByText('No analysis data available')).toBeInTheDocument();
                                    });
                            });