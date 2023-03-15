import axios from 'axios'

const service = axios.create({
  baseURL: window.location.origin + '/api/',
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    // JWT鉴权处理
    if (sessionStorage.getItem('token')) {
      config.headers['token'] = JSON.parse(sessionStorage.getItem('token'))
    }
    return config
  },
  (error) => {
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code === 200 || res.code === 0) {
      return res.data
    } else {
      showError(res)
      return Promise.reject(res)
    }
  },
  (error)=> {
    console.error(error) // for debug
    const badMessage = error.message || error
    const code = parseInt(badMessage.toString().replace('Error: Request failed with status code ', ''))
    showError({ code, message: badMessage })
    return Promise.reject(error)
  }
)


function showError(error) {
  // token失效
  if (error.code === 403) {
    console.log(1111)
    // // to re-login
    // store.dispatch('user/loginOut')
  } else {
    ElMessage({
      message: error.msg || error.message || '服务异常',
      type: 'error',
      duration: 3 * 1000
    })
  }
  
}

export default service