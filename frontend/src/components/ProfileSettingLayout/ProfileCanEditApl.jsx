import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { message } = req.body;
      const dataFilePath = path.join(process.cwd(), 'public', 'data.json');
      
      // read JSON file
      const jsonData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
      
      // add new message
      jsonData.messages.push({
        role: 'user',
        content: message,
        timestamp: new Date().toISOString(),
      });
      
      // write JSON file
      fs.writeFileSync(dataFilePath, JSON.stringify(jsonData, null, 2));
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('handle error', error);
      res.status(500).json({ success: false, error: 'server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`method ${req.method} not allowed`);
  }
}

