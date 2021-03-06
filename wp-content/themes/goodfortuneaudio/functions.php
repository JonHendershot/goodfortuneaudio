<?php
/**
 * goodfortuneaudio functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package goodfortuneaudio
 */

if ( ! function_exists( 'goodfortuneaudio_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function goodfortuneaudio_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on goodfortuneaudio, use a find and replace
	 * to change 'goodfortuneaudio' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'goodfortuneaudio', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary', 'goodfortuneaudio' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'goodfortuneaudio_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );
}
endif;
add_action( 'after_setup_theme', 'goodfortuneaudio_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function goodfortuneaudio_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'goodfortuneaudio_content_width', 640 );
}
add_action( 'after_setup_theme', 'goodfortuneaudio_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function goodfortuneaudio_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'goodfortuneaudio' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'goodfortuneaudio' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'goodfortuneaudio_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function goodfortuneaudio_scripts() {
	wp_enqueue_style( 'goodfortuneaudio-style', get_stylesheet_uri() );
	wp_enqueue_style('goodfortuneaudio-main', get_template_directory_uri() . '/scss/main.css');
	wp_enqueue_style( 'font-awesome', get_template_directory_uri() . '/fonts/font_awesome/css/font-awesome.min.css' );

	wp_enqueue_script( 'goodfortuneaudio-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'goodfortuneaudio-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );
	//wp_enqueue_script( 'jquery' ); // debug this dependency, it should be getting called in the gfa-main-js script immediately below this
	wp_enqueue_script( 'jquery_mobile', get_template_directory_uri() . '/js/jquery.mobile.custom.min.js', array('jquery'), '22', true );
	wp_enqueue_script( 'jquery-mobile-swipeup', get_template_directory_uri() . '/js/jquerymobile-swipeupdown.js', array(), '1', true );
	wp_enqueue_script( 'goodfortuneaudio-main-js', get_template_directory_uri() . '/js/goodfortuneaudio.js', array('jquery-ui-accordion', 'jquery-ui-datepicker'), '23', true );
	
	
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'goodfortuneaudio_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';
/**
 * Load theme options file.
 */
require get_template_directory() . '/theme_options.php';

// Check if file was uploaded to form and, if it exists, attach to email
// Add attachement to email

add_action( 'wpcf7_before_send_mail', 'gfa_upload_file' );
 
function gfa_upload_file($cf7) {
   
	$formID = $cf7->id();
	if($formID == 61 || $formID == 103){
		$fileNAME = $_POST['file-name-1']; // '01Deadicated.mp3';
		$fileNAME2 = $_POST['file-name-2']; // '02SayAnything.mp3';
		$files = array($fileNAME,$fileNAME2); // json_decode($_POST['file-names'], true);
		$submission = WPCF7_Submission::get_instance();
		
		foreach($files as $key => $file){
			
			$upFILE = ABSPATH . 'wp-content/plugins/dragDrop/uploads/' . $file;
			
			$submission->add_uploaded_file("file_upload_$key",$upFILE);
		} 

	}
}