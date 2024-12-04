import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MortgageForm from './MortgageForm';

describe('MortgageForm', () => {
    const onSubmit = jest.fn();

    beforeEach(async () => {
        render(<MortgageForm onSubmit={onSubmit} />);
    });

    it('renders the form with all labels and inputs', () => {
        expect(screen.getByText('Property Price')).toBeInTheDocument();
        expect(screen.getByTestId('propertyPrice')).toBeInTheDocument();
        expect(screen.getByText('Down Payment')).toBeInTheDocument();
        expect(screen.getByTestId('downPayment')).toBeInTheDocument();
        expect(screen.getByText('Annual Interest Rate')).toBeInTheDocument();
        expect(screen.getByTestId('annualInterestRate')).toBeInTheDocument();
        expect(screen.getByText('Amortization Period')).toBeInTheDocument();
        expect(screen.getByTestId('amortizationPeriod')).toBeInTheDocument();
        expect(screen.getByText('Payment Schedule')).toBeInTheDocument();
        expect(screen.getByTestId('paymentSchedule')).toBeInTheDocument();
    });

    it('displays field validation error messages for required fields', () => {
        fireEvent.click(screen.getByText(/Calculate/i));

        waitFor(() => {
            const errorMessages = [
                'Property price is required',
                'Down payment is required',
                'Annual interest rate is required',
                'Amortization period is required',
                'Payment schedule is required',
            ];

            errorMessages.forEach((message) => {
                expect(screen.getByText(message)).toBeInTheDocument();
            });
        });
    });

    it('displays error message for invalid property price', async () => {
        fireEvent.change(screen.getByTestId('propertyPrice'), {
            target: { value: -100 },
        });
        fireEvent.click(screen.getByText(/Calculate/i));

        await waitFor(() => {
            expect(
                screen.getByText('Property price must be a positive number')
            ).toBeInTheDocument();
        });
    });

    it('displays error message for invalid down payment', async () => {
        fireEvent.change(screen.getByTestId('propertyPrice'), {
            target: { value: 100000 },
        });
        fireEvent.change(screen.getByTestId('downPayment'), {
            target: { value: 4000 },
        });
        fireEvent.click(screen.getByText(/Calculate/i));

        await waitFor(() => {
            expect(
                screen.getByText(
                    'Down payment must be at least 5% of the property price'
                )
            ).toBeInTheDocument();
        });
    });

    it('submits the form with valid data', () => {
        fireEvent.change(screen.getByTestId('propertyPrice'), {
            target: { value: 100000 },
        });
        fireEvent.change(screen.getByTestId('downPayment'), {
            target: { value: 5000 },
        });
        fireEvent.change(screen.getByTestId('annualInterestRate'), {
            target: { value: 5 },
        });
        fireEvent.change(screen.getByTestId('amortizationPeriod'), {
            target: { value: 25 },
        });
        fireEvent.change(screen.getByTestId('paymentSchedule'), {
            target: { value: 'monthly' },
        });
        fireEvent.click(screen.getByText(/Calculate/i));

        waitFor(() => {
            expect(onSubmit).toHaveBeenCalledWith({
                propertyPrice: 100000,
                downPayment: 5000,
                annualInterestRate: 5,
                amortizationPeriod: 25,
                paymentSchedule: 'monthly',
            });
            expect(onSubmit).toHaveBeenCalledTimes(1);
        });
    });
});
