import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import useLoadAndHandleContract from '@/hooks/useLoadContract';
import { LoaderCircle } from 'lucide-react';
import { getIconFromStatus } from '.';
import FunctionCard from '../function';

jest.mock('@/hooks/useLoadContract', () => ({
  __esModule: true,
  default: jest.fn(),
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

  it('toggles custom gas input visibility', () => {
    render(<FunctionCard func={mockFunc} />);
    const checkbox = screen.getByLabelText('Show Custom Gas Input:');
    fireEvent.click(checkbox);
    expect(screen.getByPlaceholderText('Enter custom gas limit')).toBeInTheDocument();
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
    expect(button).toHaveAttribute('disabled');
  });
});

describe('getIconFromStatus Function', () => {
  it('returns correct icon for authenticated status', () => {
    const icon = getIconFromStatus('authenticated');
    expect(icon).toContain('Authenticated');
  });

  it('returns correct icon for loading status', () => {
    const icon = getIconFromStatus('loading');
    expect(icon).toBe(LoaderCircle);
  });

  it('returns correct icon for unauthenticated status', () => {
    const icon = getIconFromStatus('unauthenticated');
    expect(icon).toContain('Unauthenticated');
  });
});