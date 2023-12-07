const success = (message, data = null) => {
    return {
        success: true,
        message: message,
        data: data
    }
}

const error = (message, data = null) => {
    return {
        success: false,
        message: message,
        data: data
    }
}

module.exports = {
    success,
    error
}