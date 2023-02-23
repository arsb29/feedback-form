from aiohttp import web

from models import db
from routes import setup_routes


async def before_server_start(app):
    await db.set_bind(app['config']['db_dsn'])
    await db.gino.create_all()


async def after_server_stop(_):
    await db.pop_bind().close()


async def create_app(config):
    app = web.Application()
    app['config'] = config
    setup_routes(app)
    app.on_startup.append(before_server_start)
    app.on_cleanup.append(after_server_stop)
    print(app)
    return app
