import { toast } from "@/components/ui/use-toast";
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { DeployContractForm } from './';


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
  FormField: ({ render }: any) => render({ field: { onChange: jest.fn(), value: '', name: '' } }),
  FormItem: ({ children }: React.PropsWithChildren<{}>) => <div>{children}</div>,
  FormLabel: ({ children }: React.PropsWithChildren<{}>) => <div>{children}</div>,
  FormMessage: () => <div data-testid="form-error"></div>,
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
    expect(screen.getByPlaceholderText('Enter contract name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ethereum')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your contract ByteCode')).toBeInTheDocument();
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

    fireEvent.change(screen.getByPlaceholderText('Enter contract name'), { target: { value: 'TestContract' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your contract ByteCode'), { target: { value: '0x12345' } });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(expect.objectContaining({
        title: "Deployment Data",
        description: expect.anything(),
      }));
    });
  });

  it('displays form validation errors', async () => {
    render(<DeployContractForm />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      const errorMessages = screen.getAllByTestId('form-error');
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });
});