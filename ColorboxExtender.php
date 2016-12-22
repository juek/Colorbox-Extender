<?php
/*
#########################################################
PHP class for Typesetter CMS - 'Colorbox Extender' plugin
Author: J. Krausz
Date: 2016-12-22
Version 1.0
#########################################################
*/

defined('is_running') or die('Not an entry point...');

class ColorboxExtender{

  public static function GetHead(){
    global $page, $addonRelativeCode;
    $page->css_user[] = $addonRelativeCode . '/ColorboxExtender.css';
    $page->head_js[] =  $addonRelativeCode . '/thirdparty/jquery.zoom/jquery.zoom.min.js';
    $page->head_js[] =  $addonRelativeCode . '/ColorboxExtender.js';
  }

}
