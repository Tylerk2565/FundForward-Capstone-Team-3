import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Fundraisers from '../pages/Fundraisers';

// Mock axios
jest.mock('axios');

// Mock useAuth hook
jest.mock('../hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({
    auth: { username: 'testuser' }
  })
}));

describe('Fundraisers component', () => {
  it('fetches fundraisers data from API', async () => {
    // Mock API response
    const mockResponse = {
      data: {
        success: true,
        data: {
          search: {
            response: {
              projects: {
                project: [
                  { id: '1', title: 'Test Fundraiser' }
                ]
              }
            }
          }
        }
      }
    };

    // Set up axios mock
    axios.get.mockResolvedValue(mockResponse);

    // Render the component
    render(<Fundraisers />);

    // Wait for the API call to resolve and update state
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:3000/api/fundraiser?q=',
        { headers: { Accept: 'application/json' } }
      );
    });

    // Check if the fundraiser title is rendered
    expect(screen.getByText('Test Fundraiser')).toBeInTheDocument();
  });
});
