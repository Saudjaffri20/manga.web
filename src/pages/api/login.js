import clientPromise from '@/lib/mongo/mongodb';
import { serialize } from 'cookie';
import Cookies from 'js-cookie'

// export async function POST(req, res) {
//     return res.json({ data: req.method });
// }

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
        const data = await db.collection("users").findOne({ 'email': body.email });
        if (data) {
            return res.json({ status: 200, data: data });
        } else {
            return res.json({ message: "User Doesn't Exists", error: true });
        }

    } catch (error) {
        return res.json({ error });
    }
};

export default handler;
