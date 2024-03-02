<script lang="tsx">
import SvgIcon from './svg-icon.vue';
export default defineComponent({
  name: 'CommonIcon',
  components: { SvgIcon },
  props: {
    /**
     * 图片名称
     * el- 开头加载element-plus图片
     * icon- 开头加载本地svg
     * fa- 开头加载FontAwesome图标
     */
    name: {
      type: String,
      required: true,
    },
    fontSize: {
      type: Number,
      default: 18,
    },
  },

  setup(prop) {
    if (prop.name.indexOf('el-') === 0) {
      return () => (
        <el-icon size={prop.fontSize}>{h(resolveComponent(`${prop.name.substring(3)}`))}</el-icon>
      );
    } else {
      return () => (
        <SvgIcon
          size={prop.fontSize}
          iconName={prop.name}
        />
      );
    }
  },
});
</script>
