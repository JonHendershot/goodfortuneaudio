<div class="contact-container">
	<?php
		
	// Variables
	$contact_form = get_field('contact_code');
	// Execute
	echo do_shortcode($contact_form);
	?>
</div>