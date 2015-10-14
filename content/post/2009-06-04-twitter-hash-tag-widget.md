---
author: sivel
categories:
- CoolStuff
- News
- Plugins
- WordPress
date: '2009-06-04'
description: WordPress Twitter Hash Tag Widget and the New Widget API
slug: twitter-hash-tag-widget
title: WordPress Twitter Hash Tag Widget and the New Widget API
type: post
---

Recently I attended [WordCamp Mid-Atlantic][1], and took notice of the area of the site that listed all of the Twitter status updates that included the #wordcampmidatl hash tag. In fact a number of people took notice of this feature and thought it was a great idea. Yesterday, Brad from [WebDevStudios][2] asked me what plugin was used on the WordCamp Mid-Atlantic site so it could be used on the [WordCamp Chicago][3] site, and without knowing of such a plugin I recommended several approaches to achieve the same thing.

I ended up, out of curiosity, writing the functional code to do it and handed it off to WebDevStudios so they could get it over to the WordCamp Chicago site owner. After handing off the code apparently both I and WebDevStudios began wrapping the code into a widget. I chose to take the route of using the new [Widgets API][4] that will be introduced into [WordPress 2.8][5].

This gave me some quality time with the new Widget API which, I personally feel, is a great improvement for widgets in WordPress.

I have not yet requested hosting for this plugin on in the [WordPress Plugin Repo][6]. So for now the download will remain hosted on this site. For anyone curious about the new Widgets API feel free to download the plugin and poke around. If you have and comments or suggestions for this plugin please let me know! I have just recently started into the world of Twitter and know that with as popular as the service is that this could become a very useful plugin.

On a side note I have added some caching capabilities to the plugin so that in the event that the connection to Twitter fails, as it so often does, it will simply serve the cache from the last successful attempt.

Please note that as this plugin uses the new Widgets API introduced in WordPress 2.8 that it will require WordPress 2.8 to function.

[Download Now!][7]

 [1]: http://www.wordcampmidatlantic.com
 [2]: http://www.webdevstudios.com/
 [3]: http://wordcampchicago.com/
 [4]: http://codex.wordpress.org/Plugins/WordPress_Widgets_Api
 [5]: http://codex.wordpress.org/Version_2.8
 [6]: http://wordpress.org/extend/plugins/
 [7]: http://cdn.sivel.net/t/w/twitter-hash-tag-widget.zip
