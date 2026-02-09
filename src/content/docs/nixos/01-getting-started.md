---
title: Getting Started on NixOS
description: Getting started with NixOS
slug: nixos/getting-started
sidebar:
  order: 1
---

## Installing NixOS

Installing NixOS is mostly the same as other Linux distros. [Download the ISO](https://nixos.org/download/), burn it to a USB stick, disable secure boot (if you haven't already), boot and install. The download for NixOS can be found later down on the page. I recommend users to use the Graphical ISO image unless you really know what you're doing or have insufficient storage space on the USB stick. This guide won't cover the installation process. Once you've installed NixOS, we can pick up with [Getting Started on NixOS](/nixos/getting-started).

## Configuring NixOS

Once you've installed NixOS, you'll need to configure it. This is done by editing the configuration file. The configuration file is located at `/etc/nixos/configuration.nix` **but this isn't where I'd recommend you edit it**. This file is a nix expression that defines the entire configuration of the system. The language in the file is called nix and it reads kind of like a JSON file.

> You said you don't recommend editing this file, why not?

There's a primary reason why we'd mostly want to avoid editing this file: it's located in /etc, which is a system directory. This makes it harder (due to permissions) later on when we want to start using git to sync our configurations to a remote repository. One of the super powers of NixOS is that it allows you to persist your configurations in a git repository.

The recommendation we're going to make is for us to copy both the files `/etc/nixos/configuration.nix` and `/etc/nixos/hardware-configuration.nix` to some other directory. I personally like to use `~/nixos` for this since most of my systems are single user systems and it's easy for me to just cd into the folder when I open up a new terminal. If you would like to follow along, you can do so by running the following commands (make sure to replace `<your-hostname>` with your hostname; a piece of advice is to have fun with the naming of your pc hostnames!):

```bash
mkdir -p ~/nixos/hosts/<your-hostname>
cp /etc/nixos/configuration.nix ~/nixos/hosts/<your-hostname>/default.nix
cp /etc/nixos/hardware-configuration.nix ~/nixos/hosts/<your-hostname>/hardware-configuration.nix
```

It's important to note above that we're copying the files to a slightly different directory, specifically somewhere under `~/nixos/hosts` under the name of your hostname. A lot of the decisions we make in this guide are heavily influenced by the way I've set up my NixOS configuration personally. I manage 3 different machines using the same single `nixos` folder. Each machine has its own folder under `~/nixos/hosts`. I also personally rename the `configuration.nix` file to `default.nix` as well. You can check out my personal configuration [here](https://github.com/0xhckr/hackr-nixos) for reference. A lot of other examples ignore the idea of having multiple machines and just have a single `configuration.nix` file. Many others also have a different folder naming scheme. There's no right way of doing it, it's a matter of preference.

So far, we can't do anything actually powerful just yet. We have flakes up next an this is where we'll start to get some real power.
