# A_ID

Code for the site.

`frontend/` is a React app: the public pages, and an `/admin` area. Admin login accepts any email and password and stores a demo user in the browser. It does not call an API. Locale files the site loads are in `frontend/public/locales/`.

`backend/` is FastAPI. `GET /` returns `{"message": "Hello World"}`. `tests/` checks that response.
