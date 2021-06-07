/* additional common Colorbox loading bindings  */

window.colorbox_lang_backup = JSON.stringify(colorbox_lang);

$(function(){

  // open any link in Colorbox that has the 'colorbox' class
	$("a.colorbox").on('click', function(e){
		$(this).colorbox( $gp.cboxSettings() );
	});  
  
  //

  // loads any Typesetter page into Colorbox
  $("a.loadPageInColorbox, GPAREA.loadPageInColorbox a").on("click", function(e){
    if( isadmin ){
      var edit_page = confirm("You are logged in.\n\n" 
        + "Click OK, to load the target page for editing.\n" 
        + "Click Cancel, to show the page content in Colorbox.");
      if( edit_page ){
        return true;
      }
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
      height : "90%",
      onClosed : function(){ 
       colorbox_lang = JSON.parse(colorbox_lang_backup);
      }// ,
      // onOpen : function(){ 
        // do sth. 
      // },
      // onComplete : function(){ 
        // do sth. 
      // }
    });
    // console.log(options);
    $.colorbox(options);
  });

});
