import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../Register';
import { vi } from 'vitest';

vi.mock('axios');

describe('Register Page', () => {
  beforeEach(() => {
    axios.post.mockClear();
  });

  test('renders the Register page', () => {
    render(
      <Router>
        <Register />
      </Router>
    );
    expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
  });

  test('shows validation errors for invalid inputs', async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'us' } });
    fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: '123' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'pass' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'pass' } });

    fireEvent.click(screen.getByText(/Sign Up/i));

    expect(await screen.findByText(/Username must be at least 3 characters long/i)).toBeInTheDocument();
    expect(await screen.findByText(/First name must contain only letters/i)).toBeInTheDocument();
    expect(await screen.findByText(/Last name must contain only letters/i)).toBeInTheDocument();
    expect(await screen.findByText(/Invalid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password must be at least 8 characters long/i)).toBeInTheDocument();
  });

  test('shows error message on server error', async () => {
    axios.post.mockRejectedValueOnce({
      response: {
        status: 500,
        data: { error: 'Internal Server Error' },
      },
    });

    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'username' } });
    fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: 'First' } });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: 'Last' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'email@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByText(/Sign Up/i));

    expect(await screen.findByText(/Internal Server Error/i)).toBeInTheDocument();
  });

  test('redirects to login page on successful registration', async () => {
    axios.post.mockResolvedValueOnce({
      data: { success: 'User created successfully' },
    });

    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username/i), { target: { value: 'username' } });
    fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: 'First' } });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: 'Last' } });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'email@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'Password1!' } });
    fireEvent.change(screen.getByPlaceholderText(/Confirm Password/i), { target: { value: 'Password1!' } });

    fireEvent.click(screen.getByText(/Sign Up/i));

    await waitFor(() => {
      expect(screen.queryByText(/Create an Account/i)).not.toBeInTheDocument();
    });
  });

  test('checks if Username input is present and validates correctly', async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    // Check if the Username input is present
    const usernameInput = screen.getByPlaceholderText(/Username/i);
    expect(usernameInput).toBeInTheDocument();

    // Test invalid username
    fireEvent.change(usernameInput, { target: { value: 'us' } });
    fireEvent.click(screen.getByText(/Sign Up/i));
    expect(await screen.findByText(/Username must be at least 3 characters long/i)).toBeInTheDocument();

    // Test valid username
    fireEvent.change(usernameInput, { target: { value: 'validUsername' } });
    fireEvent.click(screen.getByText(/Sign Up/i));
    await waitFor(() => {
      expect(screen.queryByText(/Username must be at least 3 characters long/i)).not.toBeInTheDocument();
    });
  });
});
