---
author: sivel
categories:
- HowTo
- Plugins
- WordPress
date: '2008-03-26'
description: AJAX-ify the FAQ-Tastic WordPress Plugin
slug: ajaxify-faqtastic
title: AJAX-ify the FAQ-Tastic WordPress Plugin
type: post
---

<p style="border: 1px dashed red;">
  If you came here looking for the plugin click <a href="#plugin">here</a>.
</p>

<span style="color:red; font-weight:bold;">Update:</span> This plugin has been tested with the new [FAQ-Tastic Lite][1] plugin and works as expected.

[FAQ-Tastic][1] is a wonderful WordPress plugin for maintaining a FAQ on your website. My company recently made a decision for one of its products to run both the blog and FAQ for the product off of WordPress. Using FAQ-Tastic will enable the folks in charge of the FAQ to make changes without having to modify any code.

While the developers of FAQ-Tastic apparently went to great lengths to add AJAX effects to the admin area for this plugin the actual display in the post or page is rather boring in the fact that it does not include any AJAX and simply displays the answer directly under the question. You can additionally list all of the questions which will link to the question and answer lower in the page but that keeps the users scrolling up and down the page. The authors of FAQ-Tastic list in their [FAQ][2] that they are planning on AJAXifying the plugin at some future time, but we don't have time to wait for them to do it.

A simple solution would be to add a small amount of Javascript and CSS code to collapse the answers and only display them once the question has been clicked.

There is one caveat though...Ratings do not collapse with the answer, which causes them to not display correctly, and thus have been hidden using CSS in this plugin.

**<big>Now for instructions on implementing it</big>**

1.  Open header.php from your WordPress theme in your favorite text editor or the WordPress theme editor.
2.  Add the following code just above the line reading `<?php wp_head(); ?>` 
    
        
        
        
        
        

3.  Add the following code just after the line reading `<?php wp_head(); ?>`: 
    
        
        
        
        

4.  You can add some additional styling by adding a open/close indicator next to the question by adding the following into the css styles listed in step 3. 
        
        ol.faq h3 {
        	padding-left:20px;
        	background: url(/wp-content/themes/YOURTHEME/images/open.gif) top left no-repeat;
        }
        ol.faq h3.active {
        	background: url(/wp-content/themes/YOURTHEME/images/close.gif) top left no-repeat;
        }
        
        
    
    You can download these sample open/close images [here][3]
    
    These gif images should be extracted/uploaded to 'wp-content/themes/YOURTHEME/images'

And now that you are saying I'm not going to do this because it is too complicated...Don't worry I have also written a plugin with the information I have provided above that will automatically implement this just by activating the plugin.  
<a name="plugin"></a>  
The plugin can be downloaded from [WordPress.org][4] repository.

**<big>Instructions on using the plugin</big>**

1.  Download the plugin from [here][4]
2.  Upload the **ajaxify-faqtastic** directory to **wp-content/plugins/**
3.  Open the admin section of WordPress, click on Plugins and then Activate this plugin.
4.  Simple as that...you are done.

If you don't want to go through subscribing to a mailing list to get the FAQ-Tastic plugin, download using the following links:  
[Plugin][5]  
[Manual][6]

<a name="changelog"></a>**<big>Change Log</big>**

**1.4 (2009-02-27):**

*   Update to new version numbering
*   enqueue styles and scripts instead of printing directly to the head

**0.3 (2008-08-12):** 
*   Updated for WordPress 2.6 compatibility

**0.2 (2008-03-26):** 
*   Initial Public Release

**<big>Download</big>**  
[AJAXify FAQTastic version 1.4][7]  
[Archived Versions][8]

 [1]: http://faq-tastic.com/faqtastic-lite-free/
 [2]: http://knowledgeconstructs.com/wordpress-plugins/faq-tastic/faq-tastic-faq/#faq_38
 [3]: http://cdn.sivel.net/o/p/openclosegifs.zip
 [4]: http://downloads.wordpress.org/plugin/ajaxify-faqtastic.0.3.zip
 [5]: http://faq-tastic.com/faqtastic-lite-download/faq-tastic_1.0.9.zip
 [6]: http://faq-tastic.com/faqtastic-lite-download/FAQ-Tastic-user-manual.pdf
 [7]: http://downloads.wordpress.org/plugin/ajaxify-faqtastic.1.4.zip
 [8]: http://wordpress.org/extend/plugins/ajaxify-faqtastic/download/
