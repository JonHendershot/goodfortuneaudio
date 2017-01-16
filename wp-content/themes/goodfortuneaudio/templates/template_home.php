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

// Get Header Parts

	get_template_part( 'template-parts/module_nav' );
	get_template_part( 'template-parts/module_scroll-hint' );
	
?>
<div id="scrollport"></div>
<div class="page-viewer">
	<div class="background-image" style="background-image: url(<?php  echo $page_header_photo; ?>);"></div>
	<video id="vid1" autoplay loop class="visible">
		<source src="<?php echo get_template_directory_uri() . '/video/particle_1.mp4'; ?>" type="video/mp4"/>
	</video>
	<video id="vid2" loop>
		<source src="<?php echo get_template_directory_uri() . '/video/lazyLoop.mp4'; ?>" type="video/mp4"/>
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
<!--

<section class="home-header trigger section-1 active" style="background-image: url(<?php echo $image; ?>)" data-self='{ "section_id" : 1, "section_title" : "Home", "menu_main_clr" : "<?php echo $white; ?>" , "menu_second_clr" : "<?php echo $orange; ?>", "logo_clr" : "white", "shade_trigger" : 0  }'>

</section>
<section class="about trigger section-2" data-self='{ "section_id" : 2, "section_title" : "About", "menu_main_clr" : "<?php echo $white; ?>" , "menu_second_clr" : "<?php echo $orange; ?>", "logo_clr" : "white", "shade_trigger" : 1 }'>
</section>
<section class="projects trigger section-3" data-self='{ "section_id" : 3, "section_title" : "Projects", "menu_main_clr" : "<?php echo $white; ?>" , "menu_second_clr" : "<?php echo $dark_grey; ?>", "logo_clr" : "white", "shade_trigger" : 1 }'>
	<video id="lazyParticle" height="100%" width="auto" autoplay loop data-url="<?php echo get_template_directory_uri() . '/video/looptest_mtd2-2040_23976fps.mp4'; ?>">
			<source src="<?php echo get_template_directory_uri() . '/video/looptest_mtd2-2040_23976fps.mp4'; ?>" type="video/mp4">
	</video>
</section>
-->

<!--

	<section class="<?php echo "section-$ii section-$section_class trigger $color_class"; if($ii === 1){ echo ' active'; } ?>" data-self="{<?php echo 'section_id" :'.$ii.',"section_title" : "'.$section_title.'","menu_bubble_clr" : "'.$menu_bubble_clr.'","menu_number_clr" : "'.$menu_number_clr.'","menu_section_name_clr" : "'.$menu_section_name_clr.'","logo_clr" : "'.$logo_clr.'", "shade_trigger" : 1'; ?>}">
	
		<section class="<?php echo "section-$ii section-$section_class trigger $color_class"; if($ii === 1){ echo ' active'; } ?>" data-self="{<?php echo "'section_id' : $ii,'section_title' : '$section_title','menu_bubble_clr' : '$menu_bubble_clr','menu_number_clr' : '$menu_number_clr','menu_section_name_clr' : '$menu_section_name_clr','logo_clr' : '$logo_clr', 'shade_trigger' : 1"; ?>}">
-->

<?php get_footer(); ?>