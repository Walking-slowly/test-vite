import { ElMessage } from 'element-plus';

export function isNumberRule(rule, value, callback) {
  if (!value) {
    callback();
    return;
  }
  let patter = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;
  if (!patter.test(value)) {
    return callback(ElMessage({
      message: '必须非负整数或保留二位小数！',
      type: 'error'
    }));
  } else {
    callback();
  }
}
