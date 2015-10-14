---
author: sivel
categories:
- Code
- CoolStuff
- HowTo
- PHP
- Technology
- Uncategorized
- WordPress
date: '2011-12-06'
description: WordPress Caching Comparisons Part 2
series:
- Caching
- WordPress
slug: wordpress-caching-comparisons-part-2
title: WordPress Caching Comparisons Part 2
type: post
---

This post has been on my mind for quite some time now, ever since I wrote Part 1 over 1 year ago.

Part 1 only really addressed opcode <a class="simple-footnote" title="opcode: A technique of optimizing the PHP code and caching the bytecode compiled version of the code, to reduce the compilation time incurred during PHP code execution" id="return-note-1078-1" href="#note-1078-1"><sup>1</sup></a> and Object caching <a class="simple-footnote" title="Object Caching: An in memory key-value storage for arbitrary data, to reduce processing, and storage of external calls to speed up retrieval and display of information" id="return-note-1078-2" href="#note-1078-2"><sup>2</sup></a> and didn't really touch page caching <a class="simple-footnote" title="Page Caching: Full caching of HTML output for web pages" id="return-note-1078-3" href="#note-1078-3"><sup>3</sup></a>. In this post I have revisited all tests and added in comparisons of using both the [APC Object Cache][1] + [Batcache][2] plugins as well as using the [W3 Total Cache][3] plugin.

### Tests

*   No opcode, no caching
*   APC opcode, no caching
*   APC opcode, APC object caching plugin
*   APC opcode, W3 Total Cache APC object caching
*   APC opcode, APC object caching plugin, Batcache page caching
*   APC opcode, W3 Total Cache APC object and page caching

### Comparison Stats

*   PHP generation time <a class="simple-footnote" title="PHP generation time: The amount of time taken to compile and execute the PHP code into the resulting HTML" id="return-note-1078-4" href="#note-1078-4"><sup>4</sup></a>
*   Number of include/include\_once/require/require\_once calls <a class="simple-footnote" title="Include/Require Count: The number of calls to the PHP include, include_once, require and require_once functions, which are used to load a separate file" id="return-note-1078-5" href="#note-1078-5"><sup>5</sup></a>
*   Number of stat() calls per dtruss/strace <a class="simple-footnote" title="stat() call count: The number of unix system calls that return information about files, directories and other filesystem related objects." id="return-note-1078-6" href="#note-1078-6"><sup>6</sup></a>
*   cURL time to start transfer <a class="simple-footnote" title="Start Transfer Time: The amount of time between the request from the client to the server, and when the server begins returning data to the client" id="return-note-1078-7" href="#note-1078-7"><sup>7</sup></a>
*   Apache Bench (ab) tests for concurrency <a class="simple-footnote" title="Concurrency: The number of concurrent client requests to the server" id="return-note-1078-8" href="#note-1078-8"><sup>8</sup></a> and requests per second

For the above stats gathering, with PHP generation time and cURL time to start transfer, 102 sets were collected, the first 2 were dropped due to cache priming, the remaining 100 were used, and averaged. With the Apache Bench tests, 12 sets were used, dropping the highest and lowest value, and averaging across the remaining 10. Include and stat() counts were gathered over 5 sets not requiring averaging as they were the same between runs.

To find the optimal concurrency and req/s for Apache Bench, I performed manual testing, visually inspecting the results until I reached what I classified as a "sweet spot". Using the "sweet spot" stats, I performed additional sets to gather the averages for requests per second.

### The Setup

*   256MB Rackspace Cloud Server
*   Ubuntu 11.04 amd64
*   Apache 2.2.17 - Default Ubuntu Install, no modifications, default document root located at /var/www
*   PHP 5.3.5 (mod_php) - Default Ubuntu Install, no modifications
*   PHP APC 3.1.3p1 - Default Ubuntu Install, no modifications
*   MySQL 5.1.54 - Default Ubuntu Install, no modifications
*   WordPress 3.3-beta4-r19470 - Default Install, requests made to the "home" page
*   APC Object Cache trunk version
*   Batcache trunk version
*   W3 Total Cache 0.9.2.4

I have not compared static file caching yet and hope to compare W3 Total Cache and WP Super Cache in the future.  In this comparison I am mainly focusing on opcode, object caching and page caching.

I am going to try to keep this comparison about the stats only, and not make this a critique or review of the plugin, although in some cases this will not be possible.

### Test Data

**No opcode and no caching:**  
PHP Generation Time: 0.13787 seconds  
Number of includes: 80  
Number of stat calls: 266  
cURL time to start transfer: 0.15463 seconds  
Apache Bench Concurrency: 15  
Apache Bench Requests Per Second: 19.1483 req/s

**APC opcode and no caching:**  
PHP Generation Time: 0.05088 seconds  
Number of includes: 80  
Number of stat calls: 148  
cURL time to start transfer: 0.05673 seconds  
Apache Bench Concurrency: 60  
Apache Bench Requests Per Second: 68.2636 req/s

**APC opcode and APC Object caching:**  
PHP Generation Time: 0.03407 seconds  
Number of includes: 81  
Number of stat calls: 148  
cURL time to start transfer: 0.03975 seconds  
Apache Bench Concurrency: 260  
Apache Bench Requests Per Second: 77.7214 req/s

**APC opcode and W3TC APC Object caching:**  
PHP Generation Time: 0.03993 seconds  
Number of includes: 102  
Number of stat calls: 285  
cURL time to start transfer: 0.04591 seconds  
Apache Bench Concurrency: 200  
Apache Bench Requests Per Second: 67.581 req/s

**APC opcode and APC Object and Page caching with Batcache:**  
PHP Generation Time: N/A  
Number of includes: Unable to collect  
Number of stat calls: 41  
cURL time to start transfer: 0.00316 seconds  
Apache Bench Concurrency: 600  
Apache Bench Requests Per Second: 147.2156 req/s

**APC opcode and W3TC APC Object and Page caching:**  
PHP Generation Time: N/A  
Number of includes: Unable to collect  
Number of stat calls: 87  
cURL time to start transfer: 0.00625 seconds  
Apache Bench Concurrency: 500  
Apache Bench Requests Per Second: 147.8425 req/s

### Conclusions

I can state the following about just enabling APC in PHP, if you do nothing else, you should at least do this:

1.  170% PHP generation time improvement by enabling APC opcode caching
2.  172% Time to start transfer improvement by enabling APC opcode caching
3.  300% concurrency improvement by enabling APC opcode caching
4.  256% requests per second improvement by enabling APC opcode caching

I see performance improvements using both APC+Batcache and W3 Total Cache. However, in all tests, APC+Batcache seems to outperform W3 Total Cache, in PHP generation time, number of includes, number of filesystem stat() calls, time to start transfer, number of concurrent requests and requests per second with relation to concurrency.

I was able to push APC+Batcache to 700 concurrent requests, but req/s dropped. W3TC capped out at 500 concurrent requests, and would go no further, however 500 requests per second provided the highest req/s for W3TC.

W3TC does provide a lot of additional functionality to help reduce load on the server, such as tweaking client side caching, and using a CDN, where APC+Batcache does not, although there are small unitasking plugins that can add the missing functionality for you such as:

*   [WP Minify][4]
*   [CDN Tools][5]
*   [Use Google Libraries][6]

APC+Batcache consists of adding 3 new files, and no new directories. The W3TC download consists of 60 new directories and 351 files. The directory listing level for W3TC being as deep as it is, 5 levels deep past the directory for the plugin itself, causes a significant increase in filesystem stat() commands.

Most shared hosting providers as well as many multiserver environments will often host their web roots on NFS, and the more filesystem stat() calls, the worse performance you will see, especially under higher load.

Something else to note, is a lot can be done on the server to also improve performance. You can also use caching applications that logically sit in front of the webserver to cache, instead of using caching plugins, which will also improve performance. There are probably eleventy billion ways to improve performance, so if in doubt, consult an expert to help.

<div class="simple-footnotes">
  <p class="notes">
    Notes:
  </p>
  
  <ol>
    <li id="note-1078-1">
      opcode: A technique of optimizing the PHP code and caching the bytecode compiled version of the code, to reduce the compilation time incurred during PHP code execution <a href="#return-note-1078-1">#</a>
    </li>
    <li id="note-1078-2">
      Object Caching: An in memory key-value storage for arbitrary data, to reduce processing, and storage of external calls to speed up retrieval and display of information <a href="#return-note-1078-2">#</a>
    </li>
    <li id="note-1078-3">
      Page Caching: Full caching of HTML output for web pages <a href="#return-note-1078-3">#</a>
    </li>
    <li id="note-1078-4">
      PHP generation time: The amount of time taken to compile and execute the PHP code into the resulting HTML <a href="#return-note-1078-4">#</a>
    </li>
    <li id="note-1078-5">
      Include/Require Count: The number of calls to the PHP include, include_once, require and require_once functions, which are used to load a separate file <a href="#return-note-1078-5">#</a>
    </li>
    <li id="note-1078-6">
      stat() call count: The number of unix system calls that return information about files, directories and other filesystem related objects. <a href="#return-note-1078-6">#</a>
    </li>
    <li id="note-1078-7">
      Start Transfer Time: The amount of time between the request from the client to the server, and when the server begins returning data to the client <a href="#return-note-1078-7">#</a>
    </li>
    <li id="note-1078-8">
      Concurrency: The number of concurrent client requests to the server <a href="#return-note-1078-8">#</a>
    </li>
  </ol>
</div>

 [1]: http://wordpress.org/extend/plugins/apc/
 [2]: http://wordpress.org/extend/plugins/batcache/
 [3]: http://wordpress.org/extend/plugins/w3-total-cache/
 [4]: http://wordpress.org/extend/plugins/wp-minify/
 [5]: http://wordpress.org/extend/plugins/cdn-tools/
 [6]: http://wordpress.org/extend/plugins/use-google-libraries/
