<div class="projects-container">
	<?php 
		
		// Setup Loop for Projects
		$args = array(
					'post_type' => 'projects',
					'posts_per_page' => -1,		
				);
		$ii = 1;
		$query = new WP_query($args);
		while( $query->have_posts() ) : $query->the_post(); 
		
		// Variables
			$featured_image = get_field('artist_promo')['url'];
			$artist = get_the_title();
			$song_title = get_field('song_title');
			$song_file = get_field('example_song')['url'];
			$roles = get_field('roles');
			$project_num = $query->found_posts;
	
		// Setup Project Image box and populate with first project image -- this only runs one time
			if($ii === 1){
				echo "
					 	<div class='image-container' style='background-image:url($featured_image);'></div>
					 ";
			}
	?>
		
		<div class="project-wrapper <?php if($ii === 1){echo'active';} if($ii === 2){echo' next ';} if($ii === $project_num){echo ' last';} ?>" data-hueristic='{"artist_image" : "<?php echo $featured_image; ?>", "artist" : "<?php echo $artist;?>", "song_file" : "<?php echo $song_file; ?>", "song_title" : "<?php echo $song_title; ?>, "roles" : "<?php echo $roles; ?>", "project_number" : "<?php echo $ii; ?>"}'>
				<h2><?php echo $artist; ?></h2>
				<div class="project-meta">
					<div class="roles">
						<h3>Roles</h3>
						<div class="divider"></div>
						<span class="role meta"><?php echo $roles; ?></span>
					</div>
					<div class="song-title">
						<h3>Title</h3>
						<div class="divider"></div>
						<span class="title meta">"<?php echo $song_title; ?>"</span>
					</div>
				</div>
		</div>
		
	<?php $ii++; endwhile; ?>
</div>