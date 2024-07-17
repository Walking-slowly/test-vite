<script lang="jsx">
export default defineComponent({
  name: 'CommonImage',
  inheritAttrs: false,

  props: {
    // 插槽
    slots: {
      type: Object,
      default: () => {},
    },
  },

  setup(props, { attrs }) {
    const initialIndex = ref(attrs['initial-index'] || 0)

    const onSwitch = index => initialIndex.value = index

    const onClose = () => initialIndex.value = attrs['initial-index'] || 0

    return () => (
      <el-image
        class="common-image"
        preview-teleported
        {...attrs}
        v-slots={{
          viewer: () => <>
            <div class="page-info">第{ initialIndex.value + 1 }张 / 共{ attrs['preview-src-list'].length }张</div>
          </>,
          ...props.slots
        }}
        onSwitch={onSwitch}
        onClose={onClose}
      />
    );
  },
});
</script>

<style>
.page-info {
  background-color: var(--el-text-color-regular);
  border-color: #fff;
  border-radius: 0 22px 22px 0;
  bottom: 30px;
  height: 44px;
  line-height: 44px;
  left: 50%;
  transform: translateX(79px);
  padding: 0 23px 0 5px;
  position: absolute;
  z-index: 2;
  opacity: 0.8;
  color: #FFF;
  font-family: "微软雅黑";
}
.el-image-viewer__actions {
  padding-right: 0;
  transform: translateX(-203px) !important;
  border-radius: 22px 0 0 22px;
}
</style>
