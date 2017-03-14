<div class="contact-container">
	<?php
		
	// Variables
	$contact_form = get_field('contact_code');
	$project_planner = get_field('project_planner_code');
	?>
	<div class="project-planner-container open">
		<div class="planner-meta">
			<div class="section-number">
				<span class="current-field">01</span>
				<span class="total-fields">/ 08</span>
			</div>
			<div class="current-title">
				info
			</div>
		</div>
		<div id="project-planner"><?php echo do_shortcode($project_planner); ?></div>
		<div class="btns">
			<div class="nav-hint visible">
				Use the left & right arrow keys or click to continue
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
	<div class="general-contact-container">
		<div id="general-contact"><?php echo do_shortcode($contact_form); ?></div>
	</div>
	
</div>