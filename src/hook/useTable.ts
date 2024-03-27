/**
 * @param {Function} callBack // 回调函数
 * @returns {{
 *  pageSize: Number
 *  currentPage: number
 *  total: Number
 *  loading: Boolean
 *  onChangePage: Function
 *  init: Function
 * }}
 */
export default (callBack: Function): object => {
  const currentPage = ref<number>(1);
  const pageSize = ref<number>(20);
  const total = ref<number>(0);
  const loading = ref<boolean>(false);
  const onChangePage = () => {
    callBack && callBack();
  };

  const init = () => {
    currentPage.value = 1;
    callBack && callBack();
  };

  return {
    currentPage,
    pageSize,
    total,
    loading,

    init,
    onChangePage,
  };
};
