import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../lib/prisma";


let access_token:string
let refreshToken:string

async function updateCategories() {
    const url_categories = 'https://api.tagplus.com.br/categorias?access_token=' + access_token
    const url_products = "https://api.tagplus.com.br/produtos?access_token=" + access_token + "&categoria="

    const data = await fetch(url_categories).then(res => res.json())

    let parsedData = []

    for (let i = 0; i < data.length; i++) {
        if (data[i]['categoria_mae'] == null)
            parsedData.push(
                {
                    'id': data[i]['id'],
                    'name': data[i]['descricao'],
                    'slug': data[i]['descricao'],
                    'productCount': await fetch(url_products + data[i]['id']).then(res => res.json()).then(res => res.length),
                    'children': [] as any,
                    'icon': '',
                    'image': {
                        'thumbmail': '/assets/images/categories/' + data[i]['descricao'].toLowerCase() + '.jpg',
                        'original': '/assets/images/categories/' + data[i]['descricao'].toLowerCase() + '.jpg'
                    }
                }
            )
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i]['categoria_mae'] != null)
            for (let j = 0; j < parsedData.length; j++) {
                if (parsedData[j]['id'] == data[i]['categoria_mae']['id']) {
                    parsedData[j]['children'].push({
                        'id': data[i]["id"],
                        'name': data[i]['descricao'],
                        'slug': data[i]["descricao"]
                    })
                    break
                }
            }
    }
    await prisma.vapo.update({
        where:{
            'id': 1
        }, data: {
            categories: JSON.stringify(parsedData)
        }
    })
    return parsedData
}

function htmlEntities(str: string) {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"'],
        ['atilde', 'ã'],
        ['aacute', 'á'],
        ['oacute', 'ó'],
        ['ccedil', 'ç'],
        ['eacute', 'é'],
        ['ecirc', 'ê'],
        ["N'", '']
    ];

    for (var i = 0, max = entities.length; i < max; ++i)
        str = str.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);

    return str.replace(/<\/?[^>]+(>|$)/g, "")
}

function check_category(id: number, categories: any) {
    for(let i=0;i<categories.length;i++) {
        if (categories[i].children.length >= 1) {
            const childIndex = categories[i].children.findIndex((x: any) => x.id == id)
            if(childIndex!=-1)
                return {
                    "id": categories[i].id,
                    "name": categories[i].name,
                    "sub_category_id": categories[i].children[childIndex].id,
                    "sub_category_name": categories[i].children[childIndex].name
                }
        }
    }
}

async function updateProducts() {
    const length = await fetch('https://api.tagplus.com.br/produtos?access_token=' + access_token+'&per_page=5000').then(res => res.json()).then(res => res.length)
    let parsedData = []
    const categories =  await prisma.vapo.findUnique({
        where: {
            id:1
        }, select: {
            categories: true
        }
    })
    if (!categories)
        return
    const categories_data = JSON.parse(categories.categories)
    for (let i = 1; i <= length; i++) {
        try {
            let product = await fetch('https://api.tagplus.com.br/produtos/' + i + '?access_token=' + access_token).then(res => res.json())
            if (!product["estoque"]['qtd_revenda'] || product["estoque"]['qtd_revenda'] == 0)
                continue
            let gallery = product['imagens']
            if (product['imagem_principal']['url'] in gallery)
                gallery.pop(product['imagem_principal']['url'])
            parsedData.push({
                "id": product['id'],
                "code": product['codigo'],
                "name": product["descricao"],
                "description": htmlEntities(product['descricao_longa']),
                "slug": product['descricao'],
                "quantity": product["estoque"]['qtd_revenda'],
                "category": check_category(product['categoria']['id'], categories_data),
                "price": product['valor_venda_varejo'],
                "sale_price": product['valor_oferta'] == 0 ? product['valor_venda_varejo'] : product['valor_oferta'],
                "image": product['imagem_principal']['url'],
                "gallery": gallery,
                'createdOn': product['data_criacao']
            })
        } catch (err) {
            console.log(err)
        }
    }
    await prisma.vapo.update({
        where:{
            'id': 1
        }, data: {
            products: JSON.stringify(parsedData)
        }
    })
    return parsedData
}

//@ts-ignore
async function refresh(): Promise<boolean> {
    if (await fetch('https://api.tagplus.com.br/produtos?access_token=' + access_token).then(res => res.status) === 401) {
        const data = {
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken,
            'client_secret': process.env.CLIENT_SECRET,
            'client_id': process.env.CLIENT_ID
        }
        const res = await fetch('https://api.tagplus.com.br/oauth2/token', { body: JSON.stringify(data) }).then(res => res.json())
        console.log(res)
        access_token = res.access_token,
            refreshToken = res.refresh_token
        return true
    }
    return false
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
        return res.status(405).json({ success: false });
    }

    const credentials = await prisma.tagPlus.findUnique({
        where:{
            id:1
        },select:{
            accessToken: true,
            refreshToken: true
        }
    })

    if (!credentials)
        return res.status(500).json({ success: false });

    access_token = credentials.accessToken
    refreshToken = credentials.refreshToken

    await updateCategories()
    await updateProducts()

    return res.status(201).json({ success: true });
}