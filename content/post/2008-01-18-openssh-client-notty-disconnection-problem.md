---
author: sivel
categories:
- Linux
- Technology
date: '2008-01-18'
description: OpenSSH Client notty Disconnection Problem
slug: openssh-client-notty-disconnection-problem
title: OpenSSH Client notty Disconnection Problem
type: post
---

I recently wrote a script that waits for something to happen and then executes a command on a remote machine via ssh. I ran into a problem where the ssh connection was established and then the ssh connection would never close.

I found out after some diagnostics that becuase there was no tty assigned to the local session that a tty was not being assigned on the remote session and for some reason ssh was not disconnecting after the command had finished.

The solution was to run the ssh command with the -t flag as such:

`ssh -t -t user@example.org "somecommand"`

The -t is used to force pseudo-tty allocation but when there is no local tty you must use -t -t to force tty allocation on the remote server.
