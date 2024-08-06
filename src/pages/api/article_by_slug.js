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
        const { slug } = req.query;
        const client = await clientPromise;
        const db = client.db("manga");
        const result = await db.collection("Product").findOne({ 'title': slug });
        return res.json({ status: 200, data: result });
    } catch (error) {
        return res.json({ error });
    }
};

export default handler;


