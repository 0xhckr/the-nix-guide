---
title: Introduction
---

Nix is an extremely powerful package manager. Well - and it's also a language. And colloquially, it's also the OS (but we refer to that as "NixOS"). We're not even the first paragraph through and we're already confused - but hang on, we'll get there.

## Origins of Nix

Nix was created by [Eelco Dolstra](https://github.com/edolstra) as the subject of his PhD thesis [The Purely Functional Software Deployment Model](https://edolstra.github.io/pubs/phd-thesis.pdf) which was published in 2006. Glossing over the thesis (which you should totally check out for yourself at some point), nix was born out of a need to create a way for people to copy a program over to another system, and have it work the exact same way.

The idea was simple: If I have a program on computer A, there should be some mechanism for me to replicate it on computer B exactly. Many issues arise when trying to do this, such as:

- Which version of the program should I use?
- What dependencies does the program have?
- Do those dependencies have the same versions?
- Are there configuration files that need to be copied?
- Are there special cases for the configuration files that need to be handled differently on different systems?

The list shown above is not exhaustive (and doesn't even get close to exhausting the questions we should ask). Nix, however, was designed to solve all of these issues.

## What is Nix?

<span style="opacity: 0.5; display: block; margin-bottom: 1em;">
  (but for real this time)
</span>

Nix is commonly referred to as a few different things colloquially:

- A declarative, lazily evaluated, purely functional programming language (which we'll use a lot)
- A collection of tools that allow you to build reproducible software environments
- A package manager that is (in my opinion) a discouraged way of installing software
- An operating system that uses the aforementioned collection of tools to build reproducible software environments - but acting on the operating system (effectively allowing you to create a highly reproducible and customized operating system)

For the purposes of this guide, the programming language will be referred to as "nix", the package manager as "nix-env", and the operating system as "NixOS". Nix is also the collection of tools but we'll see that most times we're calling those tools, it'll be pretty obvious we're not talking about the language.

## Why should I care?

It's important to note that not many people will understand the power of nix for their day-to-day use. Nix is easily targettable to developers, sysadmins, general nerds, and the generic linux distro-hopper. That's not to say that nix isn't beneficial to everyone else as well. Realistically, however, I don't think anyone who's not intimately familiar with a text editor and a terminal will configure nix code.

### Nix (the language)

Nix is a language that allows you to essentially write instructions for a computer to follow. In the case of NixOS, These instructions could be used to populate your system's dotfiles, install software, apply git patches to pieces of software, and more. In the case of a project, you can use nix to define the dependencies of your project, custom scripts to run, different variations of your project (e.g. a debug build vs a release build), and more.

The important part of this is the fact that when someone works on the project (or if they want to copy a NixOS setup), they don't need to battle with version mismatches, missing dependencies, or even asking others on how to run certain scripts. They can simply run a variety of the aforementioned nix commands once the project is cloned and have the exact same project or NixOS setup as the author.

We're glossing over a lot of other things here (including many other nicities you get with nix), but, I'll mention one last thing I absolutely love about using nix in projects: If I have a version of python installed globally but the project I'm working on requires a specific version, I can run nix-shell (or other commands) and have those binaries symlinked accordingly. When I close my terminal, it's almost as if I never installed that version of python at all.

### NixOS (the operating system) 
<span style="opacity: 0.5; display: block; margin-bottom: 1em;">
  (and to some extent, nix-darwin, which is a NixOS like experience for macOS)
</span>

NixOS is a Linux distribution that uses nix (both the language and the tools) to build an entirely reproducible and customized operating system. It's highlight is the ability to throw away your entire system into an industrial blender, start from a blank slate, run a couple of commands, and be back to where you were before your little science experiment.

As part of the nicities of NixOS, it also allows you to create an OS revision that is able to be rolled back to a previous revision. Many arch users (myself included) have felt pain when we've accidentally messed up their system whilst editng a config file. With NixOS, you can easily roll back to a previous revision and start from there - It's like a checkpoint that you have in games but in real life.
