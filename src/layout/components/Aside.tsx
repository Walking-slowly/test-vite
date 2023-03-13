import { FunctionalComponent as FC } from "vue"

import { Edit } from "@element-plus/icons-vue";

import { useRoute } from 'vue-router';
interface rowsItem {
  name: String,
  url: String,
  isParent?: Boolean,
  parentUrl?: String,
  children?: Array<rowsItem>
}

// 目录
const MenuTtem: FC<rowsItem> = item => {
  const { 
    url, 
    name, 
    isParent, 
    parentUrl, 
    children 
  } = item
  return <>
    {
      children && children.length 
      ? <SubmenuItem {...item} {...{parentUrl: parentUrl}}/> 
      : <el-menuItem index={`${parentUrl || '/'}${url}`}>
        { isParent && <el-icon><Edit/></el-icon> }
        <span>{ name }</span>
      </el-menuItem>
    }
  </>
}

// 菜单
const SubmenuItem: FC<rowsItem> = ({ 
  name, 
  url, 
  children = [], 
  isParent, 
  parentUrl 
}) => {
  const slots = {
    title: () => <>
      { isParent && <el-icon><Edit/></el-icon> }
      <span>{ name }</span>
    </>
  }

  return <>
    <el-subMenu index={`${url}`} v-slots={slots}>
      { children?.map(i => <MenuTtem {...i} {...{parentUrl: `${parentUrl || '/'}${url}`}}/>) }
    </el-subMenu>
  </>
}

export default defineComponent({
  name: 'Aside',
  setup () {
    const menuList: Array<rowsItem> = JSON.parse(sessionStorage.getItem('menuList') || '') || []
    const route = useRoute()

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
                  ? <SubmenuItem {...item} isParent/> 
                  : <MenuTtem {...item} isParent/>
                }
              </>
            }) }
          </el-menu>
        </el-scrollbar>
      </el-aside>
    )
  }
})
