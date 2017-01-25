<?php
/**
 * Template part for displaying posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package gfa
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header post-header">
		<?php
		the_title('<h1>','</h1>');
		if ( 'post' === get_post_type() ) : ?>
		<div class="entry-meta">
			<a class="back" href="<?php echo get_post_type_archive_link( 'post' ); ?>">Back to Posts</a>
			<span class="post-meta"><?php the_date(); ?> by <?php the_author_posts_link(); ?></span>
		</div><!-- .entry-meta -->
		
		<?php
			the_post_thumbnail();
		endif; ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
<!-- 		<h2><?php the_excerpt(); ?></h2> -->
		
		<?php
			
			the_content( sprintf(
				/* translators: %s: Name of current post. */
				wp_kses( __( 'Continue reading %s <span class="meta-nav">&rarr;</span>', 'zeihan' ), array( 'span' => array( 'class' => array() ) ) ),
				the_title( '<span class="screen-reader-text">"', '"</span>', false )
			) );

			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'goodfortuneaudio' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->


</article><!-- #post-## -->
