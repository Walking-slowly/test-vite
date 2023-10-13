<script lang="tsx">
import { FunctionalComponent as FC } from 'vue';
import { useCommonStore } from '@/store/common.js';

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
    const isDarkTheme = computed(() => useStore.isDarkTheme);
    const routeTabs = computed({
      get: () => useStore.routeTabs,
      set: (val) => useStore.SET_ROUTETABS(val),
    });

    const handleClick = (row: RowsItem) => {
      const index = routeTabs.value.findIndex((i: RowsItem) => i.url === row.url);
      if (index >= 0) return;
      routeTabs.value.push(row);
    };

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
            <el-menuItem
              index={`${parentUrl}${url}`}
              onClick={() => handleClick({ ...item, url: `${parentUrl}${url}` })}>
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
      );
    };

    handleClick({
      name: route.meta.title as string,
      url: route.path,
    });

    return () => (
      <el-aside>
        <el-scrollbar>
          <el-menu
            router
            collapse={isCollapse.value}
            default-active={route.path}
            text-color={isDarkTheme.value ? '#FFF' : ''}
            unique-opened>
            <el-menu-item
              onClick={() => handleClick({ name: '首页', url: '/home' })}
              index="/home"
              class="header-img-menuItem">
              <el-icon size={20}></el-icon>
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
