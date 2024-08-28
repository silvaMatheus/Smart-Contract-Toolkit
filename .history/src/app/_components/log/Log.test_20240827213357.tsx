import { useContractStore } from "@/context/store";
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Log } from './Log';

// Mock do hook useContractStore
jest.mock("@/context/store", () => ({
  useContractStore: jest.fn(),
}));

// Mock do componente Button
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

describe('Log Component', () => {
  const mockClearLog = jest.fn();
  const mockLogItems = [
    { type: 'JSON', message: 'JSON log message' },
    { type: 'other', message: 'Other log message' },
  ];

  beforeEach(() => {
    (useContractStore as jest.Mock).mockReturnValue({
      logItems: mockLogItems,
      clearLog: mockClearLog,
    });
  });

  it('renders the clear log button', () => {
    render(<Log />);
    expect(screen.getByText('Clear logs')).toBeInTheDocument();
  });

  it('calls clearLog function when clear button is clicked', () => {
    render(<Log />);
    const clearButton = screen.getByText('Clear logs');
    fireEvent.click(clearButton);
    expect(mockClearLog).toHaveBeenCalled();
  });

  it('renders log items correctly', () => {
    render(<Log />);
    expect(screen.getByText('JSON log message')).toBeInTheDocument();
    expect(screen.getByText('Other log message')).toBeInTheDocument();
  });

  it('applies correct CSS classes to log items', () => {
    render(<Log />);
    const jsonLogItem = screen.getByText('JSON log message');
    const otherLogItem = screen.getByText('Other log message');

    expect(jsonLogItem).toHaveClass('text-amber-300');
    expect(otherLogItem).toHaveClass('text-sky-300');
  });

  it('renders an empty log when there are no log items', () => {
    (useContractStore as jest.Mock).mockReturnValue({
      logItems: [],
      clearLog: mockClearLog,
    });

    const { container } = render(<Log />);
    const codeElement = container.querySelector('code');
    expect(codeElement?.textContent).toBe('');
  });
});