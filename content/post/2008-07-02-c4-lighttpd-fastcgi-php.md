---
author: sivel
categories:
- HowTo
- Linux
- PHP
- Technology
date: '2008-07-02'
description: Getting Lighttpd, FastCGI and PHP working on CentOS 4
slug: c4-lighttpd-fastcgi-php
title: Getting Lighttpd, FastCGI and PHP working on CentOS 4
type: post
---

Over the years I have been installing [Lighttpd][1] from the [RPMforge][2] repository on my [CentOS][3] 4 servers for high traffic sites. The one thing that bothers me time and again is that installing lighttpd, lighttpd-fastcgi and PHP; configuring lighttpd.conf to enable FastCGI and configuring FastCGI for PHP isn't all that is required. Try doing only that and starting Lighttpd. It will die immediately all the while telling you that it started successfully.

The problem is that the default configuration for FastCGI + PHP in lighttpd.conf tries to place the PHP sockets into /var/run/lighttpd/ which doesn't exist.

Only 2 quick steps are required to finish the installation and configuration:

1.  `mkdir /var/run/lighttpd`
2.  `chown lighttpd. /var/run/lighttpd`

Now fire up Lighttpd and enjoy the wonderful world of PHP on a web server that doesn't suck.

**Side Note**: For those of you who are trying to find the location of php-cgi on your PHP 4.3.9 install from the base or updates CentOS repo, you aren't going to find what you are looking for. Uninstall PHP 4.3.9 and install PHP 5.1.6 from the centosplus repo.

 [1]: http://www.lighttpd.net/
 [2]: https://rpmrepo.org/RPMforge
 [3]: http://www.centos.org/
