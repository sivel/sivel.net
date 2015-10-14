---
author: sivel
categories:
- Code
- PHP
- Snippet
- WordPress
date: '2009-03-02'
description: Adding Additional Links to the Output from wp_list_pages
slug: adding-additional-links-to-the-output-from-wp_list_pages
title: Adding Additional Links to the Output from wp_list_pages
type: post
---

One common question in the [WordPress IRC Channel][1] is how to add external links, or links to content other than pages, to the output of wp\_list\_pages, usually not that exactly but that is what they mean. You can of course modify your theme by inserting `
<li><a href="http://example.org">Example.org</a></li>
<p>` immediately following the wp\_list\_pages function however, this is not always the best solution. In my case I am working on developing a theme for distribution and testing it in the best way possible by running it as my main theme on my site. Since I want extra links to appear there and I don't want to have content in the theme that will not be distributed to users, filtering the output of wp\_list\_pages works wonderfully.

You can put this following code in your themes functions.php, or in a plugin. Since I am trying to keep from modifying my theme, a plugin is the better option.

    add_filter('wp_list_pages', 'add_forum_link');
    function add_forum_link($output) {
            $output .= '<li><a href="http://forum.example.org/">Forum</a></li>';
            return $output;
    }
    

The above code will add a link to a forum at http://forum.example.org/.

Enjoy!

 [1]: irc://irc.freenode.net/wordpress
