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
        const client = await clientPromise;
        const db = client.db("manga");
        const result = await db.collection("manga_articles").find({}).toArray();
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
        debugger
        body['createdAt'] = new Date().toUTCString();
        const result = await db.collection("manga_articles").insertOne(body);
        return res.json({ data: 'submited', error: false });
    } catch (error) {
        return res.json({ error });
    }
};

export default handler;


