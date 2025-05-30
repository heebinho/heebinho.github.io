import { DateTime } from "luxon";

import navigationPlugin from "@11ty/eleventy-navigation";
import pluginRss from "@11ty/eleventy-plugin-rss";
import tocPlugin from "eleventy-plugin-toc";

import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

import hljs from "highlight.js";

import svgSprite from "eleventy-plugin-svg-sprite";
import mime from 'mime/lite';
import * as fs from 'node:fs';
import { isNull } from "node:util";


//callback function
export default function(eleventyConfig) {
  
  eleventyConfig.addPlugin(navigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(tocPlugin, { tags: ["h2", "h3"] });
  //render collection  -> {% svgsprite %}
  //render svg         -> {% svg "github", "custom-class" %}
  eleventyConfig.addPlugin(svgSprite, {
    path: "./src/assets/svg",
  });

  eleventyConfig.addPassthroughCopy({ "src/assets/img": "/img" });
  eleventyConfig.addPassthroughCopy("src/assets/favicon");
  eleventyConfig.addPassthroughCopy("src/assets/css/*");
  eleventyConfig.addPassthroughCopy("src/assets/highlight");
  eleventyConfig.addPassthroughCopy("src/assets/fontawesome");
  eleventyConfig.addPassthroughCopy('CNAME');
  eleventyConfig.addPassthroughCopy('.well-known');




  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />).
                                // This is only for full CommonMark compatibility.
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
                                // useful for external highlighters.
    linkify:      false,        // Autoconvert URL-like text to links
  
    // Enable some language-neutral replacement + quotes beautification
    // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
    typographer:  false,
  
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',
  
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }
  
      return ''; // use external default escaping
    }
  }).use(markdownItAnchor, {
    // permalink: markdownItAnchor.permalink.headerLink(),
    // level: [1, 2, 3, 4],
    // slugify: eleventyConfig.getFilter("slugify")
  });

  eleventyConfig.setLibrary("md", markdownLibrary);



  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('yyyy-MM-dd');
    });

    eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat("d MMMM yyyy");
    });

    eleventyConfig.addGlobalData("year", (dateObj) => {
      if(dateObj === null || dateObj === undefined){
        return new Date().getFullYear();
      }else{
        return dateObj.toFormat('yyyy');
      }
      
    });

    eleventyConfig.addFilter('excerpt', (post) => {
      let content = post.replace(/(<([^>]+)>)/gi, '');
      content = post.replace('Intro', '');
      return content.substr(0, content.lastIndexOf(' ', 200)) + '...';
    });

    eleventyConfig.addCollection('tagList', function (collection) {
      let tagSet = new Set();
      collection.getAll().forEach(function (item) {
        if ('tags' in item.data) {
          let tags = item.data.tags;
  
          tags = tags.filter(function (item) {
            switch (item) {
              case 'all':
              case 'nav':
              case 'post':
              case 'posts':
                return false;
            }
  
            return true;
          });
  
          for (const tag of tags) {
            tagSet.add(tag);
          }
        }
      });
  
      return [...tagSet];
    });

    eleventyConfig.addFilter('base64', (file) => {
      const filepath = `src/${file}`;
      const mimeType = mime.getType(file);
      const buffer = Buffer.from(fs.readFileSync(filepath));
      return `data:${mimeType};base64,${buffer.toString('base64')}`;
    });
    
    

  return {
    dir: { input: 'src', output: '_site' }
  }
};
