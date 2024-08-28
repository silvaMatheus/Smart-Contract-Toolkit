import { toast } from "@/components/ui/use-toast";
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { DeployContractForm } from ".";

// Mocks
jest.mock("@/components/ui/use-toast", () => ({
  toast: jest.fn(),
}));

jest.mock("@/components/ui/card", () => ({
  CardContent: ({ children }: React.PropsWithChildren<{}>) => <div>{children}</div>,
}));

jest.mock("@/components/ui/form", () => ({
  Form: ({ children }: React.PropsWithChildren<{}>) => <div>{children}</div>,
  FormControl: ({ children }: React.PropsWithChildren<{}>) => <div>{children}</div>,
  FormDescription: ({ children }: React.PropsWithChildren<{}>) => <div>{children}</div>,
  FormField: ({ render }: any) => render({ field: { onChange: jest.fn(), value: '' } }),
  FormItem: ({ children }: React.PropsWithChildren<{}>) => <div>{children}</div>,
  FormLabel: ({ children }: React.PropsWithChildren<{}>) => <div>{children}</div>,
}));

jest.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

jest.mock("./coming-soon", () => ({
  __esModule: true,
  default: () => <div>Coming Soon</div>,
}));

describe('DeployContractForm Component', () => {
  it('renders the form fields', () => {
    render(<DeployContractForm />);
    expect(screen.getByLabelText(/Contract Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Network/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/ByteCode/i)).toBeInTheDocument();
  });

  it('disables the Network input', () => {
    render(<DeployContractForm />);
    const networkInput = screen.getByPlaceholderText('Ethereum') as HTMLInputElement;
    expect(networkInput).toBeDisabled();
  });

  it('displays the "Coming Soon" component', () => {
    render(<DeployContractForm />);
    expect(screen.getByText('Coming Soon')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    render(<DeployContractForm />);

    fireEvent.change(screen.getByLabelText(/Contract Name/i), { target: { value: 'TestContract' } });
    fireEvent.change(screen.getByLabelText(/ByteCode/i), { target: { value: '0x12345' } });

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({
        title: "Deployment Data",
        description: expect.anything(),
      }));
    });
  });

  it('displays form validation errors', async () => {
    render(<DeployContractForm />);

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(screen.getByText(/Contract name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/ByteCode is required/i)).toBeInTheDocument();
    });
  });
});