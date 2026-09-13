# Masjid Arkan website

The Masjid Arkan public website and password-protected admin panel.

## Private admin panel

After deployment, open `/admin.html`. It allows authorized staff to update all
five Iqamah times, Jumu'ah details, and up to three public announcements. Public
homepage content updates as soon as the admin form is saved.

## Railway deployment

Railway runs the site using `npm start`. Add these Railway variables before the
first deployment:

```text
ADMIN_PASSWORD=<a strong password chosen by the masjid>
SESSION_SECRET=<a long random value>
NODE_ENV=production
```

For persistent admin edits, create a Railway volume mounted at `/data`. The
server automatically uses `/data/site-content.json` and seeds it once from the
repository. Do not delete that volume during redeployments.

If your volume uses a different mount location, add this variable:

```text
ARKAN_CONTENT_FILE=/data/site-content.json
```

Without a persistent volume, Railway can lose schedule and announcement updates
when it restarts or redeploys the service.

## Local development

```bash
npm install
ADMIN_PASSWORD="your-local-password" SESSION_SECRET="your-long-local-secret" npm start
```

Do not commit `.env` or share the admin password.
