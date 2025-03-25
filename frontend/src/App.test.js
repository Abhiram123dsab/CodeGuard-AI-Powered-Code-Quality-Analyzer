import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

describe('File Upload Integration Tests', () => {
    test('renders upload interface elements', () => {
        render( < App / > );
        expect(screen.getByText(/Upload Project/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Analyze Code/i })).toBeInTheDocument();
    });

    test('handles file selection and upload', async() => {
        axios.post.mockResolvedValue({ data: { analysisId: '123' } });

        render( < App / > );
        const file = new File(['test content'], 'test-project.zip', { type: 'application/zip' });
        const input = screen.getByLabelText(/Upload Project/i);

        fireEvent.change(input, { target: { files: [file] } });
        fireEvent.click(screen.getByRole('button', { name: /Analyze Code/i }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                expect.stringContaining('/api/upload'),
                expect.any(FormData)
            );
        });
    });

    test('displays upload success state', async() => {
        axios.post.mockResolvedValue({ data: { analysisId: '123' } });

        render( < App / > );
        fireEvent.click(screen.getByRole('button', { name: /Analyze Code/i }));

        expect(await screen.findByText(/Analyzing.../i)).toBeInTheDocument();
    });

    test('handles upload errors', async() => {
        axios.post.mockRejectedValue({ response: { data: { error: 'Invalid file format' } } });

        render( < App / > );
        fireEvent.click(screen.getByRole('button', { name: /Analyze Code/i }));

        expect(await screen.findByText(/Invalid file format/i)).toBeInTheDocument();
    });
});