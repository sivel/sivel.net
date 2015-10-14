---
author: sivel
categories:
- CoolStuff
- News
- Technology
- WordPress
date: '2009-03-06'
description: Fast WordPress Function and Template Tag Lookups
slug: fast-wordpress-function-and-template-tag-lookups
title: Fast WordPress Function and Template Tag Lookups
type: post
---

If you are like me, then you are often referring to the function and template tag documentation on the [WordPress Codex][1]. My friend, [Andy Stratton][2], got tired of having to open google, typing in the function name and then clicking on the link to the codex returned in the search results. To make his life easier he wrote [WPLookup][3]. WPLookup gives you a simple search box that will redirect you to the documentation for the function or if it doesn't exist, redirect you to the [WordPress.org search][4] where you can see documents containing the function or text you are looking for. 

To make the service even better you can integrate it into your web browsers search bar for even faster lookups.

I have taken his service one step further and written an IRC bot that is currelty sitting in the [WordPress IRC Channel][5]. To use this bot type something in the form of `.codex get_pages` and it will query WPLookup and return the resulting URL back to the channel.

See the following links for his release announcements about this new service:

1.  [Find WordPress Function and Template Tag Documentation - Fast][6]
2.  [New WPLookup Features - Set WPLookup as a browser search engine][7]

 [1]: http://codex.wordpress.org/
 [2]: http://theandystratton.com
 [3]: http://wplookup.com
 [4]: http://wordpress.org/search
 [5]: irc://irc.freenode.net/wordpress
 [6]: http://theandystratton.com/2009/find-wordpress-function-and-template-tag-documentation-fast/
 [7]: http://theandystratton.com/2009/new-wplookup-features-set-browser-search/
