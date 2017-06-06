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

    var timeoutHeader = setTimeout(function(){
        if ($(window).scrollTop() >= 112)
            $('header').addClass('is-hidden');
    }, 2000);

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
        clearTimeout( timeoutHeader );
        timeoutHeader = setTimeout(function(){
            if ($(window).scrollTop() >= 112)
                $('header').addClass('is-hidden');
        }, 2000);
		var scrollTop = $(this).scrollTop();

		if( !scrolling ) {
			scrolling = true;
			if(!window.requestAnimationFrame) {
               setTimeout(autoHideHeader, 250);
            }else{
                requestAnimationFrame(autoHideHeader);
            }
		}
	})

    $('header').hover(
        function (){
            clearTimeout(timeoutHeader);
        }, function() {
            timeoutHeader = setTimeout(function(){
                if ($(window).scrollTop() >= 112)
                    $('header').addClass('is-hidden');
            }, 2000);
            $('header ul li a').removeClass('opacity');
        }
    )

    /****************/
    //End Domira autoHideHeader
    /***************/

    /****************/
    //Domira hoverOpacity
    /***************/
        $('header ul li a').hover(
        function()  {
            $('header ul li a').addClass('opacity');
            $(this).addClass('opacity-hide');
        },
        function()  {
            $(this).removeClass('opacity-hide');
        }
    )

        $("header ul li").on("click", "a", function(){
    $("header ul li a").removeClass("mark");
    $(this).addClass("mark");
    });

    /****************/
    //End Domira hoverOpacity
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

    /********************/
    //Start sidebar menu
    /*******************/

    $('.bar-wrapper').click(function() {

          $('.mobile-head-wrapper').toggleClass('open');
          $('.bar-wrapper').toggleClass('open');
          $('body').toggleClass('open');

          //OVERLAY
          $('.overlay').toggleClass('open')
          if($('.overlay').hasClass('open')){
            $('.overlay').show();
          }else{
            $('.overlay').hide();
          }

          //BURGER
           if ($('.nav-icon').attr('id')) {
             $('.nav-icon').removeAttr('id');
           } else {
            $('.nav-icon').attr('id', 'openBurger');
          }

    });

    $('.overlay').click(function() {
      $(this).removeClass('open').hide();
      $('.mobile-head-wrapper').removeClass('open');
      $('.bar-wrapper').removeClass('open');
      $('body').removeClass('open');
      $('.nav-icon').removeAttr('id');
    });
    /********************/
    //End sidebar menu
    /*******************/

    /********************/
    //SWIPE
    /*******************/

  //   $(".swipe-area").swipe({
  //   swipeStatus:function(event, phase, direction, distance, duration, fingers)
  //       {
  //           if (phase=="move" && direction =="right") {
  //               console.log('swipe');
  //                $('header').addClass('open');
  //                $('.nav-icon').attr('id', 'openBurger');
  //
  //               return false;
  //            }
  //           if (phase=="move" && direction =="left") {
  //                 $('.nav-icon').removeAttr('id');
  //                 $('header').removeClass('open');
  //                 return false;
  //           }
  //       }
  // });

  /********************/
  //END SWIPE
  /*******************/
// ---------------
// ***planning tabulation****
// ---------------
    $('main .container .planing-title li').eq(0).addClass("active_li");
    $('main .container .planing-content a').eq(0).addClass("active");
  $('main .container .planing-title li').click(function(){
    if(!$(this).hasClass( "active_li" )) {
      var index = $(this).index();
      $('.planing-title li').removeClass("active_li");
      $(this).addClass("active_li");
      $('main .container .planing-content a.active').removeClass("active");
      $('main .container .planing-content a').eq(index).addClass("active");
      return false;
    }
  });

// ---------------
// ***End  planning tabulation****
// ---------------

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


if (window.innerWidth < 768){
  console.log("work");
}

// init map contact page
var map_con,
style = [];

function initMap() {
  map_con = new google.maps.Map(document.getElementById('map-contact'), {
    center: {lat: 50.420682, lng: 30.555695},
    zoom: 12,
    scrollwheel: false,
    styles: style
  });

  var markers2 = [
    {
      position: {lat: 50.411994, lng: 30.436709},
      map: map2,
      icon: 'img/otdel_1.png'
    },
    {
      position: {lat: 50.439172, lng: 30.460447},
      map: map2,
      icon: 'img/main_office.png'
    },
    {
      position: {lat: 50.420682, lng: 30.555695},
      map: map2,
      icon: 'img/otdel_2.png'
    }
  ];

  markers2.forEach(function(item, i, arr) {
    var marker = new google.maps.Marker(item);
  })
}
// end init contact page

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
