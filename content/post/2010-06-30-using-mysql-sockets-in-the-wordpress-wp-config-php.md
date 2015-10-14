---
author: sivel
categories:
- CoolStuff
- HowTo
- WordPress
date: '2010-06-30'
description: Using MySQL Sockets in the WordPress wp-config.php
slug: using-mysql-sockets-in-the-wordpress-wp-config-php
title: Using MySQL Sockets in the WordPress wp-config.php
type: post
---

Recently I have been getting a lot of questions about how to use a MySQL socket in place of the DB_HOST constant for WordPress in the [WordPress IRC channel][1].

Fortunately this is pretty easy, unfortunately if you are using the web based installer you cannot specify a socket in the "Database Host" field. However, you can do things the manual way and copy wp-config-sample.php to wp-config.php and go that route.

The first thing you need to do is determine the path to the MySQL socket. By inspecting my.cnf you would need to look for something that looks like:

    socket      = /var/run/mysqld/mysqld.sock

If you don't have access to look at my.cnf you can try to run the following MySQL query:

    SHOW VARIABLES LIKE 'socket';

Now crack open your wp-config.php file and set DB\_HOST to ':/path/to/mysql.sock'. Take careful note of the ':' (colon) preceding the path. In my example the define for the DB\_HOST looks like:

    define('DB_HOST', ':/var/run/mysqld/mysqld.sock');

 [1]: irc://irc.freenode.net/wordpress
