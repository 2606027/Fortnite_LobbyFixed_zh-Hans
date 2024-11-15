from mitmproxy import http
import os
import json

ASSETS_DIR = os.path.join(os.path.dirname(__file__), 'assets')
DATA_FILE = os.path.join(ASSETS_DIR, 'childProtect.json')

# https://api.kws.ol.epicgames.com/v1/epic-settings/public/users/(玩家id)/values?productId=prod-fn&playtime=true 
def request(flow: http.HTTPFlow) -> None:
    if "fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game" in flow.request.pretty_url:
        flow.request.host = "localhost"
        flow.request.port = 5600
        flow.request.scheme = "http"