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

// -----------
// ***popup***
// -----------

var apartmentPage = document.getElementById('apartment');

if (apartmentPage) {
  $('.number_of .button').on('click', popUpShow);
}

$('.popup-container').hide();

$('.popup-overflow').on('click', popUpHide);

$('.popup-container .fa-times').on('click', popUpHide);

function popUpShow(e) {
  e.stopPropagation();
  $('.popup-container').show(300);
  $(".popup-overflow").css('display', 'block');
}

function popUpHide(e) {
  $('.popup-container').hide(300);
  $(".popup-overflow").css('display', 'none');
}

// -----------
// *end popup*
// -----------

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
