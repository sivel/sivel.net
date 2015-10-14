---
author: sivel
categories:
- CoolStuff
- Linux
- Technology
date: '2008-09-18'
description: Apache to nginx in 90 seconds
slug: apache-to-nginx
title: Apache to nginx in 90 seconds
type: post
---

I spent about 30 minutes last night and switched all of my personal sites over to nginx, including the one you are on now and [FreeMyFeed][1]. Okay, so I know 30 minutes does not equal 90 seconds, but the title sounded more catching. The configuration for a secured, working nginx instance is quite small. On top of that, configuring virtual hosts is really easy.

The largest amount of time it took to get this finished was recreating the rewrite rules for [Zenphoto][2]. The rewrite rules can be found [here][3]. I haven't tested all of the rewrite rules yet, but from quickly browsing through my [gallery][4] everything appears to be working well. Keep in mind that these rewrite rules were designed for a site where Zenphoto lives in the root. If it lives in a subfolder the rewrite rules will need to be modified accordingly. I can probably help if you ask nicely.

I have also moved over numerous WordPress sites to nginx. I won't post their rewrite configurations here because you can find them easily using Google.

You can find the nginx rpms for EL4/EL5 in the Fedora Project's [EPEL][5] repo.

If you have any nginx related configuration questions feel free to ask, I'm getting pretty familiar with the app.

 [1]: http://freemyfeed.com/
 [2]: http://www.zenphoto.org/
 [3]: http://cdn.sivel.net/z/e/zenphoto_nginx_rewrites.txt
 [4]: http://gallery.sivel.net/
 [5]: http://fedoraproject.org/wiki/EPEL
