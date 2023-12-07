const setAlert = (sessionRequest, success, message) => {
    sessionRequest.message = {
        type: success ? 'success' : "danger",
        message: message
    }
}

module.exports = setAlert;