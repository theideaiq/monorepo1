import 'server-only';
import { Logger } from '@repo/utils';

export const wayl = {
  /**
   * Creates a payment session with the Wayl payment gateway.
   *
   * @param amount - The amount to charge.
   * @param currency - The currency code (e.g., 'IQD', 'USD').
   * @param description - Description of the transaction.
   * @returns A promise resolving to the payment checkout URL.
   *
   * @example
   * const url = await wayl.createPayment(50000, 'IQD', 'Order #123');
   * redirect(url);
   */
  createPayment: async (
    amount: number,
    currency: string,
    description: string,
  ) => {
    // Note: We log the intent but strictly avoid logging sensitive PII or card data if we had it.
    Logger.log('Creating payment session:', { amount, currency, description });

    // Mock Implementation: In a real app, this would be a POST request to https://api.wayl.com/v1/checkout
    // Returns a dummy URL for simulation.
    return `https://checkout.wayl.com/pay/${Math.random().toString(36).substring(7)}`;
  },
};
