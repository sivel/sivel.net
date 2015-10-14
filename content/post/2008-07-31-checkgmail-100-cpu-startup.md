---
author: sivel
categories:
- HowTo
- Linux
date: '2008-07-31'
description: Checkgmail Uses 100% CPU at Startup
slug: checkgmail-100-cpu-startup
title: Checkgmail Uses 100% CPU at Startup
type: post
---

While using checkgmail on Ubuntu 7.10 I was running checkgmail with no problem at all. I not too long ago upgraded to Ubuntu 8.04 and quickly noticed that checkgmail was taking 30+ seconds to start and was taking 100% of my CPU.

I did a search on Google and found a lot of users experiencing the same problem. It took a bit of reading, which is why I am posting this, and found that it is do the localizations (languages) that are loaded into checkgmail. There are 1,728 lines in checkgmail devoted to localization and I imagine that it is due to parsing this data that is causing the 100% CPU useage.

The solution to speeding up checkgmail is to remove all of the localizations that you don't need. For me this was removing lines 3089-3280 and 3346-4817 or checkgmail and the corresponding lines in ~/.checkgmail/lang.xml.

I have created some patches to take care of this but cannot guarantee that with updates to the code that the localizations will remain on the same lines as they are this minute. So use with care. The patches can be applied as such:

    
    wget http://sivel.net/patch/checkgmail/checkgmail_1.13svn_slowstart_checkgmail_en.patch
    wget http://sivel.net/patch/checkgmail/checkgmail_1.13svn_slowstart_langxml_en.patch
    patch /usr/bin/checkgmail checkgmail_1.13svn_slowstart_checkgmail_en.patch
    patch ~/.checkgmail/lang.xml checkgmail_1.13svn_slowstart_langxml_en.patch
    
    

If you have checkgmail running kill it and start it up again. It should have started almost instantly and not taken 100% CPU to do so.
