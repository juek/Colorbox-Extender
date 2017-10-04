// TODO: Add optional instructions "message / image" for swipe & pinchzoom (using background images so users can easily override it via css)
// TODO: Check if the cbox content is an image otherwise
function hammerIt(elm) { // Based on: http://stackoverflow.com/a/27572427/6266306
  hammertime = new Hammer(elm, {});
  hammertime.get('pinch').set({
    enable: true
  });
  var posX = 0,
  posY = 0,
  scale = 1,
  last_scale = 1,
  last_posX = 0,
  last_posY = 0,
  max_pos_x = 0,
  max_pos_y = 0,
  transform = "",
  el = elm;

  hammertime.on('doubletap pan pinch panend pinchend', function(ev) {
    if (ev.type == "doubletap") {
      console.log('double tapped!');
      if(last_scale == 1){
        transform =
        "translate3d(0, 0, 0) " +
        "scale3d(2, 2, 1) ";
        scale = 2;
        last_scale = 2;
      }else if(last_scale == 2){
        // TODO: Discover why the default if (see stackoverflow) is not working properly, as the simple last_scale check fails if pinchzoom is performed before | if (window.getComputedStyle(el, null).getPropertyValue('transform').toString() != "matrix(1, 0, 0, 1, 0, 0)") {
        transform =
        "translate3d(0, 0, 0) " +
        "scale3d(1, 1, 1) ";
        scale = 1;
        last_scale = 1;

      }else{
        console.error('last_scale undefined!');
      }
      el.style.transform = transform;
      transform = "";
    }

    //pan
    if (scale != 1) {
      posX = last_posX + ev.deltaX;
      posY = last_posY + ev.deltaY;
      max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
      max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
      if (posX > max_pos_x) {
        posX = max_pos_x;
      }
      if (posX < -max_pos_x) {
        posX = -max_pos_x;
      }
      if (posY > max_pos_y) {
        posY = max_pos_y;
      }
      if (posY < -max_pos_y) {
        posY = -max_pos_y;
      }
    }


    //pinch
    if (ev.type == "pinch") {
      scale = Math.max(.999, Math.min(last_scale * (ev.scale), 4));
    }
    if(ev.type == "pinchend"){last_scale = scale;}

    //panend
    if(ev.type == "panend"){
      last_posX = posX < max_pos_x ? posX : max_pos_x;
      last_posY = posY < max_pos_y ? posY : max_pos_y;
    }

    if (scale != 1) {
      transform =
      "translate3d(" + posX + "px," + posY + "px, 0) " +
      "scale3d(" + scale + ", " + scale + ", 1)";
    }

    if (transform) {
      el.style.transform = transform;
    }
  });
}

function cboxClassCleanup() {
  $cboxWrapper.removeClass(swipeOutLeftClass).removeClass(swipeOutRightClass).removeClass(swipeInLeftClass).removeClass(swipeInRightClass);
}
function cboxSwipeLeft() {
  cboxClassCleanup('cboxSwipeLeft');
  if(!$cboxWrapper.hasClass(swipeOutLeftClass)){
    $cboxWrapper.addClass(swipeOutLeftClass);
  }
  lastDirection = "left";
  $.colorbox.next();
}
function cboxSwipeRight() {
  cboxClassCleanup('cboxSwipeRight');
  $cboxWrapper.addClass(swipeOutRightClass);
  lastDirection = "right";
  $.colorbox.prev();
}
function cboxSwipeUp() {
  cboxClassCleanup('cboxSwipeUp');
  $cboxWrapper.addClass(swipeOutUpClass);
  lastDirection = "up";
  $.colorbox.close();
}
function cboxSwipeDown() {
  cboxClassCleanup('cboxSwipeDown');
  $cboxWrapper.addClass(swipeOutDownClass);
  lastDirection = "down";
  $.colorbox.close();
}
$(document).on('cbox_open', function () {
  $cboxWrapper = $("#colorbox:first");
  $cboxContentWrapper = $cboxWrapper.find('#cboxLoadedContent:first');

  swipeOutLeftClass = "colorbox--action-swiped-left slideOutLeft";
  swipeOutRightClass = "colorbox--action-swiped-right slideOutRight";
  swipeInLeftClass = "colorbox--action-swiped-right-performed slideInLeft";
  swipeInRightClass = "colorbox--action-swiped-left-performed slideInRight";
  swipeOutUpClass = "colorbox--action-swiped-up-performed slideOutUp";
  swipeOutDownClass = "colorbox--action-swiped-down-performed slideOutDown";
  lastDirection = "unset";
  animatedSwipeActive = true;
  pinchzoomActive = true;

  if (animatedSwipeActive == true) {
    $cboxWrapper.addClass("animated"); // add animate.css class

    // Turn off cbox javascript animations and preload the next image
    $.colorbox.settings.preloading=true;
    $.colorbox.settings.transition="";
  }
  if (pinchzoomActive == true) {
    $(document).on('cbox_complete', function () {
      $cboxWrapper.find('.cboxPhoto').wrap('<div id="cboxZoomImageWrapper" class="colorbox__pinchzoom-wrapper"></div>');

      $cboxWrapper.addClass("colorbox--pinchzoom-active");
      // Prevent image dialog on longtap (browser context menu)
      $cboxWrapper.find('.cboxPhoto').hammer().on('touchstart', function (e) {
        e.preventDefault()
      });
      hammerIt(document.getElementById("cboxZoomImageWrapper"));
    });
  }

  $cboxWrapper.hammer().on('swipeleft', function (event, data) {
	if ($cboxWrapper.find('#cboxPrevious').css("display") == "none") {return false;}
    if (event.gesture) {
      event.gesture.srcEvent.stopPropagation();
      cboxSwipeLeft();
    }
    return false;
  });
  $cboxWrapper.hammer().on('swiperight', function (event, data) {
	if ($cboxWrapper.find('#cboxPrevious').css("display") == "none") {return false;}
    if (event.gesture) {
      event.gesture.srcEvent.stopPropagation();
      cboxSwipeRight();
    }
    return false;
  });
  $cboxWrapper.hammer().on('swipeup', function (event, data) {
	if ($cboxWrapper.find('#cboxPrevious').css("display") == "none") {return false;}
    if (event.gesture) {
      event.gesture.srcEvent.stopPropagation();
      cboxSwipeUp();
    }
    return false;
  });
  $cboxWrapper.hammer().on('swipedown', function (event, data) {
	if ($cboxWrapper.find('#cboxPrevious').css("display") == "none") {return false;}
    if (event.gesture) {
      event.gesture.srcEvent.stopPropagation();
      cboxSwipeDown();
    }
    return false;
  });
});

$(document).on('cbox_complete', function () {
  $cboxImg = $cboxWrapper.find('.cboxPhoto:first');
  // Remove non necessary events from the image
  $cboxImg.off('click');
  // Determine from which direction we have to swipe in again
  if (lastDirection === "left") {
    cboxClassCleanup('lastDirectionSwipeFromRight');
    $cboxWrapper.addClass(swipeInRightClass);
  } else if (lastDirection === "right") {
    cboxClassCleanup('lastDirectionSwipeFromLeft');
    $cboxWrapper.addClass(swipeInLeftClass);
  }

});
