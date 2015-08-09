module.exports.register = function (Handlebars, options)  {
    Handlebars.registerHelper('paragraph', function ( cssClass, options){

        function preventOrphans ( numberOfWords, text)  {
            var str = text;
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
        };



        // var options = ( arguments.length == 3 ) ? options :  arguments[arguments.length];
        var options = arguments[arguments.length - 1];
        var cssClass = ( arguments.length > 1 ) ? cssClass : " ";
        // var useHtml = ( arguments.length == 2 || 3 ) ? useHtml : cssClass;
        
        // Get wrapped helper content
        var strEscape = Handlebars.Utils.escapeExpression(options.fn(this));
        var str = strEscape;
        // var str = (useHtml == "html") ? strEscape : strEscape;

        //Split paragraphs into an array 
        var splitParagraphs = [];

        var matchNewLine = /(\s\n|\r\n|\r|\n+)/g;
        var singleNewLine = str.replace( matchNewLine, "\n");
        var splitParagraphs = singleNewLine.split(/\n/);

        var search_term = /\n\n/;


        function buildParagraphs(para){
            // var j = para.length;
            // var i = 0;
            var newParagraphs = [];

            for (i = 0; i < para.length; i++) {

                var td;
                if(para.length > 0 ){
                    td = '<tr><td ' + 'class="paragraph ' + cssClass + '">' + preventOrphans(3, para[i]) + '</td></tr>';
                    newParagraphs.push(td);
                }
                else{

                }
            }
            return newParagraphs.join('');
        }


        // // if(splitParagraphs.length < )
        // if(splitParagraphs > 1){

        // }
        return '<table border="0" cellpadding="0" cellspacing="0" align="center">' + buildParagraphs(splitParagraphs) + '</table>';

        // return splitParagraphs.join('');
    });
};