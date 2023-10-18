<script lang="tsx">
import { FunctionalComponent as FC } from 'vue';

export default defineComponent({
  name: 'CommonSelect',
  inheritAttrs: false,

  props: {
    // 下拉数据源
    options: {
      type: Array,
      required: true,
    },
    value: {
      type: [String, Number, Array],
      default: '',
    },
    // 是否展示树形结构
    isTree: {
      type: Boolean,
      default: false,
    },

    isVirtualized: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:value'],

  setup(props, { attrs }) {
    const treeSelect: FC = () => (
      // 虚拟树下拉待开发...
      <el-tree-select
        v-model={[props.value, 'value']}
        data={props.options}
        {...attrs}
      />
    );

    const defaultSelect: FC = () =>
      props.isVirtualized ? (
        <el-select-v2
          v-model={[props.value, 'value']}
          data={props.options}
          {...attrs}
        />
      ) : (
        <el-select
          v-model={[props.value, 'value']}
          {...attrs}>
          {(props.options || []).map((option: any) => (
            <el-option {...option} />
          ))}
        </el-select>
      );

    return () => (props.isTree ? <treeSelect /> : <defaultSelect />);
  },
});
</script>
