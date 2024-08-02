import clientPromise from '@/lib/mongo/mongodb';
import bcrypt from 'bcryptjs';

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
        const allPosts = await db.collection("manga_categories").find({}).toArray();
        return res.json({ status: 200, data: allPosts });
    } catch (error) {
        return res.json({ error });
    }
};

const handlePost = async (req, res) => {
    try {
        const body = await req.body;
        const client = await clientPromise;
        const db = client.db("manga");
        const data = await db.collection("Users").findOne({ 'email': body.email });
        const hashedPassword = await bcrypt.hash(body.password, 10);

        if (data) {
            return res.json({ message: "User Aleady Exists", error: true });
        } else {
            body['isFirstLogin'] = true;
            body['createdOn'] = new Date();
            body['isVerified'] = "";
            body['token'] = "";
            body['userId'] = new Date().toISOString().split('T')[0].split('-')[0].slice() + new Date().toISOString().split('T')[0].split('-')[1].slice() + new Date().toISOString().split('T')[0].split('-')[2].slice() + new Date().toISOString().split('T')[1].split(':')[0].slice() + new Date().toISOString().split('T')[1].split(':')[1].slice('.')[0].slice() + new Date().toISOString().split('T')[1].split(':')[2].slice().slice('.')[0].slice();
            body['password'] = hashedPassword;
            const result = await db.collection("Users").insertOne(body);
            return res.json({ data: result, error: false });
        }

    } catch (error) {
        return res.json({ error });
    }
};

export default handler;


