/**
 * Created by Marina Planells
 * Date 10/Feb/2014
 * https://github.com/MarinaPlanells/jsCurrencyFormat
 */
(function($) {
    var currencyPluginMethods = {
        init: function(options) {
            var defaults = {
                lang: 'es',
                showCurrency: false
            };

            options =  $.extend(defaults, options);
            var num = '';

            if (typeof $(this).attr('value') !== 'undefined' && $(this).attr('value') !== false) {
                num = parseStringToFloat($(this).val());
                $(this).val(putComas(num, options.lang, options.showCurrency));
            } else {
                num = parseStringToFloat($(this).text());
                $(this).text(putComas(num, options.lang, options.showCurrency));
            }
        }
    };

    $.fn.currencyFormatter = function(method) {
        return currencyPluginMethods.init.apply(this, arguments);
    };
}(jQuery));

function parseStringToFloat(numStr)
{
    numStr = numStr.replace(/\s+/g, "");
    var decimalReg = new RegExp(/^([1-9][0-9]*)([,][0-9]{1,4})?$/);
    if(decimalReg.test(numStr)) {
        numStr = numStr.split(",").join(".");
    }

    var comaMillarsReg = new RegExp(/^([1-9][0-9]{0,2})([,](\d{3}))*([\.][0-9]{1,4})?$/);
    if(comaMillarsReg.test(numStr)) {
        numStr = numStr.split(",").join("");
    }

    var decimalAndMillarsReg = new RegExp(/^([1-9][0-9]{0,2})([\.](\d{3}))*([,][0-9]{1,4})?$/);
    if(decimalAndMillarsReg.test(numStr)) {
        numStr = numStr.split(".").join("");
        numStr = numStr.split(",").join(".");
    }

    return numStr;
}

function putComas(numStr, lang, showCurrency)
{
    var decimal, millars, currencySymbol, currencyPosition;
    switch (lang){
        case 'es':
            decimal = ',';
            millars = '.';
            currencySymbol = '€';
            currencyPosition = "after";
            break;
        case 'en':
            decimal = '.';
            millars = ',';
            currencySymbol = '£';
            currencyPosition = "before";
            break;
        case 'fr':
            decimal = ',';
            millars = ' ';
            currencySymbol = '€';
            currencyPosition = "after";
            break;
        case 'de':
            decimal = ',';
            millars = '.';
            currencySymbol = '€';
            currencyPosition = "after";
            break;
        case 'it':
            decimal = ',';
            millars = '.';
            currencySymbol = '€';
            currencyPosition = "before";
            break;
        default:
            decimal = '.';
            millars = '';
            currencySymbol = '€';
            currencyPosition = "after";
            break;
    }

    var x = numStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? decimal + x[1] : decimal + '00';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + millars + '$2');
    }

    numStr =  x1 + x2;
    if (showCurrency == true) {
        if (currencyPosition == 'after') {
            numStr = numStr + ' ' + currencySymbol;
        } else {
            numStr = currencySymbol + ' ' + numStr;
        }
    }

    return numStr;
}

