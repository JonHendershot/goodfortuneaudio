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

<section class="home-header trigger section-1 active" style="background-image: url(<?php echo $image; ?>)" data-self='{ "section_id" : 1, "section_title" : "Home", "menu_main_clr" : "<?php echo $white; ?>" , "menu_second_clr" : "<?php echo $orange; ?>", "logo_clr" : "white", "shade_trigger" : 0  }'>
	<?php get_template_part( 'template-parts/module_nav' ); ?>
</section>
<section class="about trigger section-2" data-self='{ "section_id" : 2, "section_title" : "About", "menu_main_clr" : "<?php echo $white; ?>" , "menu_second_clr" : "<?php echo $dark_grey; ?>", "logo_clr" : "white", "shade_trigger" : 1 }'>
</section>
<section class="gear trigger section-3" data-self='{ "section_id" : 3, "section_title" : "Gear", "menu_main_clr" : "<?php echo $white; ?>" , "menu_second_clr" : "<?php echo $orange; ?>", "logo_clr" : "white", "shade_trigger" : 0  }'>
</section>
<section class="contact trigger section-4" data-self='{ "section_id" : 4, "section_title" : "Contact", "menu_main_clr" : "<?php echo $orange; ?>" , "menu_second_clr" : "<?php echo $dark_grey; ?>", "logo_clr" : "orange", "shade_trigger" : 1  }'>
</section>
<section class="test trigger section-5" data-self='{ "section_id" : 5, "section_title" : "Test", "menu_main_clr" : "<?php echo $white; ?>" , "menu_second_clr" : "<?php echo $dark_grey; ?>", "logo_clr" : "white", "shade_trigger" : 1  }'>
</section>

<?php get_footer(); ?>