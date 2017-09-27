// ==UserScript==
// @name        知乎专栏静态化
// @namespace   https://rss.lilydjwg.me/
// @description 导出知乎专栏内容到RSS或静态化文章
// @include     http*://zhuanlan.zhihu.com/*
// @version     1
// @grant       none
// @run-at document-end
// ==/UserScript==

(function () {
  var reMainPage = /^https?:\/\/zhuanlan\.zhihu\.com\/[a-zA-Z0-9\-\_]+$/;
  var reSingle = /^https?:\/\/zhuanlan\.zhihu\.com\/p\/[0-9]{4,}$/;
  var staticArticle = function() {
    var articlePos = window.location.href.search(/[0-9]{4,}/);
    var articleNo = window.location.href.slice(articlePos);
    var staticUrl = "https://rss.lilydjwg.me/static_zhihu/" + articleNo;
    window.open(staticUrl);
  };
  var getRSS = function () {
    var currentLink = window.location.href;
    var id = currentLink.replace( /^https?:\/\/zhuanlan\.zhihu\.com\// , "");
    var rssLink = "https://rss.lilydjwg.me/zhihuzhuanlan/" + id;
    window.open(rssLink);
  };

  var rssLogo = document.createElement('div');
  var rssImg = new Image();
  rssImg.src = 'http://win-bin-mirror.qiniudn.com/icon-social-rss.svg';
  rssImg.height = '58';
  rssImg.width = '58';
  rssImg.onclick = function() {
    var currentLink = window.location.href;
    //var result = reSingle.match(currentLink);
    var result = currentLink.search(reSingle);
    if (result == 0) {
      staticArticle();
      return;
    }
    result = currentLink.search(reMainPage);
    if (result == 0) {
      getRSS();
      return;
    };
    alert("not found!");
    
  };
  rssLogo.appendChild(rssImg);
  rssLogo.style.left = '58px';
  rssLogo.style.top = '0';
  rssLogo.style.width = '58px'
  rssLogo.style.position = 'absolute';
  rssLogo.style.zIndex = '42';
  document.body.appendChild(rssLogo);
}) ();
