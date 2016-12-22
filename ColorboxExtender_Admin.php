<?php
/*
######################################################################
PHP class for Typesetter CMS - 'Colorbox Extender' plugin - Admin Page
Author: J. Krausz
Date: 2016-12-22
Version 1.1
######################################################################
*/

defined('is_running') or die('Not an entry point...');

class ColorboxExtender_Admin{

  public static $config;
  public static $components;
  public static $debug = true;

  public static function Settings(){
    global $page, $addonRelativeCode, $langmessage;
    $page->head_js[] =    $addonRelativeCode . "/ColorboxExtender_Admin.js";
    //$page->css_admin[] =  $addonRelativeCode . "/ColorboxExtender_Admin.css";

    if( isset($_POST['save']) ){
      msg(self::SaveConfig()); 
    }
    self::LoadConfig();
    self::GetComponents();
    
    // msg("Config: " . pre(self::$config));
    // msg("Components: " . pre(self::$components));
  
    $admin_url = \gp\tool::GetUrl('Admin_ColorboxExtender');

    echo  '<h2 class="hqmargin">Colorbox Extender &raquo; Settings</h2>';

    echo  '<form id="cbe_config_form" data-values-changed="0" action="' . $admin_url . '" method="post">';
    echo      '<table class="bordered" style="width:100%;">';

    echo        '<tr>';
    echo          '<th style="width:40%;">' . $langmessage['Settings'] . '</th>';
    echo          '<th style="width:60%;">' . $langmessage['Current_Value'] . '</th>';
    echo        '</tr>';

    $checked = self::$config['always_load_cbox'] == '1' ? ' checked="checked" ' : '';
    echo        '<tr>';
    echo          '<td>Load Colorbox</td>';
    echo          '<td>';
    echo            '<label class="all_checkbox">';
    echo              '<input type="checkbox" name="cbe_config[always_load_cbox]" value="1" ' . $checked . '/>';
    echo              '<span>' . $langmessage['All Pages'] . '</span>';
    echo            '</label>';
    echo          '</td>';
    echo        '</tr>';

    $value = self::$config['extension'];
    echo        '<tr>';
    echo          '<td>Extension</td>';
    echo          '<td>';
    echo            '<select class="gpselect" name="cbe_config[extension]">';
    echo              '<option value="none">none</option>';
    foreach( self::$components['extensions'] as $extension ){
      $label =  $extension['label'];
      $dir =    $extension['dir'];
      $selected = $dir == $value ? ' selected="selected" ' : '';
      echo            '<option value="' . $dir . '" ' . $selected . '>' . $label . '</option>';
    }
    echo            '</select>';
    echo          '</td>';
    echo        '</tr>';

    $value = self::$config['style'];
    echo        '<tr>';
    echo          '<td>Style</td>';
    echo          '<td>';
    echo            '<select id="cbe_style_select" class="gpselect" name="cbe_config[style]">';
    echo              '<option value="none">Use System Setting</option>';
    foreach( self::$components['styles'] as $style ){
      $label =  $style['label'];
      $dir =    $style['dir'];
      $selected = $dir == $value ? ' selected="selected" ' : '';
      echo            '<option value="' . $dir . '" ' . $selected . '>' . $label . '</option>';
    }
    echo            '</select> ';
    echo            '<a id="cbe_system_settings_link" style="display:none;" ';
    echo              'href="' . \gp\tool::GetUrl('Admin/Configuration') . '">';
//    echo              $langmessage['Settings'] . '&raquo;';
//    echo              $langmessage['configuration'] . '&raquo;';
//    echo              $langmessage['Interface'] . '&raquo;';
    echo              $langmessage['colorbox_style'] . '</a>';
    echo          '</td>';
    echo        '</tr>';


    echo    '</table>';

    // SAVE / CANCEL
    echo    '<br/>';
    echo    '<input type="submit" id="cbe_config_submit" name="save" value="' . $langmessage['save'] . '" class="gpsubmit" /> ';
    echo    '<input type="button" onClick="location.href=\'' .$admin_url . '\'" value="' . $langmessage['cancel'] . '" class="gpcancel" />';
    echo  '</form>';
  }




  public static function GetComponents(){
    global $page, $addonPathCode;
    $types = array( 
      'styles' => array(),
      'extensions' => array(),
    );
    self::$components = $types;
    foreach( $types as $type => $val ){
      $dirs = \gp\tool\Files::ReadDir($addonPathCode . '/' . $type. '/', 1);
      foreach( $dirs as $component ){
        $component_config_file = $addonPathCode . '/' . $type. '/' . $component . '/config.php';
        if( file_exists($component_config_file) && strpos($type, '!') !== 0 ){
          include $component_config_file;
          if( isset($config) ){
            self::$components[$type][] = array( 
              'label' =>  $config['label'],
              'dir' =>    $component,
            );
          }
          unset($config);
        }elseif( self::$debug ){
          msg("Component config file " . $component_config_file . " was not found.");
        }
      }
    }
  }




  public static function LoadConfig(){
    global $addonPathCode, $addonPathData;
    $config_file = $addonPathData . '/config.php';
    if( file_exists($config_file) ){
      include $config_file;
    }else{
      include $addonPathCode . '/defaults/config.php';
    }
    self::$config = $config;
  }



  public static function SaveConfig(){
    global $addonPathData, $langmessage;
    $config = array (
      'always_load_cbox' => '0',
      'extension' => 'none',
      'style' => 'none',
    );
    foreach ($_POST['cbe_config'] as $key => $value) {
      switch($key){
        case 'always_load_cbox':
          $config['always_load_cbox'] = '1'; 
          break;
        case 'extension':
          $config['extension'] = basename(trim($value)); 
          break;
        case 'style':
          $config['style'] = basename(trim($value)); 
          break;
        default:
      }
    }
    $config_file = $addonPathData . '/config.php';
    if( \gp\tool\Files::SaveData($config_file, 'config', $config) ){
      msg($langmessage['SAVED']);
    }else{
      msg($langmessage['OOPS']);
    }
  }

}
