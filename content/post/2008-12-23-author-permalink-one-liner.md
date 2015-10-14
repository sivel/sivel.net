---
author: sivel
categories:
- Code
- One Liner
- PHP
- Snippet
- WordPress
date: '2008-12-23'
description: WordPress One Liner to Customize Author Permalink
slug: author-permalink-one-liner
title: WordPress One Liner to Customize Author Permalink
type: post
---

Several people have asked me recently how to customize the author permalink from being /author/admin to something like /profile/admin. I have created a simple one line piece of code that you can drop in your themes functions.php to achieve this.

    add_filter('init', create_function('$a', 'global $wp_rewrite; $wp_rewrite->author_base = "profile";'));

Drop this into your themes functions.php wrapped in `<?php ?>` tags, then visit the WordPress admin, go to Settings->Permalinks then off you go. By visiting the permalinks settings page it should flush the rewrite rules, but if for some reason it doesn't go ahead and click "Save Changes". If you want /author/ to become something other than /profile/ replace 'profile' in that one liner with the string of your choice.
