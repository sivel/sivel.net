---
author: sivel
categories:
- Code
- CoolStuff
- HowTo
- PHP
- Snippet
- WordPress
date: '2009-10-22'
description: WordPress Maintenance Mode Without a Plugin Part 3
series:
- Maintenance Mode Without a Plugin
- WordPress
slug: wordpress-maintenance-mode-without-a-plugin-part-3
title: WordPress Maintenance Mode Without a Plugin Part 3
type: post
---

A few months ago I wrote [part 1][1] and [part 2][2] of WordPress Maintenance Mode Without a Plugin. [Part 1][1] covered the basics of using the `.maintenance` file, and [part 2][2] covered styling the maintenance page using `wp-content/maintenance.php`. Part 3 covers the short comings of the other 2 by addressing how to let a user log into the admin and allowing logged in users access to the front end of the site while in maintenance mode.

It only takes a little bit of extra code in a file called `.maintenance` in the root of your WordPress installation to conditionally return a time that falls within the logic described in [part 1][1]. Now without forther adieu:

    <?php
    function is_user_logged_in() {
    $loggedin = false;
    foreach ( (array) $_COOKIE as $cookie => $value ) {
            if ( stristr($cookie, 'wordpress_logged_in_') )
                $loggedin = true;
        }
        return $loggedin;
    }
    if ( ! stristr($_SERVER['REQUEST_URI'], '/wp-admin') && ! stristr($_SERVER['REQUEST_URI'], '/wp-login.php') && ! is_user_logged_in() )
        $upgrading = time();
    ?>

Just drop the above code in the `.maintenance` file perhaps take a look at [part 2][2] and away you go. Enjoy!

 [1]: http://sivel.net/2009/06/wordpress-maintenance-mode-without-a-plugin/
 [2]: http://sivel.net/2009/06/wordpress-maintenance-mode-without-a-plugin-part-2/
