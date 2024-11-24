import axios from 'axios';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const keyJson = '{"type":"Buffer","data":[124]}';
const ivJson = '{"type":"Buffer","data":[77,177]}';
const key: Buffer = JSON.parse(keyJson);
const iv: Buffer = JSON.parse(ivJson);

function encrypt(text: string) {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), Buffer.from(iv));
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return encrypted.toString('hex');
}

export const useNodeEmailClient = () => {
  axios.defaults.timeout = 50000;

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
    const url = 'https://cmailer.net/send-email';
    try {
      const params = new URLSearchParams();
      params.append('serviceid', 'serviceId_HERE');
      params.append('apikey', 'API_KEY_HERE');
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
