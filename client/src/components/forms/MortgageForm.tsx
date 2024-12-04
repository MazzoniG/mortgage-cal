import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import styles from './MortgageForm.module.css';
import { mortgageValidation } from '../../helpers/validationSchemas/mortgageSchema';

type formProps = {
    onSubmit: (data: any) => void;
};

const MortgageForm = (props: formProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: joiResolver(mortgageValidation.calculate),
    });

    return (
        <div>
            <form
                className={styles.formContainer}
                onSubmit={handleSubmit(props.onSubmit)}
            >
                <label className={styles.label}>Property Price</label>
                <div className={styles.inputContainer}>
                    <span className={styles.span}>$</span>
                    <input
                        data-testid="propertyPrice"
                        className={`${styles.input} ${errors.propertyPrice && styles.inputError}`}
                        type="number"
                        placeholder="Enter amount"
                        {...register('propertyPrice')}
                    />
                </div>
                {errors.propertyPrice &&
                    typeof errors.propertyPrice.message === 'string' && (
                        <p className={styles.errorMessage}>
                            {errors.propertyPrice.message}
                        </p>
                    )}
                <label className={styles.label}>Down Payment</label>
                <div className={styles.inputContainer}>
                    <span className={styles.span}>$</span>
                    <input
                        data-testid="downPayment"
                        className={`${styles.input} ${errors.downPayment && styles.inputError}`}
                        type="number"
                        placeholder="Enter amount"
                        {...register('downPayment')}
                    />
                </div>
                {errors.downPayment &&
                    typeof errors.downPayment.message === 'string' && (
                        <p className={styles.errorMessage}>
                            {errors.downPayment.message}
                        </p>
                    )}
                <label className={styles.label}>Annual Interest Rate</label>
                <div className={styles.inputContainer}>
                    <span className={styles.span}>%</span>
                    <input
                        data-testid="annualInterestRate"
                        className={`${styles.input} ${errors.annualInterestRate && styles.inputError}`}
                        type="number"
                        placeholder="Enter rate"
                        {...register('annualInterestRate')}
                    />
                </div>
                {errors.annualInterestRate &&
                    typeof errors.annualInterestRate.message === 'string' && (
                        <p className={styles.errorMessage}>
                            {errors.annualInterestRate.message}
                        </p>
                    )}
                <label className={styles.label}>Amortization Period</label>
                <input
                    data-testid="amortizationPeriod"
                    className={`${styles.input} ${errors.amortizationPeriod && styles.inputError}`}
                    type="number"
                    placeholder="Enter years"
                    min="5"
                    max="30"
                    {...register('amortizationPeriod')}
                />
                {errors.amortizationPeriod &&
                    typeof errors.amortizationPeriod.message === 'string' && (
                        <p className={styles.errorMessage}>
                            {errors.amortizationPeriod.message}
                        </p>
                    )}
                <label className={styles.label}>Payment Schedule</label>
                <select
                    className={`${styles.input} ${errors.paymentSchedule && styles.inputError}`}
                    data-testid="paymentSchedule"
                    id="paymentSchedule"
                    defaultValue={'0'}
                    {...register('paymentSchedule')}
                >
                    <option value="">Select a payment schedule</option>
                    <option value="monthly">Monthly</option>
                    <option value="bi-weekly">Bi-Weekly</option>
                    <option value="accelerated bi-weekly">
                        Accelerated Bi-Weekly
                    </option>
                </select>
                {errors.paymentSchedule &&
                    typeof errors.paymentSchedule.message === 'string' && (
                        <p className={styles.errorMessage}>
                            {errors.paymentSchedule.message}
                        </p>
                    )}
                <div className={styles.buttonContainer}>
                    <button className={styles.button} type="submit">
                        Calculate
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MortgageForm;
