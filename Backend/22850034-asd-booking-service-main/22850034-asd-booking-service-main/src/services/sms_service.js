const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const smsEnabled = process.env.SMS_ENABLED;

function formatPhoneNumber(phoneNumber) {
    if (phoneNumber.startsWith('0')) {
        return '+84' + phoneNumber.slice(1);
    } else {
        return phoneNumber;
    }
}

class SmsService {
    static sendSmsNotification = async (phones, content) => {
        if (smsEnabled == 'true') {
            const client = require('twilio')(accountSid, authToken);

            client.messages
                .create({
                    body: content,
                    from: '+18635887143',
                    to: formatPhoneNumber(phones)
                })
                .then(message => console.log(message.sid));
        }
    }
}

module.exports = SmsService;
