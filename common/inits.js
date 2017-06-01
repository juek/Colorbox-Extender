/* additional common Colorbox loading bindings  */

$(document).ready( function(){

  //* open any link in Colorbox that has the 'colorbox' class
  $("a.colorbox").colorbox( $gp.cboxSettings() );
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
    // console.log(options);
    $.colorbox(options);
  });
  //*/

}); /* domready --end */




