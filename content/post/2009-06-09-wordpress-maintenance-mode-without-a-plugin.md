---
author: sivel
categories:
- Code
- CoolStuff
- HowTo
- PHP
- Snippet
- WordPress
date: '2009-06-09'
description: WordPress Maintenance Mode Without a Plugin
series:
- Maintenance Mode Without a Plugin
- WordPress
slug: wordpress-maintenance-mode-without-a-plugin
title: WordPress Maintenance Mode Without a Plugin
type: post
---

Every so often someone asks a question in the [WordPress IRC channel][1] that sparks my interest, and in this case the core maintenance mode functionality was one of those questions. I've known for sometime that WordPress has it's own maintenance mode functionality since core upgrades were added, however I had never really looked into the functionality. Hooking into this functionality is really quite simple and effective.

Start by creating a file in the root of your WordPress install (on level with wp-settings.php) called `.maintenance`. Note the preceding dot like a `.htaccess` file; in Linux this is considered a hidden file. In this file add the following code:

    <?php $upgrading = time(); ?>

This code will basically cause the maintenance page to display until you remove the `.maintenance` file. In wp-settings.php there are 2 checks to see if it should display the maintenance page. First, it makes sure that the `.maintenance` file exists. Second, it checks that the current time minus the time specified by the `$upgrading` variable is less than 10 minutes. Using the code above will insure that it is always less than 10 minutes since `time() - time() == 0`. If you want it to display for a certain period of time you would want to use:

    <?php $upgrading = 1234567890; ?>

For your usage you would want to replace `1234567890` with the unix formatted timestamp of the time minus 10 minutes at which you want the maintenance page to stop displaying.

For example if I wanted the maintenance page to stop displaying at November 14, 2013 at 20:13:00, I would really set the `$upgrading` variable to November 14, 2013 at 20:03:00. Notice the 03 instead of 13. In unix time this would look like `1384459380`. And the code needed for the `.maintenance` file would be:

    <?php $upgrading = 1384459380; ?>

Take note that if you use a specific time in the `.maintenance` file and you do not remove the `.maintenance` file, your users will see your site and not be affected, however in the admin you will see a notice stating, "An automated WordPress update has failed to complete - please attempt the update again now." Deleting the .maintenance file will remove this notice.

I'm sure that this functionality could be wrapped in a plugin, or even better an option added to the core code in the admin. However, I am happy with just manually creating the file.

For information on modifying or styling the maintenance page see [WordPress Maintenance Mode Without a Plugin Part 2][2].

 [1]: irc://irc.freenode.net/wordpress
 [2]: http://sivel.net/2009/06/wordpress-maintenance-mode-without-a-plugin-part-2/
