import { regionMapping } from '@/constant';
import { NextApiRequest, NextApiResponse } from 'next';

export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

type Data = {
  ip?: string;
  sum?: number;
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    if (req.method === 'GET') {
      const ip = (req.headers['x-real-ip'] || req.socket.remoteAddress) as string;
      const sum = ip.split('.').reduce((acc: number, val: string) => acc + parseInt(val), 0);
      const region = process.env.VERCEL_REGION || 'Unknown';
      const body: Data = {
        ip,
        sum,
        msg: `I am an vercel function! (executed on ${region} - ${regionMapping[region]})`,
      };
      return res.status(200).json(body);
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).json({ msg: error.message });
    }
    return res.status(500).json({ msg: 'Unknown error has occured!'});
  }
}