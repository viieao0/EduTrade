const checkStudentEmail = (req, res, next) => {
    const { email } = req.body;

    // شرط: لازم يكون ايميل جامعي
    const eduRegex = /^[a-zA-Z0-9._%+-]+@.*\.edu(\.[a-z]{2})?$|^[0-9]+@stu\.uob\.edu\.bh$/;

    if (!eduRegex.test(email)) {
        return res.status(403).json({
            message: "Access denied. Student email required."
        });
    }

    next();
};

module.exports = checkStudentEmail;
