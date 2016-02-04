/**
 * jquery.autopagenavi.js v0.0.1
 * Show a page navigation through loading json file which urls are written.
 *
 * This Library depend on Handlbars.js
 * http://handlebarsjs.com/
 *
 * Copyright 2016, Tomoyuki Tsujimoto
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

"use strict";


// テンプレートヘルパー
// 現在ページのアクティブ表示
Handlebars.registerHelper('chkcurrent', function(url) {
    url = Handlebars.escapeExpression(url);
    var str = "";
    if(url == location.pathname){
        str = "active";
    }
    return new Handlebars.SafeString(str);
});