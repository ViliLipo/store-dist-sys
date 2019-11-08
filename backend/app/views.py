from app import app


@app.route('/')
def index():
    return '{"json": "true"}'
