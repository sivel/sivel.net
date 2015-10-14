---
author: sivel
categories:
- HowTo
- Linux
date: '2008-06-18'
description: CheckGmail Problem With Google Hosted Domains
slug: checkgmail-problem
title: CheckGmail Problem With Google Hosted Domains
type: post
---

For some time now I have been using [CheckGmail][1] to monitor both my gmail.com accounts and my sivel.net accounts. But several months ago Google changed the way that accounts are authenticated for hosted domains.

If you are experiencing this problem I suggest downloading the most recent version of CheckGmail from the CheckGmail subversion trunk. For those of you who don't have subversion installed or for those of you who don't know how to use subversion there is any easy way around this.

Simply issue the following command:

`sudo wget -O /usr/bin/checkgmail http://checkgmail.svn.sourceforge.net/viewvc/*checkout*/checkgmail/checkgmail`

If you currently have CheckGmail running kill it and restart it. Now you will be able to monitor your hosted domain again with CheckGmail.

 [1]: http://checkgmail.sourceforge.net/
