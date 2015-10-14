---
author: sivel
categories:
- CoolStuff
- FreeMyFeed
- General
- News
- Technology
date: '2008-04-14'
description: Free My Feed
slug: free-my-feed
title: Free My Feed
type: post
---

For some time now I have been using application based feed readers due to the lack of the ability to subscribe to authenticated feeds or to feeds that required the use of an invalid SSL certificate using a web based feed reader such as Google Reader. This has recently become really annoying as I have to use a different application based feed reader in Windows, Linux and Mac requiring me need to learn 3 different applications each of which act quite differently.

I was recently talking to a co-worker telling him that our developers would need to subscribe to our Trac RSS feed using an application based feed reader because web feed readers would not support authentication. His response was "yeah, they won't work. the desktop ones/ff extensions suck."

I made a decision later that day to determine a way to work around this. The solution actually came to me right away. Create a RSS proxy [service][1] where a user supplies a RSS URL, username, and password. From this information generate an alternate URL for the users use. When the user requests this alternate URL parse the URI to retrieve the original URL, username and password, then retrieve the feed on the fly and echo it back to the user.

[![FreeMyFeed][3]][3]

As my co-worker stated on his [web site][3], "It's a crazy simple service and in hindsight I'm shocked that no one's built such a thing before (to the best of my knowledge) - myself included."

As I made the decision to not store **any** user data on my server due to security and privacy, I went with a solution that actually places the username and password in the URI. For those of you who may be concerned with this, please take comfort in knowing that the original URL, username and password are encoded in the new URI and the password is **encrypted** using a rotating cipher.

Without further adieu, I would like to introduce [Free My Feed][4].

 [1]: http://freemyfeed.com
 []: http://freemyfeed.com/
 [3]: http://robwilkerson.org/2008/04/11/free-my-feed/
 [4]: http://freemyfeed.com/
