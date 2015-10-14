---
author: sivel
categories:
- Plugins
- WordPress
date: '2008-03-14'
description: Lightview JS WordPress Plugin
slug: lightview-js
title: Lightview JS WordPress Plugin
type: post
---

<p style="border: 1px dashed red; padding: 5px;">
  <span style="color: red; font-weight: bold;">Update:</span>The Lightview JS WordPress plugin is hereby completely end of life. My plugin was in conflict with the Lightview per domain license and has been removed from the WordPress plugins repository. Users seeking a Lightview WordPress plugin should see the <a href="http://wordpress.org/extend/plugins/lightview-plus/">Lightview Plus</a> plugin written by <a href="http://www.puzich.com/">Thorsten Puzich</a>. As an alternative to Lightview please see my <a href="http://sivel.net/2008/02/shadowbox-js">Shadowbox JS</a> plugin.
</p>

A media viewer application written entirely in JavaScript. Using Lightview, website authors can display pictures, movies, websites, inline content and more in all major browsers without navigating away from the linking page.

This plugin uses [Lightview][1] written by Nick Stakenburg.

Javascript libraries supported are: Prototype + Scriptaculous. Prototype + Scriptaculous are included with the plugin as the versions packaged with WordPress are below the minimum requirements.

This plugin support the WordPress [ gallery] shortcode. By simply having this plugin activated and $lvGallery set to true which is the default, Lightview JS will be used to display the images in your gallery.

**<big>Screenshots</big>**

<a href="/uploads/2008/03/screenshot-1.png" class="lightview" rel="gallery[lightview]" title="Image"><img src="/uploads/2008/03/screenshot-1.png" alt="image" width="122" height="96" /></a><a href="/uploads/2008/03/screenshot-2.png" class="lightview" rel="gallery[lightview]" title="Image"><img src="/uploads/2008/03/screenshot-2.png" alt="Website" width="122" height="96" /></a>

**<big>Installation</big>**

1.  Upload the \`lightview-js\` folder to the \`/wp-content/plugins/\` directory
2.  Edit lightview-js.php and modify $lvGallery based on the comments preceeding the variable. Please note that this is an optional step. Lightview JS will function properly without modification.
3.  Activate the plugin through the 'Plugins' menu in WordPress

**<big>Upgrade</big>**

1.  Deactivate the plugin through the 'Plugins' menu in WordPress
2.  Delete the previous \`lightview-js\` folder from the \`/wp-content/plugins/\` directory
3.  Upload the new \`lightview-js\` folder to the \`/wp-content/plugins/\` directory
4.  Edit lightview-js.php and modify $lvGallery based on the comments preceeding the variable. Please note that this is an optional step. Lightview JS will function properly without modification.
5.  Activate the plugin through the 'Plugins' menu in WordPress

**<big>Usage</big>**

1.  If you are using the [ gallery] shortcode the following steps are not required. When using the [ gallery] shortcode this is automatic.
2.  Create a link in your post in the following format:  
    `<a href="http://domain.tld/directory/to/image.jpg" class="lightview">Image</a>`  
    The above link can be to pretty much anything including websites, video files, YouTube, Google Video, inline content. 
    This is the minimum code required to use this plugin.

3.  Please see the [markup][2] on the Lightview javascript authors usage page for more information such as sizing the media. . Please keep in mind that I did not write the Lightview javascript I only created a WordPress plugin that implements it.
4.  Be sure to include \`class="lightview"\` as this activates the plugin.
5.  If \`rel="gallery[album]"\` is included the portion listed here as \`[album]\` will group multiple pictures into an album called album.

**NOTE:** Do not use the visual editor for doing the above use the code editor. When modifying this post in the future do not use the visual editor; please use the code editor always.

**Examples:**

`<a href="http://domain.tld/directory/to/image.jpg" class="lightview" rel="gallery[album]">Image</a>`  
`<a href="http://domain.tld/directory/to/image.jpg" class="lightview" rel="gallery[album]"><img src="http://domain.tld/directory/to/image.jpg" /></a>`  
`<a href="http://sivel.net/" class="lightview" rel="iframe" title="Sivel.net :: My Site :: fullscreen: true">Sivel.net</a>`

<a name="changelog"></a>**<big>Change Log</big>**

**(2009-03-03):**

*   Plugin marked as end of life and removed due to licensing conflicts

**1.5 (2009-02-27):**

*   enqueue styles and scripts instead of directly printing to the head

**1.4 (2008-08-25):**

*   Updated version number scheme 
*   Updated code for readability
*   added support for [ gallery] shortcode

**0.3 (2008-08-12):**

*   Update for WordPress 2.6 compatibility

**0.2 (2008-03-14):**

*   Initial Public Release

**<big>Download</big>**  
REMOVED

 [1]: http://www.nickstakenburg.com/projects/lightview/
 [2]: http://www.nickstakenburg.com/projects/lightview/#howtouse
