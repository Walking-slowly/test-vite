/**
 * 驼峰转横线
 * @param {String} name
 * @returns
 */
export function toHump(name) {
  return name.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

/**
 * 获取uuid
 *
 * @returns
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16);
  });
}
