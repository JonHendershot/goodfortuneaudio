function mobile(){
	var isMobile = false; //initiate as false
	// device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
	    
	    return(isMobile);
}
(function dates($){
	var field = $('.date-picker');
	
	if(field.length){
		field.datepicker();
	}
}(jQuery));
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

	// Handle page refferal
	if( $('#scroll-to').length){
		var scrollTo = $('#scroll-to').val();
		
		nextScreen(1,scrollTo);
	}
	
	// Handle scroller
	if( $('.page-viewer').length ){
	
		// Set Variables
		var screenCount = $('section').length;
		
		// Set Scrollport Height
		/*
if(mobile() == false){
			scrollPort.css({'height':scrollPortHeight + 'px'});
		}else {
			scrollPort.css({'height':windowHeight + 'px'});
		}
*/
		
		// Handle Mousewheel Event
		var throttle = 0, // throttle the event so that it doesn't fire more than once per transition
			timeout = 1500, // transition timing
			lightbox = $('.lightbox'); // use to check if lightbox element is open and disable scroll
		$(window).bind('mousewheel',function(e){
			if(throttle == 0 && !lightbox.hasClass('open')){
				// Throttle the function
				throttle = 1;
				setTimeout(function(){
					throttle = 0;
				},timeout);
				
				// Get transition variables
				var wheelVal = e.originalEvent.wheelDelta,
					activeScreenData = $('section.active').data('self'),
					activeScreenID = parseInt(activeScreenData.section_id);
				
				// Get next screen ID based on wheel direction	
				if(wheelVal > 0){
					// We've detected a scroll up
					console.log('scroll up');
					var nextScreenID = activeScreenID - 1;
				}else {
					// We've detected a scroll down
					console.log('scroll down');
					var nextScreenID = activeScreenID + 1;
				}
				
				// Transition to the next screen if it exists
				var nextScreenObj = $('section.section-' + nextScreenID);	
				if(nextScreenObj.length){
					nextScreen(activeScreenID,nextScreenID);
				}
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
				nextScreenID = parseInt($(this).data('self').section_num);
								
				nextScreen(activeScreenID,nextScreenID);
				
				if($('.blur').length){
					closeLb($);
				}
		});
		
		// Click event on Scroll Hint
		
		$('.scroll-hint-container').click(function(){
		
			var activeScreenData = $('section.active').data('self'),
				activeScreenID = parseInt(activeScreenData.section_id),
				nextScreenID = parseInt(activeScreenID + 1);				
				
				nextScreen(activeScreenID,nextScreenID);
				if($('.blur').length){
					closeLb($);
				}
		});
		
		// Keypress
		
		document.onkeydown = function(e){
			
			altKeys = [8,9,37,38,39,40,46,91,188,190];
			numberKeys = [48,49,50,51,52,53,54,55,56,57];
			
			// if an input field is active, don't fire!
			if( ! $('input, textarea').is(':focus') ){
				var activeScreenData = $('section.active').data('self'),
					activeScreenID = parseInt(activeScreenData.section_id);
	
				if(e.keyCode == '38'){ // pressed up
					var nextScreenID = parseInt(activeScreenID - 1);
				}
				if(e.keyCode == '40'){ // pressed down
					var nextScreenID = parseInt(activeScreenID + 1);
				}
				if(e.keyCode == '39'){ // pressed right
					
				}	
				if(e.keyCode == '37'){ // pressed left
				
				}
				if(e.keyCode == 38 || e.keyCode == 40){
					nextScreen(activeScreenID,nextScreenID);
						
					if($('.blur').length){
						closeLb($);
					}
				}
			}
			// If we're in one of the data entry inputs, only allow certain things to be pressed 
			if( $('input.number-only').is(':focus') ){
				if( numberKeys.indexOf(e.keyCode) === -1  && altKeys.indexOf(e.keyCode) === -1){
					e.preventDefault();
				}
			}
			
		}
		
		// Anchor click
		$('.anchor').click(function(){
			var activeScreenData = $('section.active').data('self'),
				activeScreenID = parseInt(activeScreenData.section_id),
				target = $(this).data('target');
							
				nextScreen(activeScreenID,target);				
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
					$('.section-about .about-content-wrapper, #vid1, .scroller-nav, .scroll-hint-container, .header-logo.visible, .content-wrapper .top-image, .mobile-menu-trigger').addClass('blur');
				$('.close-lb').addClass('open');
				$('body').addClass('lb-open');
			}
		}
	});
	
	$('.close-lb, .section-about .about-content-wrapper, .section-about .top-image, .mobile-menu-trigger').click(function(){
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
		var activeScreen = parseInt($('section.active').data('self').section_id),
			nextScreenID = parseInt($(this).data('self').section_num);
		
		closeMobile();
		
		setTimeout(nextScreen(activeScreen,nextScreenID), 1000);
	});
	// Swipe Events
	$('body.home').on('swipeup',function(){
		if(!$('.gear-container').hasClass('open') && mobile() == true){
		
			var activeScreenData = $('section.active').data('self'),
				activeScreenID = parseInt(activeScreenData.section_id),
				nextScreenID = activeScreenID + 1;
			
			nextScreen(activeScreenID, nextScreenID);
		}
		
	});
	$('body.home').on('swipedown',function(){
		
		if(!$('.gear-container').hasClass('open') && mobile() == true){
		
			var activeScreenData = $('section.active').data('self'),
				activeScreenID = parseInt(activeScreenData.section_id),
				nextScreenID = activeScreenID - 1;
		
			nextScreen(activeScreenID, nextScreenID);
		}		
	});
	$('body').on('swipeleft',function(){
		if(!$('#mobile-site-menu').hasClass('open') && mobile() == true){
			openMobile();
		}
	});
	$('body').on('swiperight',function(){
		if($('#mobile-site-menu').hasClass('open') && mobile() == true){
			closeMobile();
		}
	});
	
	function openMobile(){
		
		$('#content, #mobile-site-menu, .mobile-menu-trigger').addClass('open');
	}
	function closeMobile(){
		$(this).removeClass('open');
		$('#content, #mobile-site-menu, .mobile-menu-trigger').removeClass('open');
	}
	
}(jQuery));
(function projectPlanner($){
	
	// Planner Navigation
	$('.btns .main-btn').click(function(){
		var currentField = parseInt($('.ppsection.visible').data('part'));
		
		if($(this).hasClass('next-field')){
			var nextField = currentField + 1;
		}
		if($(this).hasClass('prev-field')){
			var nextField = currentField - 1;
		}
		
		ppNextField(currentField, nextField);
	});
	
	// Keypress

		var down = [];
		$(document).keydown(function(e) {
			var currentField = parseInt($('.ppsection.visible').data('part'));
		    down[e.keyCode] = true;
		    if (down[16] && down[39]) {
		        var nextField = currentField + 1;
		    }
		    if (down[16] && down[37]){
			    var nextField = currentField - 1;
		    }
		    ppNextField(currentField, nextField);
		}).keyup(function(e) {
		    
		    down[e.keyCode] = false;
		});
	
	// Checkboxes 
	$('.wpcf7-list-item').click(function(){
		var object = $(this),
			value = $(this).text();
		
		
		checkbox(object,value);
	});
	
	// Currency Field 
	var budgetInput = $('input[name="budget"]');
	$('span.budget').prepend("<span class='currency'>$</span>");
	$(document).keydown(function(){
		setTimeout(function(){
			var length = budgetInput.val().length + 1,
				distance = (length * 9) * -1;
			
			$('.budget-space .budget .currency').css({'-webkit-transform':'translate3d(' + distance +'px,0,0)'});
			
		},5);
		
	});
	
	// Mail Sent Ok
	$(".wpcf7").on('wpcf7:mailsent', function(event){
		setTimeout(function(){
				  $('.submit-success').addClass('visible');
		}, 800);
	  $('.ppsection.visible').addClass('prev').removeClass('visible');
	  $('.planner-meta .curren-title').text('success!');
	  $('.project-planner-container .btns').addClass('hidden');
	});
	
	// Errors
	$(".wpcf7").on('wpcf7:invalid', function(event){
		var info = $('.wpcf7-not-valid-tip').first(),
			section = findParent(info),
			current = $('.ppsection.visible').data("part");
			
		ppNextField(current, section);
		
		$('.project-planner-container .main-btn.submit').addClass('hidden');
		$('.project-planner-container .main-btn.next-field').removeClass('hidden');
		
		$('.ppsection.prev').each(function(){
			var part = $(this).data("part");
			
			if(part > section){
				$(this).removeClass('prev');
			}
		});
		
		
		
			
	  
	});
	
	function findParent(obj){
		var child = obj,
			parent;
		for(ii = 1; ii < 6; ii++){
			
			if(child.parent().hasClass('ppsection')){
				parent = child.parent().data('part');
			}else {
				child = child.parent();
			}
			
		}
		return parent;
	}
	
}(jQuery));
(function dropZoneUploader($){
	
	uploads = [];
	
	// Drop files on dropzone
	var dropzone = document.getElementById('dropzone'),
		upload = function(file){
				var x;
			
				for(x = 0; x < file.length; x++){
					
					
					// Check that the file passes validation vefore uploading it
					validation = validateUploads(file[x]);
					
					if(typeof validation !== undefined && validation.length > 0){
						// There are errors, send them out and don't upload!
						
						for(er = 0; er < validation.length; er++){
						}
					}else {
						// AJAX 
						var formData = new FormData(),
							xhr = new XMLHttpRequest(),
							fileName = file[x].name,
							fileSize = file[x].size;
						
						
						
						
						formData.append('file[]', file[x]);
						
						
						// Update Display Info
						var fileStatus = $('#uploaded-files .uploaded-file:not(.visible)').first();
						
						if( ! fileStatus.hasClass('visible')){
							fileStatus.addClass('visible').find('.file-name').attr('id', fileID(file[x]));
							fileStatus.find('.file-name').text(file[x].name);
						}
						
						
						// Upload Progress
						xhr.upload.addEventListener("loadstart", function(e){

							
							this.progressID = "f_" + Math.round(Math.random() * e.timeStamp * 503413015.254); // global variable for progress uploader
							
							
							var progressContainer = $('#uploaded-files .uploaded-file:not(.hasFile)').first();
							
							if(progressContainer.length){
								progressContainer.attr('id',this.progressID).addClass('hasFile');
							} 
							
						});
						xhr.upload.addEventListener("progress", progressHandler, false);
						
						xhr.onload = function(){
							var data = JSON.parse(this.responseText);
							
							if(data.errors.length > 0){
								
								// There are errors, let's pass that information to the errors function
								uploadErrors(data.errors);
							}
							
							
							displayUpload(data.uploads);
							
						}
						
						
						xhr.open('post','wp-content/plugins/dragDrop/upload_file.php'); // fix this static link!
						xhr.send(formData);	
					}
				}
			},
		uploadErrors = function(array){
			for(er = 0; er < array.length; er++){
				var file_name 	= array[er].file_name,
					error_type 	= array[er].type,
					error 		= array[er].error,
					file_id 	= fileID(file_name),
					error_out	= "<li class='error'>" + error + "</li>";
					
				$('#' + file_id).addClass('error').parent().addClass('errors').find('.error-list').prepend(error_out);	
				
			}
		},
		displayUpload = function(data){
			// Display what's being uploaded for the user
			var	x;
			
			for(x=0; x < data.length; x++){
				
				// Set Variables for sending uploaded file names to hidden inputs
				var loopNum = x + 1,
					input = $('#filenames input[type="text"]:not(.hasFile)').first();
				
				// Push filename to array
				uploads.push(data[x].name);
				
				// Add file name to inputs
				if( ! input.hasClass('hasFile')){
					var filename_split = data[x].name.split('.'),
						fileUP_id = 'f_' + filename_split[0];
					
					input.val(data[x].name).addClass('hasFile').attr('id',fileUP_id);
				}
				
				// Add uploaded class to filename in progress container
				$('#uploaded-files').find('.file-name').each( function(){
					var fileName = $(this).text();
					
					if(fileName == data[x].name){
						$(this).addClass('loaded');
					}	
				});
				
			}
			
		},
		progressHandler = function(e){
			var totalSize = e.total,
					totalLoaded = e.loaded,
					percentLoaded = (totalLoaded/totalSize),
					elemID = this.progressID;
					
	
				$('#uploaded-files .uploaded-file#' + elemID + ' .progress-bar .progress').css({'transform':'scaleX(' + percentLoaded + ')'});
			
		};
	
	dropzone.ondragover = function(){
		$(this).addClass('drag_over'); 
		return false;
	};
	dropzone.ondragleave = function() {
		$(this).removeClass('drag_over');
		return false;
	};
	dropzone.ondrop = function(e){
		// Prevent default browser action
		e.preventDefault();
		
		// Handle uploader styles
		$(this).removeClass('drag_over').addClass('uploading');
		
		// Create variables
		var fileLength = e.dataTransfer.files.length,
			fileType = e.dataTransfer.files[0]['type'];
			
		// Handle upload event
			if(fileLength <= 2 && uploads.length < 2){ //  && fileType == 'audio/mp3'
				// Upload File
				upload(e.dataTransfer.files);
				
			}else if(uploads.length >= 2 || fileLength > 2){
				alert("Sorry, we don't want more than two files.");
			}else {
				// Instruct user as to what uploads are accepted
				alert('please upload a single .mp3 file');
			}
		
	};
	
	// Click on browse
	$('#dropzone .browse-trigger').click(function(e){
		$('#file-upload-hidden').trigger('click');
	});
	
	// Upload file when input changes
	$('#file-upload-hidden').change(function(){
		
		$('#dropzone').removeClass('drag_over').addClass('uploading');
		
		// Create variables
		var fileLength = this.files.length,
			fileType = this.files[0]['type'];
			
		// Handle upload event
			if(fileLength <= 2 && uploads.length < 2){ //  && fileType == 'audio/mp3'
				// Pass file to upload
				upload(this.files);
				
			}else if(uploads.length >= 2 || fileLength > 2){
				alert("Sorry, we don't want more than two files.");
			}else {
				// Instruct user as to what uploads are accepted
				alert('please upload a single .mp3 file');
			}
			
			// Remove file from input
			this.value = '';
	});
	// Remove File from upload queue
	$('.remove-file').click(function(){
		var id = $(this).data('file'),
			uploadContainer = $('.uploaded-file.file-' + id),
			progressBar = uploadContainer.find('.progress-bar .progress'),
			fileNameContainer = uploadContainer.find('.file-name'),
			fileName = fileNameContainer.text(),
			filename_split = fileName.split('.'),
			fileUP_id = 'f_' + filename_split[0],
			input = $('input#'+fileUP_id),
			index = uploads.indexOf(fileName);
					
			progressBar.css({'transform' : 'scale(0)'});
			fileNameContainer.text('');
			input.val('').removeClass('hasFile').attr('id','');
			uploadContainer.removeClass('visible');
			
			$('.file-' + id).attr('id','').removeClass('hasFile errors').find('.upload-info').removeClass('errors').find('.file-name').removeClass('loaded error').attr('id','');
			$('.file-' + id).find('.error-list').text('');
			if(! $('.uploaded-file.visible').length){
				$('#dropzone').removeClass('uploading');
			}
			
			// Remove File from uploaded array
			if(index > -1){
				uploads.splice(index,1);
			}
	});
	
}(jQuery));
(function openForms($){
	// Open
	$('.form-trigger').click(function(){
		
		var selectedForm = $(this).data('form');
		$('.launch-pad').addClass('hidden');
		setTimeout(function(){
			$('.contact-' + selectedForm).addClass('open');
		},800);
	});
	
	// Close
	$('.close-form').click(function(){
		$('.contact-form-cont.open').removeClass('open');
		setTimeout(function(){
			$('.launch-pad').removeClass('hidden');
		},800);
	});
}(jQuery));

function validateUploads(obj){
	
	var $ = jQuery,
		errors = [],
		f_Id = fileID(obj);
	
	// File Duplicate
	if($('#' + f_Id).length){
		errors.push('Oh shit, it looks like you already uploaded this one.');
	}
	
	// More than two files uploaded
	
	// File Type
	
	// File Size
	
	return errors;
}
function fileID(obj){
		// Global File ID Variable	
		
		
		if(obj.name !== undefined){
			// File object is being passed
			var fileName = obj.name;
		}else {
			// File-name string is being passed
			var fileName = obj;
		}
		
		var	file_ID = 'f_' + fileName.split('.')[0].replace(/ /g,'-');
		
		return file_ID;
}


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
function ppNextField(currentFieldID, nextFieldID){
	var $ = jQuery,
		fieldCount = $('.ppsection').length,
		nextButton = $('.btns .next-field'),
		prevButton = $('.btns .prev-field'),
		submitButton = $('.btns .submit'),
		partName = $('.ppsection.part-' + nextFieldID).data('name'),
		currentName = $('.planner-meta .current-title').text(),
		partNumber = $('.ppsection.part-' + nextFieldID).data('part'),
		input = $('.ppsection.part-' + nextFieldID + ' input, .ppsection.part-' + nextFieldID + ' textarea' ).first();
		
	// HANDLE BUTTONS
	
	if(nextFieldID < currentFieldID && nextFieldID > 1){ // going back to a previous field in the form
		// Manage Buttons
		submitButton.addClass('hidden');
		nextButton.removeClass('hidden');
	}
	if(nextFieldID > currentFieldID && nextFieldID < fieldCount){ // going forward to next field
		// Manage Buttons
		prevButton.removeClass('hidden');
		$('.nav-hint').removeClass('visible');
		
	}
	if(nextFieldID == 1){ // first field
		// Manage Buttons
		prevButton.addClass('hidden');
		$('.nav-hint').addClass('visible');
	}
	if(nextFieldID == fieldCount){ // last field
		// Manage buttons
		nextButton.addClass('hidden');
		submitButton.removeClass('hidden');
	}
	
	//CHANGE FIELDS
	
	if(nextFieldID > currentFieldID && $('.ppsection.part-' + nextFieldID).length){ // Move Forward
		// Animate Fields
		$('.ppsection.part-' + nextFieldID).addClass('visible');
		$('.ppsection.part-' + currentFieldID).removeClass('visible').addClass('prev');
	}
	if(nextFieldID < currentFieldID && $('.ppsection.part-' + nextFieldID).length){ // Move Backwards
		// Animate Fields
		$('.ppsection.part-' + nextFieldID).addClass('visible').removeClass('prev');
		$('.ppsection.part-' + currentFieldID).removeClass('visible');
	}
	
	// UPDATE PROJECT PLANNER META
	if(partNumber !== undefined){
		$('.planner-meta .current-field').text('0' + partNumber);
	}
	if(partName !== currentName){
		$('.planner-meta .current-title').text(partName);
	}
	
	// Activate first field of the section if it's a typing field
	if(input.length && input.val() == ''){
		
		setTimeout(function(){
			// put in set timeout because focus won't fire before animation has completed
			input.focus();
		},1000);
	}
	
	
}
function checkbox(clicked,value){
	var $ = jQuery,
		checkbox = $('input[value="' + value + '"'),
		expand = ["Full Record","EP"],
		expandEval = expand.indexOf(value),
		placePrep = 'Tell me more about your '
		valist = {
				"Full Record" : placePrep + "record...", 
				"EP" : placePrep + "EP...", 
				"Single" : placePrep + "single...",
				"Other" : "You've selected 'other'. Please tell me more about what makes this project different!"
				};
		
	if(checkbox.attr('checked') !== 'checked'){
		// Remove other checkbox to make exclusive
		$('.wpcf7-list-item.checked').removeClass('checked').find('input').attr('checked',false);		
		
		// Apply new selection
		checkbox.attr('checked',true);	
		clicked.addClass('checked');
		
		// Display Expanision, if needed
		if( expandEval !== -1){
			// the clicked value warrants expansion, so show it
			$('.ppsection .elaboration, .service-select').addClass('elaborate');
			
			setTimeout(function(){ // Timeout to make field focus after it's done animating
				var input = $('input[name="number-songs"]'),
					inputVal = input.val();
				
				input.focus();
				input.val('').val(inputVal);
				
			},605);
			
		}else if($('.ppsection .elaboration').hasClass('elaborate')){
			$('.elaboration.elaborate, .service-select.elaborate').removeClass('elaborate');
		}
			
	}else {
		// Clicked an already active checkbox, deactivate it
		checkbox.attr('checked',false);
		clicked.removeClass('checked');
		$('.elaboration.elaborate, .service-select.elaborate').removeClass('elaborate');
	}
	
	// Change the describe project placeholder if other, else - reset it
	$('textarea[name="project-description"]').attr('placeholder', valist[value]);

	
	
}


jQuery(document).ready(function($) {
	$( "#gear-accordion" ).accordion({
		collapsible: true,
		heightStyle: "content",
		animate: {'duration':300},
		active: 0
	});
});

window.addEventListener('load', function() {

  var scopeElement = document.getElementById('page_viewer');	
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
 
  if(scopeElement){
	 document.addEventListener('touchstart', touchstartHandler, false);
	 document.addEventListener('touchmove', touchmoveHandler, false); 
  }
  
});