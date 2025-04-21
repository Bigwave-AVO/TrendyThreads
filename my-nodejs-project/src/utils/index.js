const formatResponse = (data, message = 'Success', statusCode = 200) => {
    return {
        status: statusCode,
        message: message,
        data: data,
    };
};

const logError = (error) => {
    console.error('Error:', error);
};

module.exports = {
    formatResponse,
    logError,
};