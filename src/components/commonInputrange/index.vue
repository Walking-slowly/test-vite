<script lang="jsx">
import { Search, CircleClose } from '@element-plus/icons-vue';
export default defineComponent({
  name: 'CommonInputrange',

  props: {
    startPlaceholder: {
      type: String,
      default: '',
    },
    endPlaceholder: {
      type: String,
      default: '',
    },
    value: {
      type: Array,
      default: () => [],
    },

    // 只能输入小数后几位
    decimal: {
      type: Number,
      default: 2,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    let startValue = ref('');
    let endValue = ref('');

    const handleStartInput = value => {
      const test = new RegExp(`\\d+\\.?\\d{0,${props.decimal}}`);
      startValue.value = value.match(test)[0];
      emit('update:modelValue', [startValue.value, endValue.value]);
    };

    const handleEndInput = value => {
      const test = new RegExp(`\\d+\\.?\\d{0,${props.decimal}}`);
      endValue.value = value.match(test)[0];
      emit('update:modelValue', [startValue.value, endValue.value]);
    };

    const handleClear = () => {
      startValue.value = '';
      endValue.value = '';
      emit('update:modelValue', []);
    };

    const CloseComponent = () => {
      return startValue.value || endValue.value
        ? {
            suffixIcon: () => (
              <el-icon
                className="cursor"
                onClick={handleClear}>
                <CircleClose />
              </el-icon>
            ),
          }
        : {};
    };

    return () => (
      <div className="common-inputrange">
        <el-input
          v-model={[startValue.value, 'modelValue']}
          prefix-icon={Search}
          onInput={handleStartInput}
          placeholder={props.startPlaceholder}
        />
        至
        <el-input
          v-model={[endValue.value, 'modelValue']}
          onInput={handleEndInput}
          placeholder={props.endPlaceholder}
          {...CloseComponent()}
        />
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
.common-inputrange {
  display: flex;
  width: 100%;
  border: var(--el-border);
  border-radius: var(--el-border-radius-base);
  ::v-deep(.el-input__wrapper) {
    box-shadow: none;
    padding-top: 0;
    padding-bottom: 0;
  }
  ::v-deep(.el-input__inner) {
    text-align: center;
  }
  ::v-deep(.el-input__suffix) {
    display: none;
    border-left: 0 !important;
    &::before {
      display: none;
    }
  }
  &:hover {
    ::v-deep(.el-input__suffix) {
      display: block;
    }
  }
}
</style>
