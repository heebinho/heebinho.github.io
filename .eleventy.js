const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require('@11ty/eleventy-plugin-rss');
const tocPlugin = require("eleventy-plugin-toc");
const anchor = require("markdown-it-anchor");
var hljs = require('highlight.js'); // https://highlightjs.org

const markdownit = require('markdown-it')({
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
})
.use(anchor);






module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(tocPlugin, { tags: ["h2", "h3"] });
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "/img" });
  eleventyConfig.addPassthroughCopy('CNAME');
  eleventyConfig.addPassthroughCopy('.well-known');

  eleventyConfig.setLibrary("md", markdownit);

  const {
    DateTime
  } = require("luxon");

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('yyyy-MM-dd');
    });

    eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat("d MMM yyyy");
    });

    eleventyConfig.addGlobalData("year", () => {
      return new Date().getFullYear();
    });


    eleventyConfig.addFilter('excerpt', (post) => {
      const content = post.replace(/(<([^>]+)>)/gi, '');
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


  return {
    dir: { input: 'src', output: '_site' }
  };
};
