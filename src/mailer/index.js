const { mailer } = require("./../config.json");
const nodemailer = require('nodemailer')

class Mailer {


    async ConfirmedEmail(email, code) {
        const transporter = nodemailer.createTransport({
            service: mailer.service,
            host: mailer.host,
            port: mailer.port,
            secure: false, 
            auth: {
                user: mailer.email,
                pass: mailer.password
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: false
            },
            requireTLS: true
        },
        {
            from: mailer.email
        });

        const html = `<!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">

            <style>

                body {
                    font-family: 'Inter';
                    font-style: normal;
                    font-weight: 600;
                }
                .mail {
                    height: 413px;
                }
                .mail__container{
                    padding: 48px;
                    width: 616px;
                }
                .mail__title, .mail__code {
                    font-size: 40px;
                    line-height: 48px;
                }

                .mail__title {
                    margin-bottom: 72px;
                }

                .mail__code {
                    margin-top: 61px;
                }

                .mail__text {
                    font-size: 20px;
                    line-height: 14px;
                    color: #6B7176;
                }
                .mail__text:not(:last-child) {
                    margin-bottom: 16px;
                }
            </style>
        </head>
        <body>
        <div class="mail">
            <div class="mail__container">
                <h2 class="mail__title">
                    Account Verification
                </h2>
                <p class="mail__text">This email was sent automatically after registration.</p>
                <p class="mail__text">This email serves as confirmation of your mail.</p>
                <p class="mail__code">Code: ${code}</p>
            </div>
        </div>
        </body>
        </html>`;

        await transporter.sendMail({
            from: mailer.email,
            to: email,
            subject: "test",
            text: "test",
            html: html,
        });
    }

}

module.exports = new Mailer();