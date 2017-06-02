$(document).ready(function() {

    /****************/
    //Domira autoHideHeader
    /***************/
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

		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame) ? setTimeout(autoHideHeader, 250) : requestAnimationFrame(autoHideHeader);
		}
	})
    /****************/
    //End Domira autoHideHeader
    /***************/
    /****************/
    //DomiraTV Engine
    /***************/

    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    var array = [];
    $('.player').each(function () {
        var val = $(this).data('id');
        array.push(val);
    });


    var p = document.getElementsByClassName("player");
    $(p).hide();


    for(var i=0,j=1;i<= array.length-1, j<= array.length;i++, j++) {
        var t = document.getElementById("thumbnail"+j);
        t.src = "https://img.youtube.com/vi/"+ array[i] +"/0.jpg";
    }


    onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED) {
            $('.start-video').fadeIn('normal');
        }
    };


    $('.start-video').click(function () {
        $(this).hide();
        var wrap_id = $(this).data('id');
        $("#" + wrap_id + " .player").show();
        // $("#" + wrap_id + " .thumbnail_container .thumbnail").hide();
        $("#" + wrap_id + " .thumbnail_container .start-video").hide();
        $("#" + wrap_id + " .thumbnail_container").css("visibility", "hidden");

        $("#" + wrap_id + " .movie-media-control").show().click( function () {
            $("#" + wrap_id + " .start-video").show();
            $(this).hide();
        });
        // player.playVideo()
    });


    $('.movie-media-video').dblclick(function () {
        var link_id = $(this).find(".player").data("id");
        window.open("https://www.youtube.com/watch?v=" + link_id);
    });
    /********************/
    //End DomiraTV Engine
    /*******************/

    // main page
    var mainPage = document.getElementById('main');
    if (mainPage) {
        /********************/
        //top main slider
        /*******************/
        var slides = $('.jk-list-item'),
        slider = $('.jk-list'),
        sliderTrack = $('.jk-list-track', slider),
        slidesCount = slides.length,
        currentTopSlide = 0,
        currentBottomSlide = 2,
        slideHeight = slider.height() / 3,
        currentTop = 0;

        sliderTrack.css({top: '0px'});

        if (slidesCount <= 3) {
            slideHeight = slider.height() / slidesCount,
            $('.jk-list-nav-item').css({display: 'none'});
        }

        slides.height(slideHeight);

        $('.jk-list-nav-item.up').on('click', function() {
            if (currentTopSlide > 0) {
                currentTop += slideHeight;
                currentBottomSlide--;
                currentTopSlide--;
                sliderTrack.css({top: currentTop + 'px'});
            }
        });

        $('.jk-list-nav-item.down').on('click', function() {
            if (currentBottomSlide < slidesCount - 1) {
                currentTop -= slideHeight;
                currentBottomSlide++;
                currentTopSlide++;
                sliderTrack.css({top: currentTop + 'px'});
            }
        });
        /********************/
        //end top main slider
        /*******************/

        // main page maps
        initMap();

        var markersForTopMap = [];

        for (i = 0; i < slides.length; i++) {
            var item = {};
            item.lat = +slides[i].dataset.lat;
            item.lng = +slides[i].dataset.lng;
            if (item)
                markersForTopMap.push(item);
        }

        markersForTopMap.forEach(function(item) {
            var markerData = {};
            markerData.position = item;
            markerData.map = map2;
            var marker = new google.maps.Marker(markerData);
        });

        slides.on('click', function() {
            var center = markersForTopMap[slides.index(this)];
            map2.setOptions({
                zoom: 15,
                center: center
            })
        })
        // end main page maps

        // sales slider
        $('.sales .slider').slick({
            prevArrow: $('.sales .arrow-prev'),
            nextArrow: $('.sales .arrow-next'),
            adaptiveHeight: true
        });
        // end sales slider
    }
    // end main page

});

function callPlayer(frame_id, func, args) {
    if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
    var iframe = document.getElementById(frame_id);
    if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
        iframe = iframe.getElementsByTagName('iframe')[0];
    }
    if (iframe) {
        // Frame exists,
        iframe.contentWindow.postMessage(JSON.stringify({
            "event": "command",
            "func": func,
            "args": args,
            "id": frame_id,
        }), "*");
    }
}

// main page maps 
var map, map2;

function initMap() {
    map = new google.maps.Map(document.getElementById('bottom_map'), {
      center: {lat: 50.439172, lng: 30.460447},
      zoom: 8,
      disableDefaultUI: true,
      scrollwheel: false
    });
    map2 = new google.maps.Map(document.getElementById('main-top-map'), {
      center: {lat: 50.439172, lng: 30.460447},
      zoom: 12,
      //disableDefaultUI: true,
      scrollwheel: false
    });
}
// end main page maps

