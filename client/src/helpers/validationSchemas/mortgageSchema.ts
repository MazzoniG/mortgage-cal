import joi from 'joi';

export const mortgageValidation = {
    calculate: joi.object({
        propertyPrice: joi.number().positive().required().messages({
            'number.base': 'Property price must be a number',
            'number.positive': 'Property price must be a positive number',
            'any.required': 'Property price is required',
        }),
        downPayment: joi
            .number()
            .positive()
            .required()
            .messages({
                'number.base': 'Down payment must be a number',
                'number.positive': 'Down payment must be a positive number',
                'any.required': 'Down payment is required',
                'any.custom':
                    'Down payment must be at least 5% of the property price',
            })
            .custom((value, { state: { ancestors }, error }) => {
                const { propertyPrice } = ancestors[0];
                return value < propertyPrice * 0.05
                    ? error('any.custom', {
                          message:
                              'Down payment must be at least 5% of the property price',
                      })
                    : value;
            }),
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
