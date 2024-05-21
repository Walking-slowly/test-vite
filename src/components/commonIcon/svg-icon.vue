<script lang="tsx">
export default defineComponent({
  name: 'CommonSvg',

  inheritAttrs: false,

  props: {
    iconName: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 16,
    },
    color: {
      type: String,
      default: '',
    },
  },

  setup(prop) {
    return () => (
      <>
        <svg
          style={{ width: prop.size + 'px', height: prop.size + 'px' }}
          class={['el-icon', 'svg-icon', `svg-icon__${prop.iconName}`]}
          aria-hidden="true">
          <use
            href={`#${prop.iconName}`}
            fill={prop.color}
          />
        </svg>
      </>
    );
  },
});
</script>

<style lang="css" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer;
}
</style>
