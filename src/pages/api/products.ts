import type {NextApiRequest, NextApiResponse} from 'next'
import prisma from "../../../lib/prisma";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(405).json({success: false});
    }

    const products =  await prisma.vapo.findUnique({
        where: {
            id:1
        }, select: {
            products: true
        }
    })
    if(!products)
        return res.status(500).json({success: false});
    return res.status(200).json(JSON.parse(products.products));

}