import asyncio
import html
import json
import os
import re
from time import perf_counter

import aiohttp
import requests
import sqlalchemy as db
from dotenv import load_dotenv

load_dotenv()

print("RUNING")

url: str = os.getenv('DATABASE_URL')

engine = db.create_engine(url)
meta_data = db.MetaData(engine)
db.MetaData.reflect(meta_data)
vapo = meta_data.tables['Vapo']
tag_plus = meta_data.tables['TagPlus']

get_creds = (
    db.select(tag_plus).where(tag_plus.c.id == 1)
)

access_creds = engine.execute(get_creds).fetchone()

access_token = access_creds[2]
refresh_token = access_creds[1]


def check_tokens():
    global access_token
    global refresh_token

    if requests.get(f"https://api.tagplus.com.br/produtos?access_token={access_token}").status_code in range(400, 499):
        res = requests.post('https://api.tagplus.com.br/oauth2/token', data={
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_secret': os.getenv('CLIENT_SECRET'),
            'client_id': os.getenv('CLIENT_ID')
        })
        if res.status_code in range(200, 299):
            res = res.json()
            refresh_token = res['refresh_token']
            access_token = res['access_token']

            update_tokens = (
                db.update(tag_plus).where(tag_plus.c.id == 1).values(accessToken=access_token,
                                                                     refreshToken=refresh_token)
            )
            engine.execute(update_tokens)
        else:
            print('COULD NOT GET ACCESS TOKEN')
            exit()


check_tokens()

urlc = f'https://api.tagplus.com.br/categorias?access_token={access_token}'
urlp = f'https://api.tagplus.com.br/produtos?access_token={access_token}&categoria='

session = requests.session()
data = session.get(urlc).json()
parsedData = []


for item in data:
    if not item["categoria_mae"]:
        if item['id'] == 68:
            continue
        parsedData.append(
            {
                'id': item['id'],
                'name': item['descricao'],
                'slug': item['descricao'],
                'productCount': len(session.get(f'{urlp}{item["id"]}').json()),
                'children': [],
                "icon": '',
                'image': {
                    'thumbnail': '/assets/images/categories/' + item['descricao'].lower() + '.jpg',
                    'original': '/assets/images/categories/' + item['descricao'].lower() + '.jpg',
                }
            }
        )
        print(f"CATEGORY DONE - {item['id']}")

for item in data:
    if item['categoria_mae']:
        for cate in parsedData:
            if item['categoria_mae']['id'] == 68:
                continue
            if cate['id'] == item['categoria_mae']['id']:
                cate['children'].append(
                    {
                        "id": item['id'],
                        "name": item['descricao'],
                        "slug": item['descricao']
                    }
                )
                print(f"SUBCATEGORY DONE - {item['categoria_mae']['id']}")
                break

updateCategories = (
    db.update(vapo).where(vapo.c.id == 1).values(categories=json.dumps(parsedData))
)
engine.execute(updateCategories)


def format_description(text):
    text = html.unescape(text).replace(u'\xa0', u' ').replace('"', '').replace("N'", '').replace('\n', '').replace('\t',
                                                                                                                   '')
    text = text.split(" ")
    text = ' '.join(text)
    return text


data = []
length = 2000


def check_category(cid):
    for c_item in parsedData:
        if len(c_item['children']) >= 1:
            for child in c_item['children']:
                if child['id'] == cid:
                    return {
                        "id": c_item['id'],
                        "name": c_item['name'],
                        "sub_category_id": child['id'],
                        "sub_category_name": child['name']
                    }
    for c_item in parsedData:
        if c_item['id'] == cid:
            return {
                "id": c_item['id'],
                "name": c_item['name'],
                "sub_category_id": None,
                "sub_category_name": None
            }


def adjust_price(price, sale):
    if sale == 0:
        return price
    return sale


async def fetch(s, url):
    async with s.get(f"https://api.tagplus.com.br/produtos/{url}?access_token={access_token}&fields="
                     f"nome,descricao,descricao_longa,codigo,estoque,categoria,valor_venda_varejo,valor_oferta,"
                     f"data_criacao,imagens,imagem_principal") as res:
        if res.status != 200:
            return
        parsed = await res.json()
        if not parsed:
            return
        if not parsed['estoque']['qtd_revenda'] or parsed['estoque']['qtd_revenda'] <= 0:
            return
        img = ''
        if 'imagem_principal' in parsed and parsed['imagem_principal'] is not None and 'url' in parsed[
            'imagem_principal']:
            img = parsed['imagem_principal']['url']
        gallery = parsed['imagens']
        if img in gallery:
            gallery.remove(img)
        product = {
            "id": parsed['id'],
            "code": parsed['codigo'],
            "name": parsed['descricao'],
            "description": format_description(re.sub("\(.*?\)|\<.*?\>", "", parsed['descricao_longa'])),
            "slug": parsed['descricao'],
            "quantity": parsed['estoque']['qtd_revenda'],
            "category": check_category(parsed['categoria']['id']),
            "price": parsed['valor_venda_varejo'],
            "sale_price": adjust_price(parsed['valor_venda_varejo'], parsed['valor_oferta']),
            "image": img,
            "gallery": gallery,
            "created_on": parsed['data_criacao']
        }
        print(f"PRODUCT DONE - {product['id']}")
        data.append(product)


async def fetch_all(s, urls):
    tasks = []
    for url in urls:
        task = asyncio.create_task(fetch(s, url))
        tasks.append(task)
    res = await asyncio.gather(*tasks)
    return res


async def main():
    urls = range(1, length)
    async with aiohttp.ClientSession() as session:
        await fetch_all(session, urls)
    update_products = (
        db.update(vapo).where(vapo.c.id == 1).values(products=json.dumps(data))
    )
    engine.execute(update_products)


if __name__ == '__main__':
    start = perf_counter()
    asyncio.run(main())
    stop = perf_counter()
    print("time taken:", stop - start)

print('ENDING')
