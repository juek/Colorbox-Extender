#Colorbox Extender plugin for Typesetter CMS#

##About

Extends Typesetter's Colorbox implementation by additional features.
Current version 1.0 

See also [Typesetter Home](http://www.typesettercms.com), [Typesetter on GitHub](https://github.com/Typesetter/Typesetter)

##Requirements##
* Typesetter CMS 5.0+

##Current extensions##
* Zoom images in Colorbox by implementing [jquery.zoom](http://www.jacklmoore.com/zoom).
* Show any image in Colorbox by using/adding the 'colorbox' class to the anchor.
* Show a Typesetter page in Colorbox by using/adding the 'loadPageInColorbox' class to the anchor.

##Usage##

Zoom: Once the plugin is installed, the zoom feature is enabled by default.

Any image in Colorbox: 
```
&lt;a href="/path/to/image.jpg" class="colorbox" title="Image Caption"&gt;My Image&lt;/a&gt;
```

Page in Colorbox: 
```
&lt;a href="/About" class="loadPageInColorbox"&gt;About&lt;/a&gt;
```

##Manual Installation##
Until the plugin is released on typesettercms.com, you need to download and install it manually:

1. Download the [master ZIP Archive](https://github.com/juek/Colorbox-Extender/archive/master.zip)

2. Upload the extracted folder 'Colorbox-Extender-master' to your server into the /addons directory

3. Install using Typesetter's Admin Toolbox -> Plugins -> Manage -> Available -> Custom Sections

## License
GPL License, same as Typesetter CMS. For bundled thirdparty components see the respective subdirectories.
