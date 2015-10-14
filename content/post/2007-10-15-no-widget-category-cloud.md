---
author: sivel
categories:
- Plugins
- WordPress
date: '2007-10-15'
description: No Widget Category Cloud WordPress Plugin
slug: no-widget-category-cloud
title: No Widget Category Cloud WordPress Plugin
type: post
---

I am releasing version 0.2 of the No Widget Category Cloud WordPress plugin that I have written for use on my site.

Creates a function that can be placed in a wordpress template for a category cloud that exists without the requirement of widgets or a widget ready theme.

I created this plugin after I started using a single column theme that is not widget ready. I found that there were multiple plugin widgets available, but no plugin that would allow me to just place a php function into my theme to display a category cloud.

Some ideas for oter uses of this plugin:

1. Install WP-Sticky and Exec-PHP. Create a Sticky post which will stay at  
the top of your page and type the php code for this plugin in the post. Now  
you have a Category Cloud that stays at the top of your page.

**Screenshots**

![][1]

**Installation**

1. Upload the \`no-widget-category-cloud\` folder to the \`/wp-content/plugins/\` directory  
2. Activate the plugin through the 'Plugins' menu in WordPress

NOTE: See "Other Notes" for Upgrade and Usage Instructions as well as other pertinent topics.

**Requirements**

1. WordPress 2.x  
2. Web server that supports PHP

**Upgrade**

1. Deactivate the plugin through the 'Plugins' menu in WordPress  
2. Delete the previous \`no-widget-category-cloud\` folder from the \`/wp-content/plugins/\` directory  
3. Upload the new \`no-widget-category-cloud\` folder to the \`/wp-content/plugins/\` directory  
4. Activate the plugin through the 'Plugins' menu in WordPress

**Usage**

`<?php nw_catcloud(small_size,big_size,size_unit,align,orderby,order,min_posts,hide_empty,title); ?>`

> small_size = font size, integer (default 75)  
> big_size = font size, integer (default 200)  
> size_unit = %, px, pt (default %)  
> align = left, right, center, justify (default left)  
> orderby = count, name (default name)  
> order = asc, desc (default asc)  
> min_posts = minimum number of posts, integer (default 1)  
> hide_empty = 0,1 (default 1, 1=yes,0=no)  
> title = string (This can contain HTML to format the title)

1. Open the theme files, in your favorite editor, that you wish to add the category cloud to (index.php, single.php, page.php, etc...).  
2. Add a line that looks like above. You can also use the defaults by not specifiying anything between the parentheses. See example 2 below.  
3. Enjoy.  
4. As I mentioned in the description you can also use this plugin with Exec-PHP and it would make a nice combo with WP-Sticky.

Examples:

`<?php nw_catcloud(75,200,'%','left','name','asc',1,1,'<br />
<h2 class="posttitle">Categories</h2>
<p>'); ?>`

  
`<?php nw_catcloud(); ?>`

**Change Log**

0.2

*   Initial Public Release

**To Do**

1. I am open to suggestions.  
2. I am sure I will think of something.

**Credit**

I've got to give credit where credit is due. And that credit goes to Lee Kelleher and his Category Cloud Widget. I used a lot of his code in this plugin modifying it where needed to make it work the way I wanted.

**Download**  
[No Widget Category Cloud version 0.2][2]

 [1]: /uploads/2007/10/screenshot-1.png
 [2]: http://downloads.wordpress.org/plugin/no-widget-category-cloud.0.2.zip
