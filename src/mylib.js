import _ from 'lodash'
import axios from 'axios'
export default {
  Q_TYPE: {
    '1': 'radio',
    '2': 'checkbox',
    '3': 'input',
    '4': 'inputMulti',
    '5': 'rate',
    '6': 'rateMulti',
    '10': 'sort',
    '9': 'slider'
  },
  ROOT: '//test.api.backend.xingzhijishu.com/',
  URL: '//test.api.backend.xingzhijishu.com/v1/',
  ACCESS_TOKEN: '5890516ceca05bf50e44e8da65f48244',
  // @todo去缓存
  axios (opt, _this) {
    return axios.get(this.URL + opt.url, {
      params: _.extend(opt.params, {
        'access-token': this.ACCESS_TOKEN
      })
    }).then((response) => {
      if (typeof opt.done === 'function') opt.done.call(_this, response.data)
    }).catch((error) => {
      console.log(error)
    })
  }
}
