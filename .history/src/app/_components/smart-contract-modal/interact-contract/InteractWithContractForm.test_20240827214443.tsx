import { toast } from "@/components/ui/use-toast";
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ethers } from "ethers";
import React from 'react';
import InteractWithContractForm from './';

const mockSetContract = jest.fn();
jest.mock("@/context/store", () => ({
  useContractStore: () => ({
    setContract: mockSetContract,
  }),
}));

jest.mock("@/components/ui/use-toast", () => ({
  toast: jest.fn(),
}));

jest.mock("@/lib/utils", () => ({
  ...jest.requireActual('@/lib/utils'),
  cn: (...inputs: any[]) => inputs.filter(Boolean).join(' '),
  validateABI: jest.fn(),
}));

jest.mock("ethers", () => ({
  ethers: {
    isAddress: jest.fn(),
    JsonRpcProvider: jest.fn(),
    Contract: jest.fn(),
  },
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, disabled }: any) => (
    <button onClick={onClick} disabled={disabled}>{children}</button>
  ),
}));

jest.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input {...props} />,
}));

jest.mock('@/components/ui/dropzone', () => ({
  __esModule: true,
  default: ({ handleOnDrop, dropMessage }: any) => (
    <div onClick={() => handleOnDrop([new File([''], 'test.json')])}>
      {dropMessage}
    </div>
  ),
}));

jest.mock('@/components/ui/card', () => ({
  CardHeader: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>{children}</div>
  ),
  CardContent: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>{children}</div>
  ),
  CardTitle: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>{children}</div>
  ),
  CardDescription: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>{children}</div>
  ),
}));

jest.mock('@/components/ui/form', () => ({
  Form: ({ children }: React.PropsWithChildren<{}>) => <div>{children}</div>,
  FormControl: ({ children }: React.PropsWithChildren<{}>) => <div>{children}</div>,
  FormDescription: ({ children }: React.PropsWithChildren<{}>) => <div>{children}</div>,
  FormField: ({ render }: any) => render({ field: { onChange: jest.fn(), value: '', name: '' } }),
  FormItem: ({ children }: React.PropsWithChildren<{}>) => <div>{children}</div>,
  FormLabel: ({ children }: React.PropsWithChildren<{}>) => <div>{children}</div>,
  FormMessage: () => <div data-testid="form-error"></div>,
}));

describe('InteractWithContractForm Component', () => {
  it('renders the form fields', async () => {
    render(<InteractWithContractForm />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter contract name')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ethereum')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('contract')).toBeInTheDocument();
      expect(screen.getByText("Drag 'n' drop your ABI file here, or click to select files")).toBeInTheDocument();
    });
  });

  it('disables the submit button when form is invalid', async () => {
    render(<InteractWithContractForm />);
    await waitFor(() => {
      const submitButton = screen.getByText('Interact Contract');
      expect(submitButton).toBeDisabled();
    });
  });

  it('enables the submit button when form is valid', async () => {
    render(<InteractWithContractForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter contract name'), { target: { value: 'TestContract' } });
    fireEvent.change(screen.getByPlaceholderText('contract'), { target: { value: '0x1234567890123456789012345678901234567890' } });
    fireEvent.click(screen.getByText("Drag 'n' drop your ABI file here, or click to select files"));

    await waitFor(() => {
      expect(screen.getByText('Interact Contract')).not.toBeDisabled();
    });
  });
});

it('renders the form fields', () => {
  render(<InteractWithContractForm />);
  expect(screen.getByPlaceholderText('Enter contract name')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Ethereum')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('contract')).toBeInTheDocument();
  expect(screen.getByText("Drag 'n' drop your ABI file here, or click to select files")).toBeInTheDocument();
});

it('disables the submit button when form is invalid', () => {
  render(<InteractWithContractForm />);
  const submitButton = screen.getByText('Interact Contract');
  expect(submitButton).toBeDisabled();
});

it('enables the submit button when form is valid', async () => {
  render(<InteractWithContractForm />);

  fireEvent.change(screen.getByPlaceholderText('Enter contract name'), { target: { value: 'TestContract' } });
  fireEvent.change(screen.getByPlaceholderText('contract'), { target: { value: '0x1234567890123456789012345678901234567890' } });
  fireEvent.click(screen.getByText("Drag 'n' drop your ABI file here, or click to select files"));

  await waitFor(() => {
    expect(screen.getByText('Interact Contract')).not.toBeDisabled();
  });
});

it('handles file upload correctly', async () => {
  render(<InteractWithContractForm />);

  fireEvent.click(screen.getByText("Drag 'n' drop your ABI file here, or click to select files"));

  await waitFor(() => {
    expect(screen.getByText('ABI file loaded successfully!')).toBeInTheDocument();
  });
});

it('submits the form and interacts with the contract', async () => {
  const mockContract = { address: '0x1234' };
  (ethers.Contract as jest.Mock).mockReturnValue(mockContract);

  render(<InteractWithContractForm />);

  fireEvent.change(screen.getByPlaceholderText('Enter contract name'), { target: { value: 'TestContract' } });
  fireEvent.change(screen.getByPlaceholderText('contract'), { target: { value: '0x1234567890123456789012345678901234567890' } });
  fireEvent.click(screen.getByText("Drag 'n' drop your ABI file here, or click to select files"));

  await waitFor(() => {
    fireEvent.click(screen.getByText('Interact Contract'));
  });
  await waitFor(() => {
    expect(mockContract).toHaveBeenCalled();
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: "Success",
      description: "Contract interaction ready.",
    }));
  });

});

it('handles errors during form submission', async () => {
  (ethers.Contract as jest.Mock).mockImplementation(() => {
    throw new Error('Contract creation failed');
  });

  render(<InteractWithContractForm />);

  fireEvent.change(screen.getByPlaceholderText('Enter contract name'), { target: { value: 'TestContract' } });
  fireEvent.change(screen.getByPlaceholderText('contract'), { target: { value: '0x1234567890123456789012345678901234567890' } });
  fireEvent.click(screen.getByText("Drag 'n' drop your ABI file here, or click to select files"));

  await waitFor(() => {
    fireEvent.click(screen.getByText('Interact Contract'));
  });

  await waitFor(() => {
    expect(toast).toHaveBeenCalledWith(expect.objectContaining({
      title: "Error",
      description: "Failed to load the contract.",
    }));
  });
});
