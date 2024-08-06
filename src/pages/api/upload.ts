import { NextApiHandler, NextApiRequest } from 'next';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';

export const config = {
    api: {
        bodyParser: false,
    },
};

// Function to handle file parsing with formidable
const readFile = (
    req: NextApiRequest,
    saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const options: formidable.Options = {};
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), 'public/images');
        options.filename = (name, ext, path, form) => {
            return Date.now().toString() + '_' + path.originalFilename;
        };
    }
    options.maxFileSize = 4000 * 1024 * 1024;
    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
};

// API handler function
const handler: NextApiHandler = async (req, res) => {
    try {
        const imagesDir = path.join(process.cwd(), 'public/images');
        // Check if directory exists, if not create it
        await fs.readdir(imagesDir);
    } catch (error) {
        await fs.mkdir(path.join(process.cwd(), 'public/images'), { recursive: true });
    }

    // Parse the file and get file details
    const { files } = await readFile(req, true);

    // Extract file names from the files object
    const fileNames = Object.values(files).map((file: any) => file[0]?.newFilename || 'No file');
    
    // Respond with file names
    return res.json({ status: 200, data: fileNames, error: false });
};

export default handler;
