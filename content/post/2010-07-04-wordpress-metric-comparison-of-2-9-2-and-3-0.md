---
author: sivel
categories:
- Code
- CoolStuff
- Fun
- PHP
- WordPress
date: '2010-07-04'
description: WordPress Metric Comparison of 2.9.2 and 3.0
slug: wordpress-metric-comparison-of-2-9-2-and-3-0
title: WordPress Metric Comparison of 2.9.2 and 3.0
type: post
---

Some times I like to look at metrics. Because I am bored? Probably. Without metrics how can really compare things. In any case I wanted to see the difference in the number of queries, generation time and peak memory usage between WordPress 2.9.2 and WordPress 3.0.

One of the things that I have heard people say since the release of WordPress 3.0 is that it is noticably faster. "Is it really?", I asked myself. No, not out loud...or was it? Generally as much as we would like to make things faster from one release to the next, it doesn't really happen that way. There are new features added, rewrites of code, a new default theme and in the end metrics change.

So what really changed in the way of these 3 aspects of number of queries, generation time and peak memory usage?

### 2.9.2:

*   18 queries
*   0.173 seconds
*   15.901 MB peak memory used

### 3.0:

#### Kubrick

*   16 queries
*   0.209 seconds
*   18.301 MB peak memory used

#### Twenty Ten

*   15 queries
*   0.212 seconds
*   18.32 MB peak memory used

I have provided results as well for Twenty Ten, but so that we can perform a more apples to apples comparison we will use Kubrick. We have reduced the number of queries by 2 from 2.9.2 to 3.0, but it took 0.036 seconds longer to generate the page. In addition we now consume 2.4 MB more memory to generate the output.

I used the following code, placed at the very end of footer.php of the default theme for 2.9.2 and the very bottom of footer.php in twentyten. In 2.9.2 I removed the timer_stop line that already existed in the footer.php of the default theme.

    <!--
    <?php echo get_num_queries(); ?> queries
    <?php timer_stop(1); ?> seconds
    <?php echo round(memory_get_peak_usage() / 1024 / 1024, 3); ?> MB Peak Memory Used
    -->

The testing set up:

*   Ubuntu 10.04
*   Apache 2.2.14
*   PHP 5.3.2 (Only enabled modules were mysql, gd and curl)
*   MySQL 5.1.41 (With all caching disabled)
*   Fresh installs of WordPress without any enabled plugins or modifications
*   Tests performed using curl against the front page
*   Averages over 25 tests per install

Anyway, not really the most comprehensive metrics gathering test, but just something to look at. But in the end, is WordPress 3.0 any faster? With an absolute default install, no. Does it matter that 3.0 is ever so slightly slower? No. Should I be running WordPress 3.0 now? Yes!

Hopefully you find this post useful and that I didn't waste 15 minutes of my day that I will never get back to talk about something you could care less about.
