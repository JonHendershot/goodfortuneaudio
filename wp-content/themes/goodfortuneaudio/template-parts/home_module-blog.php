<?php

// Pre-Loop Setup
wp_reset_query();

// Pre-Loop Variables
$bb = 1;
$args = array(
	'post_type' => 'post',
	'posts_per_page' => 5
);

// Loop Setup
$query = new WP_Query( $args );

?>

<div class="blog-container">
	<div class="searchform">
		<?php get_search_form($echo = true); ?>
	</div>
	<div class="blog-posts">
		<?php while( $query->have_posts() ) : $query->the_post();
			// In-Loop Variables
			$image = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );
		?>
		<a class="post-<?php echo $bb; ?>" href="<?php the_permalink(); ?>">
			<div class="blog-post" style="background-image: url(<?php echo $image; ?>);">
				<div class="post-meta-container">
					<h2 class="post-title"><?php the_title(); ?></h2>
					<span class="post-meta"><?php echo get_the_date(); ?></span>
				</div>
			</div>
		</a>
<!-- 		add hover overlay after		 -->
		<?php $bb++; endwhile; wp_reset_query(); ?>
	</div>
<!--
	<div class="navigation"><p><?php posts_nav_link('&#8734;','Go 
Forward In Time','Go Back in Time'); ?></p></div>
-->
</div>
