---
author: sivel
categories:
- HowTo
- Linux
date: '2007-05-18'
description: 1 RHN Entitlement with Multiple Servers
slug: 1-rhn-entitlement
title: 1 RHN Entitlement with Multiple Servers
type: post
---

So recently I ran into an issue. I currently only have 1 RHN entitlement allocated to manage on the order of about 20 RHEL4 servers. It quickly became a pain to unentitle one machine so I could entitle another. I could also only have 2 systems in my account, so I would also have to add in deleting, registering and reregistering systems to the fun of managing these servers.  
  
I had remembered reading in the [mrepo][1] documentation that you could run into problems using the software if when you registered a system with RHN you sent the system information and installed package information.  
  
So I got a bright idea to see if I could use the same RHN entitlement information on all machines and be able to update via up2date without having to do the entitlement dance. So I deleted all of my systems and reregistered one giving it a generic name and not sending the system information or the installed package information. After this there is only 1 thing left to do...copy the following files to all of the servers:

/etc/sysconfig/rhn/systemid  
/etc/sysconfig/rhn/up2date  
  
The systemid file includes the information that links the system to the RHN entitlement. The up2date is the configuration file for up2date which is modified by up2date -configure.  
  
From here all I had to do was copy these 2 files to all of the other systems and then run up2date -u. I have actually not found any problems so far. Eventually I will get the 20 RHN subscriptions and have to reregister all of the systems. Now this works fine for me because I really don't use any of the other RHN features. Although it is nice to be able to login and see if there are any systems that need updating. So my next task is to see if I can write a small script to determine if each system needs updates and then report it back to me.

 [1]: http://dag.wieers.com/home-made/mrepo/
