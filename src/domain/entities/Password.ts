export class Password {
    private value: string;

    constructor(value: string) {
        if (!Password.isValid(value)) {
            throw new Error('Invalid password');
        }
        this.value = value;
    }

    static isValid(password: string): boolean {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);
    }

    getValue(): string {
        return this.value;
    }
}