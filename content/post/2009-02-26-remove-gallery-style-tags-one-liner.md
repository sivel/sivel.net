---
author: sivel
categories:
- Code
- One Liner
- PHP
- Snippet
- WordPress
date: '2009-02-26'
description: WordPress One Liner to Remove Style Tags from Posts using [gallery] Shortcode
slug: remove-gallery-style-tags-one-liner
title: WordPress One Liner to Remove Style Tags from Posts using [gallery] Shortcode
type: post
---

One of the biggest things that irritates me when using the [gallery] shortcode is that style tags are inserted into the post content. Why does this irritate me? Because this does not validate as XHTML 1.0. Luckily the fix is quite easy. Add the following code as a plugin or to your themes functions.php and say goodbye to the style tags in your post content.

    add_filter('gallery_style', create_function('$a', 'return preg_replace("%%s", "", $a);'));

One side effect to doing this is that the CSS normally outputted to into your post content is no longer output at all. You will need to add the CSS to your themes css file, usually style.css. The following css is the default output:

    
    
    

The width for .gallery-item is a dynamic value determined by the columns attribute specified in the [gallery] shortcode. The default is 3 columns which makes the width 33%, ` floor(100/$columns) `.

I have also written a plugin called [Gallery Shortcode Style to Head][1] which does a forward lookup to determine if a post uses the [gallery] shortcode and if it does, prints the default CSS to the head. While the plugin works and performs its function, I still prefer a solution that has less overhead associated with it, hence the code provided in this post.

 [1]: http://sivel.net/2008/08/gallery-shortcode-style-to-head/
