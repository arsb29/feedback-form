from models.clients import Clients


async def create_client(name):
    result = Clients(
        name=name
    )
    return await result.create()
