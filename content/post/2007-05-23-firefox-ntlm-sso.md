---
author: sivel
categories:
- HowTo
date: '2007-05-23'
description: Enabling NTLM Authentication (Single Sign-On) in Firefox
slug: firefox-ntlm-sso
title: Enabling NTLM Authentication (Single Sign-On) in Firefox
type: post
---

This HowTo will describe how to enable NTLM authentication (Single Sign-On) in Firefox.

How many of you have noticed that when you are using Internet Explorer and you browse to your companies intranet page that it will automatically authenticate you but when you use Firefox you will be prompted with a login box?

I recently, in searching for solutions to allow NTLM authentication with Apache, stumbled across how to set a preference in Firefox that will pass the NTLM authentication information to a web server. The preference is [network.automatic-ntlm-auth.trusted-uris][1].

So how do you do it?

1) Open Firefox and type "about:config" in the address bar. (without the quotes of course)  
2) In the 'Filter' field type the following "network.automatic-ntlm-auth.trusted-uris"  
3) Double click the name of the preference that we just searched for  
4) Enter the URLs of the sites you wish to pass NTLM auth info to in the form of:

> http://intranet.company.com,http://email.company.lan

5) Notice that you can use a comma separated list in this field.  
6) Updated: I have created VBScript that can be used to insert this information into a users prefs.js file by using group policy or standalone if for some reason you want to use it for that.

The script is available to be downloaded [here][2].

After downloading the script you will want to extract it from the ZIP archive and then modify the line starting with strSiteList.

NOTE: This script will not perform its function if the user has Firefox open at the time the script is executed. Running the script through group policy will work without problem unless for some reason your group policy launches Firefox before the execution of this script.

You can read through the rest of the script for additional information. If you have questions, comments or concerns please let me know.

 [1]: http://kb.mozillazine.org/Network.automatic-ntlm-auth.trusted-uris
 [2]: http://cdn.sivel.net/f/i/firefox_ntlm_preference_conf.zip
