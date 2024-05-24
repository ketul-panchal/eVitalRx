const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Somthing Went Wrong..' });
};

module.exports = errorHandler;
