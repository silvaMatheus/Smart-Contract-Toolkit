import { render, screen } from '@testing-library/react';
import Overview from '../src/app/_components/overview';
import { useContractStore } from '../src/context/store';


jest.mock('../src/context/store', () => ({
  useContractStore: jest.fn(),
}));

describe('Overview Component', () => {
  it('renders contract name and address', () => {
    useContractStore.mockReturnValue({
      name: 'Test Contract',
      contract: { target: '0x1234567890123456789012345678901234567890' },
    });

    render(<Overview />);

    expect(screen.getByText('Test Contract')).toBeInTheDocument();
    expect(screen.getByText('0x1234567890123456789012345678901234567890')).toBeInTheDocument();
  });

  it('renders "No Contract Name" when name is not provided', () => {
    useContractStore.mockReturnValue({
      name: '',
      contract: { target: '0x1234567890123456789012345678901234567890' },
    });

    render(<Overview />);

    expect(screen.getByText('No Contract Name')).toBeInTheDocument();
  });
});