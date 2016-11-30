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
						infoPosition =  5 + ( (active - 1) * 22),
						menu_main_clr = $('section.trigger.section-' + active).data('self').menu_main_clr,
						menu_second_clr = $('section.trigger.section-' + active).data('self').menu_second_clr,
						active_num = $('section.trigger.section-' + active).data('self').section_id,
						active_title = $('section.trigger.section-' + active).data('self').section_title;
					
					if( ! $('section.section-' + active).hasClass('active') ){ // scope the functions to only fire once
						$('.nav-wrapper.active').removeClass('active');
						$('.nav-wrapper.nav-' + active).addClass('active');
						$('.outer-circle').css({"top":outerPosition});
						$('.scroller-nav .info').css({"top":infoPosition, "color":menu_main_clr});
						$('.section-num').css({"color":menu_second_clr}).text('0'+active_num);
						$('.info .section-title').text('/'+active_title);
						$('section.active').not('.section-' + active).removeClass('active');
						$('.section-' + active).addClass('active');
						$('.outer-circle, .inner-circle').css({"background-color":menu_main_clr});
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
						console.log('event fired');	
					}
				}	
		});
		
	});
}(jQuery));