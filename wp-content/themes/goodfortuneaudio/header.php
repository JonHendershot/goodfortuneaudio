<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package plate
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">

<?php wp_head(); 
	$options = get_option('GFA_theme_options'); // get theme options
?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="site">
	<header id="masthead" class="site-header" role="banner">
		<a class="header-logo" href="<?php echo site_url(); ?>">
			<img src="<?php echo $options['GFA_logo']; ?>" class="header-logo orange visible preblur" />
			<img src="<?php echo $options['GFA_logo_alt1']; ?>" class="header-logo white hidden preblur" />
		</a>
	</header><!-- #masthead -->

	<div id="content" class="site-content">
