---
author: sivel
categories:
- Code
- CoolStuff
- HowTo
- PHP
- Technology
- WordPress
date: '2010-11-22'
description: WordPress Caching Comparisons Part 1
series:
- Caching
slug: wordpress-caching-comparisons-part-1
title: WordPress Caching Comparisons Part 1
type: post
---

For some time now I have been wanting to write an up to date XCache object cache plugin for WordPress. Around 4 years ago I did an opcode caching comparison between APC, XCache and eAccelerator. My results had shown that at the time that XCache was the fastest of the 3. Unfortunately I didn't think to keep that data around. As a result of these tests I had standardized the environment I was working on with XCache, and have never thought twice about it. Since I use XCache for opcode caching everywhere, it seemed like writing such an object cache plugin would be beneficial. After writing the plugin I figured it best to test performance, comparing it to the Memcached object cache and the APC Object cache. I tweeted a lot during my initial testing, and got an overwhelming response to write up a post, and here we are...

I'll try to make this comparison comprehensive, but it can be a little difficult to always cover everything.

The test environment:

*   Toshiba T135-S1310
*   Intel SU4100 64bit Dual-Core 1.3GHz
*   4GB DDR3 Memory
*   Ubuntu 10.10 64bit
*   Apache 2.2.16
*   PHP 5.3.3
*   PHP XCache 1.3.0
*   PHP APC 3.1.3p1
*   Memcached 1.4.5
*   Pecl Memcached 3.0.4
*   MySQL 5.1.49 No caching configured
*   cURL 7.21.0
*   WordPress 3.1-alpha (r16527) Default install with Twenty Ten and no plugins other than the one I mention below

The times are based off of the standard timer\_stop() code often found in the footer.php of themes, in this case added using the wp\_footer filter through a mu (must use) plugin:

    <?php
    add_action('wp_footer', 'print_queries', 1000);
    function print_queries() {
    ?>
    
    
    <!-- <?php echo get_num_queries(); ?> queries. <?php timer_stop(1); ?> seconds. -->
    
    
    <?php
    }

<p>cURL was used to make the HTTP requests and grab the value from the comment created by the above code:</p>

    for (( c=1; c<=101; c++ )); do curl -s http://wordpress.trunk/ | grep '</body>' -B 1 | head -1 | awk -F"queries. " '{print $2}' | awk -F" seconds" '{print $1}'; done;

In each data set I gather 101 results and omit result 1 so that we only have results after the initial cache is generated. The tests are only performed on the home page.

The tests:

1.  No Object or Opcode Cache
2.  Memcached Object Cache with no Opcode Cache
3.  Memcached Object Cache with APC Opcode Cache
4.  Memcached Object Cache with XCache Opcode Cache
5.  APC Object and Opcode Cache
6.  APC Opcode Cache with no Object Cache
7.  XCache Object and Opcode Cache
8.  XCache Opcode Cache with no Object Cache

I didn't evaluate eAccelerator due to the fact that it isn't available in the Ubuntu repositories and I did not feel likely compiling...

The results (in seconds):



For a larger view of the spreadsheet above or if you cannot see it, take a look [here][1].

These results are quite interesting and actually shocked me a little bit. The first thing that I found when developing an up to date XCache Object Cache plugin was that it can't handle objects! So the plugin has to serialize all data when setting, and unserialize when retrieving. This of course is going to add overhead to every operation.

When I first tested the Memcached Object Cache I was surprised at how little it improved speed. It took me about an hour to realize that the comparison of just using Memcached was unfair as it didn't include any Opcode caching, adding an Opcode cache brings it more in line with what I would expect.

Using an opcode cache improves performance by over 200% on a stock WordPress install without using any object caching. While APC and XCache provided similar results, my tests still show XCache to be ever so slightly faster as an opcode cache.

Where we see the biggest difference between the 3 of these caches when using APC for both opcode and object caching.

Assuming we are using both Opcode and Object caching here are the results from best to worst:

1.  APC
2.  Memcached (With either APC or XCache)
3.  XCache

At this point the single largest failure of XCache is it's inability to store objects, so I am pretty much planning on dropping XCache on my servers in favor of APC, which will be included with PHP as of PHP 6. I would likely still see marginal speed improvements using XCache on sites that I am not using XCache for an object cache, but on those that I am I'll get much improved performance off of APC or Memcached.

Now why would I want to use APC over Memcached or vice versa? Well, the one thing that Memcached provides that APC doesn't is the ability to share the cache between servers. In a load balanced multi web server environment, using APC you would be duplicating the cache on all of the servers as APC provides no way to share this data or allow for remote connections. Memcached however, being a PHP independent daemon can be used for pooling resources and allowing remote connections. You also can get more bang for your buck with Memcached in a load balanced multi server environment because of it's pooling capability. The pooling capability allows you to dedicate say 128MB of RAM to each memcached instance and when pooled together will give you 128MB x N where N is the number of servers in the pool. Anyway, I digress...

In the end, if you have WordPress hosted on a single web server, APC is the way to go. If you are in a multi web server environment, Memcached is the way to go, but remember to install an Opcode cache as well. If you are crazy and just want to use more CPU cycles, XCache is the way to go.

Some of you may be thinking "why would I need an object cache in addition opcode caching, if the results are similar?" Well, under higher load an object cache will respond better than MySQL, even with MySQL caching. In addition, other factors with MySQL can come into play, such as connectivity to the MySQL server. It may be on another server, with not enough memory, slow disks, with an overloaded network, which decreases performance. Any time that an update query is run, MySQL will flush the whole cache. Another benefit, is we are rarely, if ever, going to use the data exactly as it is given to us from the MySQL query. In the end we are going to process the data before displaying, an object cache allows you to store the processed data, rather than the raw data from the query saving CPU cycles required for the processing. Individually these items may not consume much time, but added together and in a more efficient delivery system, this can make a huge difference.

Now for any of you who go run out and install Memcached, if you install version 1.4.x make sure you get at least pecl memcached 2.2.6 or 3.0.4. Memcached made a change that breaks deletes with earlier pecl memcached versions, which adversely affects WordPress.

A few additional things that I have been asked to talk about are using caching with a WordPress Network, output caching with Batcache and query counts. I promise to get to those, but I just wanted to get this out sooner rather than later.

Yo Dawg! We heard you like caching so we put a cache in your cache, so you can optimize while you optimize...Sorry couldn't resist.

 [1]: https://spreadsheets.google.com/pub?key=0AlRMJ5h6yNYAdGV5UHFmdjNKLTBEOE9IMVktVXcxU1E&hl=en&output=html
