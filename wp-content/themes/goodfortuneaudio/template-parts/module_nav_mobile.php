<div class="mobile-nav">
	
	<?php
		wp_reset_query();
		$args = array(
			'post_type' => 'home_sections',
			'posts_per_page' => -1,
			'order' => 'ASC'
		);
		$ii = 1;
		$query = new WP_Query( $args );
		while( $query->have_posts() ) : $query->the_post(); 
		
	?>
		<div class="nav-item <?php echo "nav-$ii"; if( $ii == 1 ){ echo ' active'; }?>" data-self='{"section_num" : <?php echo $ii; ?>}'><?php the_title(); ?></div>
	<?php
		$ii++; endwhile; wp_reset_query();
	?>
</div>