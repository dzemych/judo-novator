const nodemailer = require('nodemailer')
const confirmTemplate = require('../templates/email/confirm.template')
const resetTemplate = require('../templates/email/reset.template')


module.exports = class Email {
   constructor(to, url) {
      Object.assign(this, { to, url })
      this.from = `Judo Novator <admin@${process.env.DOMAIN}>`
   }

   newTransporter() {
      const env = process.env

      if (env.NODE_ENV === 'production') return 1

      return nodemailer.createTransport({
         host: env.EMAIL_HOST,
         port: env.EMAIL_PORT,
         auth: {
            user: env.EMAIL_USERNAME,
            pass: env.EMAIL_PASSWORD
         }
      })
   }

   async send(template, subject) {
      // 1) Define email options
      const options = {
         from: this.from,
         to: this.to,
         subject,
         text: template
      }

      // 2) Create transporter and send email
      await this.newTransporter().sendMail(options)
   }

   async sendConfirm() {
      // 1) Get template
      const template = confirmTemplate(this.to, this.url)

      // 2) Change email receiver to admin email
      this.to = 'admin@judo-novator.ua'

      // 3) Send mail
      await this.send(template, 'Подтвердить нового админа')
   }

   async sendReset() {
      // 1) Get template
      const template = resetTemplate(this.url)

      // 2) Send mail
      await this.send(template, 'Сброс пароля Judo Novator')
   }
}