#!/usr/bin/env python3
"""
Simple HTTP server for serving the Vantara AI Photo Booth mockup
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

PORT = 8000
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def main():
    """Start the HTTP server"""
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"✅ Server starting...")
            print(f"📁 Serving directory: {DIRECTORY}")
            print(f"🌐 Local URL: http://localhost:{PORT}")
            print(f"🌍 Network URL: http://0.0.0.0:{PORT}")
            print(f"⏹️  Press Ctrl+C to stop the server")
            print("-" * 50)
            
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n🛑 Server stopped by user")
                
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"❌ Port {PORT} is already in use. Trying port {PORT + 1}...")
            PORT_NEW = PORT + 1
            with socketserver.TCPServer(("", PORT_NEW), CustomHTTPRequestHandler) as httpd:
                print(f"✅ Server starting on port {PORT_NEW}...")
                print(f"🌐 Local URL: http://localhost:{PORT_NEW}")
                print(f"⏹️  Press Ctrl+C to stop the server")
                httpd.serve_forever()
        else:
            print(f"❌ Error starting server: {e}")
            sys.exit(1)

if __name__ == "__main__":
    main()