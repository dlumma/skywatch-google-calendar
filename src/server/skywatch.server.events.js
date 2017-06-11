/**
* Get upcoming Skywatch events.
*/
function listDayEvents(date) {
  var calendarId = 'primary';
  var optionalArgs = {
    timeMin: (date).toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
    orderBy: 'startTime'
  };
  var response = Calendar.Events.list(calendarId, optionalArgs);
  var events = response.items;
  if (events.length > 0) {
    for (i = 0; i < events.length; i++) {
      var event = events[i];
      var when = event.start.dateTime;
      if (!when) {
        when = event.start.date;
      }
      if ((event.summary).indexOf('Skywatch') > -1) {
        Logger.log('%s (%s)', event.summary, when);
        Logger.log('%s (%s)', event.description, when);
      }
    }
  } else {
    Logger.log('No upcoming events found.');
  }
}

function listEvents(sheetID, sheetName) {

  var data = getSkywatchForecast(sheetID, sheetName)

  for (var i = 0; i < data.length; i++) {
    var calendarId = 'primary';
    var curDate = new Date(parseInt(data[i][0]), parseInt(data[i][1] - 1), parseInt(data[i][2]));
    var endDate = curDate;
    Logger.log('curDate is ' + curDate);
    Logger.log('endDate is: ' + endDate);
    listDayEvents(curDate);
  }
}


// This makes use of:
// https://developers.google.com/google-apps/calendar/gadgets/event/ 
// https://developers.google.com/gadgets/docs/overview 
function createGadgets(sheetID, sheetName) {

  var data = getSkywatchForecast(sheetID, sheetName)

  
  for (var i = 0; i < data.length; i++) {
    var calendarId = 'primary';
    var startDate = data[i][0]+"-"+data[i][1]+"-"+data[i][2];
    var endDate = startDate
    Logger.log(endDate)
    var dailyDescription = data[i][3];
    var dailyColorId = data[i][4];
    var dailyColor
    var dailyIco
    if (dailyColorId == 10) {
      dailyColor = "Green"
      dailyIco = "https://dl.dropboxusercontent.com/s/bf1j31wllulskam/green_favicon.ico?dl=0"
    } else if (dailyColorId == 11) {
      dailyColor = "Red"
      dailyIco = "https://dl.dropboxusercontent.com/s/m1q7bjgqb9g2x7l/red-circle-favicon.ico?dl=0"
    } else {
      dailyColor = "Purple"
      dailyIco = "https://dl.dropboxusercontent.com/s/4g7dx2xkkyvwb0v/purple-circle-favicon.ico?dl=0"
    }
    var event = {
   
      summary: "Skywatch",
      description: dailyDescription,
      start: {
        date: startDate
      },
      end: {
        date: endDate
      },
      colorId: dailyColorId,
      gadget: {
        type: "text/html",
        title: "SkyWatch (" + dailyColor +") \n\n" + dailyDescription,
        link: "https://www.google.com/search?q=Skywatch+Astrology+google",
        iconLink: dailyIco,
        width: 300,
        height: 300,
        bg_color: dailyColor,
        preferences: {
          Format: "0",
          Days: "1"
      }
      
      }
    };
  Calendar.Events.insert(event, calendarId);    
  }
}



function createEvents(sheetID, sheetName) {

  var data = getSkywatchForecast(sheetID, sheetName)

  
  for (var i = 0; i < data.length; i++) {
    var calendarId = 'd71nb7ber81c2k957m0djag978@group.calendar.google.com';
    var startDate = data[i][0]+"-"+data[i][1]+"-"+data[i][2];
    var endDate = startDate
    Logger.log(endDate)
    var dailyDescription = data[i][3];
    var dailyColorId = data[i][4];
    var dailyColor
    var dailyIco
    if (dailyColorId == 10) {
      dailyColor = "Green"
      dailyIco = "https://dl.dropboxusercontent.com/s/bf1j31wllulskam/green_favicon.ico?dl=0"
    } else if (dailyColorId == 11) {
      dailyColor = "Red"
      dailyIco = "https://dl.dropboxusercontent.com/s/m1q7bjgqb9g2x7l/red-circle-favicon.ico?dl=0"
    } else {
      dailyColor = "Purple"
      dailyIco = "https://dl.dropboxusercontent.com/s/4g7dx2xkkyvwb0v/purple-circle-favicon.ico?dl=0"
    }
    var event = {
   
      summary: "Skywatch (" + dailyColor +")",
      description: dailyDescription,
      start: {
        date: startDate
      },
      end: {
        date: endDate
      },
      colorId: dailyColorId,
     };
  Calendar.Events.insert(event, calendarId);    
  }
}

function getSkywatchForecast(sheetId, sheetName) {
  
  var ss = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  return ss.getDataRange().getValues();
  
}

// Nov, 2016
function populate_11_2016() {
  createEvents("1QqnrlaNrUufMitCdwKEAKoip8FcoNcAvUVVBXrfTzs4")
}

// Dec, 2016
function populate_12_2016() {
  createEvents('1Uqx77ct_DuIAFZ_PvD1LDwZy9oOl0EzktzJAC5MtLhE', "2016-12")
}

// Jan, 2017
function populate_01_2017() {
  createEvents('1Uqx77ct_DuIAFZ_PvD1LDwZy9oOl0EzktzJAC5MtLhE', "2017-01")
}

// Feb, 2017
function populate_02_2017() {
  createEvents('1Uqx77ct_DuIAFZ_PvD1LDwZy9oOl0EzktzJAC5MtLhE', "2017-02")
}

// Mar, 2017
function populate_03_2017() {
  createEvents('1Uqx77ct_DuIAFZ_PvD1LDwZy9oOl0EzktzJAC5MtLhE', "2017-03")
}

// April, 2017
function populate_04_2017() {
  createEvents('1Uqx77ct_DuIAFZ_PvD1LDwZy9oOl0EzktzJAC5MtLhE', "2017-04")
}

// May, 2017
function populate_05_2017() {
  createEvents('1Uqx77ct_DuIAFZ_PvD1LDwZy9oOl0EzktzJAC5MtLhE', "2017-05")
}

// June, 2017
function populate_06_2017() {
  createEvents('1Uqx77ct_DuIAFZ_PvD1LDwZy9oOl0EzktzJAC5MtLhE', "2017-06")
}

// Longrange 2017
function populate_long_range_2017() {
  createEvents('1Uqx77ct_DuIAFZ_PvD1LDwZy9oOl0EzktzJAC5MtLhE', "Feb-Dec-LongRange")
}
