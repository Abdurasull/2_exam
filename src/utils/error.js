class ClientError extends Error{
    constructor(message, status){
        super(message);
        this.status = status;
        this.message = "Client Error: " +  message;
    }
} 

class ServerError extends Error{
    constructor(message, status){
        super(message);
        this.status = status;
        this.message = "Server Error: " +  message;
    }
}

const globalError = (err, res) => {

    let error = {
        message: err.message,
        status: err.status || 500
    }
    res.status(error.status).json({
        message: err.message,
        status: err.status || 500
    });
}

export {
    ClientError,
    ServerError,
    globalError
}
