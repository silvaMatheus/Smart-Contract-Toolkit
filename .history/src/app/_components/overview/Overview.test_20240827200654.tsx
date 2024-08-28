import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Overview from '.';


jest.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
  CardHeader: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
  CardTitle: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
  CardDescription: ({ children, ...props }: { children: React.ReactNode }) => <div {...props}>{children}</div>,
}));
jest.mock('@/components/ui/copy-button', () => ({
  CopyButton: ({ value }: { value: string }) => <button>Copy {value}</button>,
}));

jest.mock('@/context/store', () => ({
  useContractStore: jest.fn(),
}));


jest.mock('../sheet-interact', () => ({
  SheetInteractContract: () => <div>Sheet Interact Contract</div>,
}));

describe('Overview Component', () => {
  it('renders without contract name and address', () => {
    const mockUseContractStore = jest.requireMock('@/context/store').useContractStore;
    mockUseContractStore.mockReturnValue({ contract: null, name: '' });

    render(<Overview />);

    expect(screen.getByText('No Contract Name')).toBeInTheDocument();
    expect(screen.getByText('No Address Available')).toBeInTheDocument();
  });

  it('renders with contract name and address', () => {
    const mockUseContractStore = jest.requireMock('@/context/store').useContractStore;
    mockUseContractStore.mockReturnValue({
      contract: { target: '0x1234567890123456789012345678901234567890' },
      name: 'Test Contract',
    });

    render(<Overview />);

    expect(screen.getByText('Test Contract')).toBeInTheDocument();
    expect(screen.getByText('0x1234567890123456789012345678901234567890')).toBeInTheDocument();
  });

  it('renders the SheetInteractContract component', () => {
    const mockUseContractStore = jest.requireMock('@/context/store').useContractStore;
    mockUseContractStore.mockReturnValue({ contract: null, name: '' });

    render(<Overview />);

    expect(screen.getByText('Sheet Interact Contract')).toBeInTheDocument();
  });

  it('renders the CopyButton component', () => {
    const mockUseContractStore = jest.requireMock('@/context/store').useContractStore;
    mockUseContractStore.mockReturnValue({
      contract: { target: '0x1234567890123456789012345678901234567890' },
      name: 'Test Contract',
    });

    render(<Overview />);

    expect(screen.getByText('Copy 0x1234567890123456789012345678901234567890')).toBeInTheDocument();
  });
});