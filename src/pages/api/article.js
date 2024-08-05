import clientPromise from '@/lib/mongo/mongodb';

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
        // const id = req.query.userId;
        const client = await clientPromise;
        const db = client.db("manga");
        const result = await db.collection("Product").find({}).limit(4).toArray();
        return res.json({ status: 200, data: result });
    } catch (error) {
        return res.json({ error });
    }
};

const handlePost = async (req, res) => {
    try {
        const body = await req.body;
        const client = await clientPromise;
        const db = client.db("manga");
        body['createdAt'] = new Date().toUTCString();
        body['productId'] = Date.now().toString(16);
        const result = await db.collection("Product").insertOne(body);
        return res.json({ message: 'submited', error: false });
    } catch (error) {
        return res.json({ error });
    }
};

export default handler;


