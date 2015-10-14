---
author: sivel
categories:
- HowTo
- Mac
- Questions
- Technology
date: '2013-01-07'
description: Manually Install Silverlight On Mac
slug: manually-install-silverlight-on-mac
title: Manually Install Silverlight On Mac
type: post
---

A few weeks ago [Aaron Brazell](http://technosailor.com/) mentioned on Twitter that he had been unable to run Silverlight on his brand new Macbook Air:

<blockquote class="twitter-tweet"><p>I have never been able to run Silverlight on my 3 month old Macbook Air. Can someone help me solve this? <a href="http://t.co/GJQWcD3D" title="http://cl.ly/image/2r3U1H380p45">cl.ly/image/2r3U1H38...</a></p>&mdash; Aaron Brazell (@technosailor) <a href="https://twitter.com/technosailor/status/283627332974047232" data-datetime="2012-12-25T17:36:40+00:00">December 25, 2012</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

This intrigued me, as many random things do. I love attempting to resolve obscure issues, and after watching him struggle for a few days I decided to help out.  I spent about an hour, and learned some really cool things about the installation process for Mac apps packaged as '.pkg' files, and how to go about installing them manually.

I had a hard time finding the information anywhere, and figured that, while this is somewhat specific to Silverlight, that it may be useful to others.

Although I use a Mac, and love the beauty of it's UI, I spend most of my time on the command line. I am a Linux Systems/DevOps Engineer by trade, so I of course interact with most of my daily tasks from the command line.

I needed to download a copy of the Silverlight.dmg file, but quickly found that if you hit the [Silverlight](http://www.microsoft.com/getsilverlight/get-started/install/default.aspx) site, and already have Silverlight installed you couldn't get to the download. Fortunately they link you to an [uninstall page](http://www.microsoft.com/getsilverlight/get-started/install/uninstall-mac.aspx) on their site, so I just deleted the paths specified there:

    rm -rf /Library/Internet\ Plug-Ins/Silverlight.plugin /Library/Receipts/Silverlight.pkg /Library/Receipts/Silverlight_W2_MIX.pkg /Library/Internet\ Plug-Ins/WPFe.plugin /Library/Receipts/WPFe.pkg

I restarted my browser, hit the [Silverlight](http://www.microsoft.com/getsilverlight/get-started/install/default.aspx) site again, and downloaded the Silverlight.dmg file. I did take this opportunity, to inspect my HTTP requests from my browser, and determined the actual URL where the file lives for future reference.

After downloading and double clicking to mount, you can just navigate directly into /Volumes/Silverlight/Silverlight.pkg from the command line. On Mac '.app' and '.pkg' as well as many other items that appear to be files, are actually just specially named directories. Mac styles them to look like files. If you really want, you can right click on such an item and select 'Show Package Contents'.

Once inside, I took a look around, and quickly noticed that the `Contents/Archive.pax.gz` file was where the majority of the data was located based on size, and looking in the `Contents/Resources` directory, I found some simple shell scripts and perl scripts.

There is an InstallationCheck perl script, that is used to validate that your system meets the requirements. After looking into it, I couldn't determine why it would fail to succeed, and neither could Aaron. Attempting to modify this file and install, resulted in the installer reporting some generic error, which was the result of the signature of the InstallationCheck file being different than the stored value. With that option gone, I took a look at the other files.

I found `preflight` was a shell script version of the uninstall instructions on the site.  And `postflight` went around cleaning some things up and generating CPU specific optimized libraries for Silverlight to use, as opposed to just-in-time compilation.

Back to `Archive.pax.gz`...

I quickly recognized the '.gz' extension, as that is a standard [gzip](http://en.wikipedia.org/wiki/Gzip) file extension. I however, did not recognize the '.pax' file extension, although after reading [a little about it](http://en.wikipedia.org/wiki/Pax_(Unix)), I am a little surprised I didn't.

In any case, after gunzipping and unarchiving using `pax`, You basically get a directory hierarchy that can be dropped into the root (/) partition on your Mac. So to keep from wasting any more of your time, let's get on to the actual steps to get it working:

***Note: I wouldn't try just copy/pasting that whole block. Run each command separately to avoid potential issue.***

    cd ~/Downloads
    curl -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.17 (KHTML, like Gecko) Version/6.0.2 Safari/536.26.17" \
        -Lo Silverlight.dmg http://www.microsoft.com/getsilverlight/handlers/getsilverlight.ashx
    hdiutil attach Silverlight.dmg
    cp -r /Volumes/Silverlight/Silverlight.pkg ~/Downloads/Silverlight.pkg
    hdiutil detach /Volumes/Silverlight
    cd ~/Downloads/Silverlight.pkg/Contents/
    sudo ./Resources/preflight
    gunzip Archive.pax.gz
    pax -r -f Archive.pax
    sudo cp -r Library/ /Library/
    cd Resources/
    sed -i '.bak' -e 's/rm\ -rf\ coregen.*)/)/' postflight
    sudo PACKAGE_PATH=~/Downloads/Silverlight.pkg ./postflight
    
Close your web browser(s) and reopen visiting the following URL to test Silverlight:
[http://www.microsoft.com/getsilverlight/default.aspx](http://www.microsoft.com/getsilverlight/default.aspx)

At this point you should have a Silverlight working on your Mac, or at least it was for Aaron:

<blockquote class="twitter-tweet"><p>My Silverlight issue was solved manually by @<a href="https://twitter.com/sivel">sivel</a> with this series of commands. Sheer brilliance. <a href="https://t.co/LugmRkea" title="https://gist.github.com/b56105b0748f7ed829cf">gist.github.com/b56105b0748f7e...</a></p>&mdash; Aaron Brazell (@technosailor) <a href="https://twitter.com/technosailor/status/284157528630243328" data-datetime="2012-12-27T04:43:28+00:00">December 27, 2012</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

That Github Gist, still exists, and contains the same steps as outlined above.

Most of those instructions are pretty self explanatory, the one that is not is probably the `sed` command. Basically in `postflight` it kicks off a number of commands into the background that utilize a binary called `coregen_i386`. It also deletes the coregen_i386 binary. In my testing I found that it often deleted the coregen_i386 binary before all of the coregen_i386 commands had executed, causing some of them to fail. So the sed command does an inplace edit of the postflight file to remove the `rm -rf` commands to delete the coregen_i386 and coregen_x86_64 binaries.

Anyway, hopefully this helps someone else.  Enjoy!

