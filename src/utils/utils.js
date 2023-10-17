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
