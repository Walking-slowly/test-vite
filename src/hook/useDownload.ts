/**
 * @param {{
 *  url: String
 *  key: string
 * }} res
 * @returns {{
 *  handleDownload: Function
 * }}
 */
export default (res): Object => {
  const handleDownload = (params: Object) => {
    let form = document.createElement('form');
    form.method = 'post';
    form.action = `${import.meta.env.VITE_BASIC_API}${res.url}?token=${sessionStorage.getItem('token')}`;
    form.target = 'outputFrame';
    let input = document.createElement('input');
    input.type = 'hidden';
    input.name = res.key || 'params';
    input.value = JSON.stringify(params);
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return {
    handleDownload,
  };
};
