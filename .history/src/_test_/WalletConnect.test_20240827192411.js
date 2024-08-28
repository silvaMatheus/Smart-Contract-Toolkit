import { fireEvent, render, screen } from '@testing-library/react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import WalletConnect from '../src/app/_components/wallet-connections';


jest.mock('wagmi', () => ({
  useAccount: jest.fn(),
  useConnect: jest.fn(),
  useDisconnect: jest.fn(),
}));

describe('WalletConnect Component', () => {
  it('renders connect button when not connected', () => {
    useAccount.mockReturnValue({ isConnected: false });
    useConnect.mockReturnValue({ connect: jest.fn() });

    render(<WalletConnect />);

    expect(screen.getByText('Connect Wallet')).toBeInTheDocument();
  });

  it('renders disconnect button when connected', () => {
    useAccount.mockReturnValue({ isConnected: true, address: '0x1234' });
    useDisconnect.mockReturnValue({ disconnect: jest.fn() });

    render(<WalletConnect />);

    expect(screen.getByText('Disconnect')).toBeInTheDocument();
  });

  it('calls connect function when connect button is clicked', () => {
    const mockConnect = jest.fn();
    useAccount.mockReturnValue({ isConnected: false });
    useConnect.mockReturnValue({ connect: mockConnect });

    render(<WalletConnect />);

    fireEvent.click(screen.getByText('Connect Wallet'));
    expect(mockConnect).toHaveBeenCalled();
  });
});