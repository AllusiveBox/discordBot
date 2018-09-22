class SpiffyDate {
    /**
     * Builds the Spiffy Date Object
     * 
     */

    constructor() {
        this._setSpiffyDate();
        this._formateDate();
    }

    /**
    * Sets the SpiffyDate
    * 
    */

    _setSpiffyDate() {
        // Get Date
        let date = new Date();

        // Figure out Time
        this.h = date.getHours();
        this.m = date.getMinutes();
        this.s = date.getSeconds();

        // Figure out Date
        this.M = date.getMonth() + 1; // 0 is Jan, so want to return +1
        this.D = date.getDate();
        this.Y = date.getFullYear();
    }

    /**
     * Formats the SpiffyDate into a Single String
     * 
     */

    _formateDate() {
        this.formatedDate = `${this.M}/${this.D}/${this.Y}: ${this.h}:${this.m}:${this.s}`;
    }

    /**
     * Makes the current date look Spiffy
     * @returns {SpiffyDate}
     * 
     */

    getSpiffyDate() {
        return this.formatedDate;
    }
}

module.exports = SpiffyDate;