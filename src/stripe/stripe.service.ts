import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(@Inject('STRIPE_API_KEY') private readonly apiKey: string) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2024-06-20',
    });
  }

  async getProducts(): Promise<Stripe.Product[]> {
    const newProducts = await this.stripe.products.create({
      name: 'Perrito de mentiras',
      images: ['https://example.com/perrito.jpg'],
      default_price_data: {
        currency: 'usd',
        unit_amount: 2000,
      },
    });
    const products = await this.stripe.products.list();

    return products.data;
  }

  async getCustomers() {
    const customers = await this.stripe.customers.list({});
    return customers.data;
  }
}
