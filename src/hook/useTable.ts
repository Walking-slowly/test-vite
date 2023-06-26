/**
 * @param {Function} callBack // 回调函数
 * @returns {{
 *  pageSize: Number
 *  currentPage: number
 *  total: Number
 *  loading: Boolean
 *  onChangePage: Function
 * }}
 */
export const useTable = (callBack: Function): object => {
  const currentPage = ref<number>(1);
  const pageSize = ref<number>(50);
  const total = ref<number>(0);
  const loading = ref<boolean>(false);
  const onChangePage = () => {
    callBack && callBack();
  };

  return {
    ...shallowReactive({
      currentPage,
      pageSize,
      total,
      loading,
    }),
    onChangePage,
  };
};
