<script lang="tsx">
import { FunctionalComponent as FC } from 'vue';
import { useCommonStore } from '@/store/common.ts';

interface RowsItem {
  name: string;
  url?: string;
  path: string;
  label?: string;
  icon?: string;
  isParent?: boolean;
  parentUrl?: string;
  list?: Array<RowsItem>;
}

export default defineComponent({
  name: 'CommonAside',
  setup() {
    const menuList: Array<RowsItem> = JSON.parse(sessionStorage.getItem('menuList') || '[]');
    const route = useRoute();
    const router = useRouter();
    const useStore = useCommonStore();

    const isCollapse = computed(() => useStore.isCollapse);
    const isDarkTheme = computed(() => useStore.isDarkTheme);
    const routeTabs = computed({
      get: () => useStore.routeTabs,
      set: val => useStore.SET_ROUTETABS(val),
    });

    const handleClick = (row: RowsItem) => {
      router.replace({ path: row.path });

      setTimeout(() => {
        const index = routeTabs.value.findIndex((i: RowsItem) => i.path === row.path);

        if (index >= 0) return;
        routeTabs.value.push({
          name: row.name,
          path: row.path,
          label: row.label
        });
      })
    };

    // 目录
    const MenuTtem: FC<RowsItem> = item => {
      const { url, path, name, icon, isParent, parentUrl = '/', list } = item;
      return (
        <>
          {list && list.length ? (
            <SubmenuItem {...item} />
          ) : (
            <el-menuItem
              index={`${parentUrl}${url}`}
              onClick={() => handleClick({ ...item, path: `${parentUrl}${url}`, label: path.charAt(0).toUpperCase() + path.slice(1) })}>
              {isParent && <common-icon name={icon} />}
              <span style={`margin-left: ${!isParent ? '18px' : ''}`}>{name}</span>
            </el-menuItem>
          )}
        </>
      );
    };

    // 菜单
    const SubmenuItem: FC<RowsItem> = ({ name, url, list = [], isParent, icon, parentUrl = '/' }) => {
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
          {list?.map(i => (
            <MenuTtem {...i} />
          ))}
        </el-subMenu>
      );
    };

    handleClick({
      name: route.meta.title as string,
      label: route.name as string,
      path: route.path,
    });

    return () => (
      <el-aside>
        <el-menu
          collapse={isCollapse.value}
          text-color={isDarkTheme.value ? '#FFF' : ''}>
          <el-menu-item
            index="/home"
            class="header-img-menuItem"></el-menu-item>
        </el-menu>
        <el-scrollbar style="flex: 1;">
          <el-menu
            router
            collapse={isCollapse.value}
            default-active={route.path}
            text-color={isDarkTheme.value ? '#FFF' : ''}
            unique-opened>
            {menuList.map(item => {
              const tag = item.list && item.list.length ? SubmenuItem : MenuTtem;
              return (
                <tag
                  {...item}
                  isParent
                  parentUrl="/"
                />
              );
            })}
          </el-menu>
        </el-scrollbar>
      </el-aside>
    );
  },
});
</script>
