import clientPromise from '@/lib/mongo/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        if (data) {
            const isPasswordValid = await bcrypt.compare(body.password, data.password);
            if (!isPasswordValid) {
                return res.json({ message: "Wrong Password ", error: true });
            } else {
                const id = data._id.toString();
                const token = jwt.sign({ id: id, username: data.username }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });
                const result = await data;
                result['token'] = token;
                return res.json({ status: 200, data: result });
            }
        } else {
            return res.json({ message: "User Doesn't Exists", error: true });
        }

    } catch (error) {
        return res.json({ error });
    }
};

export default handler;
