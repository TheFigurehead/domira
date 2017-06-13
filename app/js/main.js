$(document).ready(function() {

    var jkCanvas = document.getElementById('jk');

    if (jkCanvas) {
        var ctx = jkCanvas.getContext('2d'),
        pic = document.getElementsByClassName('canvas-img')[0],
        width = pic.width,
        height = pic.height,
        mouseX, mouseY,
        relativeWidth = 1059,
        relativeHeight = 424;

        jkCanvas.width = width;
        jkCanvas.height = height;

        drawCanvas();
        jkCanvas.addEventListener('mousemove', updateCanvas, false);

        function drawCanvas() {
            drawRoom([0, 351], [0, 313], [565, 318], [relativeWidth, 323], [relativeWidth, 372], [594, 380], [0, 351], {r: 255, g: 0, b: 0});
            drawRoom([0, 313], [565, 318], [relativeWidth, 323], [relativeWidth, 275], [596, 259], [0, 277], [0, 313], {r: 0, g: 255, b: 0});
            drawRoom([0, 277], [596, 259], [relativeWidth, 275], [relativeWidth, 225], [604, 189], [0, 241], [0, 277], {r: 0, g: 0, b: 255});
            drawRoom([0, 241], [604, 189], [relativeWidth, 225], [relativeWidth, 171], [609, 126], [0, 203], [0, 241], {r: 255, g: 0, b: 0});
        }

        function drawRoom() {
            var color = arguments[arguments.length - 1];

            ctx.beginPath();
            ctx.fillStyle = 'rgba(0,0,0,.0)';
            ctx.moveTo(arguments[0][0] / relativeHeight * height, arguments[0][1] / relativeWidth * width);

            for (var i = 1; i < arguments.length - 1; i++)
                ctx.lineTo(arguments[i][0] / relativeHeight * height, arguments[i][1] / relativeWidth * width);

            if (ctx.isPointInPath(mouseX, mouseY))
                ctx.fillStyle = 'rgba('+ color.r + ', '+ color.g + ', ' + color.b + ', .3)';

            ctx.fill();
            ctx.strokeStyle = 'rgba(0,0,0,.0)';
            ctx.lineWidth = 2;
            ctx.moveTo(arguments[0][0] / relativeHeight * height, arguments[0][1] / relativeWidth * width);

            for (var i = 1; i < arguments.length; i++)
                ctx.lineTo(arguments[i][0] / relativeHeight * height, arguments[i][1] / relativeWidth * width);

            if (ctx.isPointInPath(mouseX, mouseY))
                ctx.strokeStyle = 'rgba('+ color.r + ', '+ color.g + ', ' + color.b + ', .9)';

            ctx.stroke();
        }

        function updateCanvas(e){
            var pos = findOffset(jkCanvas);

            mouseX = e.pageX - pos.x;
            mouseY = e.pageY - pos.y;

            ctx.clearRect(0, 0 , width, height);
            drawCanvas();
        }

        function findOffset(obj) {
            var curX = curY = 0;
            if (obj.offsetParent) {
                do {
                    curX += obj.offsetLeft;
                    curY += obj.offsetTop;
                } while (obj = obj.offsetParent);
                return {x:curX,y:curY};
            }
        }
    }

    /****************/
    //Domira autoHideHeader
    /***************/

	var header = $('header');

  var mobileMenuNav = $('header > ul');

	var headerHeight = $(header).height(),
	scrolling = false,
	previousTop = 0,
	currentTop = 0,
	scrollDelta = 10,
	scrollOffset = 150;

    if (!window.matchMedia( "(max-width: 996px)" ).matches) {
        var timeoutHeader = setTimeout(function(){
            if ($(window).scrollTop() >= 112)
                $('header').addClass('is-hidden');
        }, 2000);
    }
    

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		if (previousTop - currentTop > scrollDelta) {
			$(header).removeClass('is-hidden');
		} else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
			$(header).addClass('is-hidden');
		}

    $('.burger-mobile').removeClass('open');
    mobileMenuNav.removeClass('active');

		previousTop = currentTop;
		scrolling = false;
	}


	$(window).on('scroll', function() {
        if (!window.matchMedia( "(max-width: 996px)" ).matches) {
            clearTimeout( timeoutHeader );
            timeoutHeader = setTimeout(function(){
                if ($(window).scrollTop() >= 112)
                    $('header').addClass('is-hidden');
            }, 2000);
        }
        
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

    if (!window.matchMedia( "(max-width: 996px)" ).matches) {
        $('header').hover(
            function (){
                clearTimeout(timeoutHeader);
            }, function() {
                timeoutHeader = setTimeout(function(){
                    if ($(window).scrollTop() >= 112) {
                        $('header').addClass('is-hidden');
                    }
                }, 2000);
                $('header ul li a').removeClass('opacity');
            }
        )
    }

    /****************/
    //End Domira autoHideHeader
    /***************/

    /****************/
    //Domira hoverOpacity
    /***************/
    if (!window.matchMedia( "(max-width: 996px)" ).matches) {
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
    }

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

    // mobile menu

    $('.burger-mobile').on('click', function() {
        $(this).toggleClass('open');
        mobileMenuNav.toggleClass('active');
    })
    // end mobile menu

// ---------------
// ***planning tabulation****
// ---------------
  var tabsLi = $('main .container .planing-title li'),
  tabsLinks = $('main .container .planing-content a'),
  tabButton = $('.top5-planing .button');

  tabsLi.on('click', function(event) {
    event.preventDefault();
    var activeLink = tabsLinks.eq($(this).index());

    tabsLi.removeClass('active_li');
    $(this).addClass('active_li');

    tabsLinks.removeClass('active');
    activeLink.addClass('active');

    tabButton.attr('href', activeLink.attr('href'));
  });

  tabsLi.eq(0).trigger('click')
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

        markersForTopMap.forEach(function(item, i) {
            var markerData = {};
            markerData.position = item;
            markerData.map = map2;
            markerData.icon = slides[i].dataset.icon;
            console.log(markerData);
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

// init map contact page
var map_con,map, map2,
style = [];

function initMap() {
  if(document.getElementById('map-contact')){
  map_con = new google.maps.Map(document.getElementById('map-contact'), {
    center: {lat: 50.420682, lng: 30.555695},
    zoom: 12,
    scrollwheel: true,
    styles: style
  });}

  if(document.getElementById('bottom_map')){
  map = new google.maps.Map(document.getElementById('bottom_map'), {
    center: {lat: 50.439172, lng: 30.460447},
    zoom: 8,
    disableDefaultUI: true,
    scrollwheel: false
  });}

  if(document.getElementById('main-top-map')){
  map2 = new google.maps.Map(document.getElementById('main-top-map'), {
    center: {lat: 50.439172, lng: 30.460447},
    zoom: 12,
    //disableDefaultUI: true,
    scrollwheel: false
  });}

//  var markers2 = [
//    {
//      position: {lat: 50.411994, lng: 30.436709},
//      map: map2,
//      icon: 'img/domira-map-markers/1.png'
//    },
//    {
//      position: {lat: 50.439172, lng: 30.460447},
//      map: map2,
//      icon: 'img/domira-map-markers/2.png'
//    },
//    {
//      position: {lat: 50.420682, lng: 30.555695},
//      map: map2,
//      icon: 'img/domira-map-markers/3.png'
//    }
//  ];
//
//  markers2.forEach(function(item, i, arr) {
//    var marker = new google.maps.Marker(item);
//  })
}
// end init contact page
