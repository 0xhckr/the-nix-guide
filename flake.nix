{
  description = "The Nix Guide | A collection of resources for living and breathing in the nix world";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            pnpm_9
            nodejs_24
            typescript
            tailwindcss
            biome
          ];

          shellHook = ''
            nix run --extra-experimental-features nix-command --extra-experimental-features flakes .#install;
          '';
        };

        apps = {
          install = let
            install = pkgs.writeShellScript "install" ''
              ${pkgs.pnpm_9}/bin/pnpm install;
            '';
          in {
            type = "app";
            program = "${install}";
          };

          dev = let
            dev = pkgs.writeShellScript "dev" ''
              ${pkgs.pnpm_9}/bin/pnpm dev;
            '';
          in {
            type = "app";
            program = "${dev}";
          };

          build = let
            build = pkgs.writeShellScript "build" ''
              ${pkgs.pnpm_9}/bin/pnpm build;
            '';
          in {
            type = "app";
            program = "${build}";
          };

          preview = let
            preview = pkgs.writeShellScript "preview" ''
              ${pkgs.pnpm_9}/bin/pnpm preview;
            '';
          in {
            type = "app";
            program = "${preview}";
          };

          prod = let
            prod = pkgs.writeShellScript "prod" ''
              ${pkgs.pnpm_9}/bin/pnpm prod;
            '';
          in {
            type = "app";
            program = "${prod}";
          };
        };
      }
    );
}
