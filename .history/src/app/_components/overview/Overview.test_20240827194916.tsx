import { useContractStore } from "@/context/store";
import { render, screen } from '@testing-library/react';
import Overview from './index';

jest.mock('@/context/store', () => ({
  useContractStore: jest.fn(),
}));

describe('Overview Component', () => {
  it('renders contract name and address when available', () => {
    // Mock the store values
    (useContractStore as jest.Mock).mockReturnValue({
      name: 'Test Contract',
      contract: { target: '0x1234567890123456789012345678901234567890' },
    });

    render(<Overview />);

    expect(screen.getByText('Test Contract')).toBeInTheDocument();
    expect(screen.getByText('0x1234567890123456789012345678901234567890')).toBeInTheDocument();
  });

  it('renders placeholder text when contract is not available', () => {
    // Mock the store values for when no contract is set
    (useContractStore as jest.Mock).mockReturnValue({
      name: '',
      contract: null,
    });

    render(<Overview />);

    expect(screen.getByText('No Contract Name')).toBeInTheDocument();
    expect(screen.getByText('No Address Available')).toBeInTheDocument();
  });
});