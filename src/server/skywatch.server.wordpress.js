// Example from: http://www.kutil.org/2016/01/easy-data-scrapping-with-google-apps.html
// Also see: https://sites.google.com/site/scriptsexamples/learn-by-example/parsing-html


var skywatchUrl = "http://skywatchastrology.com/members/";
var debug = false;
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    

function fetchMemberPage(docId) {
   var url = "http://skywatchastrology.com/wp-login.php";
   var options = {
      "method": "post",
      "payload": {
      "log": "dlumma",
      "pwd": "TODO",
      "wp-submit": "Login",
      "testcookie": 1
      },
      "followRedirects": false
   };
   var response = UrlFetchApp.fetch(url, options);
   if ( response.getResponseCode() == 200 ) {
     // Incorrect user/pass combo
   } else if ( response.getResponseCode() == 302 ) {
     // Logged-in
     var headers = response.getAllHeaders();
     if ( typeof headers['Set-Cookie'] !== 'undefined' ) {
        // Make sure that we are working with an array of cookies
        var cookies = typeof headers['Set-Cookie'] == 'string' ? [ headers['Set-Cookie'] ] : headers['Set-Cookie'];
        for (var i = 0; i < cookies.length; i++) {
           // We only need the cookie's value - it might have path, expiry time, etc here
           cookies[i] = cookies[i].split( ';' )[0];
        };
        url = "http://skywatchastrology.com/members/";
        options = {
            "method": "get",
            // Set the cookies so that we appear logged-in
            "headers": {
               "Cookie": cookies.join(';')
            }
        };
       response = UrlFetchApp.fetch(url, options);
       var cs = ContentService.createTextOutput(response);
       var config = Configuration.getCurrent();      
       var content = cs.getContent();
       return content;
     };
   };
}


/**
* Parse the date headings from the given html.
*/
function parseHeadings(html) {
  var entries = [];
  var i_next = 1;
  while (true) {
    var scraped = Parser
    .data(html)
    .from('<h2>')
    .to('</h2>')
    .build();
    text = scraped.replace(/<\/?[^>]+(>|$)/g, "").trim()
    entries.push(text);
    Logger.log(text);                
    i_next = html.indexOf(scraped) + scraped.length;
    html = html.slice(i_next);
    //test for <h2>
    if (html.indexOf('<h2>') < 0) {
      break;
    }    
  }
  return entries;
}

function parseForecasts(html) {
  var entries = [];
  var i_next = 1;
  while (true) {
    var scraped = Parser
    .data(html)
    .from('<div class="entry-content">')
    .to('</div>')
    .build();
    text = scraped.replace(/<\/?[^>]+(>|$)/g, "").trim()
    entries.push(text);                
    i_next = html.indexOf(scraped) + scraped.length;
    html = html.slice(i_next);
    //test for <div class="entry-content">
    if (html.indexOf('<div class="entry-content">') < 0) {
      break;
    }    
  }
  return entries;  
}

function parseDate(stringDate) {
  var year = '2016';
  Logger.log('stringDate is: ' + stringDate);
  var date = stringDate.slice(stringDate.indexOf(',')+1).trim();
  Logger.log('date is: ' + date);
  var dateArr = date.split(" ");
  Logger.log(dateArr[0]);
  var numMonth = (Math.floor(months.indexOf(dateArr[0]) + 1)).toString();
  return [year, numMonth, dateArr[1]];
}

/**
* Green is 10, Red is 11, Purple is anything else.
*/
function parseColor(forecast) {
  var greenKeywords = ['Grace', 'Green', 'green', 'Kiss', 'kiss', 'Rock', 'Trine', 'trine'];
  var redKeywords = ['Caution', 'caution', 'Quack', 'quack', 'Spacey', 'spacey', 'Stick to routine', 'Square', 'square'];
  var hasGreen = false;
  var hasRed = false;
  for (k = 0; k < greenKeywords.length; k++) { 
    if (forecast.indexOf(greenKeywords[k]) > -1){
      hasGreen = true;
      break;
    }
  }
  for (j = 0; j < redKeywords.length; j++) { 
    if (forecast.indexOf(redKeywords[j]) > -1){
      hasRed = true;
      break;      
    }
  }
  if (hasGreen && !hasRed){
    return '10';
  }
  if (hasRed && !hasGreen){
    return '11';
  }
  return '1';
}

function populateSpreadsheet() {
  var html = fetchMemberPage();
  if (debug == true) {
    var docId = '12J-nzC7vikh6wGSgtiNllzmmehPP2VtjHLQcnsHy9nE';
    var doc = DocumentApp.openById(docId);
    doc.getBody().appendParagraph(content)
  }
  var forecasts = parseForecasts(html);
  var dates = parseHeadings(html);
  // Fix first entry duplication
  forecasts[0] = forecasts[0].slice(forecasts[0].indexOf(dates[0]) + dates[0].length);
  var sheet = SpreadsheetApp.openById('1Uqx77ct_DuIAFZ_PvD1LDwZy9oOl0EzktzJAC5MtLhE').getSheetByName('2016-12'); 
  for (i = 0; i < forecasts.length; i++) {
    var dateArr = parseDate(dates[i]);
    var month = dateArr[1];
    // skip non-day forecasts
    if (month <= 0) {
      continue;
    }
    var color = parseColor(forecasts[i]);
    sheet.appendRow([dateArr[0], month, dateArr[2], forecasts[i], color]);  
  }
}