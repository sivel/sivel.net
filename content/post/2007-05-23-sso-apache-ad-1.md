---
author: sivel
categories:
- HowTo
- Linux
date: '2007-05-23'
description: Single Sign-On with Apache and Active Directory &#8211; Part 1
slug: sso-apache-ad-1
title: Single Sign-On with Apache and Active Directory &#8211; Part 1
type: post
---

<big><strong><a href="2007/05/sso-apache-ad-1/">Part 1</a> | <a href="2007/10/sso-apache-ad-2/">Part 2</a></strong></big>

This HowTo will describe how to setup single sign-on authentication with Apache and Microsoft Active Directory. Most of you are probably aware that there is no default/built-in support for automatically authenticating to an Apache web server using the NTLM header information passed from the web browser (in most cases Microsoft Internet Explorer) to the Web Server. Microsoft IIS of course supports this out of the box but who wants to use IIS? There are as I have found 3 major solutions for achieving this and I will outline which I picked and why.

First I'll start by explaining which solution I selected and why. There are 3 major solutions for this which are mod\_ntlm, mod\_auth\_kerb and Apache2:AuthenNTLM. I have chosen Apache2:AuthenNTLM. Now as for the why...I bypassed mod\_auth\_kerb instantly after reading that it required a working winbind setup. Keep in mind that I am looking for an easy quick setup, and configuring winbind first does not fall into that realm of a quick and easy setup. Next I tried mod\_ntlm which seemed to be very easy to setup and worked well. But there was one catch...If the browser did not send the NTLM information or correct NTLM information<sup>1</sup> the user had to login with the username in the form of DOMAINusername. In my experience with applications already in place they did not require this form of DOMAINusername. This could be resolved if you could specify the default domain in mod\_ntlm which you cannot. Reading the documentation for Apache2:AuthenNTLM you could specify the default domain as well as many other options that are not available in mod\_ntlm. Configuration proved to be a little tricky, but if it weren't I wouldn't be writing this HowTo. Now as you may have noticed from the naming syntax of Apache2:AuthenNTLM that it is indeed a perl module. Now as we are using Apache2:AuthenNTLM it will require mod_perl2 which is not included with CentOS4 or RHEL4.

Now for the HowTo:

1) Start by installing Apache and mod_perl by issuing the following commands:

> shell> yum install httpd  
> shell> wget http://sivel.net/repo/i386/mod_perl-2.0.3-1.el4.sn.i386.rpm  
> shell> rpm -Uvh mod_perl-2.0.3-1.el4.sn.i386.rpm

2) Next we need to install the Apache2:AuthenNTLM module

> shell> wget http://sivel.net/repo/i386/perl-Apache2-AuthenNTLM-0.02-1.el4.sn.i386.rpm  
> shell> rpm -Uvh perl-Apache2-AuthenNTLM-0.02-1.el4.sn.i386.rpm

3) Now we need to configure Apache to use Apache2:AuthenNTLM

> shell> cd /etc/httpd/conf.d  
> shell> touch ntlm.conf  
> shell> vi ntlm.conf

*   Add the following information:

    
    <location /directory> # Change this to the directory you wish to protect.  Can be /
    PerlAuthenHandler Apache2::AuthenNTLM
    AuthType ntlm,basic
    AuthName Basic
    require valid-user
    #                    domain  pdc  bdc
    PerlAddVar ntdomain "DOMAIN  dc1  dc2" # Change DOMAIN to the netbios name of your domain.  Change dc1 and dc2 to the hostnames of the domain controllers for your domain.  dc2 is not required if your setup does not have a dc2.
    PerlSetVar defaultdomain DOMAIN # Change DOMAIN to the netbios name of your domain
    PerlSetVar splitdomainprefix 1
    </location>
    
    

> shell> vi /etc/httpd/conf/httpd.conf  
> Find 'KeepAlive Off' and change it to 'KeepAlive On'

4) Now we need to modify /etc/resolv.conf

> shell> vi /etc/resolv.conf

*   We need to make sure that it looks like the following:

> search domain.lan  
> nameserver 10.0.0.1  
> nameserver 10.0.0.2

*   Where domain.lan is your Active Directory domain name and the nameservers are the name servers for your Active Directory (usually the domain controllers)

5) Let's start Apache

> shell> /etc/init.d/httpd start

6) Let's setup a simple test page that will utilize the server environment variable that AuthenNTLM sets.

> shell> cd /path/set/in/step/3  
> shell> touch index.php  
> shell> vi index.php

*   Insert the following information:

`<br />
<?php<br />
echo "You have logged in as <b>" . $_SERVER['REMOTE_USER'] . "</b>;";<br />
?><br />
`

*   If you do not see your username then you don't have something in step 3 setup correctly. If you get a login prompt check the footnotes below.

<big><strong><a href="2007/05/sso-apache-ad-1/>Part 1</a> | <a href="2007/10/sso-apache-ad-2/">Part 2</a></strong></big>

<big><strong>Footnotes</strong></big>  
1. Getting a login prompt can be caused by using Firefox with the default configuration, not being logged on in the domain that you are attempting to authenticate against, or not having the site listed in the Local Intranet security zone in Internet Explorer. Or worst of all you could have mis configured something in step 3. You can turn on debug information by adding 'PerlSetVar ntlmdebug 2' to step 3. Debugging will log to /var/log/httpd/error_log.
