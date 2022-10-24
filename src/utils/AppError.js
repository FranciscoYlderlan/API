export default class AppError {
    constructor(description, statusCode = 400) {
        this.description = description;
        this.statusCode = statusCode;
    }
    static ServerErrorMessage() {
        return {
            status: "error",
            message: "Internal server error"
        }
    }
    Message() {
        return {
            status: "error",
            message: this.description
        }
    }
    
}

