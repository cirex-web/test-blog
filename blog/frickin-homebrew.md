---
title: Fixing the “Failed to verify attestation” homebrew message
date: 1/12/2025
---

It seems that every time I try to install a package with homebrew, something goes wrong. For the past year, I kept getting the “Failed to verify attestation. Retrying in XXs” message but only bothered looking for a fix today. Despite being on the latest version, brew would repeatedly fail this step with the reason being “env: node: No such file or directory”. What’s even weirder is that I did have node on my $PATH, just not linked with homebrew.

![](/static/blog/frickin-homebrew-terminal.png)

It turns out that the fix was to turn off developer mode with `brew developer off` (you can check developer mode status with `brew developer`) and running `brew update` to downgrade my version of brew from the latest commit on master [1] to the latest stable release. If anyone else is facing this very specific probem, I hope this saves you a bit of sanity.

[1] okay, you can call it main. I don’t care
