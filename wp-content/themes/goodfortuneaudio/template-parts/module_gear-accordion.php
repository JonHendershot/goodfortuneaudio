<?php
	
	
	// Pre Loop
	$args = array(
		'post_type' => 'gear',
		'posts_per_page' => 7,
	);
	$ii = 1;
	$content_query = 'gear_items_';
	$title_query = 'gear_title_';
	
	// Loop Setup
	wp_reset_query();
	$query = new WP_Query( $args );
	
	// Loop
	while( $query->have_posts() ) : $query->the_post();
	
	
	// Loop Variables
	$title = get_the_title();
// 	$content = ;

	echo "<h3>$title</h3>
		  <div>";
		  
		  for($xx = 1; $xx <=8; $xx++){
				$gear_title = get_field($title_query.$xx);
				$gear_content = get_field($content_query.$xx);
				
				if($gear_title){
					echo "<h5>$gear_title</h5>";
				}
				if($gear_content){
					echo "<span class='gear-content'>$gear_content</span>";
				}
			}
		  
    echo "</div>";
	
	$ii++; 
	endwhile; 
?>