---
author: sivel
categories:
- HowTo
- Linux
- PHP
- Technology
date: '2008-08-22'
description: XCache Admin Cannot Login When Using Apache and mod_fcgid
slug: xcache-admin-mod_fcgid
title: XCache Admin Cannot Login When Using Apache and mod_fcgid
type: post
---

I have been helping a friend setup a dedicated server to host his clients sites on and wanted to make things as streamlined and as easy as possible. To do so I installed Apache 2.2, PHP5, XCache and mod_fcgid. I am using suexec with Apache to run the scripts as the users who own the scripts.

I wanted to verify that XCache was working, so I copied the XCache admin directory into one of the document roots and tried to login. To my surprise I was not able to login even though I was using a known good md5 password hash in the XCache configuration.

It took me about a month of searching to find out that the server variables PHP\_AUTH\_USER and PHP\_AUTH\_PW don't seem to work with mod_fcgid. [This][1] Lighttpd forum entry led me to the XCache admin config.php.

Here is what is required:

1.  Create a file in your XCache admin directory called config.php
2.  In this file add the following, using the information you provided in the XCache configuration: 

    <?php
    $_SERVER['PHP_AUTH_USER'] = 'admin_username';
    $_SERVER['PHP_AUTH_PW'] = 'admin_password';
    ?>

3.  Configure some other means of authentication such as htpasswd or htdigest

 [1]: http://forum.lighttpd.net/topic/4817
