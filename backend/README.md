# Evergrain Django Backend

Products API with bilingual fields (EN/AR), images and videos, and Django admin.

## Setup

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py createadmin
```

- **Admin:** username `admin`, password `admin`
- **Admin URL:** http://localhost:8000/admin/

## Import products from JSON

To load products from the repo's `public/initial-products.json` (all details, both languages, media as URLs):

```bash
python manage.py load_products_json
```

Optional:

- `--file path/to/initial-products.json` — use another file
- `--clear` — delete existing products before importing

## Run server

```bash
python manage.py runserver
```

- API: http://localhost:8000/api/products/
- Same shape as static file: http://localhost:8000/api/initial-products.json

## Connect frontend

In project root, create or edit `.env`:

```
VITE_API_URL=http://localhost:8000
```

Then run the Vite app; it will load products from the Django API instead of `initial-products.json`.

## API response shape

- `GET /api/initial-products.json` or `GET /api/products/`  
  Returns: `{ "removedIds": [], "customProducts": [ ... ] }`  
  Each product includes `id`, `title_en`, `title_ar`, descriptions, prices, badges, features (arrays), and `media` (array of `{ type, url }`), `image`, `images`.

## Adding products in admin

1. Go to http://localhost:8000/admin/
2. Log in with `admin` / `admin`
3. **Products** → Add product: fill English and Arabic fields, then add **Media** (type: image or video; upload file or set URL).
