<?php 	
	// Variables
	
	$image = get_field('background_image')['url'];
	$tag_1 = get_field('tagline_top');
	$tag_2 = get_field('tagline_bottom');
	$button_text = get_field('button_text');
?>
<div class="background-image" style="background-image: url(<?php echo $image; ?>);"></div>
<div class="content-wrapper">
	<div class="tagline">
		<h1><?php echo $tag_1; ?></br><?php echo $tag_2; ?></h1>
		<img src="<?php echo get_template_directory_uri() . '/images/logo.png'; ?>" alt="Good Fortune Audio"/>
	</div>
	<a href="#" class="main-btn orange">
		<span><?php echo $button_text; ?></span>
	</a>
</div>