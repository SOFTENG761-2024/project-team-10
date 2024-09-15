import { render, screen } from '@testing-library/react';
import { Landing } from '../../../src/components/Recommendation/Landing';

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock('../../../src/components/GlobalProviders', async (importOriginal) => {
  const actual = await importOriginal(); // Get the actual module
  return {
    ...actual, // Spread the original module to keep other exports like `useMuiTheme`
    useRoute: () => ({
      setPageTitle: vi.fn(),
      pageTitle: 'Recommendation',
    }),
  };
});

describe('Landing', () => {
  it('renders without crashing', () => {
    render(<Landing />);
    // const linkElement = screen.getByText(/Find me .../i);
    // expect(linkElement).toBeInTheDocument();
  });
});