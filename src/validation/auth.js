

class AuthValidation
{
    login(req)
    {
        const { login, password } = req.body;

        if (!login || !password)
        {
            return {
                valid: false,
                code: 400,
                message: "Bad request"
            }
        }
        if (login.length == 0)
        {
            return {
                valid: false,
                code: 400,
                message: "Bad request"
            }
        }
        if (password.length == 0)
        {
            return {
                valid: false,
                code: 400,
                message: "Bad request"
            }
        }
        return {
            valid: true
        }
    }
    register(req)
    {
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        const { login, password, email } = req.body;
        if (!login || !password || !email)
        {
            return {
                valid: false,
                code: 400,
                message: "Bad request"
            }
        }
        if (login.length == 0)
        {
            return {
                valid: false,
                code: 400,
                message: "Bad request"
            }
        }
        if (password.length == 0)
        {
            return {
                valid: false,
                code: 400,
                message: "Bad request"
            }
        }
        if (email.length == 0)
        {
            return {
                valid: false,
                code: 400,
                message: "Bad request"
            }
        }
        if (!EMAIL_REGEXP.test(email))
        {
            return {
                valid: false,
                code: 400,
                message: "Email invalid"
            }
        }
        return {
            valid: true
        }
    }
}

module.exports = new AuthValidation();