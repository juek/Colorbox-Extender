<?php
/*
#########################################################
PHP class for Typesetter CMS - 'Colorbox Extender' plugin
Author: J. Krausz
Date: 2016-12-22
Version 1.1
#########################################################
*/

defined('is_running') or die('Not an entry point...');

class ColorboxExtender{

  public static $config;
  public static $debug = true; // report missing files/misconfigurations

  public static function GetHead(){
    global $page, $addonRelativeCode;
    self::LoadPluginConfig();

    if( self::$config['always_load_cbox'] == "1" ){
      \gp\tool::AddColorBox();
      $page->head_js[] =  $addonRelativeCode . '/common/inits.js';
    }

    if( self::$config['extension'] != "none" ){
      self::UseComponent('extension', self::$config['extension']);
    }

    if( self::$config['style'] != "none" ){
      self::UseComponent('style', self::$config['style']);
    }

  }



  public static function UseComponent($type, $dir){
    global $page, $addonPathCode, $addonRelativeCode;
    $component_path = $addonPathCode . '/' . $type . 's/' . $dir;
    $component_base = $addonRelativeCode . '/' . $type . 's/' . $dir;
    $config_file = $component_path . '/config.php';

    if( !file_exists($config_file) ){
      if( \gp\tool::LoggedIn() ){
        msg('Colorbox Extender: Error loading the configured ' . $type . ' &quot;' . $dir . '&quot;.');
      }
      return false;
    }
    include $config_file;

    $css_files = !empty($config['stylesheets']) ? $config['stylesheets'] : false;
    if( $css_files ){
      if( is_array($css_files) ){
        foreach($css_files as $css_file){
          if( self::$debug && \gp\tool::LoggedIn() ){ self::CheckFile($component_path . '/' . $css_file); }
          $page->css_user[] = $component_base . '/' . $css_file;
        }
      }else{
        if( self::$debug && \gp\tool::LoggedIn() ){ self::CheckFile($component_path . '/' . $css_files); }
        $page->css_user[] = $component_base . '/' . $css_files;
      }
    }

    $js_files = !empty($config['scripts']) ? $config['scripts'] : false;
    if( $js_files ){
      if( is_array($js_files) ){
        foreach($js_files as $js_file){
          if( self::$debug && \gp\tool::LoggedIn() ){ self::CheckFile($component_path . '/' . $js_file); }
          $page->head_js[] = $component_base . '/' . $js_file;
        }
      }else{
        $page->head_js[] = $component_base . '/' . $js_files;
        if( self::$debug && \gp\tool::LoggedIn() ){ self::CheckFile($component_path . '/' . $js_files); }
      }
    }
  }




  public static function CheckFile($file){
    if( file_exists($file) ){
      return true;
    }
    msg('Colorbox Extender: The file &quot;' . $file . '&quot; does not exist.');
  }




  public static function LoadPluginConfig(){
    global $addonPathCode, $addonPathData;
    $config_file = $addonPathData . '/config.php';
    if( file_exists($config_file) ){
      include $config_file ;
    }else{
      include $addonPathCode . '/defaults/config.php';
    }
    self::$config = $config;
  }


} /* class ColorboxExtender --end */
