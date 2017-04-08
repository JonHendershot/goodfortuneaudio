<div class="contact-container">
	<?php
		
	// Variables
	$contact_form = get_field('contact_code');
	$project_planner = get_field('project_planner_code');
	?>
	<div class="launch-pad">
		<div class="general-contact-wrap">
			<h3>General Inquiries</h3>
			<p>Have a general question? Awesome! Leave us a message and we'll get in touch with you shortly</p>
			<div class="main-btn orange form-trigger" data-form="general"><span>click to connect</span></div>
		</div>
		<div class="project-planner-wrap">
			<h3>Project Planner</h3>
			<p>Ready to take the plunge? So are we! This interactive form only takes a minute, let's get started!</p>
			<div class="main-btn blue form-trigger" data-form="project"><span>launch project planner</span></div>
		</div>
		
	</div>
	<div class="project-planner-container contact-form-cont contact-project">
		<div class="planner-meta preblur blurtrans">
			<div class="section-number">
				<img src="<?php echo get_template_directory_uri() . '/images/button_x.png'; ?>" class="close-form" />
				<span class="current-field">01</span>
				<span class="total-fields">/ 08</span>
			</div>
			<div class="current-title">
				info
			</div>
		</div>
		<div id="project-planner"><?php echo do_shortcode($project_planner); ?></div>
		<div class="submit-success">
			<img class="success-icon" src="<?php echo get_template_directory_uri(). '/images/icon_confirm.png'; ?>"/>
			<p class="message">Thanks for your project information, we'll be in touch shortly!</p>
			<div class="main-btn blue close-form"><span>Close project planner</span></div>
		</div>
		<div class="btns preblur blurtrans">
			<div class="nav-hint visible">
				Press [ SHIFT ] + [ LEFT ] & [ RIGHT ] arrow keys or click to continue
			</div>
			<div class="main-btn prev-field orange hidden">
				<span>previous</span>
			</div>
			<div class="main-btn next-field orange">
				<span>next</span>
			</div>
			<div class="main-btn orange submit hidden" onClick="jQuery(document.forms['project_planner']).trigger('submit')">
				<span>Submit</span>
			</div>
		</div>
	</div>
	<div class="general-contact-container contact-form-cont contact-general">
		<div class="form-meta">
			<img src="<?php echo get_template_directory_uri() . '/images/button_x.png'; ?>" class="close-form" />
			<div class="current-title">
				general
			</div>
		</div>
		<div id="general-contact"><?php echo do_shortcode($contact_form); ?></div>
	</div>
	
</div>