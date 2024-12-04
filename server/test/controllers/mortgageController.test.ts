import { expect } from 'chai';
import request from 'supertest';

import app from '../../src/app';

describe('Mortgage Controller', () => {
    describe('GET /welcome', () => {
        it('returns a welcome message', async () => {
            const res = await request(app).get('/welcome');
            expect(res.status).to.equal(200);
            expect(res.body.message).to.equal('The Mortgage API');
        });
    });

    describe('POST /calculate', () => {
        it('returns the calculated payment for valid payload', async () => {
            const res = await request(app).post('/calculate').send({
                propertyPrice: 500000,
                downPayment: 100000,
                annualInterestRate: 35,
                amortizationPeriod: 25,
                paymentSchedule: 'monthly',
            });
            expect(res.status).to.equal(200);
            expect(res.body.payment).to.equal('1989.65');
        });

        it('returns an error if down payment is less than 5% of property price', async () => {
            const res = await request(app).post('/calculate').send({
                propertyPrice: 500000,
                downPayment: 20000,
                annualInterestRate: 20,
                amortizationPeriod: 15,
                paymentSchedule: 'monthly',
            });
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal(
                'Down payment should be at least 5% of the property price'
            );
        });
    });
});
