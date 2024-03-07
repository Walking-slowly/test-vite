import { defineStore } from 'pinia';
import type { RouteRow } from '@/router/index.ts';

type RouteRows = typeof RouteRow;

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      isDarkTheme: true,
      isCollapse: false,
      isFullscreen: false,
      routeTabs: [],
      userInfo: {},
    };
  },

  actions: {
    SET_ISTHEME(value: boolean) {
      this.$patch(state => {
        state.isDarkTheme = value;
      });
    },
    SET_ISCOLLAPSE(value: boolean) {
      this.$patch(state => {
        state.isCollapse = value;
      });
    },

    SET_ROUTETABS(value: RouteRows) {
      this.$patch(state => {
        state.routeTabs = value;
      });
    },

    SET_FULLSCREEN(value: boolean) {
      this.$patch(state => {
        state.isFullscreen = value;
      });
    },
    SET_USERINFO(value: object) {
      this.$patch(state => {
        state.userInfo = value;
      });
    },
  },

  //持久化存储配置
  persist: {
    // 开启数据持久化
    enabled: true,
    strategies: [{ paths: ['isDarkTheme', 'isCollapse', 'isFullscreen', 'routeTabs'] }],
    // strategies: [{ key: '', storage: localStorage }],
  },
});
