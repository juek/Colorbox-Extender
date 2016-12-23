$(document).on("cbox_complete", function(){

  var fullscreen_support = document.body.mozRequestFullScreen || document.body.webkitRequestFullScreen || document.body.msRequestFullscreen || document.body.requestFullScreen ;
  if( fullscreen_support && !$("#cboxFullscreen").length ){
    $('<button id="cboxFullscreen" title="fullscreen">Full Screen</button>')
      .on("click", function(evt){
        cboxSetFullscreen(evt,'toggle');
      })
      .appendTo("#cboxContent");

    $("#cboxClose").on("click", function(evt){
      cboxSetFullscreen(evt,'exit');
    })

    $(document).on("webkitfullscreenchange mozfullscreenchange MSFullscreenChange fullscreenchange", function(e){
      if( !document.fullScreen && !document.mozFullScreen && !document.webkitIsFullScreen && !document.msFullScreen ){
        $("#cboxContent")
          .removeClass("cboxIsFullscreen")
          .find("button#cboxFullscreen")
            .attr("title", "fullscreen");
      }
    });
  }

});

function cboxSetFullscreen(evt, action){
  evt.stopPropagation();
  var cbc = $("#cboxContent");
  if( cbc.hasClass("cboxIsFullscreen") || action == 'exit' ){
    cbc.removeClass("cboxIsFullscreen");
    $(this).attr("title" , "full screen");
    if (document.exitFullscreen) { document.exitFullscreen(); } else 
    if (document.msExitFullscreen) { document.msExitFullscreen(); } else 
    if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); } else 
    if (document.webkitCancelFullScreen) { document.webkitCancelFullScreen(); }
  }else{
    cbc.addClass("cboxIsFullscreen");
    $(this).attr("title" , "exit full screen");
    if (cbc[0].requestFullscreen) { cbc[0].requestFullscreen(); } else 
    if (cbc[0].msRequestFullscreen) { cbc[0].msRequestFullscreen(); } else 
    if (cbc[0].mozRequestFullScreen) { cbc[0].mozRequestFullScreen(); } else 
    if (cbc[0].webkitRequestFullscreen) { cbc[0].webkitRequestFullscreen(); }
  }
  return false;
}