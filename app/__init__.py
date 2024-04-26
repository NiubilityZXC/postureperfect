from flask import Flask
from .realtime_comm import socketio  # Assuming realtime_comm.py contains the SocketIO setup

def create_app():
    app = Flask(__name__)
    socketio.init_app(app)

    from . import routes
    app.register_blueprint(routes.bp)

    return app
