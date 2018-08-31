/**

    cxBot.js Mr. Prog Spiffy Date Creation Script
    Version: 1
    Author: AllusiveBox
    Date Started: 08/08/18
    Date Last Updated: 08/30/18
    Last Update By: AllusiveBox

**/

module.exports.run = () => {
    // Declare Necessary Variables
    var date = new Date();

    // Figure out the Time
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    // Figure out the Date
    let D = date.getDate();
    var M = date.getMonth() + 1;
    let Y = date.getFullYear();

    // Format Time
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    // Format Date
    D = D < 10 ? '0' + D : D;
    M = M < 10 ? '0' + M : M;

    let spiffyDate = `${M}/${D}/${Y}: ${h}:${m}:${s}`;
    return spiffyDate;
}
