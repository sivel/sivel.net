---
author: sivel
categories:
- Code
- PHP
- Snippet
- WordPress
date: '2009-03-30'
description: Adding Additional Links to the Output from wp_list_pages Part 2
slug: adding-links-to-wp_list_pages-part-2
title: Adding Additional Links to the Output from wp_list_pages Part 2
type: post
---

Earlier this [month][1] I wrote about ["Adding Additional Links to the Output from wp\_list\_pages"][2]. I have recently realized that the process of adding new or additional links could be easier. Rather than manually editing the plugin or function every time you want to add a new link or remove a link we can leverage existing WordPress functionality to handle this.

The existing WordPress functionality that we will leverage are Links/Bookmarks.

We will start with the code. Add the following code to your themes functions.php or as a plugin.

    add_filter('wp_list_pages', 'add_bookmarks_to_menu');
    function add_bookmarks_to_menu($output) {
            $bookmarks = (array) get_bookmarks('hide_invisible=0&category_name=wp_list_pages');
            foreach ( $bookmarks as $bookmark ) {
                    $output .= "<li><a href='{$bookmark->link_url}' title='{$bookmark->link_name}'>{$bookmark->link_name}</a></li>n";
            }
            return $output;
    }

Now we head to the WordPress admin and browse to Links->Add New. Type the name as you want it to show up in your menu, the web address of your link, add this link to a new category called 'wp\_list\_pages', select 'Keep this link private' and click 'Add Link'.

Placing the link in a category called 'wp\_list\_pages' will allow us to grab only links from that category and selecting 'Keep this link private' will keep it from showing up in the Links/Blogroll/Bookmark section of your site.

Enjoy!

 [1]: http://sivel.net/2009/03/
 [2]: http://sivel.net/2009/03/adding-additional-links-to-the-output-from-wp_list_pages/
