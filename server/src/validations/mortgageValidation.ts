import joi from 'joi';

const mortgageValidation = {
    calculate: joi.object({
        propertyPrice: joi.number().positive().required(),
        downPayment: joi.number().positive().required(),
        annualInterestRate: joi.number().positive().max(100).required(),
        amortizationPeriod: joi
            .number()
            .valid(5, 10, 15, 20, 25, 30)
            .required(),
        paymentSchedule: joi
            .string()
            .valid('accelerated bi-weekly', 'bi-weekly', 'monthly')
            .required(),
    }),
};

export default mortgageValidation;
