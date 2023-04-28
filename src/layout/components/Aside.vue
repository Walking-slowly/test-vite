<script lang="tsx">
import { FunctionalComponent as FC } from "vue"

import { useRoute } from 'vue-router';
interface rowsItem {
  name: String,
  url: String,
  icon?: String,
  isParent?: Boolean,
  parentUrl?: String,
  children?: Array<rowsItem>
}

export default defineComponent({
  name: 'Aside',
  setup () {
    const menuList: Array<rowsItem> = JSON.parse(sessionStorage.getItem('menuList') || '') || []
    const route = useRoute()

    // 目录
    const MenuTtem: FC<rowsItem> = item => {
      const { url, name, icon, isParent, parentUrl, children } = item
      return <>
        {
          children && children.length 
          ? <SubmenuItem {...item} {...{parentUrl: `${parentUrl}${url}/`}}/> 
          : <el-menuItem index={`${parentUrl}${url}`}>
            { isParent && <el-icon>{ icon && h(resolveComponent(`${icon}`)) }</el-icon> }
            <span>{ name }</span>
          </el-menuItem>
        }
      </>
    }

    // 菜单
    const SubmenuItem: FC<rowsItem> = ({ name,  url, children = [], isParent, icon, parentUrl }) => {
      const slots = {
        title: () => <>
          { isParent && <el-icon>{ icon && h(resolveComponent(`${icon}`)) }</el-icon> }
          <span>{ name }</span>
        </>
      }

      return <>
        <el-subMenu index={`${parentUrl}${url}`} v-slots={slots}>
          { children?.map(i => <MenuTtem {...i} {...{parentUrl: `${parentUrl}${url}/`}}/>) }
        </el-subMenu>
      </>
    }

    return () => (
      <el-aside>
        <el-scrollbar>
          <el-menu
            router
            default-active={route.path}
            unique-opened>
            { menuList.map(item => {
              return <>
                {
                  item.children && item.children.length 
                  ? <SubmenuItem {...item} isParent parentUrl="/"/> 
                  : <MenuTtem {...item} isParent parentUrl="/" />
                }
              </>
            }) }
          </el-menu>
        </el-scrollbar>
      </el-aside>
    )
  }
})
</script>
