import { useState } from 'react';

import MortgageForm from '../components/forms/MortgageForm';
import styles from './Mortgage.module.css';

import api from '../utils/api';

type MortgagePayload = {
    propertyPrice: number;
    downPayment: number;
    annualInterestRate: number;
    amortizationPeriod: number;
    paymentSchedule: string;
};

type MortgageCalculationResponse = {
    data: {
        payment: number;
    };
};

const Mortgage = () => {
    const [calculation, setCalculation] = useState(0);
    const handleSubmit = async (data: MortgagePayload) => {
        try {
            const response: MortgageCalculationResponse = await api.post(
                '/mortgage/calculate',
                data
            );
            setCalculation(response.data?.payment);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Mortgage Calculator</h1>
            <MortgageForm onSubmit={handleSubmit} />
            <hr className={styles.divider} />
            <label className={styles.label}> Result: (Payment)</label>
            <div className={styles.inputContainer}>
                <span className={styles.span}>$</span>
                <input
                    data-testid="calculationResult"
                    className={styles.input}
                    value={calculation}
                    disabled={true}
                    type="text"
                    readOnly
                />
            </div>
        </div>
    );
};

export default Mortgage;
