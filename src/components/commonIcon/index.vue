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
    size: {
      type: Number,
      default: 18,
    },
  },

  setup(prop) {
    if (prop.name.indexOf('el-') === 0) {
      return () => (
        <el-icon size={prop.size}>{h(resolveComponent(`${prop.name.substring(3)}`))}</el-icon>
      );
    } else if (prop.name.indexOf('icon-') === 0) {
      return () => (
        <SvgIcon
          size={prop.size}
          iconName={prop.name}
        />
      );
    } else {
      return () => <i class="fa fa-camera-retro fa-lg"></i>;
    }
  },
});
</script>
