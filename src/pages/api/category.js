import clientPromise from '@/lib/mongo/mongodb';

export  default async function (req, res) {
    try {
        const client = await clientPromise;
        const db = client.db("manga");
        const allPosts = await db.collection("manga_categories").find({}).toArray();
        return res.json({ status: 200, data: allPosts });
    } catch (error) {
        return res.json({ error });
    }
}
