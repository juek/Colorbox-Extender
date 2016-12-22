//* uses the event hook cbox_complete, see http://www.jacklmoore.com/colorbox
$(document).on("cbox_complete", function(){
  $("img.cboxPhoto").parent().zoom({ 
    on : "grab", 
    callback : function(){
      var zoomImg = $(this);
      var cboxPhoto = $(this).closest("#cboxLoadedContent").find(".cboxPhoto");
      console.log("zoomImg.width() = " + zoomImg.width() + " | cboxPhoto.width() = " + cboxPhoto.width() );
      if( zoomImg.width() != cboxPhoto.width() ){
        // zoomImg.css({ cursor : "all-scroll" });
        zoomImg.addClass("zoomEnabled");
      }
    }
  });
});
//*/

