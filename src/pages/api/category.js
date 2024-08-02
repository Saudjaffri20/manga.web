import clientPromise from '@/lib/mongo/mongodb';

// pages/api/test.js
export default function handler(req, res) {
    console.log('MongoDB URI:', process.env.MONGODB_URI);
    res.status(200).json({ message: 'Check console for MongoDB URI' });
}
