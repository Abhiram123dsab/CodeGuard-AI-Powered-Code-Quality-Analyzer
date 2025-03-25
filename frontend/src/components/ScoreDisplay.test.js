import React from 'react';
import { render, screen } from '@testing-library/react';
import ScoreDisplay from './ScoreDisplay';

describe('ScoreDisplay Component', () => {
            const mockResults = {
                score: 75,
                categories: {
                    security: { score: 85, issues: 2 },
                    performance: { score: 65, issues: 5 }
                },
                recommendations: ['Sample recommendation']
            };

            test('renders overall score correctly', () => {
                        render( < ScoreDisplay results = { mockResults }
                            />);
                            expect(screen.getByText('75')).toBeInTheDocument();
                        });

                    test('displays category breakdown', () => {
                            render( < ScoreDisplay results = { mockResults }
                                />);
                                expect(screen.getByText('SECURITY')).toBeInTheDocument(); expect(screen.getByText('PERFORMANCE')).toBeInTheDocument();
                            });

                        test('shows recommendations when available', () => {
                                render( < ScoreDisplay results = { mockResults }
                                    />);
                                    expect(screen.getByText('Sample recommendation')).toBeInTheDocument();
                                });

                            test('handles missing results', () => {
                                    render( < ScoreDisplay results = { null }
                                        />);
                                        expect(screen.getByText('No analysis data available')).toBeInTheDocument();
                                    });
                            });