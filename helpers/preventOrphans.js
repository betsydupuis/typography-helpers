module.exports.register = function (Handlebars, options)  { 
    Handlebars.registerHelper('preventOrphans', function ( numberOfWords, options)  {
        var str = options.fn(this);
        var nonBreakingSpace = '&nbsp;$1';
        var lastThreeWords =  /\s([^\s<]+)\s([^\s<]+)\s*$/;
        var lastTwoWords = /\s([^\s<]+)\s*$/;
        
        var wordCount = lastTwoWords;

        if(numberOfWords > 2){
            var wordCount = lastThreeWords;
            nonBreakingSpace += '&nbsp;$2';
        };
        var formattedString = str.replace( wordCount, nonBreakingSpace);
        return formattedString;
        return str;
    });
};