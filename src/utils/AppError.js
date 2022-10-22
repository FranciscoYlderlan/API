export default class AppError {
    constructor(description, statusCode = 400) {
        this.description = description;
        this.statusCode = statusCode;
    }
    message() {
        return {
            status: "error",
            message: this.description
        }
    }
}