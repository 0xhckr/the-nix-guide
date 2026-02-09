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
        { label: "Getting Started", slug: "getting-started" },
        {
          label: "NixOS",
          autogenerate: { directory: "nixos" },
        },
      ],
    }),
  ],
});
