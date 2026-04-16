/**
 * AdSky 25X Payment & Settlement Sentinel
 * Orchestrates Razorpay/Cashfree order generation and webhook processing.
 */

import prisma from '../prisma';
import { processCommissionSplit } from './wallet';

export const PaymentService = {
  /**
   * Initialize a ₹249 activation order
   */
  createActivationOrder: async (submissionId, amount = 249) => {
    console.log(`[Payment Sentinel] Initializing order for submission ${submissionId}: ₹${amount}`);
    
    /**
     * IN PRODUCTION:
     * const razorpay = new Razorpay({ key_id, key_secret });
     * const order = await razorpay.orders.create({ amount: amount * 100, currency: 'INR' });
     */
    
    return {
      orderId: `ORDER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      amount: amount,
      currency: 'INR',
      timestamp: new Date().toISOString()
    };
  },

  /**
   * Webhook Processor (The Bridge)
   * Triggered by Payment Gateway on success.
   */
  handleSuccessWebhook: async (payload) => {
    const { submissionId, transactionId } = payload;
    
    console.log(`[Payment Sentinel] Verified Success for Trans: ${transactionId}`);

    return await prisma.$transaction(async (tx) => {
      // 1. Update Submission status to 'success'
      const submission = await tx.submission.update({
        where: { id: submissionId },
        data: { paymentStatus: 'success' }
      });

      // 2. Trigger the Mission Reward Split (Commission logic)
      await processCommissionSplit(submission.id);

      // 3. Log Audit Node
      await tx.auditLog.create({
        data: {
          action: 'PAYMENT_SUCCESS_SETTLEMENT',
          metadata: { submissionId, transactionId, amount: 249 },
          ipAddress: 'gateway-webhook'
        }
      });

      return submission;
    });
  }
};
