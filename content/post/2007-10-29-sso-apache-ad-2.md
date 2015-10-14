---
author: sivel
categories:
- HowTo
- Linux
date: '2007-10-29'
description: Single Sign-On with Apache and Active Directory &#8211; Part 2
slug: sso-apache-ad-2
title: Single Sign-On with Apache and Active Directory &#8211; Part 2
type: post
---

<big><strong><a href="2007/05/sso-apache-ad-1/">Part 1</a> | <a href="2007/10/sso-apache-ad-2/">Part 2</a></strong></big>

Back on May 23rd, 2007 I wrote an article titled [Single Sign-On with Apache and Active Directory][1] which I have now made Part 1 of this topic. In that article I wrote:

> There are 3 major solutions for this which are mod\_ntlm, mod\_auth\_kerb and Apache2:AuthenNTLM...I tried mod\_ntlm which seemed to be very easy to setup and worked well. But there was one catch...If the browser did not send the NTLM information or correct NTLM information, see the footnotes<sup>1</sup> below as to why, the user had to login with the username in the form of DOMAINusername. In my experience with applications already in place they did not require this form of DOMAINusername. This could be resolved if you could specify the default domain in mod_ntlm which you cannot.

Now I will explain why there is a Part 2 to this topic. I used the Apache2::AuthenNTLM Apache Perl module in a large environment and quickly found a serious problem which I could not diagnose or resolve. When using the Apache2::AuthenNTLM Perl module Apache would stop responding to requests to the site after an undetermined number of requests. I tried limiting the file types that would be authenticated but in the end it would still stop reaponding after a while.

So I finally decided to use the Apache mod_ntlm module to handle the authentication. And with the article I had written titled [Enabling NTLM Authentication (Single Sign-On) in Firefox][2], the problem with having to use the username in the form of DOMAINusername in Firefox can be eliminated.

This how to is intended for CentOS 4 and RHEL4 but can be easily adapted for other distributions.

Now for the HowTo:

1) Start by installing Apache by issuing the following command:  
`yum install httpd`

2) Next we need to install the mod_ntlm Apache module

    wget http://sivel.net/repo/i386/mod_ntlm-2-0.1.el4.sn.i386.rpm
    rpm -ivh mod_ntlm-2-0.1.el4.sn.i386.rpm

3) Now we need to configure mod_ntlm

    cd /etc/httpd/conf.d
    vi mod_ntlm.conf

Modify the conf like so (the documentation in the conf pretty much covers it also):

    
    <location ~ "/path/to/dir/to/protect/here)/(.*)" >
    
      # NTLMAuth - set to 'on' to activate NTLM authentication here
      NTLMAuth on
    
      # AuthNTGroups - text file containing (NT) group names and member user IDs
    
      # NTLMBasicAuth - set to 'on' to allov Basic authentication too
    
      # NTLMBasicRealm - realm to use for Basic authentication
    
      # NTLMAuthoritative - set to 'off' to allow access control to be passed along to lower modules if the UserID is not known to this module
      NTLMAuthoritative on
    
      # NTLMDomain - set to the domain you want users authenticated against for cleartext authentication - if not specified, the local machine, then all trusted domains are checked
      NTLMDomain MYDOMAIN
    
      # NTLMServer - set to the NT server to contact to authenticate users
      NTLMServer primary.mydomain.com
    
      # NTLMBackup - set to the alternate NT server to contact to authenticate users
      NTLMBackup secondary.mydomain.com
    
      # NTLMLockFile - set to the lock file that is used to prevent simutaneous contacts to DC
      NTLMLockfile /tmp/_mod_ntlm.lck
    
      AuthName NTAuth
      AuthType NTLM
      require valid-user
      Satisfy all
    
    </location>
    
    

4) We need to modify the global conf file now.  
`vi /etc/httpd/conf/httpd.conf`  
Find 'KeepAlive Off' and change it to 'KeepAlive On'

5) Let's start Apache  
`/etc/init.d/httpd start`

6) Let's setup a simple test page that will utilize the server environment variable that mod_ntlm sets.

    cd /path/set/in/step/3/in/location/directive
    touch index.php
    vi index.php

* Insert the following information:

    <?php
echo "You have logged in as <b>" . $_SERVER['REMOTE_USER'] . "</b>";
    ?>

If you do not have PHP installed you can just place a page in the directory and if you login you should be able to see it.

If you get a login prompt check the footnotes<sup>1</sup>.

<big><strong><a href="2007/05/sso-apache-ad-1/">Part 1</a> | <a href="2007/10/sso-apache-ad-2/">Part 2</a></strong></big>

<big><strong>Footnotes</strong></big>  
1. Getting a login prompt can be caused by using Firefox with the default configuration, not being logged on in the domain that you are attempting to authenticate against, or not having the site listed in the Local Intranet security zone in Internet Explorer. Or worst of all you could have mis configured something in step 3

 [1]: http://sivel.net/archives/12
 [2]: http://sivel.net/archives/13
