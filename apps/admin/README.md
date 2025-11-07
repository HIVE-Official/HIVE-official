This folder contains an older, standalone Next.js admin app used during early development.

Status: deprecated

The canonical admin surface now lives in the web app at `apps/web` under the `/admin` route. All admin features, authentication, rate limiting, and CSRF protections are implemented there using the consolidated middleware.

Please avoid adding new code here. Build admin features under `apps/web/src/app/admin` and `/api/admin/*` routes.

