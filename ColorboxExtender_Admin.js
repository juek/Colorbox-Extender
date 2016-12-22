/*
#######################################################################
JS/jQuery for Typesetter CMS - 'Colorbox Extender' plugin - Admin Page
Author: J. Krausz
Date: 2016-12-22
Version 1.1
######################################################################
*/

$(function(){

  $(window).on("beforeunload", function(){
    if( $("#cbe_config_form").attr("data-values-changed") == "1" ){
      return "Warning: There are unsaved changes that will be lost. Proceed anyway?"; // most browsers will show their own msg here
    }
  });

  if( $("#cbe_style_select").val() == "none" ){
    $("#cbe_system_settings_link").show();
  }

  $("#cbe_config_form input, #cbe_config_form select").on("change", function(e){
    $("#cbe_config_form").attr("data-values-changed", "1");
  });

  $("#cbe_style_select").on("change", function(){
    if( $(this).val() == "none" ){
      $("#cbe_system_settings_link").fadeIn();
    }else{
      $("#cbe_system_settings_link").fadeOut();
    }
  });

  $("#cbe_system_settings_link").on("click", function(e){
    if( $("#cbe_config_form").attr("data-values-changed") == "1" ){
      var save = confirm("Settings have been changed. " + gplang.Save + "?");
      if( save ){
        e.preventDefault();
        $("#cbe_config_submit").click();
      }
    }
  });

  $("#cbe_config_form").on("submit", function(e){
    $(this).attr("data-values-changed", "0");
    return true;
  });

});

