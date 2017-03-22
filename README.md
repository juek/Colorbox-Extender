# Colorbox Extender plugin for Typesetter CMS #

## About

Extends Typesetter's Colorbox implementation by additional features.
Current version 1.1 

See also [Typesetter Home](http://www.typesettercms.com), [Typesetter on GitHub](https://github.com/Typesetter/Typesetter)

## Requirements ##
* Typesetter CMS 5.0+

## Current extensions and Styles ##
* Zoom images in Colorbox by implementing [jquery.zoom](http://www.jacklmoore.com/zoom).
* Pinch zoom and swipe images in Colorbox by implementing [hammer.js](http://hammerjs.github.io).
* 2 additional styles 'Simple Box 1' and 'MediaWiki Style'.
* Show any image in Colorbox by using/adding the 'colorbox' class to the anchor.
* Show a Typesetter page in Colorbox by using/adding the 'loadPageInColorbox' class to the anchor.

## Usage ##

**Extensions and styles:** Once the plugin is installed, the jquery.zoom feature and the 'Simple Box 1' style are enabled by default. Can be changed on the Admin page 'Plugins &rarr; Colorbox Extender &rarr; Settings'.

**Any image in Colorbox** (requires setting 'Load Colorbox &rarr; All Pages')
```
<a href="/path/to/image.jpg" class="colorbox" title="Image Caption">
  <img src="/path/to/thumbnail.jpg" alt="My Image" />
</a>
```

**Page in Colorbox** (requires setting 'Load Colorbox &rarr; All Pages')
```
<a href="/About" class="loadPageInColorbox">About</a>
```

## Admin Page ##
Ver 1.1 comes with an Admin page to set your preferences.


## For Developers ##
Add your custom styles or extensions to the respective subfolders. Defined styles/extensions (see existing ones) will be auto-loaded to be selected on the Admin page. [/defaults/config.php](https://github.com/juek/Colorbox-Extender/blob/master/defaults/config.php) contains the plugin default config which will be used as long as the Admin page Settings are not saved once.


## Manual Installation ##
Until the plugin is released on typesettercms.com, you need to download and install it manually:

1. Download the [master ZIP Archive](https://github.com/juek/Colorbox-Extender/archive/master.zip)

2. Upload the extracted folder 'Colorbox-Extender-master' to your server into the /addons directory

3. Install using Typesetter's Admin Toolbox -> Plugins -> Manage -> Available -> Colorbox Extender

## License
GPL License, same as Typesetter CMS. For bundled thirdparty components see the respective subdirectories.
