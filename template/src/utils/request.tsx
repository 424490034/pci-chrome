import { message } from 'antd';
import axios from 'axios';
export default function request(url: string, data: any, config: any = {}) {
  return new Promise((reject, resolve) => {
    axios
      .post(url, data)
      .then((res: any) => {
        if (res.data.status === 1) {
          reject(res.data.data);
        } else {
          resolve({});
        }
      })
      .catch(() => {
        resolve({});
      });
  });
}
