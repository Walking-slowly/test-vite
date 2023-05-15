<script lang="tsx">
import { FunctionalComponent as FC } from 'vue';
import { useCommonStore } from '@/store/common.js';

import { useRoute } from 'vue-router';
interface RowsItem {
  name: string;
  url: string;
  icon?: string;
  isParent?: boolean;
  parentUrl?: string;
  children?: Array<RowsItem>;
}

export default defineComponent({
  name: 'CommonAside',
  setup() {
    const menuList: Array<RowsItem> = JSON.parse(sessionStorage.getItem('menuList') || '') || [];
    const route = useRoute();
    const useStore = useCommonStore();

    const isCollapse = computed(() => useStore.isCollapse);

    // 目录
    const MenuTtem: FC<RowsItem> = (item) => {
      const { url, name, icon, isParent, parentUrl, children } = item;
      return (
        <>
          {children && children.length ? (
            <SubmenuItem
              {...item}
              {...{ parentUrl: `${parentUrl}${url}/` }}
            />
          ) : (
            <el-menuItem index={`${parentUrl}${url}`}>
              {isParent && <common-icon name={icon} />}
              <span style={`margin-left: ${!isParent ? '20px' : ''}`}>{name}</span>
            </el-menuItem>
          )}
        </>
      );
    };

    // 菜单
    const SubmenuItem: FC<RowsItem> = ({ name, url, children = [], isParent, icon, parentUrl }) => {
      const slots = {
        title: () => (
          <>
            {isParent && <common-icon name={icon} />}
            <span>{name}</span>
          </>
        ),
      };

      return (
        <>
          <el-subMenu
            index={`${parentUrl}${url}`}
            v-slots={slots}>
            {children?.map((i) => (
              <MenuTtem
                {...i}
                {...{ parentUrl: `${parentUrl}${url}/` }}
              />
            ))}
          </el-subMenu>
        </>
      );
    };

    return () => (
      <el-aside>
        <el-scrollbar>
          <el-menu
            router
            collapse={isCollapse.value}
            default-active={route.path}
            unique-opened>
            <el-menu-item
              index="/home"
              class="header-img-menuItem">
              <el-icon size={20}>首页</el-icon>
            </el-menu-item>
            {menuList.map((item) => {
              return (
                <>
                  {item.children && item.children.length ? (
                    <SubmenuItem
                      {...item}
                      isParent
                      parentUrl="/"
                    />
                  ) : (
                    <MenuTtem
                      {...item}
                      isParent
                      parentUrl="/"
                    />
                  )}
                </>
              );
            })}
          </el-menu>
        </el-scrollbar>
      </el-aside>
    );
  },
});
</script>
