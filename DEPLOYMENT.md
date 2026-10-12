# School Transport Management System: deployment folder

Two versions of the same project. Deploy whichever you need.

```
school-transport-deploy/
├── static-site/     Website prototype (one file, no server, no database)
│   ├── index.html
│   ├── netlify.toml
│   └── .nojekyll
└── python-app/      Full version: Python (Flask) + MySQL
    ├── app.py, schema.sql, requirements.txt, templates/
    ├── Dockerfile, docker-compose.yml, Procfile, .env.example
    └── README.md
```

## A. Website prototype (static-site)
`index.html` is the interactive prototype with three roles, editable data and the five rule checks. It needs no backend.
Edits are saved in each visitor's own browser.

**Quickest options (all free):**
1. **Netlify Drop:** go to app.netlify.com/drop and drag the `static-site` folder onto the page. You get a public link.
2. **GitHub Pages:** put the contents of `static-site` in a GitHub repo, then Settings > Pages > Deploy from branch (main, root).
3. **Vercel:** `npm i -g vercel`, then run `vercel` inside `static-site`.
4. **Any web host:** upload `index.html` to the public web folder.

To test locally, double-click `index.html`.

## B. Full Python + MySQL app (python-app)

**Option 1: Docker (easiest).** Install Docker, then in `python-app`:
```
docker compose up --build
```
Open http://localhost:5000. The database is created and filled with sample data on first start.
Set `MYSQL_ROOT_PASSWORD`, `SECRET_KEY` and `SCHOOL_NAME` in your shell or a `.env` file before real use.

**Option 2: Without Docker.**
1. Install MySQL 8 and Python 3.10+.
2. `mysql -u root -p < schema.sql`
3. `pip install -r requirements.txt`
4. `python app.py` and open http://127.0.0.1:5000
For production use `gunicorn -b 0.0.0.0:5000 app:app` instead of `python app.py`.

**Option 3: Cloud hosting.** Any host that runs Python (Render, Railway, a VPS) works with the included `Procfile`.
You also need a MySQL database (the host's MySQL add-on, or a managed MySQL). Run `schema.sql` on it once,
then set `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` and `SECRET_KEY` as environment variables (see `.env.example`).
`schema.sql` begins with `DROP DATABASE IF EXISTS school_transport`, so run it only on a fresh database.

## Before real use
- Change the default database password `transport123` (in `schema.sql` and `DB_PASSWORD`).
- Set a long random `SECRET_KEY`.
- The Admin / Driver / Parent switch is a demo role selector, not a login. Add authentication before putting real student data online.
