from flask_socketio import SocketIO
import socket
import threading

socketio = SocketIO(cors_allowed_origins="*")

def handle_udp_server():
    udp_server = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    udp_server.bind(("0.0.0.0", 8080))

    while True:
        msg, addr = udp_server.recvfrom(1024)  # buffer size is 1024 bytes
        print(f"UDP Server received message: {msg} from {addr}")
        socketio.emit(msg.toString())

udp_thread = threading.Thread(target=handle_udp_server)
udp_thread.start()
