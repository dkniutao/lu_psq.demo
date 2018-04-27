import _ from 'lodash'
import axios from 'axios'
export default {
  URL: 'http://test.api.backend.xingzhijishu.com/v1/',
  ACCESS_TOKEN: '5890516ceca05bf50e44e8da65f48244',
  axios (opt) {
    return axios.get(this.URL + opt.url, {
      params: _.extend(opt.params, {
        access_token: this.ACCESS_TOKEN
      })
    }).then((response) => {
      if (typeof opt.done === 'function') opt.done(response)
    }).catch((error) => {
      console.log(error)
    })
  }
}
