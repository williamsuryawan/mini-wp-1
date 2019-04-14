const jwt = require('jsonwebtoken')

module.exports = {
    sign(user) {
        console.log("masuk helper JWT convert sign", user, process.env.JWT_SECRET)
        return jwt.sign(user, process.env.JWT_SECRET)
    },
    jwtSign (user) {

    },
    jwtVerification (input) {
        console.log("Input verifikasi JWT", input.hasOwnProperty('token'))
            try {
                const decoded = jwt.verify(input.token, process.env.JWT_SECRET);
                console.log("Hasil verifikasi JWT", decoded)
                if( decoded != null) {
                    return result = true;
                } else {
                    return result = false;

                }
            } catch (err) {
                return result = false;
            }
    }
}