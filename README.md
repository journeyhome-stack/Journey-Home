# Journey Home — Official Website

Official static website for **Journey Home**, a stylized 3D third-person adventure game with exploration and puzzle-solving across five ancient island regions.

Built with React, TypeScript, Vite (`base: './'`), and Tailwind CSS. No backend, database, or API keys are used, so the compiled `dist/` folder deploys cleanly to GitHub Pages (including repository subfolders like `https://username.github.io/journey-home/`).

---

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build the production static bundle:
   ```bash
   npm run build
   ```
4. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## Deploying to GitHub Pages

This repository includes `.github/workflows/deploy.yml`.

1. Push your repository to GitHub with `main` as your default branch (make sure `package-lock.json` is committed alongside `package.json`).
2. In your GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to `main` (or trigger **Deploy to GitHub Pages** manually from the **Actions** tab).

Because `vite.config.ts` uses `base: './'` and all assets use relative paths, the site works at both custom domains and repository subfolders (`https://<username>.github.io/<repo>/`).

---

## Customizing Content (`src/config/siteConfig.ts`)

Everything you need to update is inside **`src/config/siteConfig.ts`**:

### 1. Adding Screenshots & Artwork
Place your image files in `public/images/` (for example `public/images/hero.jpg`) and set the matching `src` field using a relative path like `"./images/hero.jpg"`. Leaving `src: ""` displays a designed placeholder frame.

| Slot | Recommended Size | Config Key (`src/config/siteConfig.ts`) | Where It Appears |
| :--- | :--- | :--- | :--- |
| Hero artwork | `1920x1080 (16:9)` | `heroImage.src` | Full-viewport Hero background |
| About artwork | `1920x1080 (16:9)` | `aboutImage.src` | About the Game section |
| Region 1–5 screenshots | `1920x1080 (16:9)` | `regions[0..4].image.src` | The Five Regions interactive showcase |
| Trailer thumbnail | `1920x1080 (16:9)` | `trailer.thumbnailSrc` | Trailer player before clicking play |
| Gallery screenshots (8 slots) | `1920x1080 (16:9)` | `screenshots[0..7].src` | Screenshots & Trailer grid + Lightbox |
| Social share card (OG / Twitter) | `1200x630` | `socialShareImage.src` + `index.html` meta tags | Link previews on Discord, X, Facebook |

### 2. Adding the Trailer
1. Upload your trailer to YouTube and copy only the video ID (the text after `v=` in the URL).
2. Paste it into `trailer.youtubeId` in `src/config/siteConfig.ts`.
3. Optionally set `trailer.thumbnailSrc` (or leave empty to use the YouTube thumbnail). The embed uses `youtube-nocookie.com` and only loads when the visitor clicks play.

### 3. Adding Browser Play & Download Links
- **Browser Play**: Paste your playable web URL into `playInBrowserUrl`.
- **Downloads**: In `downloads`, find the platform (`windows`, `macos`, `linux`, `android`, `other`), paste the build `url`, update `version` and `fileSize`, and change `available: false` to `available: true`.
- Enabling `android` automatically reveals the **Android Install Tips** note in the Download section.

### 4. Adding Social Links & Contact Email
- In `socialLinks`, paste each full URL into its `url` field. Empty URLs stay visible as dimmed `"Coming soon"` icons with no dead links. Set `enabled: false` to hide an icon completely.
- Fill `contactEmail` to display a direct `Send Email` button in the Community section.

### 5. Adding or Deleting News Posts
- Edit the `news` array in `src/config/siteConfig.ts`.
- Delete the `"Welcome to Journey Home"` example entry whenever you publish your first real update.
- Add `details: ['Bullet 1', 'Bullet 2']` to any post to include an expandable patch-notes drawer.
