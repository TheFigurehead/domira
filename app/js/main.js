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

  function scrollHeader() {
    var scrollTop = $(this).scrollTop();


      if( !scrolling ) {
      scrolling = true;
      (!window.requestAnimationFrame) ? setTimeout(autoHideHeader, 250) : requestAnimationFrame(autoHideHeader);
    }
  }



  var mq = window.matchMedia( "(min-width: 960px)" );

$(window).on('orientationchange', function() {
  if (!mq.matches) {
    console.log('media');
    //$(window).off('scroll', scrollHeader);
  } else {
    $(window).on('scroll', scrollHeader);
  }
});
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

    /********************/
    //Start sidebar menu
    /*******************/
    $('.bar-wrapper').click(function() {
       $('header').toggleClass('open');

       if ($('.nav-icon').attr('id')) {
         $('.nav-icon').removeAttr('id');
     } else {
        $('.nav-icon').attr('id', 'openBurger');
    }

    });
    /********************/
    //End sidebar menu
    /*******************/

    //  $(window).on('resize', function() {
    // //   if (window.innerWidth < 960){
    // //     console.log("work");
    // //   }
    //     if ($(window).width() < 960){
    //       console.log('work')
    //     }
    //  });

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
