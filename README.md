This library let you make page navigation easier in static website.
You only need to prepare json file which the pages written in. 

JSON形式で用意したページリストを読み込み、自動でページナビゲーションを出力します。


## Dependency
* jQuery
* Handlbars.js [http://handlebarsjs.com/]

and need some Ajax library.

このLibraryはjQueryとHandlbars.jsに依存しています。

## Option
| Option | Description |
| --- | --- |
| tpl | Selector of Handlebars.js view Template |
| target | Selector of container which a pagenavigation will append to |
------------------

## Example : Simple
最小のサンプル。

page2.html
```
Set an Output container.
<div id="pagenavigation">
  <!-- Output here! -->
</div>

Set a View
<script id="pagenavigation-template" type="text/x-handlebars-template">
  <ul>
    <li class="prev"><a href="{{item.prev}}">Previous Page</a></li>
    <li class="next"><a href="{{item.next}}">Next Page</a></li>
  </ul>
</script>

Set a Script
<script>
var urls = ['page1.html','page2.html','page3.html','page4.html'];
var navi = new JqueryAutopagenavi({
    tpl    : "#pagenavigation-template", // Selector of Handlebars view Template 
    target : "#pagenavigation" // Selector of container which a pagenavigation will append to.
});
navi.set(urls).run();
</script>
```

------------------

## Example : Ajax

Ajaxを利用したサンプル。

Prepare pages.json
```
[
  "/page/1.html",
  "/page/2.html",
  "/page/3.html",
  "/page/4.html",
  "/page/5.html",
  "/page/6.html",
  "/page/7.html"
]
```

/page/2.html
```
Set an Output container.
<div id="pagenavigation">
  <!-- Output here! -->
</div>

Set a View
<script id="pagenavigation-template" type="text/x-handlebars-template">
  <ul>
    <li class="prev"><a href="{{item.prev}}">Previous Page</a></li>
    <li class="next"><a href="{{item.next}}">Next Page</a></li>
  </ul>
</script>

Set a Script
<script>
(function($) {

    /**
     * In this sample, I'm using my ajax helper library for loading JSON file.
     * このサンプルでは、JSONを読み込むためのAjaxライブラリに下記のヘルパーを利用しています。
     * @link https://github.com/tomothumb/ajaxBuilder
     */
    var ab = new AJAX_BUILDER();

    ab.setDomain(location.hostname+":"+location.port);
    ab.setEndpoint("./pages.json");
    ab.setCallback(function(){
      $(window).trigger("LOADED");
    });
    ab.get();

    $(window).on("LOADED",function(e){
      var urls = ab.getResponse();
      //console.log(urls);
      var navi = new JqueryAutopagenavi({
        tpl    : "#pagenavigation-template",
        target : "#pagenavigation"
      });
      navi.set(urls).run();
    });

})(jQuery);
</script>
```
