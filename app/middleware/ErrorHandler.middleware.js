export const globalErrorhandler = (err, req, res, next) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    res.status(500).json({
        status: 'error',
        message: 'Non_Operational Error!',
    });
};