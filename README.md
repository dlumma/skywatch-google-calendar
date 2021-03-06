
### Getting started modifying source code

1. run `npm install -g node-google-apps-script` to install it globally. This will allow you to run a few of the steps below from the command line.
2. Go through the [configuration and authorization steps](https://www.npmjs.com/package/node-google-apps-script).
2. Run `npm install -g gulp` if you do not already have the [gulp](http://gulpjs.com/) task runner installed globally.
3. Clone this repository, `cd skywatch-google-calendar`, and run `npm install`. This will set up all of the local dependencies for the project.

### Creating test, stage and production environment

1. Create a folder in Google Drive called 'Envs'
2. Within Envs, create three folders: 'Dev', 'Tst', and 'Prd'
3. Within each of the folders, do the following:
4. Create two [new Google Spreadsheet](https://docs.google.com/spreadsheets/create), called:
- devLogSpreadsheet, or tstLogSpreadsheet, or prdLogSpreadsheet (depending on the folder you are in)
- devDebugSpreadsheet, or tstDebugSpreadsheet, or prdDebugSpreadsheet (in the corresponding folder)
5. Copy each of the IDs of the files. The file ID is found in the URL to the spreadsheet:
docs.google.com/spreadsheets/d/***DRIVE_FILE_ID***/edit#gid=123
6. Open the file *src/environments/dev/debug.local.config.js*, and replace the default IDs with the IDs that you copied within corresponding dev environment files.
- Replace IDs for:
- configuration.sheets.debugSpreadsheetId
- configuration.logSpreadsheetId
Do the same for tst and prd environments.
7. Create a new standalone [Google Apps Script](https://script.google.com) project, and copy the ID of the script. The file ID is found in the URL to the script project:
	script.google.com/a/macros/google.com/d/***DRIVE_FILE_ID***/edit
4. Perform the following commands:

    ```
    mkdir build
    cd build
    mkdir dev
    cd dev
    gapps init *DRIVE_FILE_ID*
    cd ../..
    gulp upload-latest --env dev
    ```

5. Refresh your Apps Script project. You should now see a copy of some of the files from the local source location.
6. Google apps project UI > Resources > Advanced Google Services > Calendar API > Enable
6. Google apps project UI > Resources > Advanced Google Services > Drive API > Enable
7. Click the link to Google Developers Console> Google Calendar API > Enable
8. BetterLog (https://github.com/peterherrmann/BetterLog)
Click on the menu item "Resources > Libraries..."
In the "Find a Library" text box, enter the project key MYB7yzedMbnJaMKECt6Sm7FLDhaBgl_dE and click the "Select" button.
Choose a version in the dropdown box (usually best to pick the latest version).
Click the "Save" button.
9. Parsert
Same as above: 1Mc8BthYthXx6CoIz90-JiSzSafVnT6U3t0z_W3hLTAX5ek4w0G_EIrNw

You can run the code either by publishing it as a web app, or testing it as an addon (It just counts the number of sheets in your spreadsheet). Because the code finds a valid Spreadsheet ID in the configuration, it uses that instead of `SpreadsheetApp.getActiveSpreadsheet`.


### Deploying for testing


1. Create a [new Google Spreadsheet](https://docs.google.com/spreadsheets/create), and copy the ID of the file. Add 4 additional sheets to the file (the test looks for 5 sheets).
2. Open the file *src/environments/tst/a.myproj.tst.config.js*, and replace DRIVE_FILE_ID with the ID that you copied.
3. (Perform the same steps #3 and #4 from above, replacing `dev` with `tst`.) Create a new standalone [Google Apps Script](https://script.google.com) project, and copy the ID of the script. The file ID is found in the URL to the script project:
	script.google.com/a/macros/google.com/d/***DRIVE_FILE_ID***/edit
    - Replace Ids for logFile and debugFile
4. Perform the following commands:

    ```
    cd build
    mkdir tst
    cd tst
    gapps init *DRIVE_FILE_ID*
    cd ../..
    gulp upload-latest --env tst
    ```
5. Refresh the Apps Script project, open the file `a.myproj.tests.server.main.js`, and then run the function `runAllTests`. Once the run completes, open the log view to see the output.
6. Google apps project UI > Resources > Advanced Google Services > Calendar API > Enable
7. Click the link to Google Developers Console> Google Calendar API > Enable

This example uses the configured spreadsheet to allow unit testing without having to change code for testing in the primary codebase.


### Deploying for production
This would typically be a single Apps Script file for the project, with the "edit" permission granted to a very limited number of users. In a real project, a deployment coordinator or other similar role would perform these steps:

1. (Perform the same steps #3 and #4 from above, replacing `dev` with `prd`.) Create a new standalone [Google Apps Script](https://script.google.com) project, and copy the ID of the script. The file ID is found in the URL to the script project:
	script.google.com/a/macros/google.com/d/***DRIVE_FILE_ID***/edit
2. Perform the following commands:

    ```
    cd build
    mkdir prd
    cd prd
    gapps init *DRIVE_FILE_ID*
    cd ../..
    gulp upload-latest --env prd
    ```
3. Refresh the Apps Script project, open the project properties (File --> Project properties), and click on the "Scopes" tab. You will see that the spreadsheet scope now only allows the current attached doc (`spreadsheets.currentonly`), which is what we would want for production.
4. You can also create a new spreadsheet, set up for add-on testing, and the code will run successfully.
5. Google apps project UI > Resources > Advanced Google Services > Calendar API > Enable
6. Click the link to Google Developers Console> Google Calendar API > Enable


For production, the configuration file does *not* have a specific spreadsheet, and has the annotation @onlycurrent doc. That will ensure that only Spreadsheets that the code has been linked via the Add-on can be accessed. This limiting of scope is a good practice to provide more confidence to your users that you are only working on sheets that they have linked to your add-on.

