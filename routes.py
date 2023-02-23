from aiohttp import web
from models.queries import create_client


async def index(request):
    print(request)
    context = {'message': 1}
    await create_client('Arseny')
    return web.json_response(context)


routes = [
    web.get('/', index, name='main')
]


def setup_routes(app):
    print(2)
    app.add_routes(routes)
