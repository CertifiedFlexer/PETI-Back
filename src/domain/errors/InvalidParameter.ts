export class InvalidParameter extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidParameter";
    }
}