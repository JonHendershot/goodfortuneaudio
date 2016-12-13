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
<?php get_template_part( 'template-parts/module_nav' );
	  get_template_part( 'template-parts/module_scroll-hint' );
	 ?>

<section class="home-header trigger section-1 active" style="background-image: url(<?php echo $image; ?>)" data-self='{ "section_id" : 1, "section_title" : "Home", "menu_main_clr" : "<?php echo $white; ?>" , "menu_second_clr" : "<?php echo $orange; ?>", "logo_clr" : "white", "shade_trigger" : 0  }'>
	<div class="content-wrapper">
		<div class="tagline">
			<h1>Disruptive</br>in all the right wavs</h1>
			<img src="<?php echo get_template_directory_uri() . '/images/logo.png'; ?>" alt="Good Fortune Audio"/>
		</div>
		<a href="#" class="main-btn orange">
			<span>view our project planner</span>
		</a>
	</div>
</section>
<section class="about trigger section-2" data-self='{ "section_id" : 2, "section_title" : "About", "menu_main_clr" : "<?php echo $white; ?>" , "menu_second_clr" : "<?php echo $orange; ?>", "logo_clr" : "white", "shade_trigger" : 1 }'>
	<div class="content-wrapper">
		
		<div class="about-content">
			<h2>Good Fortune Audio exists to make quality recordings<br />available to as many artists as possible.</h2>
			<p>We strive to use the best products and methods, and the newest recording equipment to help each individual artist sound as good as they possibly can. The unique thing about Good Fortune Audio is</p>
	
	<p>Usually, if you want quality recordings, you pack all your gear in a big gas-guzzling van, pile everyone in that van, and drive it wherever the studio of your choosing is. On top of gas, hotel,</p>
	
	<p>Good Fortune fills in the gaps where others can't or won't and comes to you. Using state of the art technology and years of experience, we make you sound as big as you want, all with a tiny footprint.</p>
			<div class="about-btns">
				<a href="#" class="main-btn orange lightbox-trigger" data-trigger-id="gear">
					<span>View My Gear
					</span>
				</a>
				<a href="#" class="main-btn orange">
					<span>
					Click to Contact
					</span>
				</a>
			</div>
		</div>
	</div>
</section>
<section class="projects trigger section-3" data-self='{ "section_id" : 3, "section_title" : "Projects", "menu_main_clr" : "<?php echo $white; ?>" , "menu_second_clr" : "<?php echo $dark_grey; ?>", "logo_clr" : "white", "shade_trigger" : 1 }'>
	<video id="lazyParticle" height="100%" width="auto" autoplay loop data-url="<?php echo get_template_directory_uri() . '/video/looptest_mtd2-2040_23976fps.mp4'; ?>">
			<source src="<?php echo get_template_directory_uri() . '/video/looptest_mtd2-2040_23976fps.mp4'; ?>" type="video/mp4">
	</video>
</section>

<?php get_footer(); ?>