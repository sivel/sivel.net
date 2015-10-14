---
author: sivel
categories:
- HowTo
- PHP
- Plugins
- WordPress
date: '2008-10-06'
description: Separating Pings from Comments in WordPress 2.7
slug: wp-27-comment-separation
title: Separating Pings from Comments in WordPress 2.7
type: post
---

WordPress 2.7 has introduced many new features surrounding comments. Of these is AJAX commenting and threaded comments. To take advantage of the later, you must use a function wp\_list\_comments instead of the old way of looping through the comments array with a foreach. Weblog Tools Collection has a good how to on the old way that can be found [here][1]. 

I wanted to get this hashed out before 2.7 goes live so that theme designers and anyone else can implement this in time for the release.

I'll be referencing the default theme from 2.7 in this how to. If you are interested in adding the new commenting features to your current pre 2.7 theme see this [how to][2] by Otto.

wp\_list\_comments is not documented yet on the WordPress [codex][3]. But some feature that are worth mentioning are the ability to specify the comment type to display and a callback so that you can decide how to structure the output.

Let us start by taking a look at the new comments "loop":

    
    <?php if ( have_comments() ) : ?>
    	<h3 id="comments">
    
    <?php comments_number('No Responses', 'One Response', '% Responses' );?> to &#8220;
    
    <?php the_title(); ?>&#8221;</h3>
    
    	<ol class="commentlist">
    	
    
    <?php wp_list_comments(); ?>
    	</ol>
    	<div class="navigation">
    		<div class="alignleft">
    
    <?php previous_comments_link() ?></div>
    		<div class="alignright">
    
    <?php next_comments_link() ?></div>
    	</div>
    
    
    <?php else : // this is displayed if there are no comments so far ?>
    
    	
    
    <?php if ('open' == $post->comment_status) : ?>
    		
    
    <!-- If comments are open, but there are no comments. -->
    
    	
    
    <?php else : // comments are closed ?>
    		
    
    <!-- If comments are closed. -->
    		<p class="nocomments">Comments are closed.</p>
    
    	
    
    <?php endif; ?>
    
    
    <?php endif; ?>
    
    

As you can see it is much simpler than the old comments "loop". The majority of everything that is happening is now done via the function wp\_list\_comments.

To remove pings (pingbacks and trackbacks) we only need to make a few small changes. First open up your themes single.php:

Find the following code:

    <?php comments_template(); ?>

And change it to:

    <?php comments_template('', true); ?>

The above change tells comments\_template to create a global array $comments\_by_type that we will use later on.

First open up comments.php.

Look for the following code:

    <?php if ( have_comments() ) : ?>

Directly below this add:

    
    <?php if ( ! empty($comments_by_type['comment']) ) : ?>
    
    

Change this:

    <?php wp_list_comments(); ?>

To this:

    <?php wp_list_comments('type=comment'); ?>

Directly below the wp\_list\_comments function we modified is:

    </ol>

Directly below this add:

    <?php endif; ?>

The if statement prevents the comments heading and ol tags from displaying if you only have trackbacks and pingbacks on this post.

Much easier so far, right?

To display the pings we need to insert the following code beneath the endif we just added:

    
    <?php if ( ! empty($comments_by_type['pings']) ) : ?>
    <h3 id="pings">Trackbacks/Pingbacks</h3>
    
    <ol class="commentlist">
    
    
    <?php wp_list_comments('type=pings'); ?>
    </ol>
    
    
    <?php endif; ?>
    
    

The comments "loop" should now look like this:

    
    <?php if ( have_comments() ) : ?>
    	
    
    <?php if ( ! empty($comments_by_type['comment']) ) : ?>
    	<h3 id="comments">
    
    <?php comments_number('No Responses', 'One Response', '% Responses' );?> to &#8220;
    
    <?php the_title(); ?>&#8221;</h3>
    
    	<ol class="commentlist">
    	
    
    <?php wp_list_comments('type=comment'); ?>
    	</ol>
    	
    
    <?php endif; ?>
    
    	
    
    <?php if ( ! empty($comments_by_type['pings']) ) : ?>
    	<h3 id="pings">Trackbacks/Pingbacks</h3>
    
    	<ol class="commentlist">
    	
    
    <?php wp_list_comments('type=pings'); ?>
    	</ol>
    	
    
    <?php endif; ?>
    
    	<div class="navigation">
    		<div class="alignleft">
    
    <?php previous_comments_link() ?></div>
    		<div class="alignright">
    
    <?php next_comments_link() ?></div>
    	</div>
     
    
    <?php else : // this is displayed if there are no comments so far ?>
    
    	
    
    <?php if ('open' == $post->comment_status) : ?>
    		
    
    <!-- If comments are open, but there are no comments. -->
    
    	
    
    <?php else : // comments are closed ?>
    		
    
    <!-- If comments are closed. -->
    		<p class="nocomments">Comments are closed.</p>
    
    	
    
    <?php endif; ?>
    
    
    <?php endif; ?>
    
    

Now the pings are displayed below the comments. The above code will show the pings in full comment boxes. I personally like a simple ordered list with a link and title of the ping. To achieve this without a foreach (Thanks [Ryan Boren][4] for the tip!)

Open your themes functions.php file and create a callback function for wp\_list\_comments. The following code should be inserted:

    
    <?php
function list_pings($comment, $args, $depth) {
       $GLOBALS['comment'] = $comment;
?>
            <li id="comment-
    
    <?php comment_ID(); ?>">
    
    <?php comment_author_link(); ?>
    
    
    <?php } ?>
    
    

Replace this:

    
    <ol class="commentlist">
    <?php wp_list_comments('type=pings'); ?>
    
    

With this:

    
    <ol class="pinglist">
    <?php wp_list_comments('type=pings&callback=list_pings'); ?>
    
    

If your theme doesn't have a functions.php just create it and include the above code.

In this case our full comment "loop" should now look like:

    
    <?php if ( have_comments() ) : ?>
    	
    
    <?php if ( ! empty($comments_by_type['comment']) ) : ?>
    	<h3 id="comments">
    
    <?php comments_number('No Responses', 'One Response', '% Responses' );?> to &#8220;
    
    <?php the_title(); ?>&#8221;</h3>
    
    	<ol class="commentlist">
    	
    
    <?php wp_list_comments('type=comment'); ?>
    	</ol>
    	
    
    <?php endif; ?>
    
    	
    
    <?php if ( ! empty($comments_by_type['pings']) ) : ?>
    	<h3 id="pings">Trackbacks/Pingbacks</h3>
    
    	<ol class="pinglist">
    	
    
    <?php wp_list_comments('type=pings&callback=list_pings'); ?>
    	</ol>
    	
    
    <?php endif; ?>
    
    	<div class="navigation">
    		<div class="alignleft">
    
    <?php previous_comments_link() ?></div>
    		<div class="alignright">
    
    <?php next_comments_link() ?></div>
    	</div>
     
    
    <?php else : // this is displayed if there are no comments so far ?>
    
    	
    
    <?php if ('open' == $post->comment_status) : ?>
    		
    
    <!-- If comments are open, but there are no comments. -->
    
    	
    
    <?php else : // comments are closed ?>
    		
    
    <!-- If comments are closed. -->
    		<p class="nocomments">Comments are closed.</p>
    
    	
    
    <?php endif; ?>
    
    
    <?php endif; ?>
    
    

One last (optional) task is to modify the comment counts to only reflect the number of comments minus pings.

Open your themes functions.php and add the following code:

    
    <?php
    add_filter('get_comments_number', 'comment_count', 0);
    function comment_count( $count ) {
    	if ( ! is_admin() ) {
    		global $id;
    		$comments_by_type = &separate_comments(get_comments('status=approve&post_id=' . $id));
    		return count($comments_by_type['comment']);
    	} else {
    		return $count;
    	}
    }
    ?>
    
    

Again if your theme doesn't have a functions.php just create it and include the above code.

There you have it. If you have any questions let me know.

 [1]: http://weblogtoolscollection.com/archives/2008/03/08/managing-trackbacks-and-pingbacks-in-your-wordpress-theme/
 [2]: http://ottodestruct.com/blog/2008/09/29/wordpress-27-comments-enhancements/
 [3]: http://codex.wordpress.org/
 [4]: http://comox.textdrive.com/pipermail/wp-hackers/2008-October/021973.html
