---
author: sivel
categories:
- CoolStuff
- Fun
- HowTo
- PHP
- Plugins
- Questions
- Uncategorized
- WordPress
date: '2010-04-25'
description: Detect wp_head and wp_footer from a Plugin
slug: detect-wp_head-and-wp_footer-from-a-plugin
title: Detect wp_head and wp_footer from a Plugin
type: post
---

Normally I start these posts with "Every so often someone asks a question in the WordPress IRC channel that sparks my interest", however today, to my great surprise someone actually [caught my attention][1] on the [wp-hackers][2] mailing list.

For those of you who didn't click through, the question was:

> Couldn't find this on forums or anywhere else.  
> What can I test to check if wp_footer was placed on the theme? 

Before any replies came in I was already interested and when [Peter Westwood][3] replied with "The other way to do it is to do a http request based test which a special query arg on which you output a string on wp_footer.", I was on the hook.

I spent a few minutes writing up a test plugin, to perform only this functionality and responded back to the list. It was pretty well accepted and I got a few comments from [Ozh][4] and [Andrew Nacin][5] on Twitter. One of the comments was actually an idea, to extend the checks to make sure that the calls to `<?php wp_head(); ?>` and 

`<?php wp_footer(); ?>` were in the proper places in the code.

Before I get to the code, I want to spend a little time talking about the significance of wp\_head() and wp\_footer(). These 2 functions are the key to functionality of a lot of plugins and are the real work horses of themes. The wp\_head and wp\_footer functions allow WordPress core and plugins to hook into your theme either directly before the `</head>` or `</body>` html tags in your theme and perform actions. The majority of the time these actions are used to output style sheets or JavaScript, for use by plugins. WordPress core uses it to output a lot of good functionality such as relational links to your RSS and ATOM feeds into the head of the document. [Joseph Scott][6] wrote about this nearly a year ago. His post is fairly short but does a good job at explaining why it is important to include these functions.

Back to the original discussion, which was how do we detect whether or not wp\_head and wp\_footer are called in the active theme, and if called are they called, was it from the proper locations?

In my proof of concept plugin, we hook into admin\_init, which will actually use wp\_remote\_get() to retrieve the frontend of our WordPress site. It calls the url with 2 query vars, that if present will cause the plugin to hook into wp\_head and wp_footer and output some content that we will later look for. If the response was successful, as in returning a 200 response code, we will look at the content to see if `<!--wp_head-->` and 

`<!--wp_footer-->` are present. If they are not we will see an admin notice telling us which problems were found. If those strings were found but they were not found directly before 

`</head>` or `</body>` the notice will alert you of such.

Without further adieu:

<script type="text/javascript" src="http://paste.sivel.net/embed/24.js"></script>

Just in case you cannot see the code above, use this link: <http://paste.sivel.net/24>.

 [1]: http://lists.automattic.com/pipermail/wp-hackers/2010-April/031683.html
 [2]: http://lists.automattic.com/mailman/listinfo/wp-hackers
 [3]: http://blog.ftwr.co.uk
 [4]: http://planetozh.com
 [5]: http://www.andrewnacin.com/
 [6]: http://josephscott.org/archives/2009/04/wordpress-theme-authors-dont-forget-the-wp_head-function/
