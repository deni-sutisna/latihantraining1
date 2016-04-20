//-----------------------------
// Swift.js
//-----------------------------

// Validation API
var Validations = {
		// Check exception type is violation exception
		isViolation: function(xhr) {
			if (xhr.status != 500) {
				return false;
			}

			try {
				var messages = JSON.parse(xhr.responseText);
				
				if (!(messages['swift.validation.messages']) || !(messages['swift.validation.messages'] instanceof Array)) {
					return false;
				}
				
				return true;
			} catch (e) {
				// Not JSON format then return false
				return false;
			}
		},
		
		// When is violation exception then get messages
		getMessages: function(xhr) {
			if (this.isViolation(xhr)) {
				var ret = [];
				
				var messages = JSON.parse(xhr.responseText)['swift.validation.messages'];
				
				for (var i = 0; i < messages.length; i++) {
					ret.push(messages[i]);
				}
				
				return ret;
			} else {
				return [];
			}
		},
		
		isEmpty: function(value) {
			if (value === undefined || value === '' || value === null) {
				return true;
			}
			
			var checkValue = value.toString().replace(/^[ |　]*|[ |　]*$/g, '');
			
			return checkValue.length == 0;
		},
		
		isEmpty2: function(value) {
			if (value === undefined || value === '' || value === null) {
				return true;
			}
			
			return value.toString().length == 0;
		},
		
		isEmpty3: function(value) {
			if (value === undefined || value === '' || value === null) {
				return true;
			}
			
			return value.toString().replace(/^[ ]*|[ ]*$/g, '').length == 0;
		},
		
		stringTrim: function(value) {
			if (value === undefined || value === '' || value === null) {
				return '';
			}
			
			return value.toString().trim().replace(/^[ |	]*|[ |	]*$/g, '');
		},
		
		// Check whether input value only contain { single byte upper character, single byte number, single byte mark, ;, _  }.
		isCapitalAlphabetNumSignSemicolonUnder: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[A-Z0-9\s+\-=\.,#&!?()/<>:*@%'";_]*$/.test(value);
		},

		// Check whether input value is not null or empty after trim.
		isRequired: function(value) {
			if (this.isEmpty3(value)) {
				return false;
			}

		    return true;
		},

		// Check whether the length of input value is upon parameter {length}.
		isMinlength: function(value, minLength) {
			if (this.isEmpty2(this.stringTrim(value))) {
				return true;
			}

		    return value != null && value.trim().length >= minLength;
		},

		// Check whether the length of input value is under parameter {length}.
		isMaxlength: function(value, maxLength) {
			if (this.isEmpty2(this.stringTrim(value))) {
				return true;
			}

		    return value != null && value.trim().length <= maxLength;
		},

		// Check whether input value is correct email format.
		isEmail: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^(.+)@(.+)$/.test(value);
		},

		// Check whether input value is only integer.
		isNum: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[0-9]*$/.test(value);
		},

		// Check whether input value only contain { a-z A-Z }.
		isAlphabet: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[a-zA-Z]*$/.test(value);
		},

		// Check whether input value is format of YYYY{delimiters}MM{delimiters}dd.
		isSwiftDate: function(value, delimiters) {
			if (this.isEmpty(value)) {
				return true;
			}

			// Enable for [99999999]
			if (value == '9999' + delimiters + '99' + delimiters + '99') {
				return true;
			}
			
			try {
				var format = new RegExp('^[0-9]{4}' + delimiters + '[0-9]{2}' + delimiters + '[0-9]{2}$');
				
				// Check length
				if(!format.test(value)){
					return false;
				}
				
				var yyyy;
				var mm;
				var dd;
				
				var normalDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				var leapYearDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				
				if (delimiters) {
					var date = value.split(delimiters);
					
					yyyy = parseInt(date[0]);
					mm = parseInt(date[1]);
					dd = parseInt(date[2]);
				} else {
					yyyy = parseInt(value.substring(0, 4));
					mm = parseInt(value.substring(4, 6));
					dd = parseInt(value.substring(6, 8));
				}
				
				// if month large then 12 then error
				if (mm > 12) {
					return false;
				}

				if ((yyyy % 4 == 0) && (yyyy % 400 != 0)) {
					if (leapYearDays[mm - 1] < dd) {
						return false;
					}
				} else {
					if (normalDays[mm - 1] < dd) {
						return false;
					}
				}

				return true;
			} catch (e) {
				return false;
			}
		},

		// Check whether input value is integer, decimal.
		isNumDecimal: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[0-9]+(\.[0-9]+)*$/.test(value);
		},

		// Check whether input value is format of HH{delimiters}mm.
		isSwiftTime: function(value, delimiters) {
			if (this.isEmpty(value)) {
				return true;
			}

			try {
				var format = new RegExp('^[0-9]{2}' + delimiters + '[0-9]{2}$');
				
				// Check length
				if(!format.test(value)){
					return false;
				}

				var hh;
				var mm;
				
				if (delimiters) {
					var date = value.split(delimiters);
					
					hh = parseInt(date[0]);
					mm = parseInt(date[1]);
				} else {
					hh = parseInt(value.substring(0, 2));
					mm = parseInt(value.substring(2, 4));
				}
				
				// if month large then 12 then error
				if (hh >= 24 || mm >= 60) {
					return false;
				}

				return true;
			} catch (e) {
				return false;
			}
		},

		// Check whether input value is format of YYYY{delimiters}MM.
		isSwiftMonth: function(value, delimiters) {
			if (this.isEmpty(value)) {
				return true;
			}

			try {
				var format = new RegExp('^[0-9]{4}' + delimiters + '[0-9]{2}$');
				
				// Check length
				if(!format.test(value)){
					return false;
				}

				var yyyy;
				var mm;
				
				if (delimiters) {
					var date = value.split(delimiters);
					
					yyyy = parseInt(date[0]);
					mm = parseInt(date[1]);
				} else {
					yyyy = parseInt(value.substring(0, 2));
					mm = parseInt(value.substring(2, 4));
				}
				
				// if month large then 12 then error
				if (mm > 12) {
					return false;
				}

				return true;
			} catch (e) {
				return false;
			}
		},

		// Check whether input value is integer, -.
		isNumHyphen: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[0-9\-]*$/.test(value);
		},

		// Check whether input value is only day number.
		isRealDateDD: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[0-9]{2}$/.test(value) && (1 <= parseInt(value) <= 31);
		},

		// Check whether input value only contain { a-z A-Z 0-9 }.
		isAlphabetNum: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[a-zA-Z0-9]*$/.test(value);
		},

		// Check whether input value is only single byte character but not contain japanese.
		isSingleByteChar: function(value) {
			if (this.isEmpty3(value)) {
				return true;
			}

		    return /^[ -~｡-ﾟ]+$/.test(value) && !(/^[ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ]+$/.test(value));
		},

		// Check whether input value only contain { A-Z, 0-9 }.
		isCapitalAlphabetNum: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[A-Z0-9]*$/.test(value);
		},

		// Check whether input value is double byte japanese.
		isFullSizeJapanese: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return false;
		},

		// Check whether input value only contain below character.
		isAlphabetNumHyphen: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[A-Z0-9-]*$/.test(value);
		},

		// Check whether the length of input value is equal with parameter {length}.
		isFixedLength: function(value, length) {
			if (this.isEmpty2(value)) {
				return true;
			}

		    return value.length == length;
		},

		// Check whether input value is only positive integer upon parameter {compValue}.
		isPositiveInteger: function(value, compValue) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[0-9]*$/.test(value) && parseInt(value) >= compValue;
		},

		// Check whether input value only contain { single byte upper character, single byte number, single byte mark  }.
		isCapitalAlphabetNumSign: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[A-Z0-9\s+\-=\.,#&!?()/<>:*@%'"]*$/.test(value);
		},

		// Check whether input value only contain below character.
		isAlphabetNumHyphenSpace: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[A-Z0-9\-\s]*$/.test(value);
		},

		// Check whether the digit of integer is under parameter {length}.
		isMaxIntLength: function(value, length) {
			if (this.isEmpty(value)) {
				return true;
			}

			var format = new RegExp('^[0-9]+[\.{0,1}0-9]*$');
			
			if (!format.test(value)) {
				return false;
			}
			
			var split = value.split('.');

		    return split[0].length <= length;
		},

		// Check whether the digit of decimal is under parameter {length}.
		isMaxDecimalLength: function(value, length) {
			if (this.isEmpty(value)) {
				return true;
			}

			var format = new RegExp('^[0-9]+[\.{0,1}0-9]*$');
			
			if (!format.test(value)) {
				return false;
			}
			
			var split = value.split('.');
			
			if (split.length != 2) {
				return true;
			}

		    return split[1].length <= length;
		},

		// Check whether the length of input value is upon parameter {length} after trim.
		isMinLengthtrim: function(value, length) {
			if (this.isEmpty2(this.stringTrim(value))) {
				return true;
			}

		    return value.trim().length >= length;
		},

		// Check whether the length of input value is under parameter {length} after trim.
		isMaxLengthtrim: function(value, length) {
			if (this.isEmpty2(this.stringTrim(value))) {
				return true;
			}

		    return value.trim().length <= length;
		},

		// Check whether the length of input value is equal with parameter {length} after trim.
		isFixedLengthtrim: function(value, length) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return value.trim().length == length;
		},

		// Check whether input value not contain SQL character.
		isNotSQLSpecialChar: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return !/^.*[;'\\\\].*$/.test(value);
		},

		// Check whether input value only contain below character.
		isAlphabetNumSpace: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[A-Z0-9\s]*$/.test(value);
		},

		// Check whether input value only contain below character.
		isAlphabetNumUnder: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[A-Z0-9_]*$/.test(value);
		},

		// Check whether input value only contain below character.
		isAlphabetNumUnderPerc: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[A-Z0-9_%]*$/.test(value);
		},

		// Check whether input value only contain { A-Z, 0-9, -, _ }.
		isAlphabetNumHyphenUnder: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[A-Z0-9\-_]*$/.test(value);
		},

		// Check whether the digit of integer is under parameter {intLength} and
		// the digit of decimal is under parameter {decLength}.
		isMaxIntDecimalLength: function(value, intLength, decLength) {
			if (this.isEmpty(value)) {
				return true;
			}

			var format = new RegExp('^[0-9]+[\.{0,1}0-9]*$');
			
			if (!format.test(value)) {
				return false;
			}
			
			var split = value.split('.');
			
			if (split.length != 2) {
				return split[0].length <= intLength;
			}
			
			return split[0].length <= intLength && split[1].length <= decLength;
		},

		// Check whether input value is integer, decimal, or * after trim.
		isNumDecimalAsteriskTrim: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return value == '*' || /^[0-9]+(\.[0-9]+)*$/.test(value);
		},

		// Check whether input value is * or the digit of integer is under parameter {length}.
		isMaxIntLengthAsterisk: function(value, length) {
			if (this.isEmpty(value)) {
				return true;
			}
			
			if (value == '*') {
				return true;
			}

			var format = new RegExp('^[0-9]+[\.{0,1}0-9]*$');
			
			if (!format.test(value)) {
				return false;
			}
			
			var split = value.split('.');
			
			return split[0].length <= length;
		},

		// Check whether input value is * or the digit of decimal is under parameter {length}.
		isMaxDecimalLengthAsterisk: function(value, length) {
			if (this.isEmpty(value)) {
				return true;
			}

			if (value == '*') {
				return true;
			}

			var format = new RegExp('^[0-9]+[\.{0,1}0-9]*$');
			
			if (!format.test(value)) {
				return false;
			}
			
			var split = value.split('.');
			
			if (split.length != 2) {
				return true;
			}
			
			return split[1].length <= length;
		},

		// Check whether input value is not null or empty.
		isRequiredNotTrim: function(value) {
			if (this.isEmpty2(value)) {
				return false;
			}

		    return true;
		},

		// Check whether input value is not null or empty.
		isPositiveLong: function(value, compValue) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[0-9]*$/.test(value) && parseInt(value) >= compValue;
		},

		// Check whether input value only contain { single byte character, single byte number, single byte mark, _ }.
		isAlphabetNumSignUnder: function(value) {
			if (this.isEmpty(value)) {
				return true;
			}

		    return /^[a-zA-Z0-9\s+\-=\.,#&!?()/<>:*@%'"_]*$/.test(value);
		}
}

// Presentation API
var Presentation = {
		level: {success : 'success', info : 'info', warning : 'warning', danger : 'danger'},
		
		// Show messages at special area
		// selector : jQuery object id like ['#name']
		// messages : notify messages
		// level : notify style as ['success', 'info', 'warning', 'danger']
		notify: function(selector, messages, level) {
			var content;
			
			if ((messages instanceof Array) && messages.length > 0) {
				var store = [];
				
				for (var i = 0; i < messages.length; i++) {
					if (typeof(messages[i]) === 'string') {
						store.push(messages[i]);
					}
					
					content = store.join('<br/>');
				}
			} else if (typeof(messages) === 'string') {
				content = messages;
			}
			
			var notifyArea = $(selector);			
			
			if (content && notifyArea) {
				var l = (level) && this.level[level] ? this.level[level] : level['danger'];

				var notification = '<div class="alert alert-' + l + ' alert-dismissible">';
				notification = notification + '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
				notification = notification + '<p>' + content + '</p>';
				notification = notification + '</div>';
	
				notifyArea.empty();
				notifyArea.append(notification);
			}
		},

		// Show DOM object by jQuery
		show: function(selectors) {
			if ((selectors instanceof Array) && selectors.length > 0) {
				for (i = 0; i < selectors.length; i ++) {
					if ($(selectors[i])) {
						$(selectors[i]).show();
					}
				}
			} else if (typeof(selectors) === 'string' && $(selectors)){
				$(selectors).show();
			}
		},

		// Hide DOM object by jQuery
		hide: function(selectors) {
			if ((selectors instanceof Array) && selectors.length > 0) {
				for (i = 0; i < selectors.length; i ++) {
					if ($(selectors[i])) {
						$(selectors[i]).hide();
					}
				}
			} else if (typeof(selectors) === 'string' && $(selectors)){
				$(selectors).hide();
			}
		}
}

// Ajax API
var Ajax = {
		// Send data to server by HTTP GET with ajax
		get: function(url, parameters, successCallback, errorCallback) {
			var settings = {
					url : url,
					method : 'GET',
					cache : false,
					data : parameters,
					dataType : 'json'
					};

			$.ajax(settings).success(
					function(data, status, xhr){
						successCallback(xhr.responseJSON);
			}).error(
					function(xhr, status, error) {
						errorCallback(xhr);
			});
		},

		// Send data to server by HTTP POST with ajax
		post: function(url, parameters, successCallback, errorCallback) {
			var settings = {
					url : url,
					method : 'POST',
					cache : false,
					contentType : 'application/json',
					data : JSON.stringify(parameters),
					dataType : 'json'
					};
			
			$.ajax(settings).success(
					function(data, status, xhr){
						successCallback(xhr.responseJSON);
			}).error(
					function(xhr, status, error) {
						errorCallback(xhr);
			});
		},
		
		// Send multipart/form data to server by HTTP POST with ajax
		upload: function(url, form, successCallback, errorCallback) {
			if (window.FormData && $(form)) {				
				var data = new FormData($(form).get(0));
				
				var settings = {
					url : url,
					method : 'POST',
					cache : false,
					contentType : false,
					processData : false,
					data : data,
					dataType : 'json'
					};
				
				$.ajax(settings).success(
						function(data, status, xhr){
							successCallback(xhr.responseJSON);
				}).error(
						function(xhr, status, error) {
							errorCallback(xhr);
				});
			}
		}
}

// Context API
var Context = {
		queryParameters: {},

		// Set cookie data
		setCookie: function(key, value, expires) {
			if (!(expires === undefined || expires === '' || expires === null) && Validations.isNum(expires)) {
				var date = new Date();

				date.setTime(date.getTime() + expires * 1000);
				
				document.cookie = key + '=' + encodeURIComponent(value) + "; expires=" + date.toUTCString();
			} else {
				document.cookie = key + '=' + encodeURIComponent(value);
			}
		},
		
		// Get cookie data
		getCookie: function(key) {
			var value = null;
			var c = document.cookie;
			var i = c.indexOf(key + '=');
			
			if (i != -1) {
				var start = i + key.length + 1;
				var end = c.indexOf(';', start);
				
				if (end == -1) {
					end = c.length;
				}
				
				value = decodeURIComponent(c.substring(start, end));
			}
			
			return value;
		},
		
		// Set session data
		// TODO: To be replaced with HTML5 Web Storage API.
		setSession: function(key, value) {
			document.cookie = 'swift.web.session.' + key + '=' + encodeURIComponent(value);
		},
		
		// Get session data
		// TODO: To be replaced with HTML5 Web Storage API.
		getSession: function(key) {
			var _key = 'swift.web.session.' + key;

			var value = null;
			var c = document.cookie;
			var i = c.indexOf(_key + '=');
			
			if (i != -1) {
				var start = i + _key.length + 1;
				var end = c.indexOf(';', start);
				
				if (end == -1) {
					end = c.length;
				}
				
				value = decodeURIComponent(c.substring(start, end));
			}
			
			return value;
		},
		
		// Get query parameter value
		getQuery: function(key) {
			var val = this.queryParameters[key];
			
			if (val) {
				if (val.length == 1) {
					return val[0];
				} else {
					return val;
				}
			} else {
				return null;
			}
		}
}

$(function() {
	var urlSearch = document.location.search;
	
	if (urlSearch && urlSearch.length > 1) {
		var parametersToken = decodeURIComponent(urlSearch).substring(1);
		
		var pairs = parametersToken.split("&");
		
		for(i in pairs) {
			var pair = pairs[i];
			
			if (/^.*=.*$/.test(pair)) {
				var units = pair.split("=");
				
				var key = units[0];
				var val = units[1];
				
				if (!Context.queryParameters[key]) {
					Context.queryParameters[key] = [];							
				}
				
				Context.queryParameters[key].push(val);
			}
		}
	}
});