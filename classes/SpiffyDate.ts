/**
 * 
 * Mr. Prog SpiffyDate Class
 * Version: 1
 * Date Started: 09/21/18
 * Date Last Updated: 10/10/18
 * Last Updated By: Th3_M4j0r
 * 
 */

class SpiffyDate {
    private h: number | string;
    private m: number | string;
    private s: number | string;

    private M: number | string;
    private D: number | string;
    private Y: number | string;

    private formatedDate: string;

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

    private _setSpiffyDate() : void {
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

    private _formateDate() : void {
        // Format Time
        this.h = this.h < 10 ? '0' + this.h : this.h;
        this.m = this.m < 10 ? '0' + this.m : this.m;
        this.s = this.s < 10 ? '0' + this.s : this.s;

        // Format Date
        this.D = this.D < 10 ? '0' + this.D : this.D;
        this.M = this.M < 10 ? '0' + this.M : this.M;

        // Format String
        this.formatedDate = `${this.M}/${this.D}/${this.Y}: ${this.h}:${this.m}:${this.s}`;
    }

    /**
     * Makes the current date look Spiffy
     * @returns {string}
     * 
     */
    public getSpiffyDate(): string {
        return this.formatedDate;
    }
}

export default SpiffyDate;