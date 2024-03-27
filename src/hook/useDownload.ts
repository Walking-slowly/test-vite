/**
 * @param {{
 *  method: String
 *  url: String
 *  params: Object
 * }} res
 * @returns {{
 *  handleDownload: Function
 * }}
 */
export default (res): Object => {
  const handleDownload = () => {
    let form = document.createElement('form');
    form.method = res.method || 'post';
    form.action = `${import.meta.env.VITE_BASIC_API}${res.url}`;
    form.target = 'outputFrame';
    form.html = `<input type="hidden" name="param" value="${JSON.stringify({
      ...res.params,
      token: sessionStorage.getItem('token'),
    })}"/>`;
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return {
    handleDownload,
  };
};
