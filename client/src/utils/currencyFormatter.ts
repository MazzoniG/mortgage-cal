export const formatCurrency = (amount: string) => {
    return parseInt(amount).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
};

module.exports = { formatCurrency };
