// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "The Nix Guide",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/0xhckr/the-nix-guide",
        },
      ],
      sidebar: [
        { label: "Introduction", slug: "introduction" },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
