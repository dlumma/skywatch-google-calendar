// Copyright 2013 2016 Denali Lumma Inc. All Rights Reserved.
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

// For testing - broadens the OAuth scope to allow opening any
// Spreadsheet on the current user's Drive
/** @NotOnlyCurrentDoc */


/**
 * @param {myproj.json.Configuration} configuration
 *     The current configuration settings.
 * @return {myproj.json.Configuration} configuration
 *     The current configuration settings, updated with test settings.
 */
 function provideEnvironmentConfiguration_(configuration) {
  configuration.sheets.debugSpreadsheetId = '104CRY9-5_C53dVD7SIlrsHTnwehqXq4W8V-FH24o7r4';
  configuration.logSpreadsheetId = '1GYifjafnH8anKwOK7UvJ3wD8a7vWhf10-KJs6sFWyWE';
  configuration.debug = true;
  return configuration;
}
