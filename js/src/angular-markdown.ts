/// <reference path="../../../minute/_all.d.ts" />

module Directives {
    export class AngularMarkdownService {
        public converter = new window['showdown'].Converter();

        convert = (text: string): string => {
            //var txt = (text || '').replace(/\r?\n/g, '<br/>');
            var html = this.converter.makeHtml(text);

            html = html.replace(/^<p>|<\/p>$/g, '');
            html = html.replace(/<soft-br\s*\/?>/g, ' <br class="hidden-xs hidden-sm" />');
            html = html.replace(/<youtube>(?:.*?v=)?(.*?)<\/youtube>/g, '<div class="thumbnail"><div class="embed-responsive embed-responsive-4by3"><iframe width="560" height="315" src="https://www.youtube.com/embed/$1?rel=0&amp;controls=0&amp;hd=1&amp;showinfo=0" frameborder="0" allowfullscreen></iframe></div></div>');

            return html;
        };
    }

    export function markDownFilter($sce, $markdown) {
        return function (text) {
            return $sce.trustAsHtml($markdown.convert(text || ''));
        };
    }

    angular.module('AngularMarkdown', [])
        .service("$markdown", AngularMarkdownService)
        .filter('markdown', ['$sce', '$markdown', markDownFilter]);
}