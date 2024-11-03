from mitmproxy import http

def request(flow: http.HTTPFlow) -> None:
    if "fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game" in flow.request.pretty_url:
        flow.request.host = "localhost"
        flow.request.port = 5600
        flow.request.scheme = "http"
