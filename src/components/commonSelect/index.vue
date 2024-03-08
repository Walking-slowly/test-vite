<script lang="tsx">
import { FunctionalComponent as FC } from 'vue';

export default defineComponent({
  name: 'CommonSelect',
  inheritAttrs: false,

  props: {
    // 下拉数据源
    options: {
      type: Array,
      default: () => [],
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

    // 插槽
    slots: {
      type: Object,
      default: () => {},
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
        {...attrs}>
        {Object.keys(props.slots || {}).map((slotKey) => props.slots[slotKey] && props.slots[slotKey]())}
      </el-tree-select>
    );

    const defaultSelect: FC = () =>
      props.isVirtualized ? (
        <el-select-v2
          v-model={[props.value, 'value']}
          options={props.options}
          {...attrs}>
          {Object.keys(props.slots || {}).map(
            (slotKey) => props.slots[slotKey] && props.slots[slotKey]()
          )}
        </el-select-v2>
      ) : (
        <el-select
          v-model={[props.value, 'value']}
          {...attrs}>
          {Object.keys(props.slots || {}).map(
            (slotKey) => props.slots[slotKey] && props.slots[slotKey]()
          )}
        </el-select>
      );

    return () => (props.isTree ? <treeSelect /> : <defaultSelect />);
  },
});
</script>
