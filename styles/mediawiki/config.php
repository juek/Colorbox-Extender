<?php
// Style definition

defined('is_running') or die('Not an entry point...');

$config = array (

  'label' =>        'MediaWiki Style',
  'scripts' =>      array('fullscreen.js'),
  'stylesheets' =>  array('style.css'), 

);

\gp\tool::LoadComponents('fontawesome');