<div class="scroller-nav">
	<div class="outer-circle"></div>
	<div class="info">
		<span class="section-num">01</span><span class="section-title">/Home</span>
	</div>
	<?php
	
		for($ii = 1; $ii <= 5; $ii++){
		
	?>
		<div class="nav-wrapper <?php echo "nav-$ii"; if( $ii == 1 ){ echo ' active'; }?>" data-self='{"section_num" : <?php echo $ii; ?>}'>
			<div class="circles">
					<div class="inner-circle">
			</div>
		</div>	
		</div>
	<?php
		}	
	?>
</div>