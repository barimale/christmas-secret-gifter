import axios from 'axios';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const keyJson = '{"type":"Buffer","data":[124,220,206,184,127,124,38,166,182,93,101,77,57,223,219,125,166,33,187,151,77,32,103,199,215,19,248,113,255,232,220,19]}';
const ivJson = '{"type":"Buffer","data":[77,177,156,230,70,8,218,20,182,232,146,11,74,126,187,23]}';
const key: Buffer = JSON.parse(keyJson);
const iv: Buffer = JSON.parse(ivJson);

function encrypt (text: string) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), Buffer.from(iv));
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return encrypted.toString('hex');
}

export const useNodeEmailClient = () => {
  axios.defaults.timeout = 5000;

  const sendByNode = async (address: string, title: string, message: string, captcha: string)
  : Promise<string> => {
    let attempts = 5;
    let result = '';

    while (attempts > 0) {
      // eslint-disable-next-line no-await-in-loop
      result = await sendByNodeOnce(address, title, message, captcha);
      if (result === 'success') {
        return result;
      }

      attempts -= 1;
    }

    return result;
  };

  const sendByNodeOnce = async (address: string, title: string, message: string, captcha: string)
  : Promise<string> => {
    const url = 'https://christmas-secret-gifter-mailer.herokuapp.com/send-email';
    try {
      const params = new URLSearchParams();
      params.append('serviceid', 'service_08vey2o');
      params.append('apikey', 'odkrywajcie-mailer-ajdfnhajdfnaf-Password@2020');
      params.append('to', address);
      params.append('subject', title);
      params.append('message', message);
      params.append('captcha', captcha);

      const encryptedParams = new URLSearchParams();

      encryptedParams.append('data', encrypt(params.toString()));

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      return await axios.post(url, encryptedParams, config)
        .then((response: any) => {
          if (response.status === 200) {
            return 'success';
          }

          return 'error';
        })
        .catch(() => 'error');
    } catch (error: any) {
      return 'error';
    }
  };

  return {
    sendByNode,
  };
};
