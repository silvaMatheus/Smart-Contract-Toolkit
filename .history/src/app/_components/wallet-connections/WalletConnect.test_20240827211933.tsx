import { truncateAddress } from "@/lib/utils";
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import WalletConnect from './';

jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  useConnect: jest.fn(),
  useDisconnect: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
  truncateAddress: jest.fn().mockReturnValue('0x1234...5678'),
}));


jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: React.PropsWithChildren<any>) => <button {...props}>{children}</button>,
}));

jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
  SheetContent: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
  SheetTrigger: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
}));

jest.mock('@/components/ui/card', () => ({
  Card: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
  CardContent: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
  CardHeader: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
  CardTitle: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
  CardDescription: ({ children, ...props }: React.PropsWithChildren<any>) => <div {...props}>{children}</div>,
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

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
    (truncateAddress as jest.Mock).mockReturnValue('0x1234...5678');
  });

  it('renders connect button with correct text', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: false });
    render(<WalletConnect buttonText="Connect Wallet" />);
    expect(screen.getByRole('button', { name: /Connect Wallet/i })).toBeInTheDocument();
  });

  it('displays "Connect Wallet" when not connected', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: false });
    render(<WalletConnect buttonText="Connect" />);
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });

  it('displays "Wallet Connected" when connected', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: true });
    render(<WalletConnect buttonText="Connect" />);
    expect(screen.getByText('Wallet Connected')).toBeInTheDocument();
  });

  it('renders connector buttons when not connected', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: false });
    render(<WalletConnect buttonText="Connect" />);
    expect(screen.getByText('MetaMask')).toBeInTheDocument();
    expect(screen.getByText('WalletConnect')).toBeInTheDocument();
  });

  it('calls connect function when a connector button is clicked', () => {
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
    expect(screen.getByText('0x1234...5678')).toBeInTheDocument();
  });

  it('displays correct connection status when disconnected', () => {
    (useAccount as jest.Mock).mockReturnValue({ isConnected: false });
    render(<WalletConnect buttonText="Connect" />);
    expect(screen.getByText('Disconnected')).toBeInTheDocument();
    expect(screen.getAllByText('N/A').length).toBe(2);
  });
});

