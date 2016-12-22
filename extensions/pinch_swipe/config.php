<?php
// Extension definition

defined('is_running') or die('Not an entry point...');

$config = array (

  'label' =>        'Hammer.js Pinchzoom & Swipe',
  'scripts' =>      array( 
                      'hammer.js/hammer.min.js',
                      'jquery.hammer.js/jquery.hammer.min.js',
                      'init.js',
                    ),
  'stylesheets' =>  array(
                      'animate.css/animate.min.css',
  ), // e.g. 'style.css'

);
