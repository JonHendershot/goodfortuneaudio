(function scrollNav($){
	var sectionTrigger = $('section.trigger');
	$(window).scroll(function(){

		var menuTop = $('.scroller-nav').offset().top,
			scrolled = $(window).scrollTop(),
			menuHeight = $('.scroller-nav').height(),
			pad = 20; // padding on range to trigger changeover function

			
		sectionTrigger.each(function(){
			
			// MENU CHANGER
			var elem = $(this),
				elemInfo = elem.data('self'), // retrieve data-self json array from section
				elemTop =  elem.offset().top - scrolled, //distance from top of section to top of threshold
				threshold = (menuTop - scrolled) +  ( elemInfo.section_id * 22 ) - 10, // adjust for padding 
				bottomRange = threshold - pad, // bottom of trigger range
				topRange = threshold + pad; // top of trigger range 				
				
				
				if( bottomRange <= elemTop && elemTop <= topRange ) { // element enters trigger range
					

					if( elemTop < threshold ){
						var active = elemInfo.section_id;
					} else if ( elemTop > ( threshold - menuHeight ) ){
						var active = elemInfo.section_id - 1;
					}
					var outerPosition = 4 + (active - 1) * 22,
						infoPosition =  6.5 + ( (active - 1) * 22),
						activeSection = $('section.trigger.section-' + active),
						menuBubbleClr = activeSection.data('self').menu_bubble_clr,
						menuNumberClr = activeSection.data('self').menu_number_clr,
						menuSectionClr = activeSection.data('self').menu_section_name_clr,
						active_num = activeSection.data('self').section_id,
						active_title = activeSection.data('self').section_title;
					
					if( ! $('section.section-' + active).hasClass('active') ){ // scope the functions to only fire once
						$('.nav-wrapper.active').removeClass('active');
						$('.nav-wrapper.nav-' + active).addClass('active');
						$('.outer-circle').css({"top":outerPosition});
						$('.scroller-nav .info').css({"top":infoPosition}).find( $('.section-title') ).css({"color":menuSectionClr});
						$('.section-num').css({"color":menuNumberClr}).text('0'+active_num);
						$('.info .section-title').text('/'+active_title);
						$('section.active').not('.section-' + active).removeClass('active');
						$('.section-' + active).addClass('active');
						$('.outer-circle, .inner-circle').css({"background-color":menuBubbleClr});
					}	
				}
				
			// LOGO COLOR CHANGE		
			var logoTop = 75,
				logoBottom = 96,
				logoColor = elemInfo.logo_clr,
				whiteLine = elemTop - logoTop,
				orangeLine = elemTop + logoTop,
				shadeTrigger = elemInfo.shade_trigger,
				windowHeight = $(window).height() * 0.25;			
				
				if( logoTop <= elemTop && elemTop <= logoBottom ){
					
					if( shadeTrigger == 1 ){
							$('.header-logo img.' + logoColor).css({"clip":"rect(" + whiteLine + "px,auto,auto,0px"});
							$('.header-logo img').not("." + logoColor).css({"clip":"rect(0px,auto," + whiteLine + "px,0px"});
					}
					
				}
				if( elemTop < 75 && elemTop > 0 && ! $('.header-logo img.' + logoColor).hasClass('visible')  ){
					if( shadeTrigger == 1 ){
						$('.header-logo img.' + logoColor).css({"clip":"rect(0px,auto,auto,0px"}).removeClass('hidden').addClass('visible');
						$('.header-logo img').not("." + logoColor).css({"clip":"rect(0px,auto,0px,0px"}).addClass('hidden').removeClass('visible');		
					}
				}
						
				if( elemTop > 96 && elemTop < windowHeight && ! $('.header-logo img').not("." + logoColor).hasClass('visible')  ){
					if( shadeTrigger == 1 ){
						$('.header-logo img.' + logoColor).css({"clip":"rect(21px,auto,auto,0px"}).removeClass('visible').addClass('hidden');
						$('.header-logo img').not("." + logoColor).css({"clip":"rect(0px,auto,21px,0px"}).addClass('visible').removeClass('hidden');
					}
				}	
		});
		
	});
}(jQuery));
(function scrollerTest($){
	$('html').on ('mousewheel', function (e) {
	    var delta = e.originalEvent.wheelDelta;
	
	    if (delta < 0 && delta > -4.4) { // User is Scrolling Down
	        var distance = delta + 14,
	        	section = 100 - distance,
	        	currentScreen = $('section.active').data('self').section_id;
	        
/* 	        console.log(delta); */

			// logo animation
	        $('.hint-line.line-1').css({'transform' : 'translate3d(0px, ' + distance + 'px, 0px)'});
	        $('.hint-line.line-2').css({'transform' : 'translate3d(-'+ distance + 'px,0px, 0px) rotate(90deg)'});
	        $('.hint-line.line-3').css({'transform' : 'translate3d(0px, -' + distance + 'px, 0px)'});
	        $('.hint-line.line-4').css({'transform' : 'translate3d('+ distance + 'px,0px, 0px) rotate(90deg)'});
	        
	        // page transitions
// 	        nextScreen(currentScreen);
	
	    } else if (delta > 0) { // User is Scrolling Up
/* 	        console.log(delta); */
	    }
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
				$('.section-about .content-wrapper').addClass('blur');
			}
		}
	});
	
	$('.content-wrapper').click(function(){
		if($('.lightbox').hasClass('open')){
			$('.lightbox').removeClass('open visible');
			$(this).removeClass('blur');
		}
	});
}(jQuery));
(function projects($){
	
	
	// Hover Event
		$('.project-box').hover(function(){
			$('.project-box, .project-wrapper.active').addClass('open');
		},function(){
			$('.project-box, .project-wrapper.active').removeClass('open');
		});
		
		
	// AUDIO TRACK HANDLES 	
	
	// Variables
		var audioTrack = document.getElementById('project-player'),
			playBtn = $('.buttons .play'),
			progressBar = $('.progress-bar'),
			bar = document.getElementById('default-bar'),
			barSize = 520;
			
			
	// Play/Pause Audio
		

		playBtn.click(function(){
			if(!audioTrack.paused && !audioTrack.ended){
				// Pause Audio
				audioTrack.pause();
				
				// Update Classes
				$('.project-box, .project-wrapper.active').removeClass('playing');
				playBtn.removeClass('pause');
				
				// Pause Timer Update
				window.clearInterval(updateTime);
			}else{
				// Play Audio
				audioTrack.play();
				
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
			
			// Add full duration to duration element
			duration.text(trackMinutes + ':' + trackSeconds);
		}
	
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
				var size = parseInt(audioTrack.currentTime*barSize/audioTrack.duration);
				
				progressBar.css({'width' : size + 'px'});
			}else{
				currentTime.text('0:00');
				playBtn.removeClass('pause');
				progressBar.css({'width' : '0px'});
				window.clearInterval(updateTime);
			}	
		}
		
		function clickedBar(e){
			if(!audioTrack.ended){
				var mouseX = (e.pageX - barSize) - 58, //wtf is up with this offset tho?
					newTime = mouseX*audioTrack.duration/barSize;
					
					audioTrack.currentTime = newTime;
					progressBar.css({'width':mouseX + 'px'});
			
			}
		}


		

			
		
		
		
	
}(jQuery));

function nextScreen(currentScreenID){
	var $ = jQuery,
		nsID = currentScreenID + 1,
		nsData = $('.section-' + nsID).data('self');
		
	$('.section-' + currentScreenID).removeClass('active').addClass('top');
	$('.section-' + nsID).addClass('active').removeClass('bottom');
	
/* 	console.log('next screen fired'); */
}

jQuery(document).ready(function($) {
	$( "#gear-accordion" ).accordion({
		collapsible: true,
		heightStyle: "content",
		animate: {'duration':300}
	});
});
