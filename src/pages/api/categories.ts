import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../../lib/prisma";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(405).json({success: false});
    }

    const categories =  await prisma.vapo.findUnique({
        where: {
            id:1
        }, select: {
            categories: true
        }
    })
    if(!categories)
        return res.status(500).json({success: false});
    return res.status(200).json(JSON.parse(categories.categories));
}