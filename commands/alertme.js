/*
    Command Name: alertme.js
    Function: Assigns a User the Role to be Alerted with Bot Updates
    Clearance: none
	  Default Enabled: Yes
    Date Created: 01/29/18
    Last Updated: 08/10/18
*/

// Load in Required Files
const config = require(`../files/config.json`);
const enabled = require(`../files/enabled.json`);
const roles = require(`../files/roles.json`);
const debug = require(`../functions/debug.js`);
const errorLog = require(`../functions/errorLog.js`);
