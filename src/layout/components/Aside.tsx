import { FunctionalComponent as FC } from "vue"

interface rowsItem {
  name: String,
  url: String,
  children?: Array<rowsItem>
}

const menuTtem: FC<rowsItem> = rows => <>
  <el-menu-item index={ rows.url }>
    <i class="el-icon-menu"/><span v-slots:title>{ rows.name }</span>
  </el-menu-item>
</>

const submenuItem: FC<rowsItem> = rows => <>
  <el-sub-menu index={ rows.url }>{ rows.children?.map(i => <menuTtem {...i}/>) }</el-sub-menu>
</>

export default defineComponent({
  name: 'Aside',
  setup () {
    const menuList: Array<rowsItem> = JSON.parse(sessionStorage.getItem('menuList') || '') || []

    return () => (
      <el-aside>
        <el-menu>
          { menuList.map(item => {
            return <>
              {
                item.children && item.children.length 
                ? <submenuItem {...item}/> 
                : <menuTtem {...item}/>
              }
            </>
          }) }
        </el-menu>
      </el-aside>
    )
  }
})
