import axios from 'axios'
import qs from 'qs'
axios.defaults.headers.credential = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.baseURL = '/api'
axios.defaults.headers.common['Authorization'] = localStorage.getItem(TDC_itoken);
export const fetch = async (url, method, data) => {
  var res
  const dt=qs.stringify(data)
  switch (method) {
    case 'post':
      {
        res = await axios({
          url,
          method,
          data:dt
        });
        break;
      }
    case 'get':
      {
        res = axios.get(url, {
          params: data
        })
      }
  }
  return res
}
export  const  registReword=()=>fetch('/apiv1/user/register_reward_info','get')

