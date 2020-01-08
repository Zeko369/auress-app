import axios from 'axios';

export const URL = 'https://www.auress.org/s';

class RequestService {
  async post(data: string) {
    // return axios.post(URL, data, {
    //   headers: {
    //     // cookie: this.generatePHPSessid(this.cookie),
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     credentials: 'include',
    //     'User-Agent':
    //       'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:71.0) Gecko/20100101 Firefox/71.0',
    //   },
    // });
  }
}

export default RequestService;
