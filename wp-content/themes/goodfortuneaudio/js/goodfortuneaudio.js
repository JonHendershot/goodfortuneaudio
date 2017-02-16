function mobile(){
	var isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
	    
	    return(isMobile);
}

(function mediaInvoker($){
	if(mobile() === true){
		// We're on a mobile device, no videos please!
		$('.page-viewer .background-image-mobile').addClass('visible');
	}
	if(mobile() === false){
		// We're on desktop, let's do the video! 
		$('video source').each(function(){
			var vidSrc = $(this).attr('data-src');
			$(this).attr('src',vidSrc);
			$(this).parent()[0].load();
		});
	}
}(jQuery));
(function scroller($){

	if( $('.page-viewer').length ){
	
		// Set Variables
		var scrollTrigger = 100,
			screenCount = $('section').length,
			scrollPort = $('#scrollport'),
			portHeight = (scrollTrigger) * (screenCount - 1),
			windowHeight = $(window).height(),
			scrollPortHeight = windowHeight + portHeight,
			scrollerCache = 0;
		
		// Set Scrollport Height
		if(mobile() == false){
			scrollPort.css({'height':scrollPortHeight + 'px'});
		}else {
			scrollPort.css({'height':windowHeight + 'px'});
		}
		
		
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
				if(mobile() !== true){
					window.scrollTo(0, scrollY);
				}
				
		});
		
	}

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
	
	$('.close-lb, .section-about .about-content-wrapper, .section-about .top-image').click(function(){
		closeLb($);
	});
}(jQuery));
(function projects($){
	
	if( $('.page-viewer').length ){
		
		
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
					/* document.getElementById('vid2').playbackRate = 4; */
				
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
			
		// Mobile Trigger Click
			$('.project-trigger').click(function(){
				var projectID = parseInt($(this).attr('data-postid')),
					projectObject = $('.project-wrapper.project-' + projectID).data('heuristic');
				
				console.log(projectID);
				nextProject(projectObject);
				
				
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
					projectFrame = projectdata.project_frame,
					nextProjectID = projectID + 1,
					prevProjectID = projectID -1,
					nextCloneID = projectID + 2,
					prevCloneID = projectID - 2,
					totalProjects = parseInt(projectdata.total_projects);
				
				if( projectID <= totalProjects ){ // only execute if next id Exists
						
					if(nextProjectID <= totalProjects){
						var nextProject = $('.project-wrapper.bottom.project-' + nextProjectID).first(),
							mobileProjectIDn = nextProjectID;
					} else {
						var nextProject = $('.project-wrapper.bottom.project-1').first(),
						mobileProjectIDn = 1;
					}
					
					if(prevProjectID >= 1){
						var prevProject = $('.project-wrapper.top.project-' + prevProjectID).last(),
							mobileProjectIDp = prevProjectID;
					} else {
						var prevProject = $('.project-wrapper.top.project-' + totalProjects).last(),
							mobileProjectIDp = totalProjects;
		
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
/* 							$('#project-background').addClass('transition'); */
							$('.project-box audio source').attr('src','');
							
						
					// Update Info
						setTimeout(function(){
							
					
							
							// Change Data
							$('#project-background').css({
								'background-image':'url(' + projectImage + ')'}).removeClass('center top bottom').addClass(projectFrame);;
							$('.project-box audio source').attr('src',projectFile);
							$('.role.meta').text(projectRoles);
							$('.title.meta').text('"' + projectFileTitle + '"');
							
		
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
						
							
						},400)
						
						setTimeout(function(){
							$('.project-box').removeClass('off');
							$('.project-wrapper.next, .project-wrapper.last').removeClass('off');
/* 							$('#project-background').removeClass('transition'); */
						},500);
					
					// Update Mobile Triggers
					if(mobile() == true){
						
		
						
						var nextProjectTitle = $('.project-wrapper.project-' + mobileProjectIDn).data('heuristic').artist,
							nextProjectID = $('.project-wrapper.project-' + mobileProjectIDn).data('heuristic').project_number;
							prevProjectTitle = $('.project-wrapper.project-' + mobileProjectIDp).data('heuristic').artist,
							prevProjectID = $('.project-wrapper.project-' + mobileProjectIDp).data('heuristic').project_number;
							
				
						$('.project-trigger.next-project').attr('data-postid',nextProjectID).text(nextProjectTitle);
						$('.project-trigger.previous-project').attr('data-postid',prevProjectID).text(prevProjectTitle);
						$('.project-num.current-num').text(projectID);
					}
					
					}
			}
	}
	
}(jQuery));
(function mobileNav($){
	
	// Menu Events
	$('.mobile-menu-trigger').click(function(){
		if($(this).hasClass('open')){
			closeMobile();
		}else {
			openMobile();
		}
	});
	
	
	$('#mobile-site-menu .nav-item').click(function(){
		console.log('clicked');
		var activeScreen = parseInt($('section.active').data('self').section_id),
			nextScreenID = parseInt($(this).data('self').section_num);
		
		closeMobile();
		
		setTimeout(nextScreen(activeScreen,nextScreenID), 1000);
	});
	
	function openMobile(){
		
		$('#content, #mobile-site-menu, .mobile-menu-trigger').addClass('open');
	}
	function closeMobile(){
		$(this).removeClass('open');
		$('#content, #mobile-site-menu, .mobile-menu-trigger').removeClass('open');
	}
	// Swipe Events
	$('body.home').on('swipeup',function(){
		if($('body.home').length){
		
			var activeScreenData = $('section.active').data('self'),
				activeScreenID = parseInt(activeScreenData.section_id),
				nextScreenID = activeScreenID + 1;
			
			nextScreen(activeScreenID, nextScreenID);
		}
		
	});
	$('body.home').on('swipedown',function(){
		
		if($('body.home').length){
		
			var activeScreenData = $('section.active').data('self'),
				activeScreenID = parseInt(activeScreenData.section_id),
				nextScreenID = activeScreenID - 1;
		
			nextScreen(activeScreenID, nextScreenID);
		}		
	});
}(jQuery));

(function preventRefresh(){
	if(mobile()==true){
		
		window.addEventListener('load', function() {
		
		  var maybePreventPullToRefresh = false;
		  var lastTouchY = 0;
		  var touchstartHandler = function(e) {
			  if (e.touches.length != 1) return;
			    lastTouchY = e.touches[0].clientY;
			    // Pull-to-refresh will only trigger if the scroll begins when the
			    // document's Y offset is zero.
			    maybePreventPullToRefresh = window.pageYOffset == 0;
			}
		
		  var touchmoveHandler = function(e) {
		    var touchY = e.touches[0].clientY;
		    var touchYDelta = touchY - lastTouchY;
		    lastTouchY = touchY;
		
		      // To suppress pull-to-refresh it is sufficient to preventDefault the
		      // first overscrolling touchmove.
		      if (touchYDelta > 0) {
		        e.preventDefault();
		        return;
		      }
		    
		  }
		
		  document.addEventListener('touchstart', touchstartHandler, false);
		  document.addEventListener('touchmove', touchmoveHandler, false);
		});

	}
});

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
	
	// Video Interchange
	if(mobile() !== true){
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
	}
	
	// Image Interchange
	if(mobile() === true){
		preload($('.background-image-mobile').data('screens').screen_2);
		if(nextID > 2){
			
			var particlesrc = $('.background-image-mobile').data('screens').screen_2;
			
		} else {
			var particlesrc = $('.background-image-mobile').data('screens').screen_1;
		}
		
		$('.background-image-mobile').css({'background-image':'url('+ particlesrc +')'});
	}
	
	// Scroll Hint	
	if(nextID ==5 || mobile() == true && nextID !== 1){
		$('.scroll-hint-container').addClass('hidden');
	}else {
		$('.scroll-hint-container').removeClass('hidden');
	}
	
	

	// Change interface information
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
	
	// Mobile menu trigger
	if(mobile() == true){
		if(nextID == 3 || nextID == 4){
			$('.mobile-menu-trigger .circle').css({'background-color' : '#ffffff'});
			$('#mobile-site-menu').css({'background-color':'rgb(34, 38, 41)'});
			$('#mobile-site-menu .nav-item').css({'color':'#ffffff'});
		}else if(nextID == 5){
			$('#mobile-site-menu').css({'background-color':'rgb(34, 38, 41)'});
			$('#mobile-site-menu .nav-item').css({'color':'#CA5D44'});
			$('.mobile-menu-trigger .circle').css({'background-color' : '#CA5D44'});
		}else {
			$('.mobile-menu-trigger .circle').css({'background-color' : '#CA5D44'});
			$('#mobile-site-menu').css({'background-color':'#ffffff'});
			$('#mobile-site-menu .nav-item').css({'color':'#CA5D44'});
		}
	}
	
	// scroll Lock
	if(mobile() !== true){
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
	
}
function projectHover(event){
	if(mobile()==false){
		
		var projectBox = document.getElementById('project-box'), 
			projectBackground = document.getElementById('project-background'),
			boxOffsetHeight = projectBox.getBoundingClientRect().top, // offset from top edge to window edge
			boxOffsetWidth = projectBox.getBoundingClientRect().left, // ofset from left edge to window edge
			boxHeight = projectBox.offsetHeight, // height of box
			boxWidth = projectBox.offsetWidth, // width of box
			adjustCoefficient = 0.5, // divide height & width and use to measure box in 4 equal Quadrants
			widthAdjust = boxWidth * adjustCoefficient, // use this to adjust and get % of mouse X position
			heightAdjust = boxHeight * adjustCoefficient, // use this to adjust and get % of mouseY position
			mouseX = parseInt(event.clientX - boxOffsetWidth) - widthAdjust, // 0 = middle of box on X axis
		    mouseY = parseInt(event.clientY - boxOffsetHeight) - heightAdjust, // 0 = middle of box on Y axis
			percentX = (mouseX / widthAdjust), // precent mouse position on the X axis ( 1 - right : -1 = left )
			percentY = mouseY / heightAdjust, // precent mouse position on Y axis ( 1 = bottom : -1 = top )
			rotateValue = 0.000055, // the maxiumum value the container can rotate in any direction (using matrix3D, this would be the depth rating)
			shadowValue = 8, // the max distance the dropshadow can offset
			shadowX = (percentX * shadowValue) * -1,
			shadowY = (percentY * shadowValue) * -1,
			rotateX = (percentX * rotateValue),
			rotateY = (percentY * rotateValue);
		
		console.log('X: ' + rotateX +  ' Y: ' + rotateY);
		
	
		projectBackground.style.transform = 'matrix3d(0.98,0,0.17,'+ rotateX +',0.00,0.98,0.17,' + rotateY + ',-0.17,-0.17,0.9603999999999999,0,0,0,0,1) translate3d(0,0,0)';
		jQuery('#project-background').css({'-webkit-transform':'matrix3d(0.98,0,0.17,'+ rotateX +',0.00,0.98,0.17,' + rotateY + ',-0.17,-0.17,0.9603999999999999,0,0,0,0,1)'});
		projectBackground.style['box-shadow'] = shadowX + 'px ' + shadowY + 'px 26px rgba(22, 22, 22, 0.5)';


	}
}
function projectReset(){
	var projectBackground = document.getElementById('project-background');
	
		projectBackground.style.transform = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)';
		projectBackground.style['box-shadow'] ='0px 6px 26px rgba(22, 22, 22, 0.5)';	
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
function preload() {
	var images = new Array();
	for (i = 0; i < preload.arguments.length; i++) {
		images[i] = new Image()
		images[i].src = preload.arguments[i]
	}
}



jQuery(document).ready(function($) {
	$( "#gear-accordion" ).accordion({
		collapsible: true,
		heightStyle: "content",
		animate: {'duration':300},
		active: 0
	});
});