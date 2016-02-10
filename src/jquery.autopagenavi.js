/**
 * jquery.autopagenavi.js v0.0.1
 * Show a page navigation through loading json file which urls are written.
 * https://github.com/tomothumb/jquery.autopagenavi
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

/**
 * TODO : This library should be change working without jQuery!!!
 */
var JqueryAutopagenavi;
(function($) {
    JqueryAutopagenavi = function(opt){

        var self = this;

        /**
         * Selector of template
         * Viewのセレクタ
         * @type {string}
         */
        self.tpl    = "#VIEW-TEMPLATE";

        /**
         * Selector of target to output
         * 出力先のセレクタ
         * @type {string}
         */
        self.target = "#OUTPUT-OUTER";

        /**
         * Depanding on Handlbars.js
         * Todo: テンプレートエンジンの変更
         */
        //self.tplengine = Handlebars;

        /**
         * JSON Data
         * @type {Array}
         */
        self.data = [];

        /**
         * Dataset of current page in Json Data
         */
        self.current_dataset;

        /**
         * Finalized data for output
         * @type {Array}
         */
        self.outputitems = new Array();


         //self.pattern = new RegExp('.*\/(.*\.html)$','i');
         //self.filename = location.pathname.replace(self.pattern, "$1");

        /**
         * Constructor
         * @param opt
         * @returns {JqueryAutopagenavi}
         */
        self.init = function(opt){
            $.extend(self, opt);
            return self;
        };

        /**
         * Set JSON data
         * ページデータセット
         * @param data
         * @returns {JqueryAutopagenavi}
         */
        self.set = function(data){
            self.data = data;
            return self;
        };


        /**
         * Search current page dataset from JSON data.
         * 現在表示中のページリストを探す
         */
        self.searchDataset = function(){
            //LOOP_DATASEARCH:
            self.data.forEach(function (value, key, array) {
                if(value === location.pathname){
                    self.current_dataset = {
                        num : key,
                        url : value
                    };
                }
            });
        };

        /**
         * Parse
         * 出力用にリストをパース
         */
        self.parse = function(){
            self.outputitems.current = self.data[self.current_dataset.num];
            if(self.current_dataset.num <= 0){
                self.outputitems.prev = self.data[self.data.length-1];
            }else{
                self.outputitems.prev = self.data[self.current_dataset.num - 1];
            }
            if(self.current_dataset.num >= self.data.length-1){
                self.outputitems.next = self.data[0];
            }else{
                self.outputitems.next = self.data[self.current_dataset.num + 1];
            }
        };

        /**
         * Output
         * 出力（テンプレートエンジン:Handlebars）
         */
        self.output = function(){
            var source   = $(self.tpl).html();
            var template = Handlebars.compile(source, {noEscape: true});
            var context = { "item" : self.outputitems};
            var html    = template(context);
            $(self.target).append(html);
        };

        /**
         * Execute this library
         * 実行
         * @returns {JqueryAutopagenavi}
         */
        self.run = function(){
            self.searchDataset();
            self.parse();
            self.output();
            return self;
        };

        self.init(opt);
    };

})(jQuery);
