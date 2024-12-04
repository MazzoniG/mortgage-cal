import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Mortgage from './Mortgage';
import api from '../utils/api';

jest.mock('../utils/api', () => ({
    post: jest.fn(),
}));

describe('Mortgage', () => {
    beforeEach(() => {
        render(<Mortgage />);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders Mortgage Calculator title', () => {
        expect(screen.getByText('Mortgage Calculator')).toBeInTheDocument();
    });

    it('displays the calculated payment on successful form submission', async () => {
        const mockResponse = { data: { payment: 1500 } };
        (api.post as jest.Mock).mockResolvedValue(mockResponse);

        fireEvent.change(screen.getByTestId('propertyPrice'), {
            target: { value: 500000 },
        });
        fireEvent.change(screen.getByTestId('downPayment'), {
            target: { value: 100000 },
        });
        fireEvent.change(screen.getByTestId('annualInterestRate'), {
            target: { value: 35 },
        });
        fireEvent.change(screen.getByTestId('amortizationPeriod'), {
            target: { value: 25 },
        });
        fireEvent.change(screen.getByTestId('paymentSchedule'), {
            target: { value: 'monthly' },
        });
        fireEvent.click(screen.getByText(/Calculate/i));

        await waitFor(() => {
            expect(screen.getByTestId('calculationResult')).toHaveValue('1500');
        });
    });

    it('calculation result field remains 0 if form values are invalid', async () => {
        fireEvent.click(screen.getByText(/Calculate/i));
        await waitFor(() => {
            expect(screen.getByTestId('calculationResult')).toHaveValue('0');
        });
    });
});
