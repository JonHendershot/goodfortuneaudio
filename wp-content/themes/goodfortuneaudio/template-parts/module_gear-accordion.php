<?php
	
	
	// Pre Loop
	$args = array(
		'post_type' => 'gear',
		'posts_per_page' => 7,
	);
	$ii = 1;
	
	// Loop Setup
	wp_reset_query();
	$query = new WP_Query( $args );
	
	// Loop
	while( $query->have_posts() ) : $query->the_post();
	
	// Loop Variables
	$title = get_the_title();
	$content = get_field('gear_items');

	echo "<h3>$title</h3>
		  <div>$content</div>
		  ";
	
	$ii++; 
	endwhile; 
?>