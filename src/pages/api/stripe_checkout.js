import clientPromise from '@/lib/mongo/mongodb';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            //// New Code
            const { productId } = await req.body;
            const client = await clientPromise;
            const db = client.db("manga");
            const product = await db.collection("Product").findOne({ productId: productId }, { price: 1, productId: 1 });
            const amount = product.price * 100;
            // const { amount } = req.body;
            // const amount = 30 * 100;
            // Create a Payment Intent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'usd',
                payment_method_types: ['card'],
            });
            res.status(200).json({ clientSecret: paymentIntent.client_secret });

        } catch (err) {
            res.json({ error: err.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
