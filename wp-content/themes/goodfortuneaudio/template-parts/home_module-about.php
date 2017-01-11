<?php
	
// Variables
	$content_heading = get_field('content_heading');
	$body_content = get_field('body_content');
	$gear_btn = get_field('gear_button_text');
	$contact_btn = get_field('contact_button_text');
	$top_img = get_field('top_image')['url'];
	$side_img = get_field('side_image')['url'];

?>
<div class="content-wrapper">
	
	<img src="<?php echo $top_img; ?>" class="top-image" />
	<div class="about-content-wrapper">
		<div class="about-content">
				<h2><?php echo $content_heading; ?></h2>
				<p><?php echo $body_content; ?></p>
				<div class="about-btns">
					<a href="#" class="main-btn orange lightbox-trigger" data-trigger-id="gear">
						<span><?php echo $gear_btn; ?>
						</span>
					</a>
					<a href="#" class="main-btn orange">
						<span>
						<?php echo $contact_btn; ?>
						</span>
					</a>
				</div>
			</div>
		<img src="<?php echo $side_img; ?>" class="side-image" />
	</div>
</div>