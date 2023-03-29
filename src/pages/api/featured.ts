import type {NextApiRequest, NextApiResponse} from 'next'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(405).json({sucess: false});
    }

    const featured = await fetch('https://vapo-api.vercel.app/api/v1/store/featured').then(res=>res.json())

    return res.status(200).json(featured);

}