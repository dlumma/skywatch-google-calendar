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

// For production, this script will now only be able to act on Spreadsheets that
// it is attached to via a user installing and activating the add-on.
/** @OnlyCurrentDoc */
// Put additional production configuration here

/**
 * @param {myproj.json.Configuration} configuration
 *     The current configuration settings.
 * @return {myproj.json.Configuration} configuration
 *     The current configuration settings, updated with test settings.
 */
 function provideEnvironmentConfiguration_(configuration) {
  configuration.sheets.debugSpreadsheetId = '1wf-PRWDDEXLF2tZ15Rx-1IkWa45WTbifwloQGRuoJYM';
  configuration.logSpreadsheetId = '1dnplEtJaTlB7KMpmerVwnKMuTP33IpLd_DIRvFFAoHE';
  configuration.debug = true;
  return configuration;
}