<div class="projects-container" id="project-container">
	<?php 
		
		// Setup Loop for Projects
			$args = array(
						'post_type' => 'projects',
						'posts_per_page' => -1,		
					);
			$ii = 1;
			$query = new WP_query($args);
			$projects = array();
		
		// Begin Loop	
			while( $query->have_posts() ) : $query->the_post(); 
		
			// Variables
				$post_featured_image = get_field('artist_promo')['url'];
				$artist = get_the_title();
				$song_title_1 = get_field('song_title');
				$song_title_2 = get_field('song_title_2');
				$song_title_3 = get_field('song_title_3');
				$song_file_1 = get_field('example_song');
				$song_file_2 = get_field('example_song_2');
				$song_file_3 = get_field('example_song_3');
				$roles = get_field('roles');
				$project_num = $query->found_posts;
				$project_frame_var = get_field('promo_position');
				$project_frame = strtolower($project_frame_var);
				$project_class = "project-wrapper project-$ii ";
				
				// Establish total song Count
				if($song_file_3){
					$song_count = 3;
				}else if($song_file_2){
					$song_count = 2;
				}else {
					$song_count = 1;
				}
				
			// Push project title into array for use on project nav 
				array_push($projects, $artist);
			
			// If project image doesn't exist, use placeholder
				if($post_featured_image){
					$featured_image = $post_featured_image;
				}else {
					$featured_image = get_template_directory_uri() . '/images/project_contingency.jpg';
				}
				
			// Setup array for project information 
				$project_info = array(
					'artist_image' => $featured_image,
					'artist' => $artist,
					'song_file_1' => $song_file_1['url'],
					'song_file_2' => $song_file_2['url'],
					'song_file_3' => $song_file_3['url'],
					'song_title_1' => $song_title_1,
					'song_title_2' => $song_title_2,
					'song_title_3' => $song_title_3,
					'roles_played' => $roles,
					'project_number' => $ii,
					'project_frame' => $project_frame,
					'total_project_songs' => $song_count,
					'total_projects' => $project_num
				);
				
				// Translate $project_info into a JSON object
				$project_json = json_encode($project_info);
				
			// Check project number and append class names to project class object 
				if( $ii === 1){
					$project_class .= 'active ';
				}
				if( $ii === 2){
					$project_class .= 'next ';
				}
				if( $ii === $project_num ){
					$project_class .= 'last ';
				}
				if( $ii > 2 && $ii !== $project_num ){
					$project_class .= 'bottom ';
				}
			
			// Setup Project Image box and populate with first project image -- this only runs one time
				if($ii === 1){ ?>
					<div class="project-box image-container <?php echo $project_frame; ?>" id="project-box" onmousemove="projectHover(event)" onmouseout="projectReset()" >
						<div style="background-image: url(<?php echo $featured_image; ?>)" id="project-background"></div>
						<div class="project-content">
							<div class="project-meta">
								<div class="roles mobile-hidden">
									<h3>Roles</h3>
									<div class="divider"></div>
									<span class="role meta"><?php echo $roles; ?></span>
								</div>
								<div class="song-title mobile-visible">
									<h3>Title</h3>
									<div class="divider"></div>
									<span class="title meta">"<?php echo $song_title_1; ?>"</span>
								</div>
							</div>
							<div class="audio-player-container">
								<audio id="project-player" data-current-song="1">
								  <source src="<?php echo $song_file_1['url']; ?>" type="audio/mp3" />
								Your browser does not support the audio element.
								</audio>
								<div class="audio-player">
									<div class="default-bar" id="default-bar">
										<div class="progress-bar"></div>
										<span class="current-time" id="current-time">0:00</span>
										<span class="track-duration" id="track-duration">0:00</span>
									</div>
									<div class="buttons">
										<?php 
										
										// PREVIOUS SONG BUTTON & TITLE
											if($song_file_3){
												// If a 3rd song exists in the set, apply it to the previous button
												echo "<span class='prev-title song-nav-title'>$song_title_3</span>
													  <div class='prev song-nav' data-get='3'></div>";
											}else if($song_file_2){
												// If a 3rd file doesn't exist, but we have two, use the second one for previous
												echo "<span class='prev-title song-nav-title'>$song_title_2</span>
													  <div class='prev song-nav' data-get='2'></div>";
											}else {
												// We're only loading one song, disable the buttons
												echo "<span class='prev-title song-nav-title'></span>
													  <div class='prev song-nav disabled'></div>";
											}
										
										// PLAY SONG BUTTON
											echo "<div class='play'></div>";
										
										// NEXT SONG BUTTON & TITLE
											if($song_file_2){
												// If a 2nd song exists in the set, apply it to the next button
												echo "<div class='next song-nav' data-get='2'></div>
													  <span class='next-title song-nav-title'>$song_title_2</span>";
											}else {
												// If a 2nd song doesn't exist, disable the button
												echo "<div class='next song-nav disabled'></div>
													  <span class='next-title song-nav-title'></span>";
											}
										?>
									</div>
				
								</div>
							</div>
							<div class="project-nav-mobile">
								<?php 
									// Variables
										
										$prev_project_object = $query->posts[$project_num - 1];
										$next_project_object = $query->posts[1];
										
										echo "<div class='previous-project project-trigger' data-postid='$project_num'>$prev_project_object->post_title</div>
											  <div class='project-count'>Project <span class='project-num current-num'>1</span> of <span class='project-num'>$project_num</span></div>
											  <div class='next-project project-trigger' data-postid='2'>$next_project_object->post_title</div>";
								 ?>
								 
							</div>
						</div>
					</div>		 
				<?php	} // End if first iteration ?> 
			
				<div class="<?php echo $project_class; ?>" data-heuristic='<?php echo $project_json; ?>' data-number="<?php echo $ii; ?>">
					<h2><?php echo $artist; ?></h2>
				</div>		
	<?php $ii++; endwhile; wp_reset_query();?>
</div>
	
<div class="scroller-nav project-nav preblur">	
	
	<?php 
		// Loop through the $projects array created in the while loop to create a project navigation element
		foreach( $projects as $position => $project ){
			$key = $position + 1;	?>
		
		<div class="nav-wrapper <?php echo "project-$key"; if($position === 0){ echo ' active'; } ?>" data-project="<?php echo $key; ?>">
			<div class="circles">
					<div class="outer-circle"></div>
					<div class="inner-circle"></div>
			</div>	
			<div class="info">
				<span class="artist-title"><?php echo $project; ?></span>
			</div>
		</div>
		
	<?php } ?>
	
</div>	

<div class="num-progress">
	<span class="current-project">1</span>
	<span class="divider"></span>
	<span class="total-project"><?php echo $project_num; ?></span>
</div>	