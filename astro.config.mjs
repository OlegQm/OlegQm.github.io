import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://olegqm.github.io',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
