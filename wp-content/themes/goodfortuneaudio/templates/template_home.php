<?php 
	
// 	Template Name: Home Page
	
	get_header();
	
// Variables
	
	$black = "#000";
	$white = "#fff";
	$offwhite = "#f5f5f5";
	$dark_grey = "#222629";
	$orange = "#CA5D44";
	$page_header_photo = get_the_post_thumbnail_url();

// Set scroll to, if it's needed
	if(isset($_GET['sn'])){
		$scrollTo = $_GET['sn'];
		echo "<input value='$scrollTo' id='scroll-to' hidden disabled />";
	}

// Get Header Parts

	get_template_part( 'template-parts/module_nav' );
	get_template_part( 'template-parts/module_scroll-hint' );
	
?>
<!-- <div id="scrollport"></div> -->
<div class="page-viewer" id="page_viewer">
	<div class="background-image" style="background-image: url(<?php  echo $page_header_photo; ?>);"></div>
	<div class="background-image-mobile" style="background-image: url(<?php echo get_template_directory_uri() . '/images/particle_screen_1.png'; ?>);" data-screens='{"screen_1" : "<?php echo get_template_directory_uri() . '/images/particle_screen_1.png'; ?>", "screen_2" : "<?php echo get_template_directory_uri() . '/images/particle_screen_2.png'; ?>"}'></div>
	<video id="vid1" autoplay loop class="visible preblur">
		<source src="<?php echo get_template_directory_uri() . '/images/tinygif.gif'; ?>" data-src="<?php echo get_template_directory_uri() . '/video/particle_1.mp4'; ?>" type="video/mp4"/>
	</video>
	<video id="vid2" loop>
		<source src="<?php echo get_template_directory_uri() . '/images/tinygif.gif'; ?>" data-src="<?php echo get_template_directory_uri() . '/video/lazyLoop.mp4'; ?>" type="video/mp4"/>
	</video>
	<div id="pages">
	
<?php	

// Pre-Loop Variables 
	
	$ii = 1;

// Start Loop

	$args = array(
		'post_type' => 'home_sections',
		'posts_per_page' => -1,
		'orderby' => 'menu_order'
	);
	$query = new WP_Query( $args );
	
	while( $query->have_posts() ) : $query->the_post();

// Setup Loop Variables
	$section_title = get_the_title();
	$section_class = strtolower($section_title);
	$color_scheme = get_field('color_scheme');
	$color_class = strtolower($color_scheme);
	$module_handle = 'template-parts/home_module-' . $section_class . '.php';
	$total_screen = $query->found_posts;

	
	if($color_scheme == 'Orange'){
		$background_clr = $orange;
		$menu_bubble_clr = $white;
		$menu_number_clr = $dark_grey;
		$menu_section_name_clr = $white;
		$logo_clr = 'white';
	}
	if($color_scheme == 'White'){
		$background_clr = $offwhite;
		$menu_bubble_clr = $dark_grey;
		$menu_number_clr = $dark_grey;
		$menu_section_name_clr = $orange;
		$logo_clr = 'orange';
	}
	if($color_scheme == 'Blue'){
		$background_clr = $dark_grey;
		$menu_bubble_clr = $white;
		$menu_number_clr = $orange;
		$menu_section_name_clr = $white;
		$logo_clr = 'orange';
	}

?>
	<section class="<?php echo "section-$ii section-$section_class $section_class trigger $color_class"; if($ii === 1){ echo ' active'; }else{ echo ' bottom'; } ?>" data-self='{<?php echo '"section_id" :'.$ii.',"background_color" : "' . $background_clr . '","section_title" : "'.$section_title.'","menu_bubble_clr" : "'.$menu_bubble_clr.'","menu_number_clr" : "'.$menu_number_clr.'","menu_section_name_clr" : "'.$menu_section_name_clr.'","logo_clr" : "'.$logo_clr.'","total_screen" : ' . $total_screen; ?>}'>
		<?php get_template_part("template-parts/home_module-$section_class"); ?>
	</section>
<?php $ii++; endwhile; ?>
	</div> <!-- end #pages -->
</div> <!-- end .viewer -->
<?php get_footer(); ?>