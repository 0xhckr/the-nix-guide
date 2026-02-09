---
title: Flakes
description: Fishies?
slug: nixos/flakes
sidebar: 
  order: 2
---

Flakes are an experimental feature in Nix that allows you to define your configurations in a way that is more declarative and easier to work with (note: I say they're experimental because the NixOS team says they're experimental, functionally, however, they're extremely widely adopted and very stable).

To turn our configuration into a flake, we're going to add a file called `flake.nix` to our `~/nixos` folder. 

<span style="background-color: #982222; font-weight: bold; padding: 1em; display: inline-block; margin: 1em 0;">
NOTE: The <span style="background-color: #984447; color: #fff; padding: 0.25em 0.5em; border-radius: 3px; display: inline-block;">~/nixos</span> folder will be referred to as the root folder from now on.
</span>

In our examples, we're going to assume you've got a configuration for 3 different machines, namely `torchick`, `combusken`, and `blaziken`.

```nix title="flake.nix"
{
  # this is the description of your configuration
  description = "Your super cool NixOS configuration";

  # inputs are a list of repositories that you can pull from
  # in most of my configurations, I usually just use nixpkgs.
  # nixpkgs is a single large repository that contains a
  # staggering amount of packages but we can always have
  # additional repositories. In our case here, we've also got
  # home-manager, a way to manage everything about a user and
  # their home directory. There's more examples such as
  # single purpose repositories like awww for changing your
  # wallpaper on wayland compositors.
  inputs = {
    nixpkgs = {
      url = "github:nixos/nixpkgs/nixos-unstable";
    };

    nixpkgs-stable = {
      url = "github:nixos/nixpkgs/nixos-25.11";
    };

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  # the outputs are the actual configurations that we're 
  # going to be able to build. There's more types of outputs
  # but we're only going to use the nixosConfigurations output
  # here. (but you could do more with the other types such as
  # creating an ISO image for your OS config you've built so 
  # far)
  outputs = {nixpkgs, ...} @ inputs: {
    # in our case, we're using a listToAttrs function to
    # duplicate the nixpkgs.lib.nixosSystem function for
    # each of our machines. This is somewhat like the .map
    # function in JS if you're familiar.
    nixosConfigurations = builtins.listToAttrs (map (name: {
      name = name;
      value = nixpkgs.lib.nixosSystem {
        # define the set of modules (in our case, just a
        # single module) that's named ./hosts/${name}/default.nix
        modules = [./hosts/${name}];
        specialArgs = {
          inherit inputs;
          # we're assuming that all of our machines here
          # are x86_64 machines.
          system = "x86_64-linux";
        };
      };
    }) ["torchick" "combusken" "blaziken"]);

    # if you have a mix of macOS machines too, we can
    # additionally add the darwinConfigurations output
    # here:
    # 
    # darwinConfigurations = builtins.listToAttrs (map (name: {
    #   name = name;
    #   value = nix-darwin.lib.darwinSystem {
    #     modules = [./hosts/${name}];
    #     specialArgs = {
    #       inherit inputs;
    #       system = "aarch64-darwin";
    #     };
    #   };
    # }) ["squirtle" "wartortle" "blastoise"]);
    # 
    # keep in mind that you'll need to add the nix-darwin
    # package to your inputs as well. This will be discussed
    # in detail in the nix-darwin section.
  };
}
```

If you've followed so far, your folder structure should look something like this:

```
~/nixos
├── flake.nix
├── hosts
│   └── torchick
│       ├── default.nix
│       └── hardware-configuration.nix
│   └── ... # other machines
```

You can now run 
```bash 
sudo nixos-rebuild switch --flake /home/<your-username>/nixos#torchick
```
to build and switch to your configuration. If this is your first time doing this, you'll run into an error that says something about nix-commands and flakes not being enabled. Let's update our `hosts/torchick/default.nix` file to enable flakes and nix-commands:

```diff title="hosts/torchick/default.nix"
{
  imports = [
    ./hardware-configuration.nix
  ];

+  nix.settings.experimental-features = [
+    "nix-command"
+    "flakes"
+  ];

  ... rest of your config
}
```
Our command still won't work for the first time. This is because this configuration hasn't been applied yet. This is the only time when I'm configuring a new system where I'll update the original configuration file in `/etc/nixos/`, do a rebuild, and then never touch the original file again.

```diff title="/etc/nixos/configuration.nix"
{
  imports = [
    ./hardware-configuration.nix
  ];

  # note, this is the same as the change above
+  nix.settings.experimental-features = [
+    "nix-command"
+    "flakes"
+  ];

  ... rest of the original config
}
```

Now, if you run
```bash
sudo nixos-rebuild switch
```
your system will be rebuilt and you'll be able to use the flakes feature. From now on, we'll mostly stick to

```bash
sudo nixos-rebuild switch --flake /home/<your-username>/nixos#torchick
```

to switch between configurations (in fact, try it out and verify that it works).

Soon, we'll be ditching the `nixos-rebuild` command and replacing it with `nh os rebuild`

You should also now be able to see a new file called `flake.lock` in your `~/nixos` folder. This file is used to track the exact versions of all of your inputs and their inputs

## Updating inputs
If you ever want to update an input, run either 
```bash
nix flake update
```
to update all of your inputs, or
```bash
nix flake update <input-name>
```
to update a single input.

This will only update the flake.lock file, nothing else (including the programs you have installed). To update your system, you'll need to run your rebuild command again.
