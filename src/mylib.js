import _ from 'lodash'
import axios from 'axios'
export default {
  ABC: ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  ROOT: '//test.api.backend.xingzhijishu.com/',
  URL: '//test.api.backend.xingzhijishu.com/v1/',
  ACCESS_TOKEN: '5890516ceca05bf50e44e8da65f48244',
  // @todo去缓存
  axios (opt, _this) {
    opt.type = opt.type || 'get'
    let ajax = ''
    if (opt.type === 'get') {
      ajax = axios[opt.type](this.URL + opt.url, {
        params: _.extend(opt.params, {
          'access-token': this.ACCESS_TOKEN
        })
      })
    } else {
      ajax = axios[opt.type](this.URL + opt.url,
        opt.params,
        {
          params: {
            'access-token': this.ACCESS_TOKEN
          }
        }
      )
    }
    return ajax.then((response) => {
      if (response.data.success) {
        if (typeof opt.done === 'function') opt.done.call(_this, response.data)
      } else {
        _this.$message.error(response.data.data.message)
        if (typeof opt.error === 'function') opt.error.call(_this, response.data)
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  TYPE_DATA: {
    '1': {
      'alias': 'radio',
      'item': {
        'title': '请输入问题标题',
        'content': [
          {
            'key': 'A',
            'title': '选项1'
          },
          {
            'key': 'B',
            'title': '选项2'
          }
        ]
      }
    },
    '2': {
      'alias': 'checkbox',
      'item': {
        'title': '请输入问题标题',
        'content': [
          {
            'key': 'A',
            'title': '选项1'
          },
          {
            'key': 'B',
            'title': '选项2'
          }
        ]
      }
    },
    '3': {
      'alias': 'input',
      'item': {
        'title': '请输入问题标题',
        'setting':
        {
          'height': '1',
          'min': '',
          'max': ''
        }
      }
    },
    '4': {
      'alias': 'inputMulti',
      'item': {
        'title': '请输入问题标题',
        'content': [
          {
            'title': '标题1'
          },
          {
            'title': '标题2'
          }
        ],
        'setting':
        {
          'height': '1',
          'min': '',
          'max': ''
        }
      }
    },
    '5': {
      'alias': 'rate',
      'item': {
        'title': '请输入问题标题',
        'content': [
          {
            'title': '很不满意',
            'score': '1'
          },
          {
            'title': '不满意',
            'score': '2'
          },
          {
            'title': '一般',
            'score': '3'
          },
          {
            'title': '满意',
            'score': '4'
          },
          {
            'title': '很满意',
            'score': '5'
          }
        ]
      }
    },
    '6': {
      'alias': 'rateMulti',
      'item': {
        'title': '请输入问题标题',
        'content': [
          {
            'title': '很不满意',
            'score': '1'
          },
          {
            'title': '不满意',
            'score': '2'
          },
          {
            'title': '一般',
            'score': '3'
          },
          {
            'title': '满意',
            'score': '4'
          },
          {
            'title': '很满意',
            'score': '5'
          }
        ],
        'setting': [
          {
            'title': '外观'
          },
          {
            'title': '功能'
          }
        ]
      }
    },
    '10': {
      'alias': 'sort',
      'item': {
        'title': '请输入问题标题',
        'content': [
          {
            'key': '1',
            'title': '选项1'
          },
          {
            'key': '2',
            'title': '选项2'
          }
        ]
      }
    },
    '9': {
      'alias': 'slider',
      'item': {
        'title': '请输入问题标题',
        'content': [
          {
            'val': '0',
            'title': '不满意'
          },
          {
            'val': '100',
            'title': '满意'
          }
        ]
      }
    },
    '7': {
      'alias': 'title',
      'item': '<strong>请输入标题</strong>'
    },
    '8': {
      'alias': 'desc',
      'item': '请输入段落说明'
    }
  }
}
