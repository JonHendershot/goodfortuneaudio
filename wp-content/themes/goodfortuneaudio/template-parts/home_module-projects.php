<div class="projects-container" id="project-container">
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
			$post_featured_image = get_field('artist_promo')['url'];
			$artist = get_the_title();
			$song_title = get_field('song_title');
			$song_file = get_field('example_song')['url'];
			$roles = get_field('roles');
			$project_num = $query->found_posts;
			$project_frame_var = get_field('promo_position');
			$project_frame = strtolower($project_frame_var);
		
		// If project image doesn't exist use placeholder
			if($post_featured_image){
				$featured_image = $post_featured_image;
			}else {
				$featured_image = get_template_directory_uri() . '/images/project_contingency.jpg';
			}
		// Setup Project Image box and populate with first project image -- this only runs one time
			if($ii === 1){ ?>
				
				<div class="project-box image-container <?php echo $project_frame; ?>" id="project-box" onmousemove="projectHover(event)" onmouseout="projectReset()" >
					<div style="background-image: url(<?php echo $featured_image; ?>)" id="project-background"/></div>
					<div class="project-content">
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
						<div class="audio-player-container">
							<audio id="project-player">
							  <source src="<?php echo $song_file; ?>" type="audio/mp3" />
							Your browser does not support the audio element.
							</audio>
							<div class="audio-player">
								<div class="default-bar" id="default-bar">
									<div class="progress-bar"></div>
									<span class="current-time" id="current-time">0:00</span>
									<span class="track-duration" id="track-duration">0:00</span>
								</div>
								<div class="buttons">
									<div class="prev"></div>
									<div class="play"></div>
									<div class="next"></div>
								</div>
			
							</div>
						</div>
					</div>
				</div>
					 
		<?php	} ?>
		
			<div class="project-wrapper <?php echo "project-$ii "; if($ii === 1){echo'active';} if($ii === 2){echo' next ';} if($ii === $project_num){echo ' last';} if( $ii > 2  && $ii !== $project_num){ echo " bottom "; } ?>" data-heuristic='{	"artist_image":"<?php echo $featured_image; ?>", "artist":"<?php echo $artist; ?>", "song_file":"<?php echo $song_file; ?>", "song_title":"<?php echo $song_title; ?>", "roles_played":"<?php echo $roles; ?>", "project_number" : "<?php echo $ii; ?>", "project_frame" : "<?php echo $project_frame; ?>", "total_projects":<?php echo $project_num; ?>}' data-number="<?php echo $ii; ?>">
				<h2><?php echo $artist; ?></h2>
			</div>

		
	<?php $ii++; endwhile; ?>
		

</div>