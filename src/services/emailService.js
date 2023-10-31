require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Hoàng Sơn👻" <sondeptrai@example.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        text: "Hello world?", // plain text body
        html: getBodyHTMLEmail(dataSend), // html body
    });
};

let getBodyHTMLEmail = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `

        <h3>Xin Chao ${dataSend.patientName} !</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
        <p>Thông tin đặt lịch khám bệnh: </p>
        <div> <b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên là đúng sự thật , vui lòng lòng click vào đường link bên dưới để 
        xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</p>
        <div><a href=${dataSend.redirectLink} target="blank">Click Here</a></div>
        <div>Xin chân thành cảm ơn</div>
    `;
    }

    if (dataSend.language === "en") {
        result = `
        <h3>Dear ${dataSend.patientName} !</h3>
        <p>You received this email because you booked an online medical appointment on BookingCare</p>
        <p>Information to schedule an appointment: </p>
        <div> <b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the above information is true, please click on the link below to confirm and complete the medical appointment booking procedure.</p>
        <div><a href=${dataSend.redirectLink} target="blank">Click Here</a></div>
        <div>Sincerely thank</div>
    `;
    }
    return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = "";
    if (dataSend.language === "vi") {
        result = `

        <h3>Xin Chao ${dataSend.patientName} !</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare thành công </p>
        <p>Thông tin về đơn thuốc và hóa đơn được gửi trong file đính kèm. </p>
      
        <div>Xin chân thành cảm ơn</div>
    `;
    }

    if (dataSend.language === "en") {
        result = `
        <h3>Dear ${dataSend.patientName} !</h3>
        <p>You received this email because you booked an online medical appointment on BookingCare success</p>
        <p>Information to schedule an appointment: </p>
        
        <div>Sincerely thank</div>
    `;
    }
    return result;
};

let sendAttachment = async (dataSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            let info = await transporter.sendMail({
                from: '"Hoàng Sơn👻" <sondeptrai@example.com>', // sender address
                to: dataSend.email, // list of receivers
                subject: "Kết quả đặt lịch khám bệnh", // Subject line
                html: getBodyHTMLEmailRemedy(dataSend), // html body
                attachments: [
                    {
                        filename: `remedy-${
                            dataSend.patientId
                        } - ${new Date().getTime()}.png`,
                        content: dataSend.imgBase64.split("base64,")[1],
                        encoding: "base64",
                    },
                ],
            });
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
};

export default {
    sendSimpleEmail,
    sendAttachment,
};
