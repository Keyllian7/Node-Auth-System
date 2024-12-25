const handleError = (response, err) => {
    console.log("❌ " + err);
    response.status(500).json({ message: 'An internal server error occurred, please try again later!' });
};

module.exports = { handleError };