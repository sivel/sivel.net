---
author: sivel
categories:
- Code
- PHP
- Snippet
- WordPress
date: '2008-10-22'
description: Adding a Link to the WordPress 2.7 Favorites Dropdown
slug: add-link-to-wp-27-favorites-dropdown
title: Adding a Link to the WordPress 2.7 Favorites Dropdown
type: post
---

There was some concern on the WP-Hackers list that the sidemenu action had been removed from WordPress 2.7. As the "sidemenu" (Settings, Plugins, Users) links no longer exist in 2.7 this action was removed. There is, however a suitable replacement which is the favorites dropdown.

This code snippet will show you what is required to add a link to the favorites dropdown.

    <?php
    function add_to_favorites( $favorites_array ) {
    	$favorites_array['link-add.php'] = array('Add Link', 'manage_links');
    	return $favorites_array;
    }

    add_filter('favorite_actions', 'add_to_favorites');
    ?>

I'll break down the line where we insert an element into the array so it makes more sense:

`$favorites_array['link-add.php'] = array('Add Link', 'manage_links');`

We want to insert a new key into the array where the key is the href for the link. In this case I just made it 'link-add.php' but could be anything like 'options.php' or 'admin.php?page=my-plugins-options-page'.

The value for that key is an array where the first element is the display text and the second is the minimum user role required to see that link in the favorites.

Use this responsibly. Plugin authors, please do not go adding tons of useless crap to the favorites menu, use this only when it makes sense.

Enjoy!
