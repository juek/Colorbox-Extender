/*
#########################################################
jQuery init for Typesetter CMS 'Colorbox Extender' plugin
Author: J. Krausz
Date: 2016-12-22
Version 1.0
#########################################################
*/

//* uses the event hook cbox_complete, see http://www.jacklmoore.com/colorbox
$(document).on("cbox_complete", function(){
  $("img.cboxPhoto").parent().zoom({ on : "grab" });
});
//*/


$(document).ready( function(){

  //* open any link in Colorbox that has the 'colorbox' class
  $(".colorbox").colorbox( $gp.cboxSettings() );
  //*/

  //* loads any Typesetter page into Colorbox
  $(".loadPageInColorbox").on("click", function(e){
    if( isadmin ){
      var edit_page = confirm("You are logged in.\n\n" 
        + "Click OK, to load the target page for editing.\n" 
        + "Click Cancel, to show the page content in Colorbox.");
      if( edit_page ){ return true; }
    }
    e.preventDefault();
    var src = jPrep(this.href, 'gpreq=body');
    var options = $gp.cboxSettings();
    $.extend(true, options, { 
      href : src, 
      open : true , 
      iframe : true, 
      fastIframe : false,
      width : "90%",
      height : "90%" // ,
      // onOpen : function() { 
        // do sth. 
      // },
      // onComplete : function(){ 
        // do sth. 
      // }
    });
    console.log(options);
    $.colorbox(options);
  });
  //*/

}); /* domready --end */




