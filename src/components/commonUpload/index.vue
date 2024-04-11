<script lang="jsx">
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'CommonUpload',
  inheritAttrs: false,

  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    // 插槽
    slots: {
      type: Object,
      default: () => {},
    },

    // 文件大小
    fileSize: {
      type: Number,
      default: 100,
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit, attrs }) {
    const fileList = ref(props.modelValue);

    const handleSuccess = (a, b, files) => {
      emit(
        'update:modelValue',
        (files || []).map(i => ({
          name: i.name,
          url: i.response ? i.response.data.url : i.url,
        }))
      );
    };

    const handleRemove = (a, files) => {
      emit(
        'update:modelValue',
        (files || []).map(i => ({
          name: i.name,
          url: i.response ? i.response.data.url : i.url,
        }))
      );
    };

    const beforeUpload = rawFile => {
      let res = rawFile.name.substring(rawFile.name.lastIndexOf('.'));
      if (attrs.accept.indexOf(res) === -1) {
        ElMessage.error(`上传文件只能是${attrs.accept}格式!`);
      } else if (rawFile.size / 1024 / 1024 > props.fileSize) {
        ElMessage.error(`文件大小限制为${props.fileSize}MB!`);
        return false;
      }
      return true;
    };

    const handlePreview = file => {
      const res = file.response ? file.response.data.url : file.url;
      window.open(`${import.meta.env.VITE_PREVIEW}onlinePreview?url=${window.btoa(res)}`);
    };

    const toggleClass = computed(() =>
      fileList.value.length === attrs.limit ? 'common-upload__hide' : 'common-upload'
    );

    return () => (
      <el-upload
        style="width: 100%;"
        headers={{
          token: sessionStorage.getItem('token'),
        }}
        className={toggleClass.value}
        on-success={handleSuccess}
        on-remove={handleRemove}
        before-upload={beforeUpload}
        on-preview={handlePreview}
        multiple={true}
        action={import.meta.env.VITE_BASIC_API + 'oss/upload'}
        {...attrs}
        v-model:file-list={fileList.value}>
        {Object.keys(props.slots || {}).map(slotKey => props.slots[slotKey] && props.slots[slotKey]())}
      </el-upload>
    );
  },
});
</script>

<style scoped lang="scss">
::v-deep(.el-upload-dragger) {
  background-color: #fafafa;
}
::v-deep(.el-upload-list.is-disabled > .el-upload--picture-card) {
  display: none;
}
.common-upload__hide {
  ::v-deep(.el-upload--picture-card) {
    display: none;
  }
}
</style>
