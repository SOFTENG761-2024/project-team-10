import { render, screen } from '@testing-library/react';
import { Landing } from '../../../src/components/Recommendation/Landing';

vi.mock('./Landing.module.css', () => ({}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../../../src/components/GlobalProviders', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useMuiTheme: () => ({
      toggleLightDarkTheme: vi.fn(),
      theme: 'light', // Mock theme value; adjust as needed
    }),
  };
});

describe('Landing', () => {
  it('renders without crashing', () => {
    render(<Landing />);
    const element = screen.getByPlaceholderText(/Search/i);
    expect(element).toBeInTheDocument();
  });
});