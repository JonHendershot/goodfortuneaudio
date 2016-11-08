<?php 
	
// 	Template Name: Home Page
	
	get_header();
	
// Variables
	
	$image = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full' )[0];
	$black = "#000";
	$white = "#fff";
	$dark_grey = "#222629";
	$orange = "#CA5D44";
?>

<section class="home-header trigger section-1" style="background-image: url(<?php echo $image; ?>)" data-self='{ "section_id" : 1, "section_title" : "Home", "menu_main_clr" : "<?php echo $white; ?>" , "menu_second_clr" : "<?php echo $orange; ?>" }'>
	<?php get_template_part( 'template-parts/module_nav' ); ?>
</section>
<section class="about trigger section-2" data-self='{ "section_id" : 2, "section_title" : "About", "menu_main_clr" : "<?php echo $white; ?>" , "menu_second_clr" : "<?php echo $dark_grey; ?>" }'>
</section>
<section class="gear trigger section-3" data-self='{ "section_id" : 3, "section_title" : "Gear", "menu_main_clr" : "<?php echo $white; ?>" , "menu_second_clr" : "<?php echo $orange; ?>"  }'>
</section>

<?php get_footer(); ?>