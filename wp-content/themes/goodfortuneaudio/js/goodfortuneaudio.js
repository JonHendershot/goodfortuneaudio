(function scrollNav($){
	var sectionTrigger = $('section.trigger');
	$(window).scroll(function(){

		var menuTop = $('.scroller-nav').offset().top,
			scrolled = $(window).scrollTop(),
			menuHeight = $('.scroller-nav').height(),
			threshold = (menuTop - scrolled) + 10, // adjust for padding 
			pad = 20, // padding on range to trigger changeover function
			bottomRange = threshold - pad, // bottom of trigger range
			topRange = threshold + pad; // top of trigger range 
			
		console.log(menuHeight);
		sectionTrigger.each(function(){
			var elem = $(this),
				elemInfo = elem.data('self'), // retrieve data-self json array from section
				elemTop =  elem.offset().top - scrolled; //distance from top of section to top of threshold
				
				
				
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
					
					$('.nav-wrapper.active').removeClass('active');
					$('.nav-wrapper.nav-' + active).addClass('active');
					$('.outer-circle').css({"top":outerPosition});
					$('.scroller-nav .info').css({"top":infoPosition, "color":menu_main_clr});
					$('.section-num').css({"color":menu_second_clr}).text('0'+active_num);
					$('.info .section-title').text('/'+active_title);
					
					
				
				}
		});
		
	});
}(jQuery));