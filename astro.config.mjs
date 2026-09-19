// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The production hostname. Used for sitemap.xml, canonical URLs and OpenGraph.
// DNS is NOT pointed here yet, by design -- see Part 5 of the build brief.
// Setting it now costs nothing and means the metadata is right on the day it is.
export default defineConfig({
  site: 'https://pack662nyc.com',
  integrations: [sitemap()],
  build: {
    // Emit /about/index.html rather than /about.html so URLs have no extension.
    format: 'directory',
  },
});
