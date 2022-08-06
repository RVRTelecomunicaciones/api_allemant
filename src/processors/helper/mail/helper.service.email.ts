import nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import * as APP_CONFIG from '@app/app.config';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { confirmMail } from './templates';

// 邮件格式
export interface IEmailOptions {
  to: string;
  subject?: string;
  text?: string;
  html?: string;
  link?: string;
}

@Injectable()
export class EmailService {
  private transporter: nodemailer;
  private clientIsValid: boolean;
  private socials: string;

  constructor(private readonly sendGrid: SendGridService) {
    //GMAIL OAUTH
    /*  this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: APP_CONFIG.EMAIL.account,
        type: 'OAUTH2',
        clientId: APP_CONFIG.EMAIL.EMAIL_CLIENT_ID,
        clientSecret: APP_CONFIG.EMAIL.EMAIL_CLIENT_SECRET,
        refreshToken: APP_CONFIG.EMAIL.EMAIL_REFRESH_TOKEN,
        accessToken: APP_CONFIG.EMAIL.EMAIL_ACCESS_TOKEN,
        expires: 1484314697598,
      },
    }); */
    this.transporter = nodemailer.createTransport({
      auth: {
        user: APP_CONFIG.MAIL_SENDGRID.user,
        pass: APP_CONFIG.MAIL_SENDGRID.pass,
      },
      host: APP_CONFIG.MAIL_SENDGRID.host,
    });
    console.log('TRANSPORTE');
    console.log(this.transporter);

    this.socials = APP_CONFIG.PROJECT_EMAIL.socials
      .map(
        (social) =>
          `<a href="${social[1]}" style="box-sizing:border-box;color:${APP_CONFIG.PROJECT_EMAIL.color};font-weight:400;text-decoration:none;font-size:12px;padding:0 5px" target="_blank">${social[0]}</a>`,
      )
      .join('');
    this.verifyClient();
  }

  // 验证有效性
  private verifyClient(): void {
    return this.transporter.verify((error) => {
      if (error) {
        this.clientIsValid = false;
        setTimeout(this.verifyClient.bind(this), 1000 * 60 * 30);
      } else {
        this.clientIsValid = true;
      }
    });
  }

  // 发邮件
  public sendMail(mailOptions: IEmailOptions) {
    console.log(mailOptions);
    if (!this.clientIsValid) {
      return false;
    }
    const options = Object.assign(mailOptions, { from: APP_CONFIG.EMAIL.from });
    console.log(options);
    try {
      this.transporter.sendMail(options);
    } catch (error) {
      return false;
    }
    return true;
  }
  async sendVerifyEmailMail(
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    /*     const buttonLink = `${APP_CONFIG.PROJECT_EMAIL.mailVerificationUrl}?token=${token}`;
     */ const buttonLink = `${APP_CONFIG.PROJECT_EMAIL.mailVerificationUrl}${token}`;

    console.log('SenVerifyEmail');

    console.log(buttonLink);

    const mail = confirmMail
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(
        new RegExp('--ProjectName--', 'g'),
        APP_CONFIG.PROJECT_EMAIL.name,
      )
      .replace(
        new RegExp('--ProjectAddress--', 'g'),
        APP_CONFIG.PROJECT_EMAIL.address,
      )
      .replace(
        new RegExp('--ProjectLogo--', 'g'),
        APP_CONFIG.PROJECT_EMAIL.logoUrl,
      )
      .replace(
        new RegExp('--ProjectSlogan--', 'g'),
        APP_CONFIG.PROJECT_EMAIL.slogan,
      )
      .replace(
        new RegExp('--ProjectColor--', 'g'),
        APP_CONFIG.PROJECT_EMAIL.color,
      )
      .replace(new RegExp('--ProjectLink--', 'g'), APP_CONFIG.PROJECT_EMAIL.url)
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink)
      .replace(
        new RegExp('--TermsOfServiceLink--', 'g'),
        APP_CONFIG.PROJECT_EMAIL.termsOfServiceUrl,
      );

    console.log(`${APP_CONFIG.MAIL_SENDGRID.email}`);

    const mailOptions = {
      from: 'no-reply@allemantperitos.com.pe',
      to: email, // list of receivers (separated by ,)
      subject: `Welcome to ${APP_CONFIG.PROJECT_EMAIL.name} ${name}! Confirm Your Email`,
      html: mail,
    };

    console.log('CONFIGURACION DE ENVIO');
    //"${APP_CONFIG.MAIL_SENDGRID.name}" <${APP_CONFIG.MAIL_SENDGRID.email}>

    console.log(mailOptions);

    return new Promise<boolean>((resolve) =>
      this.transporter.sendMail(mailOptions, async (error) => {
        if (error) {
          resolve(false);
        }
        resolve(true);
      }),
    );
  }

  async sendVerifyEmailSendGrid(
    name: string,
    email: string,
    token: string,
  ): Promise<boolean> {
    const buttonLink = `${APP_CONFIG.PROJECT_EMAIL.mailVerificationUrl}${token}`;
    const mail = confirmMail
      .replace(new RegExp('--PersonName--', 'g'), name)
      .replace(
        new RegExp('--ProjectName--', 'g'),
        APP_CONFIG.PROJECT_EMAIL.name,
      )
      .replace(
        new RegExp('--ProjectAddress--', 'g'),
        APP_CONFIG.PROJECT_EMAIL.address,
      )
      .replace(
        new RegExp('--ProjectLogo--', 'g'),
        APP_CONFIG.PROJECT_EMAIL.logoUrl,
      )
      .replace(
        new RegExp('--ProjectSlogan--', 'g'),
        APP_CONFIG.PROJECT_EMAIL.slogan,
      )
      .replace(
        new RegExp('--ProjectColor--', 'g'),
        APP_CONFIG.PROJECT_EMAIL.color,
      )
      .replace(new RegExp('--ProjectLink--', 'g'), APP_CONFIG.PROJECT_EMAIL.url)
      .replace(new RegExp('--Socials--', 'g'), this.socials)
      .replace(new RegExp('--ButtonLink--', 'g'), buttonLink)
      .replace(
        new RegExp('--TermsOfServiceLink--', 'g'),
        APP_CONFIG.PROJECT_EMAIL.termsOfServiceUrl,
      );

    const mailOptions = {
      to: email, // list of receivers (separated by ,)
      from: 'no-reply@allemantperitos.com.pe',
      subject: `Welcome to ${APP_CONFIG.PROJECT_EMAIL.name} ${name}! Confirm Your Email`,
      html: mail,
    };

    return new Promise<boolean>((resolve) =>
      this.sendGrid.send(mailOptions).then(
        () => {},
        (error) => {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        },
      ),
    );
  }
}
