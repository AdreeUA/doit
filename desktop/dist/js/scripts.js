/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-flexbox-objectfit-setclasses !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,s,i,a;for(var f in C)if(C.hasOwnProperty(f)){if(e=[],n=C[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),g.push((o?"":"no-")+a.join("-"))}}function s(e){var n=_.className,t=Modernizr._config.classPrefix||"";if(w&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),w?_.className.baseVal=n:_.className=n)}function i(e,n){return!!~(""+e).indexOf(n)}function a(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):w?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function f(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function l(e,n){return function(){return e.apply(n,arguments)}}function u(e,n,t){var o;for(var s in e)if(e[s]in n)return t===!1?e[s]:(o=n[e[s]],r(o,"function")?l(o,t||n):o);return!1}function p(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function d(){var e=n.body;return e||(e=a(w?"svg":"body"),e.fake=!0),e}function c(e,t,r,o){var s,i,f,l,u="modernizr",p=a("div"),c=d();if(parseInt(r,10))for(;r--;)f=a("div"),f.id=o?o[r]:u+(r+1),p.appendChild(f);return s=a("style"),s.type="text/css",s.id="s"+u,(c.fake?c:p).appendChild(s),c.appendChild(p),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(n.createTextNode(e)),p.id=u,c.fake&&(c.style.background="",c.style.overflow="hidden",l=_.style.overflow,_.style.overflow="hidden",_.appendChild(c)),i=t(p,e),c.fake?(c.parentNode.removeChild(c),_.style.overflow=l,_.offsetHeight):p.parentNode.removeChild(p),!!i}function m(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(p(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];o--;)s.push("("+p(n[o])+":"+r+")");return s=s.join(" or "),c("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function v(e,n,o,s){function l(){p&&(delete P.style,delete P.modElem)}if(s=r(s,"undefined")?!1:s,!r(o,"undefined")){var u=m(e,o);if(!r(u,"undefined"))return u}for(var p,d,c,v,h,y=["modernizr","tspan","samp"];!P.style&&y.length;)p=!0,P.modElem=a(y.shift()),P.style=P.modElem.style;for(c=e.length,d=0;c>d;d++)if(v=e[d],h=P.style[v],i(v,"-")&&(v=f(v)),P.style[v]!==t){if(s||r(o,"undefined"))return l(),"pfx"==n?v:!0;try{P.style[v]=o}catch(g){}if(P.style[v]!=h)return l(),"pfx"==n?v:!0}return l(),!1}function h(e,n,t,o,s){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+b.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?v(a,n,o,s):(a=(e+" "+E.join(i+" ")+i).split(" "),u(a,n,t))}function y(e,n,r){return h(e,t,t,n,r)}var g=[],C=[],x={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){C.push({name:e,fn:n,options:t})},addAsyncTest:function(e){C.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=x,Modernizr=new Modernizr;var _=n.documentElement,w="svg"===_.nodeName.toLowerCase(),S="Moz O ms Webkit",b=x._config.usePrefixes?S.split(" "):[];x._cssomPrefixes=b;var E=x._config.usePrefixes?S.toLowerCase().split(" "):[];x._domPrefixes=E;var j={elem:a("modernizr")};Modernizr._q.push(function(){delete j.elem});var P={style:j.elem.style};Modernizr._q.unshift(function(){delete P.style}),x.testAllProps=h,x.testAllProps=y,Modernizr.addTest("flexbox",y("flexBasis","1px",!0));var z=function(n){var r,o=prefixes.length,s=e.CSSRule;if("undefined"==typeof s)return t;if(!n)return!1;if(n=n.replace(/^@/,""),r=n.replace(/-/g,"_").toUpperCase()+"_RULE",r in s)return"@"+n;for(var i=0;o>i;i++){var a=prefixes[i],f=a.toUpperCase()+"_"+r;if(f in s)return"@-"+a.toLowerCase()+"-"+n}return!1};x.atRule=z;var N=x.prefixed=function(e,n,t){return 0===e.indexOf("@")?z(e):(-1!=e.indexOf("-")&&(e=f(e)),n?h(e,n,t):h(e,"pfx"))};Modernizr.addTest("objectfit",!!N("objectFit"),{aliases:["object-fit"]}),o(),s(g),delete x.addTest,delete x.addAsyncTest;for(var T=0;T<Modernizr._q.length;T++)Modernizr._q[T]();e.Modernizr=Modernizr}(window,document);

/**
 * @package   PickMeUp - jQuery datepicker plugin
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @author    Stefan Petre <www.eyecon.ro>
 * @copyright Copyright (c) 2013-2016, Nazar Mokrynskyi
 * @copyright Copyright (c) 2008-2009, Stefan Petre
 * @license   MIT License, see license.txt
 */

(function (d) {
	function getMaxDays () {
		var tmpDate	= new Date(this.toString()),
			d		= 28,
			m		= tmpDate.getMonth();
		while (tmpDate.getMonth() == m) {
			++d;
			tmpDate.setDate(d);
		}
		return d - 1;
	}
	d.addDays		= function (n) {
		this.setDate(this.getDate() + n);
	};
	d.addMonths	= function (n) {
		var day	= this.getDate();
		this.setDate(1);
		this.setMonth(this.getMonth() + n);
		this.setDate(Math.min(day, getMaxDays.apply(this)));
	};
	d.addYears		= function (n) {
		var day	= this.getDate();
		this.setDate(1);
		this.setFullYear(this.getFullYear() + n);
		this.setDate(Math.min(day, getMaxDays.apply(this)));
	};
	d.getDayOfYear	= function() {
		var now		= new Date(this.getFullYear(), this.getMonth(), this.getDate(), 0, 0, 0);
		var then	= new Date(this.getFullYear(), 0, 0, 0, 0, 0);
		var time	= now - then;
		return Math.floor(time / 24*60*60*1000);
	};
})(Date.prototype);

(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	var instances_count	= 0;
	$.pickmeup = $.extend($.pickmeup || {}, {
		date			: new Date,
		default_date	: new Date,
		flat			: false,
		first_day		: 1,
		prev			: '&#9664;',
		next			: '&#9654;',
		mode			: 'single',
		select_year		: true,
		select_month	: true,
		select_day		: true,
		view			: 'days',
		calendars		: 1,
		format			: 'd-m-Y',
		title_format    : 'B, Y',
		position		: 'bottom',
		trigger_event	: 'click touchstart',
		class_name		: '',
		separator		: ' - ',
		hide_on_select	: false,
		min				: null,
		max				: null,
		render			: function () {},
		change			: function () {return true;},
		before_show		: function () {return true;},
		show			: function () {return true;},
		hide			: function () {return true;},
		fill			: function () {return true;},
		locale			: {
			days		: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			daysShort	: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			daysMin		: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
			months		: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			monthsShort	: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		}
	});
	var	views	= {
			years	: 'pmu-view-years',
			months	: 'pmu-view-months',
			days	: 'pmu-view-days'
		},
		tpl		= {
			wrapper	: '<div class="pickmeup" />',
			head	: function (d) {
				var result	= '';
				for (var i = 0; i < 7; ++i) {
					result	+= '<div>' + d.day[i] + '</div>'
				}
				return '<div class="pmu-instance">' +
					'<nav>' +
						'<div class="pmu-prev pmu-button">' + d.prev + '</div>' +
						'<div class="pmu-month pmu-button" />' +
						'<div class="pmu-next pmu-button">' + d.next + '</div>' +
					'</nav>' +
					'<nav class="pmu-day-of-week">' + result + '</nav>' +
				'</div>';
			},
			body	: function (elements, container_class_name) {
				var result	= '';
				for (var i = 0; i < elements.length; ++i) {
					result	+= '<div class="' + elements[i].class_name + ' pmu-button">' + elements[i].text + '</div>'
				}
				return '<div class="' + container_class_name + '">' + result + '</div>';
			}
		};
	function namespaced_events (events, namespace) {
		events	= events.split(' ');
		for (var i = 0; i < events.length; ++i) {
			events[i]	+= namespace;
		}
		return events.join(' ');
	}
	function fill () {
		var options			= $(this).data('pickmeup-options'),
			pickmeup		= this.pickmeup,
			current_cal		= Math.floor(options.calendars / 2),
			actual_date		= options.date,
			current_date	= options.current,
			min_date		= options.min ? new Date(options.min) : null,
			max_date		= options.max ? new Date(options.max) : null,
			local_date,
			header,
			html,
			instance,
			today		= (new Date).setHours(0,0,0,0).valueOf(),
			shown_date_from,
			shown_date_to,
			tmp_date;
		if (min_date) {
			min_date.setDate(1);
			min_date.addMonths(1);
			min_date.addDays(-1);
		}
		if (max_date) {
			max_date.setDate(1);
			max_date.addMonths(1);
			max_date.addDays(-1);
		}
		/**
		 * Remove old content except header navigation
		 */
		pickmeup.find('.pmu-instance > :not(nav)').remove();
		/**
		 * If several calendars should be shown
		 */
		for (var i = 0; i < options.calendars; i++) {
			local_date		= new Date(current_date);
			instance	= pickmeup.find('.pmu-instance').eq(i);
			if (pickmeup.hasClass('pmu-view-years')) {
				local_date.addYears((i - current_cal) * 12);
				header = (local_date.getFullYear() - 6) + ' - ' + (local_date.getFullYear()+5);
			} else if (pickmeup.hasClass('pmu-view-months')) {
				local_date.addYears(i - current_cal);
				header = local_date.getFullYear();
			} else if (pickmeup.hasClass('pmu-view-days')) {
				local_date.addMonths(i - current_cal);
				header = formatDate(local_date, options.title_format, options.locale);
			}
			if (!shown_date_to) {
				if (max_date) {
					// If all dates in this month (months in year or years in years block) are after max option - set next month as current
					// in order not to show calendar with all disabled dates
					tmp_date	= new Date(local_date);
					if (options.select_day) {
						tmp_date.addMonths(options.calendars - 1);
					} else if (options.select_month) {
						tmp_date.addYears(options.calendars - 1);
					} else {
						tmp_date.addYears((options.calendars - 1) * 12);
					}
					if (tmp_date > max_date) {
						--i;
						current_date.addMonths(-1);
						shown_date_to	= undefined;
						continue;
					}
				}
			}
			shown_date_to	= new Date(local_date);
			if (!shown_date_from) {
				shown_date_from = new Date(local_date);
				// If all dates in this month are before min option - set next month as current in order not to show calendar with all disabled dates
				shown_date_from.setDate(1);
				shown_date_from.addMonths(1);
				shown_date_from.addDays(-1);
				if (min_date && min_date > shown_date_from) {
					--i;
					current_date.addMonths(1);
					shown_date_from	= undefined;
					continue;
				}
			}
			instance
				.find('.pmu-month')
				.text(header);
			html			= '';
			var is_year_selected	= function (year) {
				return	(
							options.mode == 'range' &&
							year >= new Date(actual_date[0]).getFullYear() &&
							year <= new Date(actual_date[1]).getFullYear()
						) ||
						(
							options.mode == 'multiple' &&
							actual_date.reduce(function (prev, current) {
								prev.push(new Date(current).getFullYear());
								return prev;
							}, []).indexOf(year) !== -1
						) ||
						new Date(actual_date).getFullYear() == year;
			};
			var is_months_selected	= function (year, month) {
				var first_year	= new Date(actual_date[0]).getFullYear(),
					lastyear	= new Date(actual_date[1]).getFullYear(),
					first_month	= new Date(actual_date[0]).getMonth(),
					last_month	= new Date(actual_date[1]).getMonth();
				return	(
							options.mode == 'range' &&
							year > first_year &&
							year < lastyear
						) ||
						(
							options.mode == 'range' &&
							year == first_year &&
							year < lastyear &&
							month >= first_month
						) ||
						(
							options.mode == 'range' &&
							year > first_year &&
							year == lastyear &&
							month <= last_month
						) ||
						(
							options.mode == 'range' &&
							year == first_year &&
							year == lastyear &&
							month >= first_month &&
							month <= last_month
						) ||
						(
							options.mode == 'multiple' &&
							actual_date.reduce(function (prev, current) {
								current	= new Date(current);
								prev.push(current.getFullYear() + '-' + current.getMonth());
								return prev;
							}, []).indexOf(year + '-' + month) !== -1
						) ||
						(
							new Date(actual_date).getFullYear() == year &&
							new Date(actual_date).getMonth() == month
						)
			};
			(function () {
				var years			= [],
					start_from_year	= local_date.getFullYear() - 6,
					min_year		= new Date(options.min).getFullYear(),
					max_year		= new Date(options.max).getFullYear(),
					year;
				for (var j = 0; j < 12; ++j) {
					year	= {
						text		: start_from_year + j,
						class_name	: []
					};
					if (
						(
							options.min && year.text < min_year
						) ||
						(
							options.max && year.text > max_year
						)
					) {
						year.class_name.push('pmu-disabled');
					} else if (is_year_selected(year.text)) {
						year.class_name.push('pmu-selected');
					}
					year.class_name	= year.class_name.join(' ');
					years.push(year);
				}
				html	+= tpl.body(years, 'pmu-years');
			})();
			(function () {
				var months			= [],
					current_year	= local_date.getFullYear(),
					min_year		= new Date(options.min).getFullYear(),
					min_month		= new Date(options.min).getMonth(),
					max_year		= new Date(options.max).getFullYear(),
					max_month		= new Date(options.max).getMonth(),
					month;
				for (var j = 0; j < 12; ++j) {
					month	= {
						text		: options.locale.monthsShort[j],
						class_name	: []
					};
					if (
						(
							options.min &&
							(
								current_year < min_year ||
								(
									j < min_month && current_year == min_year
								)
							)
						) ||
						(
							options.max &&
							(
								current_year > max_year ||
								(
									j > max_month && current_year >= max_year
								)
							)
						)
					) {
						month.class_name.push('pmu-disabled');
					} else if (is_months_selected(current_year, j)) {
						month.class_name.push('pmu-selected');
					}
					month.class_name	= month.class_name.join(' ');
					months.push(month);
				}
				html	+= tpl.body(months, 'pmu-months');
			})();
			(function () {
				var days			= [],
					current_month	= local_date.getMonth(),
					day;
				// Correct first day in calendar taking into account first day of week (Sunday or Monday)
				(function () {
					local_date.setDate(1);
					var day = (local_date.getDay() - options.first_day) % 7;
					local_date.addDays(-(day + (day < 0 ? 7 : 0)));
				})();
				for (var j = 0; j < 42; ++j) {
					day	= {
						text		: local_date.getDate(),
						class_name	: []
					};
					if (current_month != local_date.getMonth()) {
						day.class_name.push('pmu-not-in-month');
					}
					if (local_date.getDay() == 0) {
						day.class_name.push('pmu-sunday');
					} else if (local_date.getDay() == 6) {
						day.class_name.push('pmu-saturday');
					}
					var from_user	= options.render(new Date(local_date)) || {},
						val			= local_date.valueOf(),
						disabled	= (options.min && options.min > local_date) || (options.max && options.max < local_date);
					if (from_user.disabled || disabled) {
						day.class_name.push('pmu-disabled');
					} else if (
						from_user.selected ||
						options.date == val ||
						$.inArray(val, options.date) !== -1 ||
						(
							options.mode == 'range' && val >= options.date[0] && val <= options.date[1]
						)
					) {
						day.class_name.push('pmu-selected');
					}
					if (val == today) {
						day.class_name.push('pmu-today');
					}
					if (from_user.class_name) {
						day.class_name.push(from_user.class_name);
					}
					day.class_name = day.class_name.join(' ');
					days.push(day);
					// Move to next day
					local_date.addDays(1);
				}
				html	+= tpl.body(days, 'pmu-days');
			})();
			instance.append(html);
		}
		shown_date_from.setDate(1);
		shown_date_to.setDate(1);
		shown_date_to.addMonths(1);
		shown_date_to.addDays(-1);
		pickmeup.find('.pmu-prev').css(
			'visibility',
			options.min && options.min >= shown_date_from ? 'hidden' : 'visible'
		);
		pickmeup.find('.pmu-next').css(
			'visibility',
			options.max && options.max <= shown_date_to ? 'hidden' : 'visible'
		);
		options.fill.apply(this);
	}
	function parseDate (date, format, separator, locale) {
		if (date.constructor == Date) {
			return date;
		} else if (!date) {
			return new Date;
		}
		var splitted_date	= date.split(separator);
		if (splitted_date.length > 1) {
			splitted_date.forEach(function (element, index, array) {
				array[index]	= parseDate($.trim(element), format, separator, locale);
			});
			return splitted_date;
		}
		var months_text	= locale.monthsShort.join(')(') + ')(' + locale.months.join(')(');
		separator	= new RegExp('[^0-9a-zA-Z(' + months_text + ')]+')
		var parts		= date.split(separator),
			against		= format.split(separator),
			d,
			m,
			y,
			h,
			min,
			now = new Date();
		for (var i = 0; i < parts.length; i++) {
			switch (against[i]) {
				case 'b':
					m = locale.monthsShort.indexOf(parts[i]);
				break;
				case 'B':
					m = locale.months.indexOf(parts[i]);
				break;
				case 'd':
				case 'e':
					d = parseInt(parts[i],10);
				break;
				case 'm':
					m = parseInt(parts[i], 10)-1;
				break;
				case 'Y':
				case 'y':
					y = parseInt(parts[i], 10);
					y += y > 100 ? 0 : (y < 29 ? 2000 : 1900);
				break;
				case 'H':
				case 'I':
				case 'k':
				case 'l':
					h = parseInt(parts[i], 10);
				break;
				case 'P':
				case 'p':
					if (/pm/i.test(parts[i]) && h < 12) {
						h += 12;
					} else if (/am/i.test(parts[i]) && h >= 12) {
						h -= 12;
					}
				break;
				case 'M':
					min = parseInt(parts[i], 10);
				break;
			}
		}
		var parsed_date = new Date(
			y === undefined ? now.getFullYear() : y,
			m === undefined ? now.getMonth() : m,
			d === undefined ? now.getDate() : d,
			h === undefined ? now.getHours() : h,
			min === undefined ? now.getMinutes() : min,
			0
		);
		if (isNaN(parsed_date * 1)) {
			parsed_date = new Date;
		}
		return parsed_date;
	}
	function formatDate (date, format, locale) {
		var m = date.getMonth();
		var d = date.getDate();
		var y = date.getFullYear();
		var w = date.getDay();
		var s = {};
		var hr = date.getHours();
		var pm = (hr >= 12);
		var ir = (pm) ? (hr - 12) : hr;
		var dy = date.getDayOfYear();
		if (ir == 0) {
			ir = 12;
		}
		var min = date.getMinutes();
		var sec = date.getSeconds();
		var parts = format.split(''), part;
		for (var i = 0; i < parts.length; i++) {
			part = parts[i];
			switch (part) {
				case 'a':
					part = locale.daysShort[w];
				break;
				case 'A':
					part = locale.days[w];
				break;
				case 'b':
					part = locale.monthsShort[m];
				break;
				case 'B':
					part = locale.months[m];
				break;
				case 'C':
					part = 1 + Math.floor(y / 100);
				break;
				case 'd':
					part = (d < 10) ? ("0" + d) : d;
				break;
				case 'e':
					part = d;
				break;
				case 'H':
					part = (hr < 10) ? ("0" + hr) : hr;
				break;
				case 'I':
					part = (ir < 10) ? ("0" + ir) : ir;
				break;
				case 'j':
					part = (dy < 100) ? ((dy < 10) ? ("00" + dy) : ("0" + dy)) : dy;
				break;
				case 'k':
					part = hr;
				break;
				case 'l':
					part = ir;
				break;
				case 'm':
					part = (m < 9) ? ("0" + (1+m)) : (1+m);
				break;
				case 'M':
					part = (min < 10) ? ("0" + min) : min;
				break;
				case 'p':
				case 'P':
					part = pm ? "PM" : "AM";
				break;
				case 's':
					part = Math.floor(date.getTime() / 1000);
				break;
				case 'S':
					part = (sec < 10) ? ("0" + sec) : sec;
				break;
				case 'u':
					part = w + 1;
				break;
				case 'w':
					part = w;
				break;
				case 'y':
					part = ('' + y).substr(2, 2);
				break;
				case 'Y':
					part = y;
				break;
			}
			parts[i] = part;
		}
		return parts.join('');
	}
	function update_date () {
		var	$this			= $(this),
			options			= $this.data('pickmeup-options'),
			current_date	= options.current,
			new_value;
		switch (options.mode) {
			case 'multiple':
				new_value = current_date.setHours(0,0,0,0).valueOf();
				if ($.inArray(new_value, options.date) !== -1) {
					$.each(options.date, function (index, value){
						if (value == new_value) {
							options.date.splice(index,1);
							return false;
						}
						return true;
					});
				} else {
					options.date.push(new_value);
				}
				break;
			case 'range':
				if (!options.lastSel) {
					options.date[0]	= current_date.setHours(0,0,0,0).valueOf();
				}
				new_value	= current_date.setHours(0,0,0,0).valueOf();
				if (new_value <= options.date[0]) {
					options.date[1]	= options.date[0];
					options.date[0]	= new_value;
				} else {
					options.date[1]	= new_value;
				}
				options.lastSel	= !options.lastSel;
				break;
			default:
				options.date	= current_date.valueOf();
				break;
		}
		var prepared_date	= prepareDate(options);
		if ($this.is('input')) {
			$this.val(options.mode == 'single' ? prepared_date[0] : prepared_date[0].join(options.separator));
		}
		options.change.apply(this, prepared_date);
		if (
			!options.flat &&
			options.hide_on_select &&
			(
				options.mode != 'range' ||
				!options.lastSel
			)
		) {
			options.binded.hide();
			return false;
		}
	}
	function click (e) {
		var el	= $(e.target);
		if (!el.hasClass('pmu-button')) {
			el	= el.closest('.pmu-button');
		}
		if (el.length) {
			if (el.hasClass('pmu-disabled')) {
				return false;
			}
			var	$this			= $(this),
				options			= $this.data('pickmeup-options'),
				instance		= el.parents('.pmu-instance').eq(0),
				root			= instance.parent(),
				instance_index	= $('.pmu-instance', root).index(instance);
			if (el.parent().is('nav')) {
				if (el.hasClass('pmu-month')) {
					options.current.addMonths(instance_index - Math.floor(options.calendars / 2));
					if (root.hasClass('pmu-view-years')) {
						// Shift back to current date, otherwise with min value specified may jump on few (tens) years forward
						if (options.mode != 'single') {
							options.current	= new Date(options.date[options.date.length - 1]);
						} else {
							options.current	= new Date(options.date);
						}
						if (options.select_day) {
							root.removeClass('pmu-view-years').addClass('pmu-view-days');
						} else if (options.select_month) {
							root.removeClass('pmu-view-years').addClass('pmu-view-months');
						}
					} else if (root.hasClass('pmu-view-months')) {
						if (options.select_year) {
							root.removeClass('pmu-view-months').addClass('pmu-view-years');
						} else if (options.select_day) {
							root.removeClass('pmu-view-months').addClass('pmu-view-days');
						}
					} else if (root.hasClass('pmu-view-days')) {
						if (options.select_month) {
							root.removeClass('pmu-view-days').addClass('pmu-view-months');
						} else if (options.select_year) {
							root.removeClass('pmu-view-days').addClass('pmu-view-years');
						}
					}
				} else {
					if (el.hasClass('pmu-prev')) {
						options.binded.prev(false);
					} else {
						options.binded.next(false);
					}
				}
			} else if (!el.hasClass('pmu-disabled')) {
				if (root.hasClass('pmu-view-years')) {
					options.current.setFullYear(parseInt(el.text(), 10));
					if (options.select_month) {
						root.removeClass('pmu-view-years').addClass('pmu-view-months');
					} else if (options.select_day) {
						root.removeClass('pmu-view-years').addClass('pmu-view-days');
					} else {
						options.binded.update_date();
					}
				} else if (root.hasClass('pmu-view-months')) {
					options.current.setMonth(instance.find('.pmu-months .pmu-button').index(el));
					options.current.setFullYear(parseInt(instance.find('.pmu-month').text(), 10));
					if (options.select_day) {
						root.removeClass('pmu-view-months').addClass('pmu-view-days');
					} else {
						options.binded.update_date();
					}
					// Move current month to the first place
					options.current.addMonths(Math.floor(options.calendars / 2) - instance_index);
				} else {
					var val	= parseInt(el.text(), 10);
					options.current.addMonths(instance_index - Math.floor(options.calendars / 2));
					if (el.hasClass('pmu-not-in-month')) {
						options.current.addMonths(val > 15 ? -1 : 1);
					}
					options.current.setDate(val);
					options.binded.update_date();
				}
			}
			options.binded.fill();
		}
		return false;
	}
	function prepareDate (options) {
		var result;
		if (options.mode == 'single') {
			result = new Date(options.date);
			return [formatDate(result, options.format, options.locale), result];
		} else {
			result = [[],[]];
			$.each(options.date, function(nr, val){
				var date = new Date(val);
				result[0].push(formatDate(date, options.format, options.locale));
				result[1].push(date);
			});
			return result;
		}
	}
	function show (force) {
		var pickmeup	= this.pickmeup;
		if (force || !pickmeup.is(':visible')) {
			var $this		= $(this),
				options		= $this.data('pickmeup-options'),
				pos			= $this.offset(),
				viewport	= {
					l : document.documentElement.scrollLeft,
					t : document.documentElement.scrollTop,
					w : document.documentElement.clientWidth,
					h : document.documentElement.clientHeight
				},
				top			= pos.top,
				left		= pos.left;
			options.binded.fill();
			if ($this.is('input')) {
				$this
					.pickmeup('set_date', parseDate($this.val() ? $this.val() : options.default_date, options.format, options.separator, options.locale))
					.keydown(function (e) {
						if (e.which == 9) {
							$this.pickmeup('hide');
						}
					});
				options.lastSel = false;
			}
			options.before_show();
			if (options.show() == false) {
				return;
			}
			if (!options.flat) {
				switch (options.position){
					case 'top':
						top -= pickmeup.outerHeight();
						break;
					case 'left':
						left -= pickmeup.outerWidth();
						break;
					case 'right':
						left += this.offsetWidth;
						break;
					case 'bottom':
						top += this.offsetHeight;
						break;
				}
				if (top + pickmeup.offsetHeight > viewport.t + viewport.h) {
					top = pos.top  - pickmeup.offsetHeight;
				}
				if (top < viewport.t) {
					top = pos.top + this.offsetHeight + pickmeup.offsetHeight;
				}
				if (left + pickmeup.offsetWidth > viewport.l + viewport.w) {
					left = pos.left - pickmeup.offsetWidth;
				}
				if (left < viewport.l) {
					left = pos.left + this.offsetWidth
				}
				pickmeup.css({
					display	: 'inline-block',
					top		: top + 'px',
					left	: left + 'px'
				});
				$(document)
					.on(
						namespaced_events(options.trigger_event, options.events_namespace),
						options.binded.hide
					)
					.on(
						'resize' + options.events_namespace,
						[
							true
						],
						options.binded.forced_show
					);
			}
		}
	}
	function forced_show () {
		show.call(this, true);
	}
	function hide (e) {
		if (
			!e ||
			!e.target ||														//Called directly
			(
				e.target != this &&												//Clicked not on element itself
				!(this.pickmeup.get(0).compareDocumentPosition(e.target) & 16)	//And not o its children
			)
		) {
			var pickmeup	= this.pickmeup,
				options		= $(this).data('pickmeup-options');
			if (options.hide() != false) {
				pickmeup.hide();
				$(document)
					.off(namespaced_events(options.trigger_event, options.events_namespace), options.binded.hide)
					.off('resize', options.binded.forced_show);
				options.lastSel	= false;
			}
		}
	}
	function update () {
		var	options	= $(this).data('pickmeup-options');
		$(document)
			.off(namespaced_events(options.trigger_event, options.events_namespace), options.binded.hide)
			.off('resize', options.binded.forced_show);
		options.binded.forced_show();
	}
	function clear () {
		var options = $(this).data('pickmeup-options');
		if (options.mode != 'single') {
			options.date	= [];
			options.lastSel	= false;
			options.binded.fill();
		}
	}
	function prev (fill) {
		if (typeof fill == 'undefined') {
			fill = true;
		}
		var root	= this.pickmeup;
		var options	= $(this).data('pickmeup-options');
		if (root.hasClass('pmu-view-years')) {
			options.current.addYears(-12);
		} else if (root.hasClass('pmu-view-months')) {
			options.current.addYears(-1);
		} else if (root.hasClass('pmu-view-days')) {
			options.current.addMonths(-1);
		}
		if (fill) {
			options.binded.fill();
		}
	}
	function next (fill) {
		if (typeof fill == 'undefined') {
			fill = true;
		}
		var root	= this.pickmeup;
		var options	= $(this).data('pickmeup-options');
		if (root.hasClass('pmu-view-years')) {
			options.current.addYears(12);
		} else if (root.hasClass('pmu-view-months')) {
			options.current.addYears(1);
		} else if (root.hasClass('pmu-view-days')) {
			options.current.addMonths(1);
		}
		if (fill) {
			options.binded.fill();
		}
	}
	function get_date (formatted) {
		var options			= $(this).data('pickmeup-options'),
			prepared_date	= prepareDate(options);
		if (typeof formatted === 'string') {
			var date = prepared_date[1];
			if (date.constructor == Date) {
				return formatDate(date, formatted, options.locale)
			} else {
				return date.map(function (value) {
					return formatDate(value, formatted, options.locale);
				});
			}
		} else {
			return prepared_date[formatted ? 0 : 1];
		}
	}
	function set_date (date) {
		var $this	= $(this),
			options = $this.data('pickmeup-options');
		options.date = date;
		if (typeof options.date === 'string') {
			options.date = parseDate(options.date, options.format, options.separator, options.locale).setHours(0,0,0,0);
		} else if (options.date.constructor == Date) {
			options.date.setHours(0,0,0,0);
		}
		if (!options.date) {
			options.date = new Date;
			options.date.setHours(0,0,0,0);
		}
		if (options.mode != 'single') {
			if (options.date.constructor != Array) {
				options.date = [options.date.valueOf()];
				if (options.mode == 'range') {
					options.date.push(((new Date(options.date[0])).setHours(0,0,0,0)).valueOf());
				}
			} else {
				for (var i = 0; i < options.date.length; i++) {
					options.date[i] = (parseDate(options.date[i], options.format, options.separator, options.locale).setHours(0,0,0,0)).valueOf();
				}
				if (options.mode == 'range') {
					options.date[1] = ((new Date(options.date[1])).setHours(0,0,0,0)).valueOf();
				}
			}
		} else {
			if($this.val() || options.default_date !== false) {
				options.date = options.date.constructor == Array ? options.date[0].valueOf() : options.date.valueOf();
			}
		}
		options.current = new Date (options.mode != 'single' ? options.date[0] : options.date);
		options.binded.fill();
		if ($this.is('input') && options.default_date !== false) {
			var prepared_date	= prepareDate(options);
			if (!$this.val()) {
				options.change.apply(this, prepared_date);
			}
			$this.val(options.mode == 'single' ? prepared_date[0] : prepared_date[0].join(options.separator));
		}
	}
	function destroy () {
		var	$this	= $(this),
			options	= $this.data('pickmeup-options');
		$this.removeData('pickmeup-options');
		$this.off(options.events_namespace);
		$(document).off(options.events_namespace);
		$(this.pickmeup).remove();
	}
	$.fn.pickmeup	= function (initial_options) {
		if (typeof initial_options === 'string') {
			var data,
				parameters	= Array.prototype.slice.call(arguments, 1);
			switch (initial_options) {
				case 'hide':
				case 'show':
				case 'clear':
				case 'update':
				case 'prev':
				case 'next':
				case 'destroy':
					this.each(function () {
						data	= $(this).data('pickmeup-options');
						if (data) {
							data.binded[initial_options]();
						}
					});
				break;
				case 'get_date':
					data	= this.data('pickmeup-options');
					if (data) {
						return data.binded.get_date(parameters[0]);
					} else {
						return null;
					}
				break;
				case 'set_date':
					this.each(function () {
						data	= $(this).data('pickmeup-options');
						if (data) {
							data.binded[initial_options].apply(this, parameters);
						}
					});
			}
			return this;
		}
		return this.each(function () {
			var	$this			= $(this);
			if ($this.data('pickmeup-options')) {
				return;
			}
			var i,
				option,
				options	= $.extend({}, $.pickmeup, initial_options || {});
			for (i in options) {
				option	= $this.data('pmu-' + i);
				if (typeof option !== 'undefined') {
					options[i]	= option;
				}
			}
			// 4 conditional statements in order to account all cases
			if (options.view == 'days' && !options.select_day) {
				options.view	= 'months';
			}
			if (options.view == 'months' && !options.select_month) {
				options.view	= 'years';
			}
			if (options.view == 'years' && !options.select_year) {
				options.view	= 'days';
			}
			if (options.view == 'days' && !options.select_day) {
				options.view	= 'months';
			}
			options.calendars	= Math.max(1, parseInt(options.calendars, 10) || 1);
			options.mode		= /single|multiple|range/.test(options.mode) ? options.mode : 'single';
			if (typeof options.min === 'string') {
				options.min = parseDate(options.min, options.format, options.separator, options.locale).setHours(0,0,0,0);
			} else if (options.min && options.min.constructor == Date) {
				options.min.setHours(0,0,0,0);
			}
			if (typeof options.max === 'string') {
				options.max = parseDate(options.max, options.format, options.separator, options.locale).setHours(0,0,0,0);
			} else if (options.max && options.max.constructor == Date) {
				options.max.setHours(0,0,0,0);
			}
			if (!options.select_day) {
				if (options.min) {
					options.min	= new Date(options.min);
					options.min.setDate(1);
					options.min	= options.min.valueOf();
				}
				if (options.max) {
					options.max	= new Date(options.max);
					options.max.setDate(1);
					options.max	= options.max.valueOf();
				}
			}
			if (typeof options.date === 'string') {
				options.date = parseDate(options.date, options.format, options.separator, options.locale).setHours(0,0,0,0);
			} else if (options.date.constructor == Date) {
				options.date.setHours(0,0,0,0);
			}
			if (!options.date) {
				options.date = new Date;
				options.date.setHours(0,0,0,0);
			}
			if (options.mode != 'single') {
				if (options.date.constructor != Array) {
					options.date = [options.date.valueOf()];
					if (options.mode == 'range') {
						options.date.push(((new Date(options.date[0])).setHours(0,0,0,0)).valueOf());
					}
				} else {
					for (i = 0; i < options.date.length; i++) {
						options.date[i] = (parseDate(options.date[i], options.format, options.separator, options.locale).setHours(0,0,0,0)).valueOf();
					}
					if (options.mode == 'range') {
						options.date[1] = ((new Date(options.date[1])).setHours(0,0,0,0)).valueOf();
					}
				}
				options.current	= new Date(options.date[options.date.length -1]);
				// Set days to 1 in order to handle them consistently
				if (!options.select_day) {
					for (i = 0; i < options.date.length; ++i) {
						options.date[i]	= new Date(options.date[i]);
						options.date[i].setDate(1);
						options.date[i]	= options.date[i].valueOf();
						// Remove duplicates
						if (
							options.mode != 'range' &&
							options.date.indexOf(options.date[i]) !== i
						) {
							delete options.date.splice(i, 1);
							--i;
						}
					}
				}
			} else {
				options.date	= options.date.valueOf();
				options.current	= new Date(options.date);
				if (!options.select_day) {
					options.date	= new Date(options.date);
					options.date.setDate(1);
					options.date	= options.date.valueOf();
				}
			}
			options.current.setDate(1);
			options.current.setHours(0,0,0,0);
			var cnt,
				pickmeup = $(tpl.wrapper);
			this.pickmeup	= pickmeup;
			if (options.class_name) {
				pickmeup.addClass(options.class_name);
			}
			var html = '';
			for (i = 0; i < options.calendars; i++) {
				cnt		= options.first_day;
				html	+= tpl.head({
					prev	: options.prev,
					next	: options.next,
					day		: [
						options.locale.daysMin[(cnt++) % 7],
						options.locale.daysMin[(cnt++) % 7],
						options.locale.daysMin[(cnt++) % 7],
						options.locale.daysMin[(cnt++) % 7],
						options.locale.daysMin[(cnt++) % 7],
						options.locale.daysMin[(cnt++) % 7],
						options.locale.daysMin[(cnt++) % 7]
					]
				});
			}
			$this.data('pickmeup-options', options);
			for (i in options) {
				if (['render', 'change', 'before_show', 'show', 'hide'].indexOf(i) != -1) {
					options[i]	= options[i].bind(this);
				}
			}
			options.binded	= {
				fill		: fill.bind(this),
				update_date	: update_date.bind(this),
				click		: click.bind(this),
				show		: show.bind(this),
				forced_show	: forced_show.bind(this),
				hide		: hide.bind(this),
				update		: update.bind(this),
				clear		: clear.bind(this),
				prev		: prev.bind(this),
				next		: next.bind(this),
				get_date	: get_date.bind(this),
				set_date	: set_date.bind(this),
				destroy		: destroy.bind(this)
			};
			options.events_namespace	= '.pickmeup-' + (++instances_count);
			pickmeup
				.on(namespaced_events(options.trigger_event, options.events_namespace), options.binded.click)
				.addClass(views[options.view])
				.append(html)
				.on(
					$.support.selectstart ? 'selectstart' : 'mousedown',
					function(e){
						e.preventDefault();
					}
				);
			options.binded.fill();
			if (options.flat) {
				pickmeup.appendTo(this).css({
					position	: 'relative',
					display		: 'inline-block'
				});
			} else {
				pickmeup.appendTo(document.body);
				$this.on(namespaced_events(options.trigger_event, options.events_namespace), options.binded.show);
			}
		});
	};
}));

'use strict';

/**
 * Created by snatvb on 18.04.2016.
 */

//String.prototype.replaceAll = function(search, replacement) {
//    return this.replace(new RegExp(search, 'g'), replacement);
//};

if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
        'use strict';
        var O = Object(this),
            len = parseInt(O.length, 10) || 0;

        if (len === 0) {
            return false;
        }

        var n = parseInt(arguments[1], 10) || 0,
            k;

        if (n >= 0) {
            k = n;
        } else {
            k = len + n;
            
            if (k < 0) {
                k = 0;
            }
        }

        var currentElement;

        while (k < len) {
            currentElement = O[k];

            if (searchElement === currentElement) { // NaN !== NaN
                return true;
            }

            k++;
        }
        
        return false;
    };
}

'use strict';

/**
 * Created by snatvb on 18.04.2016.
 */

window.Events = (function () {
    var Events = function () {
        return this.init();
    };

    Events.prototype = {
        init: function () {
            this.ev = [];
            return this;
        },
        on: function ( eventName, f ) {
            if ( !f ) return;
            var e = {
                name: eventName,
                f: f
            };
            this.ev.push( e );
        },
        trigger: function ( eventName, args ) {
            for ( var i = 0; i < this.ev.length; i++ ) {
                if ( this.ev[ i ].name == eventName ) {
                    this.ev[ i ].f( args );
                }
            }
        }
    };

    Events.prototype.emmit = Events.prototype.trigger;

    return new Events;
})();
'use strict';

/**
 * Created by snatvb on 20.04.2016.
 */

var PreviewImage = function (stgs) {
    this.stgs = stgs || {};
    return this.init();
};

PreviewImage.prototype = {
    init: function () {
        if (!this.stgs || typeof this.stgs != 'object') {
            return this;
        }
        this.initaled = true;

        this._setStgs();

        this.item = $(this.stgs.item);
        this.template = $(this.stgs.template);

        this._binded();
    },
    _setStgs: function () {
        var s = this.stgs;
        this.stgs = {
            template: s.template,
            item: s.item,
            onChange: s.onChange,
            howAdd: s.howAdd.replace(' ', '') || 'before',
            loadedClass: s.loadedClass || 'PreviewImage-loaded'
        };

        this.cached = {};

    },
    _binded: function () {
        var self = this;
        this.item.on('change', function ( e ) {
            self.onChange(this, $(this), e);
        });
    },
    onChange: function ( element, $element, e ) {
        var $tmpl, self = this;
        if ( window.File && window.FileReader && window.FileList && window.Blob ) {
            for ( var i = 0; i < e.target.files.length; i++ ) {
                var reader = new FileReader;
                reader.readAsDataURL( e.target.files[ i ] );
                $tmpl = this.template.clone();
                (function ( $tmpl, maxIndex, index ) {
                    reader.onload = function ( e ) { // Как только картинка загрузится
                        //$('.add-photo__img' ).attr('src', e.target.result);
                        self._rendered(e, $tmpl, maxIndex, index);
                    }
                })( $tmpl, (e.target.files.length - 1), i );
            }
        }
    },
    _rendered: function ( e, $tmpl, maxIndex, index ) {
        var parent = this.item.parents('.j-PreviewView-parent').length ? this.item.parents('.j-PreviewView-parent') : this.item.parent(),
            howAdd = this.stgs.howAdd.replace(' ', '').split(',');
        $tmpl.find( 'img' ).attr( 'src', e.target.result );
        $('.j-PreviewRemoveRender' ).remove();
        if (howAdd.includes('replace-input'))
            this._renderedReplace($tmpl, parent);
        if (howAdd.includes('cached'))
            $tmpl = this._renderedCached($tmpl, parent, index);
        if (howAdd.includes('before'))
            this._renderedBefore($tmpl, parent);
        if (howAdd.includes('remove'))
            this._addRemoved($tmpl, parent);

        this.cached.tmpl = $tmpl;
    },
    _addRemoved: function ($tmpl, parent) {
        $tmpl.on('click', '.j-PreviewImage-remove', function (event) {
            event.preventDefault();
            $tmpl.remove();
        });
    },
    _renderedBefore: function ($tmpl, parent) {
        parent.before($tmpl);
    },
    _renderedCached: function ($tmpl, parent, index) {
        if (index == 0 ) $('.j-PreviewImage-Cached').remove();
        $tmpl.addClass('j-PreviewImage-Cached');
        return $tmpl;
    },
    _renderedReplace: function ($tmpl, parent) {
        if (this.cached.tmpl) this.cached.tmpl.remove();
        if (!parent.hasClass(this.stgs.loadedClass)) parent.addClass(this.stgs.loadedClass);
        this.item.before($tmpl);
        // this.item.hide();
    }
};

var PreviewImages = function ( template, items, howAdd ) {
    var res = [];
    for(var i = 0; i < items.length; i++){
        res.push(new PreviewImage({
            template: template,
            item: items[i],
            howAdd: howAdd
        }));
    }
    return res;
};

'use strict';

/**
 * Created by snatvb on 18.04.2016.
 */

var AnchorController = (function () {
    var exportObj = {};

    var init = function () {
        Events.on('AddActModule.change', function ( data ) {
            control(data);
        });
    };

    var control = function ( data ) {
        window.location = window.location.pathname + '#' + data;
    };


    exportObj.init = init;

    return exportObj;

})();

var fnModule = (function() {

    var exportObj = {};

    var init = function() {
        $.fn.typingAnimation = function(speed) {

            var
                that = this,
                text = that.data('text'),
                textArray = text.split(""),
                loopTimer,
                frameLooper;

            that.html('');

            frameLooper = function frameLooper() {

                if(textArray.length > 0) {

                    var $containerHtml = that.html();
                    that.html($containerHtml += textArray.shift());

                } else {

                    clearTimeout(loopTimer);
                    return false;

                }

                loopTimer = setTimeout(frameLooper, speed);

            }

            frameLooper();

            return this;

        }

        // добавляем перевод для datepicker
        jQuery.extend(jQuery.fn.pickadate.defaults, {
            monthsFull: [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ],
            monthsShort: [ 'янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек' ],
            weekdaysFull: [ 'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота' ],
            weekdaysShort: [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб' ],
            today: 'сегодня',
            clear: 'удалить',
            close: 'закрыть',
            firstDay: 1,
            format: 'd mmmm yyyy г.',
            formatSubmit: 'yyyy/mm/dd'
        });

    };

    var isVisible = function($elem) {

        var elem = $elem.get(0),
            coords = elem.getBoundingClientRect(),
            windowHeight = document.documentElement.clientHeight;

        // верхняя граница elem в пределах видимости ИЛИ нижняя граница видима
        var topVisible = coords.top > 0 && coords.top < windowHeight,
            bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

        return topVisible || bottomVisible;
    };

    // Когда элемент (первый аргумент) в пределах видимости, запускается функция, переданная вторым аргументом
    var triggerOnScroll = function($elem, func) {

        var _runTrigger = function(e) {

            if (isVisible($elem)) {
                func();
                $(document).off('scroll', _runTrigger);
            }

        }

        $(document).on('scroll', _runTrigger);
        _runTrigger();

    }

    // узнать ширину скроллбара в данном браузере
    var _measureScrollBarWidth = function() {

        var div = document.createElement('div');

        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';

        // при display:none размеры нельзя узнать
        // нужно, чтобы элемент был видим,
        // visibility:hidden - можно, т.к. сохраняет геометрию
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        var scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);

        return scrollWidth;

    }

    var toggleZoom = function(state) {

        var _zoomDisable = function() {
            $('head meta[name=viewport]').remove();
            $('head').prepend('<meta name="viewport" content="user-scalable=0" />');
        }

        var _zoomEnable = function() {
            $('head meta[name=viewport]').remove();
            $('head').prepend('<meta name="viewport" content="user-scalable=1" />');
        }

        if (state === true) {
            _zoomEnable();

        } else if(state === false) {

            _zoomDisable();
        }

    }


    // Спрятать или показать скроллбар
    var toggleScrollBar = function(selector, action) {

        var scrollBarWidth = _measureScrollBarWidth(),
            $elem = $(selector);

        var _hideScrollBar = function() {
            $elem
                .addClass('no-scroll')
                .css({
                    'padding-right': scrollBarWidth + 'px'
                });
        };

        var _showScrollBar = function() {
            $elem
                .removeClass('no-scroll')
                .css({
                    'padding-right': ''
                });
        }

        switch (action) {

            case 'show':
                _showScrollBar();
                break;

            case 'hide':
                _hideScrollBar();
                break;

            default:
                if ($elem.hasClass('no-scroll')) {
                    _showScrollBar();

                } else {

                    _hideScrollBar();
                }
        }

    }

    var positionTo = function($elem, pos) {

        var elemHeight = $elem.outerHeight(),
            elemWidth = $elem.outerWidth(),
            windowWidth = document.documentElement.clientWidth,
            windowHeight = document.documentElement.clientHeight,
            elemPos = $elem.get(0).getBoundingClientRect(),
            elemCenterX = elemPos.left + elemWidth / 2,
            elemCenterY = elemPos.top + elemHeight / 2;

        switch(pos) {
            case 'center':
                $elem.css({
                    'top': windowHeight / 2 - elemCenterY + 'px',
                    'left': windowWidth / 2 - elemCenterX +'px'
                });
                break;

            case 'top':
                $elem.css({
                    'top': 50 - elemPos.top + 'px'
                });
                break;
        }

    };

    var animateScroll = function($target, speed) {

        var targetTopPos = $target.offset().top,
            speed = speed || 500,
            $fixedHeader = $('.header'),
            scrollTo = targetTopPos - $fixedHeader.outerHeight();

        $('html, body').animate({scrollTop: scrollTo}, speed);

    }

    var umodal = function(title, text, markup, single) {
        var $umodal = $('#umodal');

        if ($umodal.length) {
            var $title = $umodal.find('.box-modal__title'),
                $body = $umodal.find('.box-modal__content-item'),
                $text;

            $title.text('');
            $body.html('<div class="box-modal__text"><p class="box-modal__text-par"></p></div>');

            $text = $umodal.find('.box-modal__text-par');
            $umodal.removeAttr('data-single');

            if (single) {
                if ( ($('.box-modal:visible').not($umodal).length) ) {
                    $('.box-modal:visible').not($umodal).arcticmodal('close');
                }
            }

            if (title != undefined && title != '') {
                $title.text(title);
            } else {
                $title.html('&nbsp;');
            }

            if (markup) {
                $body.html(text);
            } else {
                $text.text(text);
            }

            $umodal.arcticmodal();
        }
    }

    exportObj.init = init;
    exportObj.isVisible = isVisible;
    exportObj.toggleScrollBar = toggleScrollBar;
    exportObj.positionTo = positionTo;
    exportObj.triggerOnScroll = triggerOnScroll;
    exportObj.toggleZoom = toggleZoom;
    exportObj.animateScroll = animateScroll;
    exportObj.umodal = umodal;

    return exportObj;

})();

var animationsModule = (function() {

    'use strict';

    var exportObj = {};

    // taken from mo.js demos
    function isIOSSafari() {

        var userAgent;
        userAgent = window.navigator.userAgent;
        return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);

    };

    // taken from mo.js demos
    function isTouch() {

        var isIETouch;
        isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;

    };

    // taken from mo.js demos
    var isIOS = isIOSSafari(),
        clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }

        return a;
    }

    function Animocon(el, options) {
        this.el = el;
        this.options = extend( {}, this.options );
        extend( this.options, options );

        this.checked = false;
        if($(this.el).hasClass('like-button_checked'))
        {
            this.checked = true;
        }

        this.timeline = new mojs.Timeline();

        for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
            this.timeline.add(this.options.tweens[i]);
        }

        var self = this;
        this.el.addEventListener(clickHandler, function() {
            if( self.checked ) {
                self.options.onUnCheck();
            }
            else {
                self.options.onCheck();
                self.timeline.start();
            }
            self.checked = !self.checked;
        });
    }

    Animocon.prototype.options = {
        tweens : [
            new mojs.Burst({
                shape : 'circle',
                isRunLess: true
            })
        ],
        onCheck : function() { return false; },
        onUnCheck : function() { return false; }
    };

    var _likeButtonsAnimation = function() {

        var $likeBtn = $('.like-button');

        var scaleCurve4 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');

        $likeBtn.each(function() {

            var $this = $(this),
                that = this,
                icon = that.querySelector('.like-button__icon'),
                currentColor = that.style.color;

            new Animocon(that, {
                tweens : [
                    // burst animation
                    new mojs.Burst({
                        parent: that,
                        duration: 1500,
                        shape : 'circle',
                        fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
                        x: '50%',
                        y: '50%',
                        opacity: 0.6,
                        childOptions: { radius: {20:0} },
                        radius: {40:120},
                        count: 6,
                        isSwirl: true,
                        isRunLess: true,
                        easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                    }),
                    new mojs.Tween({
                        duration : 900,
                        onUpdate: function(progress) {
                            var scaleProgress = scaleCurve4(progress);
                            icon.style.WebkitTransform = icon.style.transform = 'scale3d(' + scaleProgress + ',' + scaleProgress + ',1)';
                        }
                    })
                ],

                onCheck : function() {
                    that.style.color = '#50e3c2';
                    $this.addClass('like-button_checked');
                },

                onUnCheck : function() {
                    that.style.color = currentColor;
                    $this.removeClass('like-button_checked')
                }
            });

        });

    };

    exportObj.init = function() {
        if (userAuth) {
            _likeButtonsAnimation();
        }
    };

    return exportObj;

})();

var tabsModule = (function() {

    var exportObj = {};

    var $tabs = $('.tabs');

    exportObj.init = function() {

        if ($tabs.length) {
            $tabs.easytabs({
                tabs: '> .tabs__header .tabs__nav-item',
                panelActiveClass: 'tabs__panel_active'
            });

            $tabs.on('easytabs:after', function(e, $clicked, $targetPanel) {
                var $gallery = $targetPanel.find('.gallery');

                if ($gallery.length) {
                    $gallery.masonry('layout');
                }
            });

            $tabs.each(function() {
                var $this = $(this),
                    $activeTab = $this.find('.tabs__nav-link.active').eq(0),
                    $activePanel = $this.find($activeTab.attr('href'));

                $this.trigger('tabs:init', [$activeTab, $activePanel]);
            });
        }

        $(document).on('click', '.js-open-tab', function(e) {
            var $this = $(this),
                fullHref = $this.attr('href'),
                hashPos = fullHref.indexOf('#'),
                href = fullHref.slice(hashPos),
                $target = $(href),
                $tabs = $target.closest('.tabs');

            if ($tabs.length) {
                e.preventDefault();
                $tabs.easytabs('select', href);
            }
        });

    };

    return exportObj;

})();

var toggleModule = (function() {

    var exportObj = {};

    var _setupListeners = function() {
        
        var $toggleWrapper = $('.js-toggle-wrapper');

        var _clickEvent = function(e) {

            var $wrap = $(this),
                $target = $(e.target),
                $btn = $target.closest('.js-toggle-btn');

            if ($btn.length) {

                if ($wrap.hasClass("js-toggle-wrapper_open")) {
                    history.pushState('', document.title, window.location.pathname);
                    $wrap.removeClass("js-toggle-wrapper_open");
                } else {
                    var id = $wrap.attr('id');
                    
                    $wrap.removeAttr('id');
                    location.hash = id;
                    $wrap.attr('id', id);
                    $wrap.addClass("js-toggle-wrapper_open");
                }

                e.preventDefault();
            }

        };

        $toggleWrapper.on('click', _clickEvent);
    };
    
    var _toggleOnPageOpen = function() {
        
        var $toggleWrapper = $('.js-toggle-wrapper');
        
        if ($toggleWrapper.length) {
            var hash = location.hash,
                $targetToggle = $toggleWrapper.filter(hash); 
            
            if ($targetToggle.length) {
                $targetToggle.toggleClass('js-toggle-wrapper_open');
            }
        }
        
    };

    exportObj.init = function() {

        _setupListeners();
        _toggleOnPageOpen();

    };

    return exportObj;

})();

var formModule = (function() {

    var exportObj = {};

    var init = function() {
        _setupListeners();
        _setupSelect();
        _setupDatePicker();
        _setupDateRangePicker();
        _setupPlaceholders();
        _setupLimitedMessage();
        _setupСharacterLimited();
        _setupInputMask();
        _setupInputPhoneMask();
    };

    var _setupListeners = function() {
        
        var $tilingInputsContainer = $('.tiling-inputs');
        $tilingInputsContainer.on('change', _tilingInputChange);
        
        _morphingSearchOnFocus();
        
        $('.js-input-number').on('input', function(e) {
            var $this = $(this),
                max = parseInt($this.data('max')),
                val = $this.val().match(/\d+/);
                
            if (parseInt(val) > max) {
                val = max;
            }
                
            $this.val(val);
        });

        $(document).on('focus', '.custom-placeholder', function(e) {
            var $this = $(this),
                $input = $this.find('.custom-placeholder__input'),
                $placeholder = $this.find('.custom-placeholder__text');

            $placeholder.hide();

            $this.one('focusout', function() {
                var val = $input.val();

                if (val) {
                    $placeholder.hide();
                } else {
                    $placeholder.show();
                }
            });
        });
    };

    var _hideCustomPlaceholder = function (e) {
        var $customInput = $('.custom-placeholder__input'),
            $placeholder = $('.custom-placeholder__text');

        if ($customInput.val()) {
            $customInput.siblings($placeholder).hide();
        } else {
            $customInput.siblings($placeholder).hide();
        }
    };

    _hideCustomPlaceholder();
    
    var _tilingInputChange = function(e) {
        
        var $this = $(this),
            $target = $(e.target),
            $inputs = $this.find('.custom-input__hidden'),
            $userVal = $this.find('.custom-input_user-val .custom-input__label'),
            $userValInput = $target.closest('.custom-input_user-val');

        if (!$userVal.length) {
            $this.off('change', _tilingInputChange);
            return;
        }
        
        if ($userValInput.length) { 
            $inputs.filter(':checked').removeAttr('checked');
            $userVal.addClass('custom-input__label_has-val');
        } else {
            $userVal
                .val('')
                .removeClass('custom-input__label_has-val');
        }
        
    }

    var _setupInputMask = function() {
        $('.js-input-mask').inputmask();
    }

    var _setupInputPhoneMask = function() {
        $('.js-input-phone-mask').inputmask('+7(999) 999-99-99', {clearMaskOnLostFocus: false });
    }

    var _setupSelect = function() {

        var $select = $('.select'),
            $selectAutocomplete = $('.js-select-autocomplete');

        if ($select.length) {
            $select.styler();
        }
        
        if ($selectAutocomplete.length) {
            $selectAutocomplete.select2({
                theme: "default select-autocomplete",
                width: '100%',
                language: {
                    noResults: function(){
                        return "Ничего не найдено";
                    }
                }
            });
        }

    };

    var _setupDatePicker = function() {

        var $datepicker = $('.datepicker__input');

        if ($datepicker.length) {

            $datepicker.each(function() {

                var $this = $(this),
                    $container = $this.closest('.datepicker'),
                    $placeholder = $container.find('.datepicker__placeholder'),
                    placeholderText = $placeholder.text();
                
                $this.pickadate({
                    onOpen: function() {
                        fnModule.toggleScrollBar($('html'), 'hide');
                        fnModule.toggleScrollBar($('.header'), 'hide');
                    },

                    onClose: function() {
                        // чтобы датапикер не открывался после перехода с другой вкладки 
                        $(document.activeElement).blur();

                        setTimeout(function() {
                            fnModule.toggleScrollBar($('html'), 'show');
                            fnModule.toggleScrollBar($('.header'), 'show');
                        }, 300);
                    },

                    onSet: function(thingSet){

                        if($this.hasClass("datepicker__input_big-size")) {
                            if (thingSet.select != undefined) {
                                var setDate = this.get('select', 'dd.mm.yyyy');
                                $placeholder
                                    .addClass('datepicker__placeholder_active')
                                    .text(setDate);
                            } else {
                                $placeholder
                                    .removeClass('datepicker__placeholder_active')
                                    .text(placeholderText);
                            }
                        }
                    }
                });
                var date = $this.val();
                if (date) {
                    $this.pickadate('picker').set('select', date, {format: 'yyyy-mm-dd'});
                }
                
            });

        }

    };
    
    var _setupDateRangePicker = function () {
        var $rangepickerPlaceholder = $('.datepicker__placeholder');
        var $rangepicker = $('.rangepicker');
        var $rangepickerInput = $('.rangepicker__input');

        $.pickmeup.locale = {
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
        };

        $rangepickerInput.on('click', function () {
            $rangepicker.pickmeup('show');
        });

        var dateFormat = 'd.m.Y    ';

        $rangepicker.pickmeup({
            flat: true,
            mode: 'range',
            calendars: 2,
            data: [
                new Date
            ],
            change: function(formated, dates){
                
                var value = $rangepicker.pickmeup('get_date', 'd.m.Y');
                
                $rangepickerPlaceholder.html(value[0] + ' - ' + value[1]);
                $rangepickerInput.val($rangepicker.pickmeup('get_date', 'Y-m-d H:m:s'));
            }
        });

    };

    var _setupPlaceholders = function() {

        var $inputs = $('input textarea');

        if ($inputs.length) {
            $inputs.placeholder();
        }

    };

    var _morphingSearchOnFocus = function() {

        var $search = $('.search');

        if ($search.length) {

            $search.each(function() {

                var $currentSearch = $(this);

                if ($currentSearch.data('morphing')) {

                    var $wrapper = $currentSearch.find('.search__inner'),
                        $wrapperTop = $wrapper.css('top'),
                        $wrapperLeft = $wrapper.css('left'),
                        $rootSection = $currentSearch.closest($currentSearch.data('morphing-root')),
                        $rootSectionZindex = $rootSection.css('z-index');

                    var _morphing = function(e) {

                        var $this = $(this),
                            scroll = $(window).scrollTop();

                        fnModule.toggleZoom(false);

                        setTimeout(function() {
                            fnModule.toggleZoom(true);
                        }, 1000);

                        var _removeMorphing = function(e) {

                            var $target = $(e.target);
                            
                            if (e.type === 'keyup') {
                                if (e.keyCode !== 27) {
                                    return;
                                }
                                
                                // это для того, чтобы убрать фокус с инпута
                                $(':focus').blur();
                            }

                            if (e.type === 'click') {
                                if ($target.closest($wrapper).length) {
                                    return;
                                }
                            }

                            $rootSection.css('z-index', $rootSectionZindex);

                            fnModule.toggleScrollBar('body');

                            $wrapper.css({
                                'top': $wrapperTop
                            });

                            $currentSearch
                                .removeClass('search_morphing')
                                .off('click keyup', _removeMorphing)
                                .on('focus', '.search__input', _morphing);

                        };

                        $rootSection.css('z-index', 9999);
                        fnModule.toggleScrollBar('body');
                        fnModule.positionTo($wrapper, 'top');
                        $(window).scrollTop(scroll); // возвращаем скролл на то место, где он был. Это костыль для мобильных браузеров

                        $currentSearch
                            .addClass('search_morphing')
                            .off('focus', '.search__input', _morphing)
                            .on('click keyup', _removeMorphing);

                    };

                    $currentSearch.on('focus', '.search__input', _morphing);
                    
                    $('.header__search').click(function() {
                        var scroll = $(window).scrollTop();
                        
                        $('#hidden-search').trigger('focus');
                        
                        $(window).scrollTop(scroll);
                    });
                    
                    $('.j-main-search').click(function() {
                        var scroll = $(window).scrollTop();
                        
                        $('#hidden-search').trigger('focus');
                        
                        $(window).scrollTop(scroll);
                    });

                }

            });

        }

    };

    var _setupLimitedMessage = function() {

        var $limitedMessage = $('.limited-message');

        if ($limitedMessage.length) {

            $limitedMessage.each(function() {

                var $this = $(this),
                    maxLength = $this.data('max'),
                    $textarea = $this.find('.limited-message__textarea'),
                    $curVal = $this.find('.limited-message__current-val'),
                    $maxVal = $this.find('.limited-message__max-val'),
                    $progress = $this.find('.limited-message__progress-val');

                $maxVal.text(maxLength);

                $textarea.on('keyup change', function(e) {

                    var val = $textarea.val();

                    if (val.length > maxLength) {

                        val = val.slice(0, maxLength);
                        $textarea.val(val);

                    }

                    $curVal.text(val.length);

                    $progress.width(parseInt(val.length) / parseInt(maxLength) * 100 + '%');

                });

            });

        }

    };
    
    
    function isNotMax(e) {
        
        e = e || window.event;
        var target = e.target || e.srcElement;
        var code = e.keyCode ? e.keyCode : (e.which ? e.which : e.charCode)

        switch (code) {
            case 13:
            case 8:
            case 9:
            case 46:
            case 37:
            case 38:
            case 39:
            case 40:
                return true;
        }
        
        
        return target.value.length <= parseInt("0"+ target.getAttribute('data-max-charact'));
    }
    
    
    var _setupСharacterLimited = function() {

        var $limitedInput = $('.js-limiter-characters');

        if ($limitedInput.length) {

            $limitedInput.each(function () {
                
                var $self = $(this);
                
                
                function upDataLimiter(){
                                        
                    var quantityRows =  $self.val().split(/\r|\r\n|\n/).length - 1;
                    var quantityCharacters = $self.val().length + quantityRows;
                    var maxСharact = parseInt("0" + $self.attr("maxlength"));
                    var statusLine = quantityCharacters / maxСharact * 100;
                    
                    $self.parent(".input-limiter-wrapper").find(".quantity-characters").text(quantityCharacters);
                    $self.parent(".input-limiter-wrapper").find(".max-quantity-characters").text(maxСharact);
                    $self.parent(".input-limiter-wrapper").find(".status-line__completed").css({width: statusLine + "%"});
                    

                }
                
                upDataLimiter();
                
                $self.on("keydown", function(e){
                    upDataLimiter(); 
                });
                
            });
   
        }

    };
    
    
    exportObj.init = init;

    return exportObj;

})();

var appModule = (function() {

    var exportObj = {};

    var init = function() {
        svg4everybody();
        _setupSliders();
        _setupIndexContainerPadding();
        _setupTooltips();
        _textOverflowWithDots();
        _setupInputStyler();
        _setupCustomScroll();
        _setupShineMouseFollow();
        _setupAnimateNum();
        _setupModal();
        _reasonsSlider();
        _setupGallery();
        _previewTextIfLarge();
        // _spanInSupporterDesc();
        _eachButtonOnResize();
        _setupListeners();
        _initBattery();
        _video();
    };

    var _setupListeners = function() {
        $(document).on('mouseenter mouseout', '.btn_hover_pos-aware', _hoverEffectPositionAware);
        $(document).on('click', '.like', _setupLikeBtn);
        $(window).on('resize', _setupIndexContainerPadding);
        $(window).on('resize', _eachButtonOnResize);
        $(document).on('click', '.js-animate-scroll', _animateScrollLink);
        $(document).on('click', '.supporter__switch', _rollOutSupporterDesc);
        $(document).on('click', '.fund__switch', _rollOutFundDesc);
        _moveFixedHeaderOnScroll();
        _moveHelperSidebarMenuOnScroll();
        _runTypingAnimationOnScroll();
        _scrollFixedHeaderOnZoom();
        _addTriggerToAnimObjOnScroll();
        $(document).on('battery-loaded', function(e, $battery) {
            _initBattery($battery);
        });
        $(document).on('click', '.filled-btn',function(e, $battery) {
            setTimeout(function () {
                _initBattery($battery);
            }, 600);
        });
    };

    var _rollOutSupporterDesc =function(e) {
        var $this = $(this),
            $block = $this.closest('.supporter');

        $block.toggleClass('supporter_open');
    }

    var _rollOutFundDesc =function(e) {
        var $this = $(this),
            $block = $this.closest('.fund__text'),
            $text = $this.text();

        $text.toLowerCase() == "подробнее" ? $this.text('Скрыть') : $this.text('Подробнее');

        $block.toggleClass('fund__text_open');
    }

    var _spanInSupporterDesc = function() {
        $('.supporter__descr').wrapInner('<span></span>');
    }
    var _eachButtonOnResize = function() {
        $('.supporter__descr, .fund__text').each(_toggleButtonOnResize);

        function _toggleButtonOnResize() {
            if ($(this).hasClass('supporter__descr')) {
                $(this).closest('.supporter').removeClass('supporter_open');
                if($(this).find('span').height() - 6 > $(this).height()) $(this).find('.supporter__switch').show();
                if($(this).find('span').height() - 6 < $(this).height()) $(this).find('.supporter__switch').hide();
            } else if ($(this).hasClass('fund__text')) {
                $(this).removeClass('fund__text_open');
                if($(this).find('span').height() + 3 > $(this).height() && $.trim($(this).find('span').text()) != $.trim($(this).find('.fund__switch').text())) {
                    $(this).find('.fund__switch').show();
                } else {
                    $(this).find('.fund__switch').hide();
                }
            }
        }

    }

    var _previewTextIfLarge = function() {

        var $descr = $('.acts-one-info__descr')

        $('.acts-one-info__img-wrapper').imagesLoaded()
            .done( function( instance ) {

                if ($('.acts-one-info__descr').length) {

                    var $imgHeight = $('.acts-one-info__img-wrapper').height();

                    $descr.dotdotdot({
                        height: $imgHeight + 25,
                        after: "a.acts-one-info__link-more"
                    });

                }
            })
            .fail( function() {
                $descr.dotdotdot({
                    height: 250,
                    after: "a.acts-one-info__link-more"
                });

            });

        $('.js-text-trigger').on('click', function(e) {
            e.preventDefault();
            $descr.trigger("originalContent", function( content ) {

                $(this)
                    .html('')
                    .append( content )
                    .addClass('acts-one-info__descr_open');
            });
        });

    };

    var _moveFixedHeaderOnScroll = function() {

        var $transformHeader = $('.header_transform');

        var _moveHeaderOnScroll = function(e) {

            var $scroll = $(window).scrollTop(),
                $winHeight = $(window).height();

            if ($scroll > $headerHeight) {

                $transformHeader
                .removeClass('header_theme_air');

            } else {

                $transformHeader
                .addClass('header_theme_air');
            }

        }

        if ($transformHeader.length) {

            var $headerHeight = $transformHeader.height();

            _moveHeaderOnScroll();

            $(document).on('scroll', _moveHeaderOnScroll);
        }

    };

    var _scrollFixedHeaderOnZoom = function() {

        var $header = $('.header');

        var _hscrollbar = function() {

            var left =
            window.pageXOffset ? window.pageXOffset :
            document.documentElement.scrollLeft ? document.documentElement.scrollLeft :
            document.body.scrollLeft;

            $header.css('left', -left);
        };

        if ($header.length) {
            $(window).on('scroll resize', _hscrollbar);
        }

    }

    // двигает содержимое .helper-sidebar вместе со скроллом
    var _moveHelperSidebarMenuOnScroll = function() {

        var $helperSidebar = $('.helper-sidebar'),
        $sidebarMenu = $('.helper-sidebar__list');

        var _moveSidebarMenu = function(e) {

            var $scroll = $(window).scrollTop(),
            newMenuPos = $scroll - $menuOffset + $menuHeight + 'px';

            if ($scroll + $headerFixedHeight >= $sidebarOffset) {

                if ($scroll + $menuHeight <= $sidebarBottom - $menuHeight) {
                    $sidebarMenu.css('top', newMenuPos);
                }

            } else {

                $sidebarMenu.css('top', '');
            }

        }

        if ($sidebarMenu.length) {

            var $menuOffset = $sidebarMenu.offset().top,
            $menuHeight = $sidebarMenu.outerHeight(),
            $sidebarOffset = $helperSidebar.offset().top,
            $sidebarHeight = $helperSidebar.outerHeight(),
            $sidebarBottom = $sidebarOffset + $sidebarHeight,
            $headerFixedHeight = $('.header').outerHeight() || 0;

            $(document).on('scroll', _moveSidebarMenu);

        }

    };

    var _setupSliders = function() {

        var $actsSlider = $('.acts-sec__slider');

        if ($actsSlider.length) {
            $actsSlider.slick({
                slidesToShow: 3,
                slide: '.acts-sec__item',
                infinite: false
            });
        }

    };

    var _setupLikeBtn = function(e) {

        var $this = $(this);

        e.preventDefault();

        if (userAuth) {
            $this.toggleClass('like_active');
        }

    };

    var _setupTooltips = function() {

        var $tooltipElem = $('.tooltip');

        if ($tooltipElem.length) {

            $tooltipElem.each(function() {

                var $this = $(this),
                $content = $this.find('.tooltip__content'),
                $ontainerSelector = $this.data('container'),
                $container = $this.closest($ontainerSelector),
                position = {};

                // устанавливаем позицию тултипа в зависимости от содержимого data-tooltip-pos
                position.my = $this.data('position-my');
                position.at = $this.data('position-at');

                $this.qtip({
                    content: {
                        text: $content
                    },
                    position: {
                        my: position.my,
                        at: position.at,
                        container: $container
                    },
                    style: {
                        classes: 'qtip-rounded tooltip-popup'
                    },
                    show: {
                        solo: true
                    },
                    hide: 'unfocus scroll'
                });

            });

}

}

    // hover эффект position aware для кнопки
    var _hoverEffectPositionAware = function(e) {

        var $this = $(this),
        $hoverElem = $this.find('.btn__hover'),
        $parentOffset = $(this).offset(),
        relX = e.pageX - $parentOffset.left,
        relY = e.pageY - $parentOffset.top;

        $hoverElem.css({top:relY, left:relX});
    }

    // Эта функция рассчитывает нужный padding для блока .index-page__sections-col,
    // чтобы он был на уровне с другими блоками при расширении и сужении экрана
    var _setupIndexContainerPadding = function() {

        var windowWidth = document.body.clientWidth,
        $container = $('.index-page__sections-col .container');

        // Если такого блока нет на странице, отключаем обработчик
        if (!$container.length) {
            $(window).off('resize', _setupIndexContainerPadding);
        }

        if (windowWidth > 1440) {

            var containerWidth = $container.outerWidth(),
            newPadding = 150 - ((windowWidth - containerWidth) / 2);

            if (newPadding > 30) {
                $container.css('padding-right', newPadding);
            } else {
                $container.css('padding-right', 30);
            }

        } else {

            $container.css('padding-right', '');
        }

    };

    var _runTypingAnimationOnScroll = function() {

        var $animObj = $('.js-typing-anim');

        if ($animObj.length) {

            $animObj.each(function() {

                var $this = $(this);

                fnModule.triggerOnScroll($this, function() {
                    $this.typingAnimation(100);
                });

            });

        }

    };

    var pageOpenTime = new Date();

    var _initBattery = function($battery) {

        var $battery = $battery || $('.battery'),
            percent_number_step = $.animateNumber.numberStepFactories.append('%');

        if ($battery.length) {
            $battery.each(function() {

                var $this = $(this),
                    val = parseInt($this.data('val')),
                    $progressBar = $this.find('.battery__progress'),
                    $valBlock = $this.find('.battery__val');

                val = isNaN(val) ? 0 : val;

                function _triggerBattery() {
                    $progressBar.css('width', val + '%');
                    $valBlock.animateNumber({
                        number: val,
                        numberStep: percent_number_step
                    }, 1500);
                }

                fnModule.triggerOnScroll($this, function() {
                    var interval = setInterval(function() {
                        var secundsSincePageOpen = (new Date() - pageOpenTime) / 1000;

                        if(secundsSincePageOpen > 2) {
                            clearInterval(interval);
                            fnModule.triggerOnScroll($this, _triggerBattery);
                        }
                    }, 100);
                });

            });
        }

    }

    var _animateScrollLink = function(e) {

        var $this= $(this),
            $target = $($this.attr('href')),
            event = $this.data('event');

        e.preventDefault();

        fnModule.animateScroll($target, 800);

        if (event) {
            $($target).trigger(event);
        }

    };

    var _addTriggerToAnimObjOnScroll = function() {

        var $animObj = $('.js-anim-obj');

        if ($animObj.length) {

            $animObj.each(function() {

                var $this = $(this);

                $this.imagesLoaded(function() {

                    fnModule.triggerOnScroll($this, function(e) {
                        $this.addClass('trigger');
                    });

                });

            });

        }

    }

    var _setupGallery = function() {

        var $gallery = $('.gallery');

        if ($gallery.length) {

            var $photos = $gallery.find('img');

            var $grid = $gallery.masonry({
                itemSelector: '.gallery__item',
                columnWidth: '.gallery__item',
                percentPosition: true
            });

            $gallery.imagesLoaded().progress(function() {
                $grid.masonry('layout');
            });

        }

    };

    var _textOverflowWithDots = function() {

        var $textObj = $('.js-text-overflow');

        if ($textObj.length) {

            $textObj.each(function() {

                var $obj = $(this);

                $obj.dotdotdot({
                    watch: 'window'
                });

            });

        }

    };

    var _setupInputStyler = function() {

        var $inputObj = $('.js-input-styler');

        if ($inputObj.length) {

            $inputObj.styler();

        }

    };

    var _setupCustomScroll = function() {

        var $scrollElem = $('.js-custom-scroll');

        if ($scrollElem.length) {

            $scrollElem.mCustomScrollbar({
            	mouseWheelPixels: 100,
                'theme': 'custom',
                updateOnContentResize: true,
                callbacks:{
                    onScroll: function(){
                        $(this).trigger('onScroll');
                    },
                    onTotalScroll: function(){
                        $(this).trigger('onTotalScroll');
                    },
                    onTotalScrollOffset: 200
                    
                }
            });

        }

    };

    var _setupShineMouseFollow = function() {

        var $shineMouseObj = $('.js-shine-mouse');

        if ($shineMouseObj.length) {

            $shineMouseObj.each(function(i, el) {
                $(el).text($.trim($(el).text()));
                var shine = new Shine(el);

                function handleMouseMove(event) {
                    shine.light.position.x = event.clientX;
                    shine.light.position.y = event.clientY;
                    shine.draw();
                }

                window.addEventListener('mousemove', handleMouseMove, false);
            });

        }

    };

    var _setupAnimateNum = function() {

        var $animateNum = $('.js-animate-num');

        if ($animateNum.length) {

            $animateNum.each(function(i, el) {

                $(el).animateNumber({
                    number: +$(el).text(),
                    numberStep: $.animateNumber.numberStepFactories.separator('\u00A0')
                },
                2000);

            });

        }

    }

    var _setupModal = function () {

        var $modal = $('.js-modal');

        if ($modal.length) {

            var w1,
            w2,
            diff,
            headerPaddingOrigin = $(".header").css("padding-right"),
            bodyMarginOrigin = $("body").css("margin-right"),
            wrapNotOverflowHidden;

            $(document).on('click', '.js-modal', function() {
                var el = this;
                $('#' + $(el).attr('data-modal')).arcticmodal({
                    beforeOpen: function(data, el) {
                        wrapNotOverflowHidden = $(data.wrap).css('overflow')!='hidden';

                        if (wrapNotOverflowHidden) {
                            w1 = $(data.wrap).outerWidth(true);
                            $(data.wrap).css('overflow', 'hidden');
                            w2 = $(data.wrap).outerWidth(true);
                            diff = w2 - w1;

                            $(".header").css("padding-right", diff);
                            $("body").css("margin-right", diff);
                        }
                    },
                    afterOpen: function(data, el) {
                        if ( ($('.box-modal:visible').not($(el)).length) && ($(el).attr('data-single') == 'true') ) {
                            $('.box-modal:visible').not($(el)).arcticmodal('close');
                        }
                    },
                    afterClose: function(data, el) {
                        if (!$(".box-modal:visible").length) {
                            $(data.wrap).css('overflow', 'auto');
                            $(".header").css("padding-right", headerPaddingOrigin);
                            $("body").css("margin-right", bodyMarginOrigin);
                        }
                    }
                });
            });

            $(document).on('click', '.arcticmodal-close', function() {
                $(this).closest('.box-modal').arcticmodal('close');
            });

        }
    }

    var _reasonsSlider = function() {

        var $slider = $(".js-reasons-slider");

        if ($slider.length) {
            $slider.slick({
                infinite: true,
                dots: true,
                autoplay: true,
                prevArrow: '.js-reasons-slider-nav__prev',
                nextArrow: '.js-reasons-slider-nav__next',
                appendDots: '.js-reasons-slider-pager',
                customPaging: function (slider, i) {
                    return ' ';
                }
            });
        }

    };

    var _video = function (e) {

        var tv,
            playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3, loop: 1},
            vid = [],
            $player = $('#player'),
            videoId = $player.attr('data-videoId'),
            startSeconds = $player.attr('data-startSeonds'),
            endSeconds = $player.attr('data-endSeconds'),
            suggestedQuality = $player.attr('data-suggestedQuality'),
            play = $player.attr('data-play') == 'play' ? true : false;

        vid.push({
            'videoId' : videoId,
            'startSeconds' : startSeconds,
            'endSeconds' : endSeconds,
            'suggestedQuality' : suggestedQuality,
        });
        var randomvid = Math.floor(Math.random() * (vid.length - 1 + 1));

        if ($player.length) {

            function loadPlayer() {

                if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {

                    var tag = document.createElement('script');
                    tag.src = "https://www.youtube.com/iframe_api";
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                    window.onYouTubePlayerAPIReady = function() {
                        onYouTubePlayerAPIReady();
                    };

                } else {

                    onYouTubePlayerAPIReady();

                }
            }

            loadPlayer();
        }

        function onYouTubePlayerAPIReady() {
            tv = new YT.Player('player', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
        }

        function onPlayerReady(){
            //
            // if (!play) {
            //     return;
            // }

            tv.loadVideoById(vid[randomvid]);
            tv.mute();
        }

        function onPlayerStateChange(e) {
            if (e.data === 1){
                setTimeout(function () {
                    $('.player').addClass('active');
                }, 1000);
            } else if (e.data === 0){
                tv.seekTo(vid[randomvid].startSeconds)
            }
        }

        function vidRescale(){
            if (!$player.length) {
                return;
            }

            var w = $(window).width()+200,
                h = $(window).height()+200;

            if (w/h > 16/9){
                tv.setSize(w, w/16*9);
                $('.player__screen').css({'left': '0px'});
            } else {
                tv.setSize(h/9*16, h);
                $('.player__screen').css({'left': -($('.player__screen').outerWidth()-w)/2});
            }
        }

        $(window).on('load resize', function(){
            vidRescale();
        });

    };



    exportObj.init = init;

    return exportObj;

})();

var addActModule = (function() {

    var exportObj = {};

    var ajaxSettings = {
        success: function() {
            console.log('success');
        },
        error: function() {
            console.log('error');
        }
    };

    var $addAct = $('.add-act'),
        $mainPart = $addAct.find('.add-act__main'),
        $screens = $addAct.find('.add-act__screen:not(.add-fond-popup)'),
        $steps = $addAct.find('.add-act__steps-item'),
        $navBtnPrev = $addAct.find('.add-act__nav-btn_prev'),
        $navBtnNext = $addAct.find('.add-act__nav-btn_next' ),
        $addPhoto = $addAct.find('.j-addphoto'),
        $addPhotoBefore = $('.j-add-act-before-photo'),
        $categoriesInput = $addAct.find('#input__category_id'),
        $occasionsInput = $addAct.find('#input__reason_id'),
        $dateInput = $addAct.find('#behavior-date'),
        $infoInputs = $addAct.find('.add-act__info [required]'),
        $fundInput = $addAct.find('#input__fund_id'),
        $form = $addAct.find('#fund-registration-form'),
        currentStep = 0,
        steps = [
            'enabled', // первый шаг - выбор категории
            'enabled', // второй шаг - выбор повода
            'enabled', // третий шаг - информация о поступке
            'enabled'  // четвертый шаг - выбор фонда
        ],
        firstStep = 0,
        lastStep = steps.length - 1,
        currentStepValid = false;

    // remove fund selection for projects behavior
    if ($("#input__project_id").val() != '') {
        lastStep--;
    }


    var init = function() {

        if ($addAct.length) {
            setStep(_getIndexAnchor());

            _validate();

            _setupListeners();
        }
        _setupImgPreview();
        
        createActsSlider();
        
        $(document).on('reinit-sliders', '#fund-registration-form .funds-list', function(e) {
            createActsSlider();
        });
    };

    function createActsSlider() {
        var $fundsSlider = $('.funds-slider');

        var $acts = $('.funds-list__acts');
        var $item = $('.funds-slider__item');

        $fundsSlider.hide();

        $acts.on('click', function() {
            $fundsSlider.hide();
            var next = $(this).closest('.funds-list__item').next();
            next.show();
            if(!next.hasClass('slick-slider')) {
                next.slick({
                    infinite: false,
                    slidesToShow: 4,
                    slidesToScroll: 1
                });
            }
        });

        $item.on('click', function() {
            $item.removeClass('_active');
            $(this).addClass('_active');
            $('#input__project_id').val($(this).attr('data-id'));
        });
    } 
    
    var _setupImgPreview = function () {
        PreviewImages('<div class="ovh max-block centriner js-thumbnail">' +
            '<div class="centriner__item">' +
            '<img class="max-img" src="" alt=""/></div>' +
            '</div>', $addPhoto, 'replace-input');
        /*
         PreviewImages('<li class="add-photo__item-wrapper"> ' +
         '<div class="user-photo add-photo__item"> <div class="user-photo__img-wrapper">' +
         '<img src="http://loremflickr.com/150/150" srcset="http://loremflickr.com/300/300 2x"' +
         ' class="user-photo__img add-photo__img" alt="" role="presentation"> </div>' +
         ' <button title="Удалить фотографию" class="user-photo__remove j-PreviewImage-remove">' +
         'Удалить фотографию </button> </div> </li>', $addPhotoBefore, 'before, cached, remove');*/
    };

    var _setupListeners = function() {
        $addAct.on('click', _clickListener);

        $infoInputs.on('change', function(e) {
            _validate();
        });

        $addPhoto.on('change', function(e) {
            if (this.files && this.files[0]) {
                var maxFileSize = parseInt($addPhoto.data('max-size')),
                    $wrapper = $addPhoto.closest('.add-photo__item-wrapper'),
                    $errorMessage = $wrapper.find('.help-block'),
                    fileSize = this.files[0].size;

                if (fileSize > maxFileSize) {
                    $addPhoto.val('');
                    $errorMessage.show();
                    $wrapper.find('.add-photo__item').removeClass('PreviewImage-loaded');
                    $wrapper.find('.js-thumbnail').remove();

                } else {

                    $errorMessage.hide();
                }

                _validate();
            }
        });
    };

    var _validate = function() {
        var valid = false;

        switch (currentStep) {
            case 0:
                if ($categoriesInput.val()) {
                    valid = true;
                }
                break;

            case 1:
                if ($occasionsInput.val()) {
                    valid = true;
                }
                break;

            case 2:
                valid = true;

                $infoInputs.each(function() {
                    var $this = $(this),
                        val = $this.val();

                    if (!val.length) {
                        valid = false;
                        return;
                    }
                });

                break;

            case 3:
                if ($fundInput.val()) {
                    valid = true;
                }
                break;
        }

        if (valid === true) {
            $navBtnNext.removeClass('btn_disabled');
        } else {
            $navBtnNext.addClass('btn_disabled');
        }

        return currentStepValid = valid;
    };

    var disableStep = function(stepNum) {
        steps[stepNum] = 'disabled';
        $steps.eq(stepNum).hide();

        if (stepNum === lastStep) {
            while (stepNum >= 0) {
                lastStep--;
                if (steps[lastStep] === 'enabled') {
                    break;
                }
            }

        }

        if (stepNum === firstStep) {

            while (stepNum < steps.length) {
                firstStep++;
                if (steps[firstStep] === 'enabled') {
                    break;
                }
            }
        }
    }

    var enableStep = function(stepNum) {
        steps[stepNum] = 'enabled';
        $steps.eq(stepNum).show();

        if (stepNum > lastStep) {
            lastStep = stepNum;
        }

        if (stepNum < firstStep) {
            firstStep = stepNum;
        }
    }

    var setStep = function (newStep) {

        if (newStep == undefined || newStep < firstStep || newStep > lastStep) return;

        var $screenActive = $screens.filter('.add-act__screen_active'),
            $screenNext = $screenActive.next('.add-act__screen'),
            $screenPrev = $screenActive.prev('.add-act__screen' ),
            $item = $screens.eq(newStep);

        $screenActive.removeClass('add-act__screen_active');

        $item
            .fadeIn(400, function() {
                $item
                    .addClass('add-act__screen_active')
                    .css({
                        'opacity': '',
                        'display': ''
                    });
            });

        $steps
            .removeClass('add-act__steps-item_active')
            .eq(newStep)
            .addClass('add-act__steps-item_active');

        fnModule.animateScroll($('.main'));

        // Если это последний шаг, то меняем текст кнопки "Следующий шаг" на "Опубликовать"
        if (newStep === lastStep) {
            $navBtnNext.text('Опубликовать');
        } else {
            $navBtnNext.text('Следующий шаг');
        }

        // Если это первый шаг, то скрываем кнопку "Назад", если не первый, то показываем
        if (newStep === firstStep) {
            $navBtnPrev.addClass('add-act__nav-btn_hidden');
            $navBtnNext.addClass('add-act__nav-btn_hidden');
            
        } else {
            if ($navBtnNext.hasClass('add-act__nav-btn_hidden')) {
                $navBtnNext.removeClass('add-act__nav-btn_hidden');
            }

            if ($navBtnPrev.hasClass('add-act__nav-btn_hidden')) {
                $navBtnPrev.removeClass('add-act__nav-btn_hidden');
            }
        }

        _changeUrlStep(newStep);

        currentStep = newStep;

        _validate();
    };

    var _getIndexAnchor = function () {
        var isStep = window.location.hash.indexOf('#step_') >= 0 ? true : false,
            stepNum = parseInt(window.location.hash[6]);

        if (!isStep || !$.isNumeric(stepNum) || stepNum > steps.length - 1) return undefined;

        return stepNum;
    };

    var _changeUrlStep = function ( step ) {
        var queryStart = window.location.hash.indexOf('?'),
            queryString = queryStart >= 0 ? window.location.hash.slice(queryStart) : '';

        Events.trigger('AddActModule.change', 'step_' + step + queryString);
    };

    var _clickListener = function(e) {

        var $this = $(this),
            $target = $(e.target),
            $navBtn = $target.closest('.add-act__nav-btn'),
            $categoriesItem = $target.closest('.add-act__categories-item'),
            $occasion = $target.closest('.add-act__occasions-item'),
            $chooseStep = $target.closest('.j-set-step'),
            $fund = $target.closest('.add-act__funds-item');

        if ($chooseStep.length) {
            e.preventDefault();

            var targetStep = parseInt($chooseStep.data('step'));

            if (targetStep >= currentStep) return;

            setStep(targetStep);
        }

        if ($navBtn.length) {
            if ($navBtn.hasClass('default_behavior')) {
                return;
            }
            e.preventDefault();

            if ($navBtn.hasClass('btn_disabled')) {
                return;
            }

            var $activeScreen = $screens.filter('.add-act__screen_active'),
                newStep = currentStep;

            for (var i = 0; i <= 5; i++) {
                // Если нажата кнопка "вперед", добавляем 1 шаг, если назад, отнимаем
                newStep = $navBtn.is($navBtnNext) ? ++newStep : --newStep;

                // Если мы на последнем шаге и жмем на кнопку "Впёред", то отправляем данные через ajax
                if (newStep > lastStep) {
                    $target.closest('form').submit();
                    return;
                }

                // Проверяем новый шаг, если он не заблокирован, прерываем цикл
                if (steps[newStep] === 'enabled') {
                    break;
                }
            }

            setStep(newStep);
        }

        if ($categoriesItem.length) {
            e.preventDefault();

            // if ($categoriesItem.hasClass('add-act__categories-item_selected')) {
            //     return;
            // }

            var val = $categoriesItem.data('val'),
                nextStep = $categoriesItem.data('step');

            $categoriesItem
                .addClass('add-act__categories-item_selected')
                .siblings()
                .removeClass('add-act__categories-item_selected');

            if ($categoriesItem.hasClass('js-my-act')) {
                disableStep(1);
            } else {
                enableStep(1);
            }

            $categoriesInput.val(val);

            _validate();

            if ($target.hasClass('add-act__categories-btn')) {

                var $step = $('.add-act__categories-item_selected').find('.add-act__categories-btn').data('step');
                setStep($step);
            }

            setStep(nextStep);
        }

        if ($occasion.length) {
            e.preventDefault();

            if ($occasion.hasClass('add-act__occasions-item_selected')) {
                return;
            }

            var val = $occasion.data('val'),
                date = $occasion.find('time').attr('datetime');

            $occasion
                .addClass('add-act__occasions-item_selected')
                .siblings()
                .removeClass('add-act__occasions-item_selected');

            $occasionsInput.val(val);

            if (date) {
                $dateInput.pickadate('picker').set('select', date, { format: 'yyyy-mm-dd' });
            } else {
                $dateInput.pickadate('picker').clear();
            }

            _validate();
        }

        if ($fund.length) {
            e.preventDefault();

            if ($fund.hasClass('add-act__funds-item_selected')) {
                return;
            }

            var val = $fund.data('val');

            $fund
                .addClass('add-act__funds-item_selected')
                .siblings()
                .removeClass('add-act__funds-item_selected');

            $fundInput.val(val);

            _validate();
        }
    };

    exportObj.init = init;
    exportObj.setStep = setStep;
    exportObj.disableStep = disableStep;
    exportObj.enableStep = enableStep;

    return exportObj;

})();

var donationModule = (function() {
    
    var exportObj = {};
    
    var $donation = $('.donation'),
        $donationForm = $donation.find('.donation__form'),
        $screens = $donation.find('.donation__screen'),
        $steps = $donation.find('.donation__step'),
        $nextBtn = $donation.find('.donation__btn-next'),
        $methodRadio = $('.donation__payment_method :radio'),
        $donationLabel = $('.donation__label_payment'),
        $typeRadio = $('.donation__payment_type :radio'),
        $isAgree = $('#donation-is_agree'),
        $submitBtn = $donation.find('.btn[type="submit"]'),
        $loginBtn = $donation.find('.auth-soc__socials .socials__link'),
        currentStep = 0;

        
    var init = function() {
        _setupListeners();

        _typeChangeListener();
        
        $.removeCookie('donation-form');
        
    };

    var _saveForm = function() {
        var form = JSON.stringify($donation.find('form').serializeArray());
        $.cookie('donation-form', form, {expires: 1, path: '/'});
        
    }
    
    var _setupListeners = function() {
        
        if ($donation.length) {
            
            $donation.on('click', _clickListener);
            $donation.on('submit', _submitListener);
            
        }

        if ($typeRadio.length) {

            $typeRadio.change(function() {
                _typeChangeListener();
            });
            
        }
        
        if ($loginBtn.length) {
            $loginBtn.click(function(e) {
                _saveForm();
            });
        }
        
        if ($isAgree.length) {
            $isAgree.on('input change', function(e) {

                if ($isAgree.prop('checked')) {
                    $submitBtn.removeClass('btn_disabled');
                    $submitBtn.removeAttr('disabled');
                } else {
                    $submitBtn.addClass('btn_disabled');
                    $submitBtn.attr('disabled', 'disabled');
                }
            });
        }
        
    };
    
    var _submitListener = function(e) {
        
        var $this = $(this),
            $target = $(e.target),
            $donationFormSubmited = $target.closest('.donation__form');
        
        if ($donationFormSubmited.length) {
            e.preventDefault();
        }
    };

    var _typeChangeListener = function() {
        if ($methodRadio.length) {

            var curType = $typeRadio.filter('.custom-input__hidden:checked').val();

            $methodRadio.parent().hide();
            $donationLabel.hide();
            
            $donationLabel.filter('.type-' + curType).show();

            $('.form__row.type').hide();
            $('.form__row.type').find('input').removeAttr('required');
            
            $donationLabel.filter('.type-' + curType).show();
            $('.form__row.type-' + curType).show();
            $('.form__row.type-' + curType).find('input').attr('required', 'required');

            $methodRadio.parent().filter('.type-' + curType).show()
                .find(':radio').eq(0).prop('checked', true);
        }
    };
    
    var setStep = function(num) {
        var $screenActive = $screens.filter('.donation__screen_active'),
            $newScreen = $screens.eq(num);
        
        if ($newScreen.is($screenActive)) {
            return;
        }
        
        $screenActive.removeClass('donation__screen_active');
        $newScreen
            .fadeIn(400, function() {
                $newScreen
                    .addClass('donation__screen_active')
                    .css({
                        'opacity': '',
                        'display': ''
                    });
            });
            
        $steps
            .removeClass('donation__step_active')
            .eq(num)
            .addClass('donation__step_active');
            
        fnModule.animateScroll($('.main'));
    }
    
    var _clickListener = function(e) {
        
        var $this = $(this),
            $target = $(e.target),
            $prevBtnClicked = $target.closest('.donation__btn-prev'),
            $nextBtnClicked = $target.closest('.donation__btn-next');

        if ($nextBtnClicked.length) {
            e.preventDefault();
            setStep(++currentStep);
        }
        
        if ($prevBtnClicked.length) {
            e.preventDefault();
            setStep(--currentStep);
        }
        
    };
    
    exportObj.init = init;
    exportObj.setStep = setStep;
    
    return exportObj;
    
})();

var cabinetModule = (function () {

    var exportObj = {};

    var init = function () {
        _setupListeners();
        _setupChart();
        _setupPreview();
    };

    var _setupPreview = function () {
        PreviewImages('<div class="ovh max-block centriner">' +
            '<div class="centriner__item">' +
            '<img class="max-img" src="" alt=""/></div></div>', $('.j-preview-avatar'), 'replace-input');
    };

    var _setupListeners = function () {

    };

    var _setupChart = function () {

        var $container = $( '#chart-container' );

        $container.highcharts( {
            chart: {
                type: 'column',
                inverted: true
            },
            title: {
                text: ''
            },
            xAxis: {
                lineColor: '#000',
                type: 'category',
                tickColor: '#fff',
                labels: {
                    rotation: 0
                },
            },
            yAxis: {
                min: 0,
                lineColor: '#000',
                opposite: true,
                gridLineColor: '#000',
                gridLineWidth: 0,
                lineWidth: 1,
                tickLength: 10,
                tickWidth: 1,
                tickColor: '#000',
                tickInterval: 50000,
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return Highcharts.numberFormat( this.value, 0 );
                    }
                }

            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: ''
            },
            plotOptions: {
                series: {
                    pointWidth: 20
                }
            },
            series: [ {
                name: '',
                color: '#4682B4',
                data: [
                    [ 'vis', 430000 ],
                    [ 'util', 180000 ],
                    [ 'animate', 100000 ],
                    [ 'query', 90000 ],
                    [ 'analytics', 50000 ],
                    [ 'scale', 45000 ],
                    [ 'data', 43000 ],
                    [ 'physics', 40000 ],
                    [ 'display', 35000 ],
                    [ 'flex', 10000 ]
                ]
            } ],
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            }
        } );

    };


    exportObj.init = init;

    return exportObj;

})();


var occasionsModule = (function() {

    var exportObj = {};

    var $occassionsContainer = $('.occasions-sec');

    var _setupListeners = function() {
    };
    
    exportObj.init = function() {
        _setupListeners();
    };

    return exportObj;

})();

var newsModule = (function() {

    var exportObj = {};

    var $newsContainer = $('.news-sec');

    var _setupListeners = function() { };
    
    exportObj.init = function() {
        _setupListeners();
    };

    return exportObj;

})();

'use strict';

/**
 * Created by snatvb on 10.03.2016.
 */

var AddPhotoModule = (function () {
    var init = function () {
        _addListenFile();
        _addRemoveFile();
    };
    
    var _addListenFile = function () {
        var $template = $( '<li class="add-photo__item-wrapper">' +
            '<div class="user-photo add-photo__item">' +
            '<div class="user-photo__img-wrapper"><img src="" ' +
            'class="user-photo__img add-photo__img" alt="" role="presentation">' +
            '</div>' +
            '<button title="Удалить фотографию" class="user-photo__remove">Удалить фотографию' +
            '</button>' +
            '</div>' +
            '</li>' );
        var loadCount = 0;

        // Замена изображения друг на друга

        $( 'body' ).on( 'change', '.j-upload-photo-simple', function ( e ) {
            var $tmpl, $this = $(this), $self =  $(this).clone();

            if ( window.File && window.FileReader && window.FileList && window.Blob ) {

                for ( var i = 0; i < e.target.files.length; i++ ) {
                    var reader = new FileReader;

                    reader.readAsDataURL( e.target.files[ i ] );
                    $tmpl = $template.clone();

                    $this.after($self);

                    reader.onload = function (e) {

                        $tmpl.find('.add-photo__img').attr('src', e.target.result);
                        $('.add-photo__list').html($tmpl);

                        _addRemoveFile($tmpl.find('.user-photo__remove'));

                        $tmpl.find('.add-photo__item').append($this);

                    };
                }

            } else {
                var val = e.target.value;
                if ( !val ) return;
                val = val.split( '\\' );
                $tmpl = $template.clone();
                $tmpl.find( '.user-photo__img-wrapper' ).html( val[ val.length - 1 ] );
                $this.parents( '.add-photo__item-wrapper' ).before( $tmpl );
                _addRemoveFile( $tmpl.find( '.user-photo__remove' ) );
            }
        });
        
        $( 'body' ).on( 'change', '.j-upload-photo', function ( e ) {
            var $tmpl, $this = $(this), $self =  $(this).clone();
            
            if ( window.File && window.FileReader && window.FileList && window.Blob ) {
                
                for ( var i = 0; i < e.target.files.length; i++ ) {
                    var reader = new FileReader;
                    
                    reader.readAsDataURL( e.target.files[ i ] );
                    $tmpl = $template.clone();
                    
                    $this.after($self);

                    reader.onload = function (e) {

                        $tmpl.find('.add-photo__img').attr('src', e.target.result);
                        $('.add-photo__list').prepend($tmpl);

                        _addRemoveFile($tmpl.find('.user-photo__remove'));

                        $tmpl.find('.add-photo__item').append($this);

                    };
                }

            } else {
                var val = e.target.value;
                if ( !val ) return;
                val = val.split( '\\' );
                $tmpl = $template.clone();
                $tmpl.find( '.user-photo__img-wrapper' ).html( val[ val.length - 1 ] );
                $this.parents( '.add-photo__item-wrapper' ).before( $tmpl );
                _addRemoveFile( $tmpl.find( '.user-photo__remove' ) );
            }
        });
    };

    var _addRemoveFile = function ( btn ) {
        var remove = function ( btn ) {
            var
                uploadInputs = $('.j-upload-photo-input'),
                parent = btn.parents( '.add-photo__item-wrapper' ),
                parentIndex = parent.index();
                
            uploadInputs.eq(parentIndex).remove();
            parent.remove();
            btn.parents( '.cabinet__user-photo' ).remove();
        };
        if ( btn ) {
            btn.on(  'click', function ( event ) {
                event.preventDefault();
                remove( $( this ) );
            } );
            return;
        }
        var blocks = $( '.user-photo__remove' );
        blocks.on( 'click', function ( event ) {
            event.preventDefault();
            remove( $( this ) );
        } );
    };

    //add
    function handleFileSelect(event) {
        var files = event.target.files;

        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            renderFileInfo(file);
        }
    }

    function onFileLoad($input, callback) {
        var file = $input.get(0).files[0],
            reader = new FileReader();

        reader.onload = (function(imageFile) {
            return function(e) {
                callback(e);
            }
        })(file);

        reader.readAsDataURL(file);
    }

    // $(function() {
    //     var $fileInput = $('.js-file-box[type=file]');
    //     var $imageArea = $('.add-photo__img ');
    //     var fileInfo;

    //     $fileInput.on('change', getFileInfo);

    // });

    $('.js-remove-img').on('click', function () {
        $('.user-photo').remove();
    });
    
    $('body').on('click', '.js-remove-list', function () {
        $(this).parents('.report-block__months-item').get(0).remove();
    });

    $('body').on('click', '.js-remove-img', function () {
        console.log(this);
        $(this).closest('.add-photo__item-wrapper').remove();

    });

    $( function(){
        $( '.js-file-box' ).each( function(){
            var $input     = $( this ),
                $label     = $input.next( 'label' ),
                labelVal = $label.html();

            $input.on( 'change', function( e )
            {
                var fileName = '';

                if( this.files && this.files.length > 1 )
                    fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
                else if( e.target.value )
                    fileName = e.target.value.split( '\\' ).pop();

                if( fileName )
                    $label.find( 'span' ).html( fileName );
                else
                    $label.html( labelVal );
            });

            // Firefox bug fix
            $input
                .on( 'focus', function(){ $input.addClass( 'has-focus' ); })
                .on( 'blur', function(){ $input.removeClass( 'has-focus' ); });
        });
    });
    
    return { 
        init: init,
        onFileLoad: onFileLoad
    };
})();

var fundModule = (function () {

    var exportObj = {};

    var $form = $('#fund-registration-form'),
        $fields = $form.length ? $($form.get(0).elements) : null,
        $submitBtn = $form.find('.btn[type="submit"]');

    function init() {
        loadDoc();
        _setupPreview();
        if ($form.length) {
            regFundValidation();
        }

        $('.add-report').each(function() {
            _addReport($(this));
        });
    }

    var _setupPreview = function () {
        PreviewImages( '<div class="ovh max-block__height centriner centriner__wa">' +
            '<img class="max-img" src="" alt=""/></div>', $( '.j-preview-logo' ), 'replace-input' );
    };

    function regFundValidation() {
        var valid = true,
            $fieldForValidation = $fields.filter(':not([type="hidden"]):not([type="submit"])');

        $fieldForValidation.each(function() {
            var $field = $(this);

            if ($field.is('#fund-register-form-is_agree')) {
                if (!$field.prop('checked')) {
                    return valid = false;
                }
            }

            //if (!$field.val()) {
            //    return valid = false;
            //}
        });

        if (valid && $submitBtn.hasClass('btn_disabled')) {
            $submitBtn
                .removeClass('btn_disabled')
                .removeAttr('disabled');
        } else if (!valid && !$submitBtn.hasClass('btn_disabled')) {
            $submitBtn
                .addClass('btn_disabled')
                .attr('disabled', 'disabled');
        }

        return valid;
    }
    
    function loadDoc() {
        var $regDocList = $('.reg-docs-list'),
            $regDocItem = $regDocList.find('.reg-docs-list__item');

        function docInput($input) {
            var file = Object.create(null),
                $docItem = $input.closest('.reg-docs-list__item');

            file.fullName = $input.val().split('\\').pop();
            file.name = file.fullName.split('.');
            file.ext = file.name.pop();
            file.name = file.name.join();

            if(file.fullName) {
                var $inputDefaultText = $docItem.find('.upload-file__upload-word'),
                    $inputNewText = $docItem.find('.upload-file__change-word'),
                    $docName = $docItem.find('.reg-docs-list__value');

                if ($inputDefaultText.is(':visible')) {
                    $inputDefaultText.hide();
                    $inputNewText.show();
                }

                $docName.text(file.fullName);

                $docItem.addClass('reg-docs-list__item_active');
            }
        }

        $regDocItem.each(function() {
            var $this = $(this),
                $input = $this.find('.upload-file__input');

            docInput($input);
        });

        $regDocItem.on('change', function(e) {
            var $this = $(this),
                $target = $(e.target);

            docInput($target);
        });
    }

    function _addReport($block) {
        var template = '',
            $form = $block.is('form') ? $block : $block.find('form'),
            $inputs = $block.find('.add-report__input'),
            $submitBtn = $block.find('.add-report__btn'),
            $resultWrapper = $block.find('.add-report__result'),
            type = $block.data('type'),
            valid = false,
            ready = false,
            ajaxSubmit = (typeof window.FormData === 'function'),
            photo;

        $block.on('click', '.report-block__change', function() {
            var $monthFileInput = $inputs.filter('.add-report__input_month-file');
                $monthDateInput = $inputs.filter('.add-report__input_month');
                
            $monthDateInput.attr('value', $(this).attr('data-date'));
            $monthDateInput.val($(this).attr('data-date'));
            $monthFileInput.trigger('click');
            $monthFileInput.one('change', function(e) {
                var data;
                data = new FormData($form.get(0));
                data.append('form_type', 'month');

                _ajax(data);
            });
        });
            
        switch (type) {
            case 'year':
                template +=
                    '<li class="add-photo__item-wrapper">' +
                        '<div class="add-report__year"></div>' +
                        '<div class="user-photo add-photo__item">' +
                            '<div class="user-photo__img-wrapper">' +
                                '<img src="" class="user-photo__img add-photo__img" alt="" role="presentation">' +
                            '</div>' +
                            '<button title="Удалить отчет" class="year_report-block__remove user-photo__remove js-remove-img" data-id="0">' +
                                'Удалить отчет' +
                            '</button>' +
                        '</div>' +
                    '</li>';
                break;

            case 'month':
                template +=
                    '<li class="report-block__months-item">' +
                        '<div class="link-file">' +
                            '<svg class="link-file__icon">' +
                                '<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="i/icons.svg#icon-doc-min"></use>' +
                            '</svg>' +
                        '</div>' +
                        '<div class="report-block__actions">' +
                            '<a class="link-base report-block__change" href="javascript:void(0)"> изменить </a>' +
                            '<button title="Удалить" class="report-block__remove js-remove-list" data-id="0">' +
                                'Удалить' +
                            '</button>' +
                        '</div>' +
                    '</li>';
                break;
        }

        $block.on('submit', function(e) {
            if (ajaxSubmit || !ready) {
                e.preventDefault();
            }
        });

        $block.on('input change', function(e) {
            valid = true;

            $inputs.each(function() {
                var $this = $(this);
                if (!_validate($this)) {
                    valid = false;
                    return;
                }
            });

            if (valid) {
                $submitBtn.removeClass('btn_disabled');
            } else {
                $submitBtn.addClass('btn_disabled');
            }
        });

        $block.on('click', function(e) {
            var $target = $(e.target),
                $submitBtnClicked = $target.closest('.add-report__btn');

            if ($submitBtnClicked.length && valid) {
                var data,
                    $result = $(template);

                if (ajaxSubmit) {
                    data = new FormData($form.get(0));
                }

                if (type === 'year') {
                    data.set('form_type', 'year');

                    var $yearWrapper = $result.find('.add-report__year'),
                        $yearInput = $inputs.filter('.add-report__input_year'),
                        $year = $(document.createTextNode($yearInput.val()))
                        $poster = $result.find('.add-photo__img'),
                        $posterInput = $inputs.filter('.add-report__input_poster'),
                        $yearFile = $inputs.filter('.add-report__file_year'),
                        $deleteLink = $result.find('.report-block__remove');

                    $resultWrapper.find('.add-photo__item-wrapper').each(function() {
                        var $this = $(this),
                            year = parseInt($this.find('.add-report__year').text()),
                            newYear = parseInt($yearInput.val());

                        if (year === newYear) {
                            $this.remove();
                        }
                    });

                    $yearWrapper.append($year);

                    $('#add-report-block').arcticmodal();

                    AddPhotoModule.onFileLoad($posterInput, function(e) {
                        $poster.attr('src', e.target.result);
                    });

                    data.set('date', $yearInput.val());
                    data.set('doc_file', $yearFile.get(0).files[0]);
                    data.set('year_poster', $posterInput.get(0).files[0]);
                }
                else if (type === 'month') {
                    data.append('form_type', 'month');

                    var $wrapper = $result.find('.link-file'),
                        $monthInput = $inputs.filter('.add-report__input_month'),
                        monthNum = parseInt($monthInput.val().split('.')[0]),
                        year = $monthInput.val().split('.')[1],
                        monthes = ['Январь', 'Февраль', 'Март', 'Апрель',
                                   'Май', 'Июнь', 'Июль', 'Август',
                                   'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                        $text = $(document.createTextNode(monthes[monthNum - 1] + ' ' + year));

                    $resultWrapper.find('.report-block__months-item').each(function() {
                        var $this = $(this),
                            text = $this.find('.link-file').get(0).textContent.trim();

                        if ($text.text().trim() === text) {
                            $this.remove();
                        }
                    });

                    $wrapper.append($text);
                    
                    $result.find('.report-block__change').attr('data-date', $monthInput.val());
                    $('#add-report-block').arcticmodal();
                }
                else if (type == 'message') {
                    data.set('form_type', 'message');
                    data.set('report_description', $('#report_description').val());
                }

                $resultWrapper.append($result);

                _ajax(data);
            }
        });

        function _ajax(data) {
            ready = true;

            if (!ajaxSubmit) {
                $form.submit();
                return;
            }

            $.ajax({
                data: data,
                type: 'POST',
                dataType: 'json',
                processData: false,
                contentType: false,
                success: function(databack) {
                    if (databack.reset) {
                        _reset();
                    }

                    if (databack.id) {
                        var $deleteLink = $('.report-block__remove').filter('[data-id=0]');
                        $deleteLink = $deleteLink.length ? $deleteLink : $('.user-photo__remove').filter('[data-id=0]')
                        $deleteLink.data('id', databack.id);
                        $deleteLink.attr('data-id', databack.id);
                    }
                }
            });
        }

        function _validate($input) {
            if ($input.hasClass('.js-input-mask')) {
                return $input.inputmask("isComplete");
            } else {
                return !!$input.val().length;
            }
        }

        function _reset() {
            $inputs.each(function() {
                var $this = $(this);

                $this
                    .val('')
                    .trigger('change');
            });

            ready = false;
        }
    }

    $(document).on('click', '.report-block__remove, .year_report-block__remove', function () {
        $.ajax({
            data: {'form_type': 'delete', 'id': $(this).data('id')},
            type: 'POST'
        });
    });

    $form.on('change', regFundValidation);

    exportObj.init = init;
    return exportObj;

})();

var actOneModule = (function () {

    var exportObj = {};

    var $tabs = $('.tabs_acts-one'),
        $hideTab = $('.tabs__nav-link[data-hide]'),
        $hideBlock = $('.' + $hideTab.attr('data-hide')),
        $hideCont = $hideTab.closest('.act-columns__content-left');

    function init() {
        _hideSupport(); 
    }

    var _hideSupport = function() {
        if ($tabs.length) {
            $tabs.on('easytabs:before tabs:init', function(e, $activeTab, $activePanel) {
                if ($activeTab.is($hideTab)) {
                    $hideBlock.hide();
                    $hideCont.addClass('act-columns__content-left_base');
                    
                } else {
                    
                    $hideBlock.show();
                    $hideCont.removeClass('act-columns__content-left_base');
                }
            });
        }
    };

    exportObj.init = init;
    return exportObj;

})();

$(function() {
    AnchorController.init();
    fnModule.init();
    animationsModule.init();
    actOneModule.init();
    tabsModule.init();
    toggleModule.init();
    formModule.init();
    addActModule.init();
    cabinetModule.init();
    donationModule.init();
    AddPhotoModule.init();
    occasionsModule.init();
    newsModule.init();
    appModule.init();
    fundModule.init();
});
