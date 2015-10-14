---
author: sivel
categories:
- Code
- One Liner
- PHP
- Snippet
- WordPress
date: '2010-10-06'
description: WordPress One Liner to Customize Author Permalink Redeux
slug: wordpress-one-liner-to-customize-author-permalink-redeux
title: WordPress One Liner to Customize Author Permalink Redeux
type: post
---

Nearly 2 years ago I wrote a [one liner][1] for someone in the WordPress IRC channel to [change the author permalink structure][2]. At the time I had not taken the time to really understand WP_Rewrite and as such didn't understand the implications of flushing the rewrite rules on each page load.

It is sufficient to say that since then, I have taken the time to understand it better and I am fully aware of the negative implications of performing flushes every time someone hits your site. For one thing the default behavior of `flush_rules()` is to also update the .htaccess file as well as updating the serialized array in your wp_options table that contain the internal WordPress rewrites. Assuming you are using a nasty permalink structure that starts with something like `%category%` or `%postname%` that serialized array can grow exponentially with the number of pages you have <a class="simple-footnote" title="Otto explained this a bit more in depth at http://ottopress.com/2010/category-in-permalinks-considered-harmful/" id="return-note-990-1" href="#note-990-1"><sup>1</sup></a>.

To make a long story sort, I have known that I should have changed the code for almost as long as the post has been published, but I was too lazy to do anything about it. It took a few carefully placed pokes and prods to get me moving, and as such I have updated the post to reflect the removal of using `flush_rules()`.

<div class="simple-footnotes">
  <p class="notes">
    Notes:
  </p>
  
  <ol>
    <li id="note-990-1">
      Otto explained this a bit more in depth at http://ottopress.com/2010/category-in-permalinks-considered-harmful/ <a href="#return-note-990-1">#</a>
    </li>
  </ol>
</div>

 [1]: http://sivel.net/category/code/one-liner/
 [2]: http://sivel.net/2008/12/author-permalink-one-liner/
