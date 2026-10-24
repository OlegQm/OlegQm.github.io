# Oleh Savchenko — GenAI & Data

An English-language engineering portfolio for [olegqm.github.io](https://olegqm.github.io/), built with **Astro, TypeScript and CSS**. It presents GenAI and AI/robotics projects, data analytics experience, education and public contact information.

## Development

Requires Node.js **22.12+** and npm.

```sh
npm ci
npm run dev
```

Open **http://127.0.0.1:4321/**. If Astro starts a background server, manage it from the project directory:

```sh
npm exec astro dev status
npm exec astro dev logs
npm exec astro dev stop
```

Check and preview the static build:

```sh
npm run check
npm run build
npm run preview -- --port 4324
```

The generated `dist/` directory is a complete static website. Node.js is needed for development and builds, not for serving the published site.

## Project structure

```text
src/
  pages/                  Routes, project page generator, sitemap and 404
  layouts/                Shared page shell and case-study layout
  features/
    navigation/           Header, footer and responsive menu
    theme/                System preference and persisted theme choice
    projects/             Collection queries, cards and visual covers
    media/                Image galleries and click-to-load video
  components/ui/          Shared interface elements
  content/
    profile.ts            Profile, public contacts and experience
    projects/*.md         Typed Markdown case studies
  content.config.ts       Content validation schema
  styles/                 Design tokens, themes and responsive layouts
  assets/                 Project imagery and social-image source
public/                   Favicon, social preview and font licenses
.github/workflows/        Verification and GitHub Pages deployment
```

Pages: Home, Projects, Articles, four dedicated case studies, About, Contact and 404. Project filenames determine their routes. Edit Markdown for case-study text, `profile.ts` for experience/contact information, `articles.ts` for article links, and `galleries.ts` for image captions and gallery entries. Content metadata is validated during checks and builds.

## Design and interactions

- Responsive layouts reflow from 320px, with touch-sized controls and keyboard navigation.
- Light and dark themes follow system preference until a manual choice is made. Theme switching still works when browser storage is unavailable.
- Image viewers use native dialogs with keyboard navigation, Escape dismissal and focus restoration.
- Navigation and image links remain usable without JavaScript; reduced-motion preferences are respected.
- Fonts are served locally. Manrope and Newsreader license notices are included in `public/font-licenses/`.
- Images are generated as responsive WebP assets. The site includes canonical URLs, social metadata, a sitemap and a useful 404 page.
- The YouTube player loads only after a click, using `youtube-nocookie.com` and `autoplay=0`. A direct video link remains available. No remote thumbnail, preconnect or video iframe is loaded beforehand.

## Project media

The manipulator photographs show genuine outdoor prototype testing. The linked video was reviewed in part and is presented as a project demonstration, without numerical performance claims.

The STU gallery contains genuine browser captures of the **Vue chat and admin interfaces**, launched in isolated local copies. Sessions, conversations, campus directions, dashboard metrics, health status and document lists use synthetic fixtures; live identity providers, LLM/RAG services, databases and external integrations are disconnected. Every capture is marked DEMO, and the case identifies its synthetic content. No project source or demo harness is included in this repository. STU work is described as a team contribution; Safe Agents Workspace is presented as a corporate assistant concept with an anonymized public version.

Case studies contain public descriptions and media, rather than the featured applications' source code or internal architecture. The current machine learning course is labelled **in progress**. A resume download can be added when a public PDF is available.

## Verification

```sh
npm run check
npm run build
```

`npm run check` validates Astro components and content. `npm run build` generates the static site in `dist/`.

## GitHub Pages

The repository is **OlegQm/OlegQm.github.io**, with canonical site URL **https://olegqm.github.io/** and root-relative routes.

The [deployment workflow](.github/workflows/deploy.yml) runs on pushes to `main` and can also be started manually. It installs locked dependencies on Node.js 22, checks types/content, builds the site and uploads `dist/`; a separate deployment job publishes the artifact to GitHub Pages.

Official GitHub Actions are pinned to commit hashes. The build job has read-only repository access; Pages/OIDC write permissions belong only to the deployment job. In repository settings, the Pages publishing source should be **GitHub Actions**.

Local verification is `npm run check` followed by `npm run build`. Deployment results are available in the repository's Actions history.
