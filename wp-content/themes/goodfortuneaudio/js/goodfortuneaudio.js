(function scroller($){
	
	// Set Variables
	var scrollTrigger = 100,
		screenCount = $('section').length,
		scrollPort = $('#scrollport'),
		portHeight = (scrollTrigger) * (screenCount - 1),
		scrollerCache = 0;
	
	// Set Scrollport Height
	scrollPort.css({'height':'calc(100vh + ' + portHeight + 'px'});
	
	// Handle Scroll Event
	$(window).scroll(function(){
		// Scroll Variables
		var activeScreenData = $('section.active').data('self'),
			activeScreenID = parseInt(activeScreenData.section_id),
			distanceScrolled = parseInt( (window.pageYOffset * 0.01) + 1);
/* 			console.log(parseInt(distanceScrolled)); */
		
		if(distanceScrolled !== activeScreenID && !scrollPort.hasClass('scrollLock')){
		
			scrollPort.addClass('scrollLock');
			nextScreen(activeScreenID, distanceScrolled);
		}
		
	});
	
	// Handle Mouse events on Nav
	$('.nav-wrapper').hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});
	
	$('.nav-wrapper').click(function(){
		var activeScreenData = $('section.active').data('self'),
			activeScreenID = parseInt(activeScreenData.section_id),
			nextScreenID = parseInt($(this).data('self').section_num),
			scrollY = (scrollTrigger * nextScreenID) - 10;
			
			nextScreen(activeScreenID,nextScreenID);
			window.scrollTo(0, scrollY);
			
			if($('.blur').length){
				closeLb($);
			}
	});
	
	// Click event on Scroll Hint
	
	$('.scroll-hint-container').click(function(){
	
		var activeScreenData = $('section.active').data('self'),
			activeScreenID = parseInt(activeScreenData.section_id),
			nextScreenID = parseInt(activeScreenID + 1),
			scrollY = (scrollTrigger * nextScreenID) - 10;
			
			
			nextScreen(activeScreenID,nextScreenID);
			window.scrollTo(0, scrollY);
			if($('.blur').length){
				closeLb($);
			}
	});
	
	// Keypress
	
	document.onkeydown = function(e){
		
		var activeScreenData = $('section.active').data('self'),
			activeScreenID = parseInt(activeScreenData.section_id);

			
			

		
		if(e.keyCode == '38'){ // pressed up
			var nextScreenID = parseInt(activeScreenID - 1);
		}
		if(e.keyCode == '40'){ // pressed down
			var nextScreenID = parseInt(activeScreenID);
		}	
	var scrollY = (scrollTrigger * nextScreenID) - 10
		nextScreen(activeScreenID,nextScreenID);
		window.scrollTo(0, scrollY);
		
		if($('.blur').length){
			closeLb($);
		}
	
	}
	
	// Anchor click
	$('.anchor').click(function(){
		var activeScreenData = $('section.active').data('self'),
			activeScreenID = parseInt(activeScreenData.section_id),
			target = $(this).data('target'),
			scrollY = (scrollTrigger * target) - 10;
			
			
			nextScreen(activeScreenID,target);
			window.scrollTo(0, scrollY);
	});
	
	

}(jQuery));
(function lightbox($){
	$('.lightbox-trigger').click(function(){
		var lightbox = $(this).attr('data-trigger-id');
		
		if( ! $('.lightbox').hasClass('open')){
			if(lightbox = 'gear'){
				
				setTimeout(function(){
					$('.lightbox.' + lightbox).addClass('visible open');			
				}, 0);
					$('.section-about .about-content-wrapper, #vid1, .scroller-nav, .scroll-hint-container, .header-logo.visible, .content-wrapper .top-image').addClass('blur');
				$('.close-lb').addClass('open');
				$('body').addClass('lb-open');
			}
		}
	});
	
	$('.close-lb, .section-about .about-content-wrapper').click(function(){
		closeLb($);
	});
}(jQuery));
(function projects($){
	
	
	// Hover Event
		$('.project-box, .project-wrapper').hover(function(){
			if($(this).hasClass('active') || $(this).hasClass('project-box')){
				$('.project-box, .project-wrapper.active').addClass('open');
			}
		},function(){
			$('.project-box, .project-wrapper.active').removeClass('open');
		});
		
		
	// AUDIO TRACK HANDLES 	
	
	// Variables
		var audioTrack = document.getElementById('project-player'),
			playBtn = $('.buttons .play'),
			progressBar = $('.progress-bar'),
			bar = document.getElementById('default-bar'),
			barSize = bar.offsetWidth,
			projectWrapper = document.getElementById('project-container');
			
			
	// Play/Pause Audio
		

		playBtn.click(function(){
			if(!audioTrack.paused && !audioTrack.ended){
				// Pause Audio
				audioTrack.pause();
				document.getElementById('vid2').playbackRate = 1;
				
				// Update Classes
				$('.project-box, .project-wrapper.active').removeClass('playing');
				playBtn.removeClass('pause');
				
				// Pause Timer Update
				window.clearInterval(updateTime);
			}else{
				// Play Audio
				audioTrack.play();
				document.getElementById('vid2').playbackRate = 4;
			
				// Update Classes
				$('.project-box, .project-wrapper.active').addClass('playing');
				playBtn.addClass('pause');
				
				// Update Current Time
				updateTime = setInterval(update, 500);
			}
		});	
		
	// Update player on bar click
		bar.addEventListener('click',clickedBar,false);

	// Duration
			
		var duration = $('#track-duration'),
			currentTime = $('#current-time');

		audioTrack.onloadedmetadata = function(){ // fire when metadata for track is loaded
			
			// Grab minutes and seconds of full time from track
			var trackMinutes = parseInt(audioTrack.duration/60),
				trackSeconds = parseInt(audioTrack.duration%60);
			
			if(trackSeconds < 10){
				var durationPre = '0';
			}else {
				var durationPre = '';
			}
			
			// Add full duration to duration element
			duration.text(trackMinutes + ':' + durationPre+trackSeconds);
		}
	
	
	// PROJECT NAVIGATION
	// Begin Clone
		var lastItemID = parseInt($('.project-wrapper.last').attr('data-number')),
			penultItemID = lastItemID - 1;
			
			if(!$('.project-wrapper.top.project-' + penultItemID).length){
				$('.project-wrapper.project-' + penultItemID).clone(true).removeClass('bottom').addClass('top').prependTo('.projects-container');
			}
			
	// Title Click
		$('.project-wrapper').click(function(){
			if( ! $(this).hasClass('active')){
				var projectdata = $(this).data('heuristic');
				document.getElementById('vid2').playbackRate = 1;
				nextProject(projectdata);
			}
			
		});
	
	// Anon Functions
	// Update Player
		function update(){
			if(!audioTrack.ended){
				// Current Time
				var playedMinutes = parseInt(audioTrack.currentTime/60),
					playedSecondsRaw = parseInt(audioTrack.currentTime%60);
				
				// Add zero to seconds if less than 10
					if(playedSecondsRaw < 10){
						var playedSeconds = '0' + playedSecondsRaw;
					}else {
						var playedSeconds = playedSecondsRaw;
					}
				
				currentTime.text(playedMinutes + ':' + playedSeconds);
				
				// Progress Bar
				var size = (audioTrack.currentTime/audioTrack.duration) * barSize;
				
				progressBar.css({'width' : size + 'px'});
			}else{
				currentTime.text('0:00');
				playBtn.removeClass('pause');
				progressBar.css({'width' : '0px'});
				window.clearInterval(updateTime);
				document.getElementById('vid2').playbackRate = 1;
			}	
		}
		
		function clickedBar(e){
			if(!audioTrack.ended){
				var mouseX = e.pageX - ( bar.offsetLeft + projectWrapper.offsetLeft ), // need to add bar & wrapper offset to get full offset from side of browser
					newTime = mouseX*audioTrack.duration/barSize;
					
					audioTrack.currentTime = newTime;
					progressBar.css({'width':mouseX + 'px'});
					
			}
		}
	// Switch projects
		function nextProject(projectdata){
			$('.project-box, .project-wrapper').removeClass('playing');
			
			// Variables
			var projectID = parseInt(projectdata.project_number),
				projectTitle = projectdata.artist,
				projectImage = projectdata.artist_image,
				projectFile = projectdata.song_file
				projectFileTitle = projectdata.song_title,
				projectRoles = projectdata.roles_played,
				nextProjectID = projectID + 1,
				prevProjectID = projectID -1,
				nextCloneID = projectID + 2,
				prevCloneID = projectID - 2,
				totalProjects = parseInt(projectdata.total_projects);
				
			if(nextProjectID <= totalProjects){
				var nextProject = $('.project-wrapper.bottom.project-' + nextProjectID).first();
			} else {
				var nextProject = $('.project-wrapper.bottom.project-1').first();
			}
			
			if(prevProjectID >= 1){
				var prevProject = $('.project-wrapper.top.project-' + prevProjectID).last();
			} else {
				var prevProject = $('.project-wrapper.top.project-' + totalProjects).last();

			}
				
			// Audio Player
				audioTrack.pause();	
			// Animate Off
				/* $('.project-wrapper.next, .project-wrapper.last').addClass('off'); */
				
					if( $('.project-wrapper.project-' + projectID).hasClass('next') ){ // animate upwards
						
						$('.project-wrapper.last').removeClass('last').addClass('top');
						$('.project-wrapper.active').removeClass('active').addClass('last');
						$('.project-wrapper.next').removeClass('next').addClass('active');	
						nextProject.removeClass('bottom').addClass('next');
						
						if(nextCloneID <= totalProjects && !$('.project-wrapper.bottom.project-' + nextCloneID).length){
							$('.project-wrapper.project-' + nextCloneID).first().clone(true).removeClass('top active last next bottom').addClass('bottom').appendTo('.projects-container');
						} else if( nextCloneID == (totalProjects + 1)){
							$('.project-wrapper.project-1').first().clone(true).removeClass('top active last next bottom').addClass('bottom').appendTo('.projects-container');
						}else if( nextCloneID == (totalProjects + 2)){
							$('.project-wrapper.project-2').first().clone(true).removeClass('top active last next bottom').addClass('bottom').appendTo('.projects-container');
						}
						
						
					}
					
					if( $('.project-wrapper.project-' + projectID).hasClass('last') ){ // animate down
						
						$('.project-wrapper.next').removeClass('next').addClass('bottom');	
						$('.project-wrapper.active').removeClass('active').addClass('next');
						$('.project-wrapper.last').removeClass('last').addClass('active');
						prevProject.removeClass('top').addClass('last');
						
						if(prevCloneID >= 1 && !$('.project-wrapper.top.project-' + prevCloneID).length){
							$('.project-wrapper.project-' + prevCloneID).first().clone(true).removeClass('bottom active last next').addClass('top').prependTo('.projects-container');
						}else if(! $('.project-wrapper.top.project-' + totalProjects).length){
							if(prevCloneID == 0){
								$('.project-wrapper.project-' + (totalProjects)).first().clone(true).removeClass('top active last bottom next').addClass('top').prependTo('.projects-container');
							}else if(prevCloneID == -1){
								$('.project-wrapper.project-' + (totalProjects-1)).first().clone(true).removeClass('top active last bottom next').addClass('top').prependTo('.projects-container');
							}
							
						}
						
						
					}
					
				
					
					$('.project-box').addClass('off');
					$('.project-box audio source').attr('src','');
					
				
			// Update Info
				setTimeout(function(){
					
			
					
					// Change Data
					$('.project-box').css({'background-image':'url(' + projectImage + ')'});
					$('.project-box audio source').attr('src',projectFile);
					$('.role.meta').text(projectRoles);
					$('.title.meta').text(projectFileTitle);
					

					audioTrack.load();
					audioTrack.onloadedmetadata = function(){ // fire when metadata for track is loaded
			
						// Grab minutes and seconds of full time from track
						var trackMinutes = parseInt(audioTrack.duration/60),
							trackSeconds = parseInt(audioTrack.duration%60);
						
						if(trackSeconds < 10){
							var prepend = '0';
						}else {
							var prepend = '';
						}
						
						// Add full duration to duration element
						duration.text(trackMinutes + ':' + prepend+trackSeconds);
						update();
						playBtn.removeClass('pause');

					}
				
					
				},100)
				
				setTimeout(function(){
					$('.project-box').removeClass('off');
					$('.project-wrapper.next, .project-wrapper.last').removeClass('off');
				},500);

			
		}
	
}(jQuery));

function nextScreen(currentScreenID, nextID){
	var $ = jQuery,
		nsID = nextID,
		nsData = $('.section-' + nsID).data('self'),
		backgroundClr = nsData.background_color,
		screenTitle = nsData.section_title,
		bubbleColor = nsData.menu_bubble_clr,
		numberColor = nsData.menu_number_clr,
		nameColor = nsData.menu_section_name_clr,
		logoColor = nsData.logo_clr,
		totalScreen = nsData.total_screen;
		
	if(nextID > currentScreenID){ // Next Screen :: Animate Down
		

		// animate screens	
		$('.section-' + currentScreenID).removeClass('active').addClass('top');
		$('.section-' + nsID).addClass('active').removeClass('bottom');
		$('.page-viewer .background-image').css({'opacity':0});
		
		
		// check for skipped screens and adjust them
		for(count = 1; count < nextID; count++){
			if(!$('section.top.section-'+count).length){ // if sections less than called section don't exist :: adjust	
				$('section.section-'+count).addClass('top').removeClass('bottom');
			}
		}
		


		
			
	}else if(nextID < currentScreenID){ // Previous Screen :: Animate Up
		for(count = (nextID + 1); count > nextID && count <= totalScreen; count++){
			
			
			
			if(!$('section.bottom.section-'+count).length){ // if sections greater than called section don't exist :: adjust	
				$('section.section-'+count).addClass('bottom').removeClass('top');
				
			}
		}	
			
		$('.section-' + currentScreenID).removeClass('active').addClass('bottom');
		$('.section-' + nsID).addClass('active').removeClass('top');
	
	}
	
	$('.hint-line').css({'background-color':numberColor});
	
	if(nextID == 1){
		$('.page-viewer .background-image').css({'opacity':1});
	}
	
	if(nextID > 2 && !$('#vid2').hasClass('visible')){
		$('#vid2').addClass('visible');
		$('#vid1').removeClass('visible');
		
		
		document.getElementById('vid2').play();
		setTimeout(function(){
			document.getElementById('vid1').pause();
		}, 1500);
	} 
	
	if(nextID <=2 && !$('#vid1').hasClass('visible')){
		$('#vid1').addClass('visible');
		$('#vid2').removeClass('visible');
		
		document.getElementById('vid1').play();
		setTimeout(function(){
			document.getElementById('vid2').pause();
		}, 1500);
	}
	
	if(nextID ==5){
		$('.scroll-hint-container').addClass('hidden');
	}else {
		$('.scroll-hint-container').removeClass('hidden');
	}

	$('.nav-wrapper.active').removeClass('active');
	$('.nav-wrapper.nav-' + nsID).addClass('active');
	$('.scroller-nav .info').find( $('.section-title') ).css({"color":nameColor});
	$('.section-num').css({"color":numberColor});
	$('.outer-circle, .inner-circle').css({"background-color":bubbleColor});
	$('section.active').not('.section-' + nsID).removeClass('active');
	$('.section-' + nsID).addClass('active');	
	$('.page-viewer, html').css({'background-color':backgroundClr});
	$('.header-logo img.visible').removeClass('visible').addClass('hidden');
	$('.header-logo img.'+logoColor).removeClass('hidden').addClass('visible');
	
	// scroll Lock
	$(window).scroll(function(){
		if($('#scrollport').hasClass('scrollLock')){
			var scrollLock = (nextID * 100)-10;
			window.scrollTo(0,scrollLock);
		}
	});
		

			
	setTimeout(function(){
		$('#scrollport').removeClass('scrollLock');
	},1500);
}
function closeLb($){
	if($('.lightbox').hasClass('open')){
		$('.lightbox').removeClass('open visible');
		$('.blur').removeClass('blur');
		$('.close-lb').removeClass('open');
		$('body').removeClass('lb-open');
		
		setTimeout(function(){
			$( "#gear-accordion" ).accordion({
				collapsible: true,
				heightStyle: "content",
				animate: {'duration':300},
				active: 0
			});
		},800);
		
	}
};

jQuery(document).ready(function($) {
	$( "#gear-accordion" ).accordion({
		collapsible: true,
		heightStyle: "content",
		animate: {'duration':300},
		active: 0
	});
});
