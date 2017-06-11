// Copyright 2016 Denali Lumma. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * Test to inspect the text from wordpress.
 */
function testParseSimple() {
    var ss = SpreadsheetApp.openById('18ISPKb_efFGm_gjjLFd_LsGL3vKy3Ar9z_-dA27KSgw');
    data = ss.getDataRange().getValues();
    text = data[0][0];
    assertTrue_(text.indexOf('2016-12-02 06:29:03:534') !== -1);
}

/**
* Test parsing the date headings.
*/
function testParseHeadingsDec() {
  var doc = DocumentApp.openByUrl("https://docs.google.com/document/d/12J-nzC7vikh6wGSgtiNllzmmehPP2VtjHLQcnsHy9nE/edit");
  html = doc.getBody().getText();
  entries = parseHeadings(html);
  Logger.log(entries);
  var expectedDayHeadings = ['<a href="http://skywatchastrology.com/thursday-december-22/">Thursday, December 22</a>',
                             '<a href="http://skywatchastrology.com/friday-december-23/">Friday, December 23</a>', 
                             '<a href="http://skywatchastrology.com/saturday-december-24/">Saturday, December 24</a>', 
                             '<a href="http://skywatchastrology.com/sunday-december-25/">Sunday, December 25</a>', 
                             '<a href="http://skywatchastrology.com/if-your-birthday-is-this-week-dec-25-31/">If your birthday is this week (Dec 25–31)</a>', 
                             '<a href="http://skywatchastrology.com/monday-december-26/">Monday, December 26</a>', 
                             '<a href="http://skywatchastrology.com/tuesday-december-27/">Tuesday, December 27</a>', 
                             '<a href="http://skywatchastrology.com/wednesday-december-28/">Wednesday, December 28</a>', 
                             '<a href="http://skywatchastrology.com/thursday-december-29/">Thursday, December 29</a>', 
                             '<a href="http://skywatchastrology.com/friday-december-30/">Friday, December 30</a>', 
                             '<a href="http://skywatchastrology.com/saturday-december-31/">Saturday, December 31</a>'];
  for (i = 0; i < entries.length; i++) {
    assertEquals_(entries[i], expectedDayHeadings[i]);
  }
}


function testParseForecastsDec() {
  var doc = DocumentApp.openByUrl("https://docs.google.com/document/d/12J-nzC7vikh6wGSgtiNllzmmehPP2VtjHLQcnsHy9nE/edit");
  html = doc.getBody().getText();
  entries = parseForecasts(html);
  var expectedForecasts = ['Thursday, December 22Get an early start',
                           'Five in a row',
                           'Saturday is a day of Grace', 
                           'Green lights are up',
                           'Sunday is also a day of Grace', 
                           'The Moon is Void of Course from her touch to Venus early this morning and until she enters Sagittarius',
                           'You have a fabulous new Solar Return, Capricorn',
                           'Easy does it this morning',
                           'Rock on',
                           'Don’t rush in',
                           'A New Moon in ambitious Capricorn points your radar toward future plans and wishes Thursday morning',
                           'Spacey',
                           'More spacey'];
  for (i = 0; i < entries.length; i++) {
    Logger.log(entries[i]);
    assertTrue_(entries[i].indexOf(expectedForecasts[i]) > -1);
  }
}


function testParseDate() {
  var dayString = "Thursday, December 22";
  var dateArr = parseDate(dayString);
  Logger.log(dateArr);
  assertEquals_(dateArr[0], '2016');
  assertEquals_(dateArr[1], '12');
  assertEquals_(dateArr[2], '22');
}


function testParseColor() {
  var forecastPurple = 'Get an early start. \
The Skywatch is good this morning for work or play. \
The Moon squares resentful Pluto at 5:35 am CST early Thursday morning, \
but that’s the only quack in the heavens today. \
Luna quickly travels on to trine sweet Venus at 6:23 am setting the stage for a productive morning. \
As the Moon then meets lucky Jupiter at 12:30 pm and sextiles dependable Saturn at 1 pm. \
Something unexpected is likely to appear as the Moon opposes jumpy Uranus at 1:31 pm. \
Caution lights kick on a minute later as the Moon turns Void of Course until tomorrow morning. \
There’s lots of good energy in the Skywatch now with Saturn making a trine to Uranus on Saturday, \
and that energy in full power now. \
Just remember Mercury is Retrograde which amplifies the confusion in V/C hours. \
Hold off on shopping during this period of time if you are not sure of your decision—tomorrow \
will be a much better day to spend your money. \
As times change.';
  var color = parseColor(forecastPurple);
  assertEquals_(color, '12');
  Logger.log(color);
  
    var forecastGreen = 'Five in a row. This is some of the best Skywatch of the year as we have lots \
of kisses in the heavens over the next five days. \
Green lights come on Friday morning as the Moon enters Scorpio at 8:32 am CST and then sails out into \
calm waters. Afternoon hours are especially good for shopping, important calls, and business as the Moon \
sextiles the Sun at 1:25 pm and then trines eager Mars at 3:25 pm. \
Quiet hours follow for the Moon but the main event this weekend is in full power: Saturn trine Uranus. \
This trine is rare and will show up again two more times in 2017, the last one appearing next November. \
So if you don’t feel the good stuff in it now, you have lots of time start a new era in your life and to \
use the practical side of Saturn with the experimental side of Uranus. This combination rewards the folks who \
take action in the months ahead and suggests high-tech inventions appearing that could change the world and \
make billions. \
Uranus also brings stellar energy for making new friends and finding new groups where you really belong. \
Accept all invitations over this weekend and don’t be afraid to experiment with new dishes, drinks, and \
adventures.';
  var color = parseColor(forecastGreen);
  assertEquals_(color, '10');
  Logger.log(color);
}



