from backend.server import app
from fastapi.testclient import TestClient


def test_root_endpoint_returns_greeting():
    response = TestClient(app).get("/")

    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}
