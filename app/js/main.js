$(document).ready(function() {
	var header = $('header');

	var headerHeight = $(header).height(),
	scrolling = false,
	previousTop = 0,
	currentTop = 0,
	scrollDelta = 10,
	scrollOffset = 150;

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		if (previousTop - currentTop > scrollDelta) {
			$(header).removeClass('is-hidden');
		} else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
			$(header).addClass('is-hidden');
		}

		previousTop = currentTop;
		scrolling = false;
	}

	$(window).on('scroll', function() {
		var scrollTop = $(this).scrollTop();

		console.log(scrollTop);

		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame) ? setTimeout(autoHideHeader, 250) : requestAnimationFrame(autoHideHeader);
		}
	})
})