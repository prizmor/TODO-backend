const User = require('../../models/user');

module.exports = async function (req, res) {
    try {
        const { code } = req.body;
        const { uuid } = req.user;

        const user = await User.findOne({ uuid });

        if (code !== user.emailCode) {
            return res.status(400).json({ code: false, message: "Код не совподает" });
        }

        return res.status(200).json({ code: true });
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: 'Bad request' });
    }
}