class UnsupportedMethodType extends Error {
    constructor(string, cause) {
        super(string);
        this.name = "UnsupportedMethodType";
        this.cause = cause;
    }
}

class NotConnectedError extends Error {
    constructor(string) {
        super(string);
        this.name = "NotConnectedError"
    }
}