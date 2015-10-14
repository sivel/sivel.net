---
author: sivel
categories:
- Code
- CoolStuff
- HowTo
- PHP
- Snippet
- WordPress
date: '2009-06-17'
description: WordPress Maintenance Mode Without a Plugin Part 2
series:
- Maintenance Mode Without a Plugin
- WordPress
slug: wordpress-maintenance-mode-without-a-plugin-part-2
title: WordPress Maintenance Mode Without a Plugin Part 2
type: post
---

A few days ago I wrote a post about [WordPress Maintenance Mode Without a Plugin][1]. A common question that I got afterwards was whether or not the maintenance page could be styled. The answer, is yes it can be.

After wp-settings.php determines whether or not to put the blog into maintenance mode it checks to see if there is a file titled `maintenance.php` located in `WP_CONTENT_DIR` which is by default `wp-content/`.

Simply create a file at `wp-content/maintenance.php` containing the code you want to display the for the maintenance page. Below is a sample of code based off of the default maintenance page.

    
    <?php
    $protocol = $_SERVER["SERVER_PROTOCOL"];
    if ( 'HTTP/1.1' != $protocol && 'HTTP/1.0' != $protocol )
    	$protocol = 'HTTP/1.0';
    header( "$protocol 503 Service Unavailable", true, 503 );
    header( 'Content-Type: text/html; charset=utf-8' );
    ?>
    
    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <body>
        <h1>Briefly unavailable for scheduled maintenance. Check back in a minute.</h1>
    </body>
    </html>
    
    
    <?php die(); ?>
    

Modify as needed, add some css, some images and there you go.

 [1]: http://sivel.net/2009/06/wordpress-maintenance-mode-without-a-plugin/
