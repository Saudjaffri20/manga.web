import clientPromise from '@/lib/mongo/mongodb';
import { ObjectId } from 'mongodb';

const handler = async (req, res) => {
    switch (req.method) {
        case 'GET':
            return handleGet(req, res);
        case 'POST':
            return handlePost(req, res);
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

const handleGet = async (req, res) => {
    try {
        const id = req.query.userId;
        const client = await clientPromise;
        const db = client.db("manga");
        const result = await db.collection("Subscription").findOne({ 'userId': id });
        if (result) {
            return res.json({ status: 200, data: result });
        } else {
            return res.json({ status: 200, message: "No Subscription", error: true });
        }
    } catch (error) {
        return res.json({ error });
    }
};

const handlePost = async (req, res) => {
    try {
        const body = await req.body;
        const client = await clientPromise;
        const db = client.db("manga");
        body['totalAmount'] = body.totalAmount;
        const isUserExists = await db.collection("CheckOut").findOne({ 'userId': body.userId });
        if (isUserExists) {
            const products = body['products'];
            await db.collection("CheckOut").updateOne(
                { "_id": Object(isUserExists._id) },
                { "$set": { products: products } },
            );
        } else {
            await db.collection("CheckOut").insertOne(body);
        }
        return res.json({ message: 'Payment Added', error: false });
    } catch (error) {
        return res.json({ error });
    }
};

export default handler;


