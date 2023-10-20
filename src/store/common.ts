import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      isDarkTheme: true,
      isCollapse: false,
      routeTabs: [
        {
          name: '首页',
          url: '/home',
          noClose: true,
        },
      ],
    };
  },

  actions: {
    SET_ISTHEME(value: boolean) {
      this.$patch((state) => {
        state.isDarkTheme = value;
      });
    },
    SET_ISCOLLAPSE(value: boolean) {
      this.$patch((state) => {
        state.isCollapse = value;
      });
    },

    SET_ROUTETABS(value: Array<any>) {
      this.$patch((state) => {
        state.routeTabs = value;
      });
    },
  },

  //持久化存储配置
  persist: {
    // 开启数据持久化
    enabled: true,
    strategies: [{ paths: ['isDarkTheme', 'isCollapse'] }],
    // strategies: [{ key: '', storage: localStorage }],
  },
});
