
// This is a generic error for validation 
export class ValidationError<T> extends Error {
    constructor(
        public errors : T[],
        message = "Failed to validate"
    ){
        super(message);
        this.name = "ValidationError";
    }

    toJSON(){
        return {
            type: this.name,
            message: this.message,
            errors: this.errors,
        }
    }
}