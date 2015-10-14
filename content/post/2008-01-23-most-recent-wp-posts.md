---
author: sivel
categories:
- HowTo
- PHP
- WordPress
date: '2008-01-23'
description: Display Most Recent WordPress Posts On Another Site
slug: most-recent-wp-posts
title: Display Most Recent WordPress Posts On Another Site
type: post
---

I was recently had the job of displaying the most recent WordPress posts on a sites main page. The easiest way I could think of doing this is to use the RSS feed.

I'll give two sample php functions that will do this as one requires some pear packages and the other doesn't.

**Option 1**

This option requires the use of several PHP Pear packages. Those packages are XML\_RSS, XML\_Tree and XML_Parser. This is the preferred option as the code is specific to RSS instead of XML generically.

    <?php
    require_once "XML/RSS.php";

    // read_rss(display_n_items,feed_url)
    function read_rss($display=0,$url='') {
    	$rss =& new XML_RSS($url);
    	$rss->parse();
    	$itemArr = array();
    	foreach ($rss->getItems() as $item) {
    		if ($display == 0) {
    			break;
    		}
    
    		array_push($itemArr,$item);
    
    		$display--;
    	}
    	return $itemArr;
    }
    ?>

**Option 2**

This option does not require any special Pear packages which would be helpful for users who do not have the capability to install them or have their hosting provider install them.

    
    <?php
    // read_rss(display_n_items,feed_url)
    function read_rss($display=0,$url='') {
    	$doc = new DOMDocument();
    	$doc->load($url);
    	$itemArr = array();
    	foreach ($doc->getElementsByTagName('item') as $node) {
    		if ($display == 0) {
    			break;
    		}
    
    		$itemRSS = array (
    			'title'       => $node->getElementsByTagName('title')->item(0)->nodeValue,
    			'description' => $node->getElementsByTagName('description')->item(0)->nodeValue,
    			'link'        => $node->getElementsByTagName('link')->item(0)->nodeValue,
    			'pubdate'     => $node->getElementsByTagName('pubDate')->item(0)->nodeValue
    		);
    
    		array_push($itemArr, $itemRSS);
    
    		$display--;
    	}
    	return $itemArr;
    }
    ?>

Now to use either of these functions we would do something similar to the following:

    <ul>
    <?php
    $items = read_rss(2, 'http://sivel.net/feed');
    foreach ( $items as $item ) {
        echo '<li><a href="' . $item['link'] . '">' . $item['title'] . '</a>';
    }
    ?>
    </ul>
