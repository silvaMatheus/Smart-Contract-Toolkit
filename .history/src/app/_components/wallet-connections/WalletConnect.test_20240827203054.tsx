import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import useLoadAndHandleContract from '@/hooks/useLoadContract';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import WalletConnect, { getIconFromStatus } from '.';
import FunctionCard from '../function';

// Mocks
jest.mock('@/hooks/useLoadContract', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  useConnect: jest.fn(),
  useDisconnect: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// UI component mocks (adjust as needed for your specific UI library)
jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/ui/accordion', () => ({
  AccordionItem: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AccordionTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  AccordionContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('FunctionCard Component', () => {
  const mockFunc = {
    name: 'testFunction',
    stateMutability: 'view',
    inputs: [{ name: 'input1', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ type: 'bool', internalType: 'bool' }],
  };

  beforeEach(() => {
    (useLoadAndHandleContract as jest.Mock).mockReturnValue({
      handleFunctionCall: jest.fn(),
      isRunningFunction: false,
      feedback: '',
      result: '',
      hasRunFunction: false,
    });
  });

  it('renders function name and details correctly', () => {
    render(<FunctionCard func={mockFunc} />);
    expect(screen.getByText('testFunction')).toBeInTheDocument();
    expect(screen.getByText('view')).toBeInTheDocument();
    expect(screen.getByText('Inputs: input1 (uint256, uint256)')).toBeInTheDocument();
    expect(screen.getByText('Outputs: bool (bool)')).toBeInTheDocument();
  });

  it('renders input fields based on function inputs', () => {
    render(<FunctionCard func={mockFunc} />);
    expect(screen.getByPlaceholderText('Enter input1')).toBeInTheDocument();
  });

  it('toggles custom gas input visibility', () => {
    render(<FunctionCard func={mockFunc} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(screen.getByPlaceholderText('Enter custom gas limit')).toBeInTheDocument();
  });

  it('calls handleFunctionCall when button is clicked', () => {
    const mockHandleFunctionCall = jest.fn();
    (useLoadAndHandleContract as jest.Mock).mockReturnValue({
      handleFunctionCall: mockHandleFunctionCall,
      isRunningFunction: false,
      feedback: '',
      result: '',
      hasRunFunction: false,
    });

    render(<FunctionCard func={mockFunc} />);
    const button = screen.getByRole('button', { name: /Read/i });
    fireEvent.click(button);
    expect(mockHandleFunctionCall).toHaveBeenCalled();
  });

  it('displays feedback and result when hasRunFunction is true', async () => {
    (useLoadAndHandleContract as jest.Mock).mockReturnValue({
      handleFunctionCall: jest.fn(),
      isRunningFunction: false,
      feedback: 'Operation successful',
      result: 'true',
      hasRunFunction: true,
    });

    render(<FunctionCard func={mockFunc} />);
    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument();
      expect(screen.getByText('Operation successful')).toBeInTheDocument();
      expect(screen.getByText('true')).toBeInTheDocument();
    });
  });

  it('disables button when isRunningFunction is true', () => {
    (useLoadAndHandleContract as jest.Mock).mockReturnValue({
      handleFunctionCall: jest.fn(),
      isRunningFunction: true,
      feedback: '',
      result: '',
      hasRunFunction: false,
    });

    render(<FunctionCard func={mockFunc} />);
    const button = screen.getByRole('button', { name: /Read/i });
    expect(button).toBeDisabled();
  });
});

describe('WalletConnect Component', () => {
  const mockConnect = jest.fn();
  const mockDisconnect = jest.fn();

  beforeEach(() => {
    (useConnect as jest.Mock).mockReturnValue({
      connect: mockConnect,
      connectors: [
        { id: 'metamask', name: 'MetaMask' },
        { id: 'walletconnect', name: 'WalletConnect' },
      ],
    });
    (useDisconnect as jest.Mock).mockReturnValue({ disconnect: mockDisconnect });
  });

  it('renders connect button with correct text', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: false });
    render(<WalletConnect buttonText="Connect Wallet" />);
    expect(screen.getByRole('button', { name: 'Connect Wallet' })).toBeInTheDocument();
  });

  it('displays connector options when not connected', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: false });
    render(<WalletConnect buttonText="Connect" />);
    expect(screen.getByText('MetaMask')).toBeInTheDocument();
    expect(screen.getByText('WalletConnect')).toBeInTheDocument();
  });

  it('calls connect function when a connector is clicked', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: false });
    render(<WalletConnect buttonText="Connect" />);
    fireEvent.click(screen.getByText('MetaMask'));
    expect(mockConnect).toHaveBeenCalled();
  });

  it('displays disconnect button when connected', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: true });
    render(<WalletConnect buttonText="Connect" />);
    expect(screen.getByText('Disconnect')).toBeInTheDocument();
  });

  it('calls disconnect function when disconnect button is clicked', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: true });
    render(<WalletConnect buttonText="Connect" />);
    fireEvent.click(screen.getByText('Disconnect'));
    expect(mockDisconnect).toHaveBeenCalled();
  });

  it('displays correct connection status when connected', () => {
    (useAccount as jest.Mock).mockReturnValue({
      isConnected: true,
      address: '0x1234567890123456789012345678901234567890',
      chain: { name: 'Ethereum' },
    });
    render(<WalletConnect buttonText="Connect" />);
    expect(screen.getByText('Connected')).toBeInTheDocument();
    expect(screen.getByText('Ethereum')).toBeInTheDocument();
    expect(screen.getByText('0x12...7890')).toBeInTheDocument();
  });

  it('displays correct connection status when disconnected', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: false });
    render(<WalletConnect buttonText="Connect" />);
    expect(screen.getByText('Disconnected')).toBeInTheDocument();
    expect(screen.getAllByText('N/A').length).toBeGreaterThan(0);
  });
});

describe('getIconFromStatus Function', () => {
  it('returns correct icon for authenticated status', () => {
    const icon = getIconFromStatus('authenticated');
    expect(icon).toContain('Authenticated');
  });

  it('returns correct icon for loading status', () => {
    const icon = getIconFromStatus('loading');
    expect(icon).toBe('LoaderCircle');
  });

  it('returns correct icon for unauthenticated status', () => {
    const icon = getIconFromStatus('unauthenticated');
    expect(icon).toContain('Unauthenticated');
  });
});