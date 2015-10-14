---
author: sivel
categories:
- CoolStuff
- News
- Plugins
- WordPress
date: '2008-09-25'
description: Changes Coming for Shadowbox JS
slug: shadowbox-change-coming-soon
title: Changes Coming for Shadowbox JS
type: post
---

With the last release of Shadowbox JS I added the functionality to add Shadowbox to all image links automatically.

With the next release the following features will be added:

*   Admin settings page for configuration.
*   Advanced configuration options to tweak most Shadowbox initialization options.
*   Automatically add Shadowbox to movie links.
*   Automatically add Shadowbox to audio links.
*   Automatically add Shadowbox to YouTube and Google Video links.
*   WordPress 2.7 uninstall compatibility.
*   Enqueue JavaScript and CSS files
*   Move Initialization JavaScript to the footer

The admin page is something I have been debating for a while. And with the list of configuration options growing, I figured it best to give users an easier way to configure the plugin, rather than having to edit the variables in the source. The admin page will match the styling of the other pages by using the WordPress admin CSS which isn't something many plugins do.

As for the additional automation, I had already written the code to add the rel attribute to image links so figured why not re-use it and give users an easy way to show all of their media using Shadowbox.

Anyway...I have some testing to do. Hopefully should be releasing within the next several weeks.

Anyone wishing to test out the development version can download it from the [WordPress Plugins Repository][1].

 [1]: http://downloads.wordpress.org/plugin/shadowbox-js.zip
