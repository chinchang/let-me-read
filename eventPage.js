/**
 * 'Let Me Read' chrome extension
 *
 * Credits:
 * Icon by: http://www.danilodemarco.com/
 * 
 */
;(function () {
	var exports = {},
		_styles = {};

	_styles = {
		"smashingmagazine": [
			"#wpsidebar { display: none !important; }",
			".fluid { margin-right: 2em !important; }",
			".col.sidebar { display: none !important; }",
			".col.main { width: 88% !important; }",
			"nav.toplevel { display: none !important; }"
		],

		"facebook": [
			"#pagelet_sidebar { display: none !important; }",
			"#leftCol { display: none !important; }",
			"#rightCol { display: none !important; }",
			"#contentCol { margin-left: 0 !important; }",
			"#globalContainer { padding-right: 0 !important; }",
			"#contentArea { width: 911px !important; }",
			".shareRedesign { width: 750px !important; }",
			".UFIContainer { width: 750px !important; }"
		],

		"css-tricks": [
			"aside.grid-1-3 { display: none !important; }",
			".blog-posts { width: 100% !important; }",
			".main-nav { display: none !important; }",
			"#top { display: none !important; }",
			".page-wrap { margin-top: 0 !important; }"
		],

		"netmagazine": [
			"#site-top { display: none !important; }",
			"#creativeBanner { display: none !important; margin-top: -53px !important; }",
			"#content { width: 945px !important; }"
		],

		"tutsplus": [
			"#header_wrap { display: none !important; }",
			"#sidebar { display: none !important; }",
			".page_wrap { float: none !important; margin: 0 auto !important; }"
		],

		"webdesignerdepot": [
			"#header-wrap { display: none !important; }",
			"#sidebar { display: none !important; }",
			".entry-content p { max-width: 750px !important; }",
			"#content { margin: 0 auto !important; }"
		],

		"noupe": [
			"#header { display: none !important; }",
			"#sidebar { display: none !important; }",
			".categories-box { display: none !important; }",
			".main-t-add { background: #EEE !important; }",
			".main-c { background: #EEE !important; }",
			"#content { width: 800px !important; }",
			"*[class*=decor] { display: none !important; }"
		]
	};

	function _getStyles (url) {
		var a = document.createElement('a');
		a.href = url;
		for (var i in _styles) {
			if (a.hostname.indexOf(i) !== -1) {
				return _styles[i].join(' ');
			}
		}
		return "";
	}

	exports.focus = function (tab) {
		var styles = _getStyles(tab.url);

		if (styles) {
			chrome.tabs.insertCSS(tab.id, {
				code: _getStyles(tab.url)
			}, function () {
				console.log('css injected');
			});

			chrome.browserAction.setBadgeText({
				text: 'done',
				tabId: tab.id
			});

			chrome.browserAction.setBadgeBackgroundColor({
				color: '#67AA54',
				tabId: tab.id
			});
		}
	};

	chrome.browserAction.onClicked.addListener(function(tab) {
		exports.focus(tab);
	});
})();