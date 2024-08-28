import useLoadAndHandleContract from "@/hooks/useLoadContract";
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import FunctionCard from '.';


jest.mock("@/hooks/useLoadContract", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/components/ui/accordion", () => ({
  AccordionItem: ({ children }: { children: React.ReactNode }) => <div data-testid="accordion-item">{children}</div>,
  AccordionTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="accordion-trigger">{children}</div>,
  AccordionContent: ({ children }: { children: React.ReactNode }) => <div data-testid="accordion-content">{children}</div>,
}));

jest.mock("@/components/ui/alert", () => ({
  Alert: ({ children }: { children: React.ReactNode }) => <div data-testid="alert">{children}</div>,
  AlertTitle: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-title">{children}</div>,
  AlertDescription: ({ children }: { children: React.ReactNode }) => <div data-testid="alert-description">{children}</div>,
}));

jest.mock("@/components/ui/badge", () => ({
  Badge: ({ children }: { children: React.ReactNode }) => <div data-testid="badge">{children}</div>,
}));

describe('FunctionCard Component', () => {
  const mockFunc = {
    name: 'testFunction',
    stateMutability: 'view',
    inputs: [{ name: 'input1', type: 'uint256', internalType: 'uint256' }],
    outputs: [{ type: 'bool', internalType: 'bool' }],
  };

  const mockHandleFunctionCall = jest.fn();

  beforeEach(() => {
    (useLoadAndHandleContract as jest.Mock).mockReturnValue({
      handleFunctionCall: mockHandleFunctionCall,
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
    expect(screen.getByText(/Inputs: input1 \(uint256, uint256\)/)).toBeInTheDocument();
    expect(screen.getByText(/Outputs: bool \(bool\)/)).toBeInTheDocument();
  });

  it('renders input fields based on function inputs', () => {
    render(<FunctionCard func={mockFunc} />);
    expect(screen.getByPlaceholderText('Enter input1')).toBeInTheDocument();
  });

  it('toggles custom gas input visibility', () => {
    render(<FunctionCard func={mockFunc} />);
    const checkbox = screen.getByLabelText('Show Custom Gas Input:');
    fireEvent.click(checkbox);
    expect(screen.getByPlaceholderText('Enter custom gas limit')).toBeInTheDocument();
  });

  it('calls handleFunctionCall when button is clicked', () => {
    render(<FunctionCard func={mockFunc} />);
    const button = screen.getByRole('button', { name: /Read/i });
    fireEvent.click(button);
    expect(mockHandleFunctionCall).toHaveBeenCalled();
  });

  it('disables button when isRunningFunction is true', () => {
    (useLoadAndHandleContract as jest.Mock).mockReturnValue({
      handleFunctionCall: mockHandleFunctionCall,
      isRunningFunction: true,
      feedback: '',
      result: '',
      hasRunFunction: false,
    });
    render(<FunctionCard func={mockFunc} />);
    const button = screen.getByRole('button', { name: /Read/i });
    expect(button).toBeDisabled();
  });

  it('displays feedback and result when hasRunFunction is true', async () => {
    (useLoadAndHandleContract as jest.Mock).mockReturnValue({
      handleFunctionCall: mockHandleFunctionCall,
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
});