---
author: sivel
categories:
- HowTo
- WordPress
date: '2009-03-17'
description: WordPress Update/Install Clarifications and Requirements
slug: wordpress-updateinstall-clarifications-and-requirements
title: WordPress Update/Install Clarifications and Requirements
type: post
---

Recently I have been responding to numerous questions about the update/install functionality in WordPress for core, plugins and soon themes. I wanted to take a few moments to make some clarifications and to inform people of the requirements.

To update the WordPress core or update/install plugins or themes without having to enter your FTP/SSH information you have 2 options:

1.  Define the required constants in wp-config.php
2.  Make the necessary file permission/ownership configurations required to use a direct update/install instead of using FTP or SSH

For information on achieving the first option see take a look at the follow links:

*   [wp-config.php FTP/SSH Constants][1]
*   [Using SSH to Install/Upgrade WordPress by Jon Dingman][2]

The second option is a little more confusing for some people. Most people think that as long as they give full write access to the plugins or wp-content directories that they will not be asked for their FTP/SSH connection information. Unfortunately, this falls short of the requirements for performing a direct update or install. There are 4 possible methods for performing the file operations. The operations are 'direct', 'ftp', 'ssh2', and 'ftpsocket'. The direct method allows php to do all of the file operations on its own without requiring any external dependencies. For the 'direct' method to work, the web server, and by extension php, needs full write access to the files it is trying to modify.

WordPress determines if it can perform a direct update or install by performing a few file operations and looking at the ownership of those file operations. Here are the steps that WordPress goes through when making the determination.

1.  Returns a suitable temporary directory to create a test file (the following is in the order of precedence) 
    *   If WP\_TEMP\_DIR is defined it will return this value
    *   If WP\_CONTENT\_DIR is writable by the web server user it will return the path to the wp-content directory
    *   If you are running PHP 5.2 or newer it will determine the systems temp directory using sys\_get\_temp_dir()
    *   As a fall back it will return /tmp/
2.  Creates a unique file via touch() in the temporary directory returned in step 1 and returns the path to this temporary file
3.  If the file system owner of wp-admin/includes/file.php and the file system owner of the temporary file that was created are equal to each other then it will use the direct method and then the temporary file is removed 
    *   The check that is performed uses the file system owner of wp-admin/includes/file.php and not the run time user of that script
    *   This is, in my opinion, the most reliable way to make sure that the user the web server is running as can make modifications to all of the WordPress files
4.  If the check failed to use the direct method it will check for the possibility of using: 
    *   SSH2
    *   FTP
    *   Sockets (fsockopen, fwrite, fread)

So with the above steps for determining whether or not the 'direct' method can be used there are several things that can be done to allow WordPress to use the 'direct' method.

1.  If you want to do core upgrades as well as plugin and theme upgrades/installs you can change the ownership of all of the WordPress files to be that of what the web server is running as
2.  If you only want the ability to do plugin and theme upgrades/installs you can modify the ownership of wp-content, all of its contents and wp-admin/includes/file.php to be that of what the web server is running as
3.  If you want to do core upgrades as well as plugin and theme upgrades/installs you can set permissions on all of the WordPress files and all of its contents that give the web server write access to those files and then add a filter to the filesystem method by way of a plugin or addition to functions.php
4.  If you only want the ability to do plugin and theme upgrades/installs you can set permissions on wp-content and all of its contents that give the web server write access to those files and then add a filter to the filesystem method by way of a plugin or addition to functions.php

I am sure there are about 100 different combinations of the above methods, so feel free to experiment.

Since #1 and #2 are fairly self explanatory I will skip those and explain #3 and #4.

1.  Change the file/directory permissions of either the WordPress root or wp-content and all of their contents so that the web server user has the ability to modify those files and write to those directories
2.  Add the following bit of code to either your themes functions.php or to a plugin 
        add_filter('filesystem_method', create_function('$a', 'return "direct";'));

In methods 1 and 2 we simply fulfill the requirements needed by WordPress to return the 'direct' method on its own. In methods 3 and 4 we have made sure that the web server can do what it needs to the WordPress files and because of this we can tell WordPress to always use the direct method.

I believe that should about cover it. If I have made any mistakes or forgot to include something please let me know. Enjoy!

 [1]: http://codex.wordpress.org/Editing_wp-config.php#FTP.2FSSH_Constants
 [2]: http://www.firesidemedia.net/dev/wordpress-install-upgrade-ssh/
