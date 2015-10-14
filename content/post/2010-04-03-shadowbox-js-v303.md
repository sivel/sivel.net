---
author: sivel
categories:
- News
- Plugins
- Release
- Shadowbox
- Support
- WordPress
date: '2010-04-03'
description: Shadowbox JS WordPress Plugin Updated to Version 3.0.3
slug: shadowbox-js-v303
title: Shadowbox JS WordPress Plugin Updated to Version 3.0.3
type: post
---

This release of [Shadowbox JS][1] has been a long time coming and I am extremely happy to announce its release. With the upstream final release of [shadowbox.js][2] 3.0 came a lot of changes to the way this plugin had to work. The shadowbox.js file is now built on the fly and if possible cached to `wp-content/uploads/shadowbox-js/`. In the event that the file cannot be cached it will be built on the fly and delivered via admin-ajax.php with appropriate JS caching headers. 

Other notable features:

*   More filters for overriding numerous URLs, including shadowbox.js and shadowbox.css
*   Require at least WordPress 2.8
*   Remove support for Ext and Dojo
*   **Addition of new sub plugin titled "Shadowbox JS - Use Title from Image", which will grab the title attribute from the child `<img>` tag if it exists and push it onto the parent `<a>` tag if a title does not exist.**

If you run into any bugs please use the Shadowbox JS [support forum][3] for problems or questions with this plugin. Support questions will be ignored if left as comments on my site, through my contact form or by email. The only supported location for support questions is <http://wordpress.org/tags/shadowbox-js>.

 [1]: http://sivel.net/wordpress/shadowbox-js/
 [2]: http://www.shadowbox-js.com/
 [3]: http://wordpress.org/tags/shadowbox-js
