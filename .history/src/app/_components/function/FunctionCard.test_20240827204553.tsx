import useLoadAndHandleContract from '@/hooks/useLoadContract';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import FunctionCard from '.';


jest.mock('@/hooks/useLoadContract', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@/components/ui/accordion', () => ({
  AccordionItem: ({ children }: { children: React.ReactNode }) => <div data-testid="accordion-item">{children}</div>,
  AccordionTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="accordion-trigger">{children}</div>,
  AccordionContent: ({ children }: { children: React.ReactNode }) => <div data-testid="accordion-content">{children}</div>,
}));

jest.mock('@/components/ui/alert', () => ({
  Alert: ({ children }: { children: React.ReactNode }) => <div data-testid="alert">{children}</div>,
  AlertTitle: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-title">{children}</div>,
  AlertDescription: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-description">{children}</div>,
}));

jest.mock('@/components/ui/badge', () => ({
  Badge: ({ children }: { children: React.ReactNode }) => <div data-testid="badge">{children}</div>,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, disabled }: { children: React.ReactNode, onClick?: () => void, disabled?: boolean }) =>
    <button data-testid="button" onClick={onClick} disabled={disabled}>{children}</button>,
}));

describe('FunctionCard Component', () => {
  const mockFunc = {
    name: 'testFunction',
    stateMutability: 'view',
    inputs: [{ name: 'input1', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ type: 'bool', internalType: 'bool' }],
  };

  const mockLoadAndHandleContract = {
    handleFunctionCall: jest.fn(),
    isRunningFunction: false,
    feedback: '',
    result: '',
    hasRunFunction: false,
  };

  beforeEach(() => {
    (useLoadAndHandleContract as jest.Mock).mockReturnValue(mockLoadAndHandleContract);
  });

  it('renders function name and details correctly', () => {
    render(<FunctionCard func={mockFunc} />);
    expect(screen.getByText('testFunction')).toBeInTheDocument();
    expect(screen.getByText('view')).toBeInTheDocument();
    expect(screen.getByText(/Inputs:/)).toHaveTextContent('Inputs: input1 (uint256, uint256)');
    expect(screen.getByText(/Outputs:/)).toHaveTextContent('Outputs: bool (bool)');
  });

  it('renders input fields based on function inputs', () => {
    render(<FunctionCard func={mockFunc} />);
    expect(screen.getByPlaceholderText('Enter input1')).toBeInTheDocument();
  });

  it('toggles custom gas input visibility', () => {
    render(<FunctionCard func={mockFunc} />);
    console.log(screen.debug()); // For debugging purposes

    const checkboxLabel = screen.getByText(/Show Custom Gas Input/i);
    expect(checkboxLabel).toBeInTheDocument();

    const checkbox = checkboxLabel.nextElementSibling as HTMLInputElement;
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.type).toBe('checkbox');

    fireEvent.click(checkbox);

    expect(screen.getByPlaceholderText('Enter custom gas limit')).toBeInTheDocument();
  });

  it('calls handleFunctionCall when button is clicked', () => {
    const mockHandleFunctionCall = jest.fn();
    (useLoadAndHandleContract as jest.Mock).mockReturnValue({
      ...mockLoadAndHandleContract,
      handleFunctionCall: mockHandleFunctionCall,
    });

    render(<FunctionCard func={mockFunc} />);
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(mockHandleFunctionCall).toHaveBeenCalled();
  });

  it('displays feedback and result when hasRunFunction is true', async () => {
    (useLoadAndHandleContract as jest.Mock).mockReturnValue({
      ...mockLoadAndHandleContract,
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
      ...mockLoadAndHandleContract,
      isRunningFunction: true,
    });

    render(<FunctionCard func={mockFunc} />);
    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('disabled');
  });
});