const welcome = (req: any, res: any) => {
    res.status(200).json({ message: 'The Mortgage API' });
};

const calculate = (req: any, res: any) => {
    const {
        propertyPrice,
        downPayment,
        annualInterestRate,
        amortizationPeriod,
        paymentSchedule,
    } = req.body;

    if (downPayment < propertyPrice * 0.05) {
        return res.status(400).json({
            message: 'Down payment should be at least 5% of the property price',
        });
    }

    const principal = propertyPrice - downPayment;
    let paymentPerYear = 0;

    if (
        paymentSchedule === 'accelerated bi-weekly' ||
        paymentSchedule === 'bi-weekly'
    ) {
        paymentPerYear = 26;
    } else {
        paymentPerYear = 12;
    }

    const r = annualInterestRate / 100 / paymentPerYear;
    const n = amortizationPeriod * paymentPerYear;
    const payment =
        (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);

    res.status(200).json({ payment: payment.toFixed(2) });
};

export default {
    welcome,
    calculate,
};
