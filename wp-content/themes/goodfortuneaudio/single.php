<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Zeihan
 */

get_header(); ?>
<!-- 	<div class="logo" style="background-image:url(<?php echo get_template_directory_uri() . '/images/logo_2.png' ?>);"></div> -->
	<div class="single-page-container">
		<div id="primary" class="content-area single-wrapper">
			<main id="main" class="site-main" role="main">
	
			<?php
			while ( have_posts() ) : the_post();
	
				get_template_part( 'template-parts/content', get_post_format() );
	
				the_post_navigation(array(
					'screen_reader_text' => __( '...More Posts...' )
				));
	
				// If comments are open or we have at least one comment, load up the comment template.
				if ( comments_open() || get_comments_number() ) :
					comments_template();
				endif;
	
			endwhile; // End of the loop.
			?>
<!--
			<div class="post-nav">
				<?php previous_post_link(); next_post_link(); ?>
			</div>
-->
			</main><!-- #main -->
		</div><!-- #primary -->
	</div> <!-- #single-page-container -->
<?php 
get_footer(); ?>
