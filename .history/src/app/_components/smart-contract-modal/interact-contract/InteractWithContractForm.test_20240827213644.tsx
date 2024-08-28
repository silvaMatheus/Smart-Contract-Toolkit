import { toast } from "@/components/ui/use-toast";
import { useContractStore } from "@/context/store";
import { validateABI } from "@/lib/utils";
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ethers } from "ethers";
import InteractWithContractForm from './';

jest.mock("@/context/store", () => ({
  useContractStore: jest.fn(),
}));

jest.mock("@/components/ui/use-toast", () => ({
  toast: jest.fn(),
}));

jest.mock("@/lib/utils", () => ({
  validateABI: jest.fn(),
}));

jest.mock("ethers", () => ({
  ethers: {
    isAddress: jest.fn(),
    JsonRpcProvider: jest.fn(),
    Contract: jest.fn(),
  },
}));

// Mock dos componentes UI
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, disabled }: any) => (
    <button onClick={onClick} disabled={disabled}>{children}</button>
  ),
}));

jest.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

jest.mock("@/components/ui/dropzone", () => ({
  __esModule: true,
  default: ({ handleOnDrop, dropMessage }: any) => (
    <div onClick={() => handleOnDrop([new File([''], 'test.json')])}>
      {dropMessage}
    </div>
  ),
}));

describe('InteractWithContractForm Component', () => {
  const mockSetContract = jest.fn();
  beforeEach(() => {
    (useContractStore as unknown as jest.Mock).mockReturnValue({
      setContract: mockSetContract,
    });
    (validateABI as unknown as jest.Mock).mockReturnValue(true);
    (ethers.isAddress as unknown as jest.Mock).mockReturnValue(true);
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
      expect(mockSetContract).toHaveBeenCalled();
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
});