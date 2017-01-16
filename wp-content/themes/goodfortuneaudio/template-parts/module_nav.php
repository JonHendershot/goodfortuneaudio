<div class="scroller-nav">
	
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
		<div class="nav-wrapper <?php echo "nav-$ii"; if( $ii == 1 ){ echo ' active'; }?>" data-self='{"section_num" : <?php echo $ii; ?>}'>
			<div class="circles">
					<div class="outer-circle"></div>
					<div class="inner-circle"></div>
			</div>	
			<div class="info">
				<span class="section-num"><?php echo $ii; ?></span><span class="section-title">/<?php the_title(); ?></span>
			</div>
		</div>
	<?php
		$ii++; endwhile;
	?>
</div>