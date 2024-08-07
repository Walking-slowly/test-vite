<script lang="jsx">
import { ElMessage } from 'element-plus';
import { ZoomIn, Delete, Download, Link } from '@element-plus/icons-vue';

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
    const { modelValue: fileList } = toRefs(props);

    const imgTypes = ['.jpeg', '.png', '.gif', '.bmp', '.raw', '.tiff', '.tif', '.jpg'];

    const handleSuccess = (a, b, files) => {
      emit(
        'update:modelValue',
        (files || []).map(i => ({
          name: i.name,
          url: i.response ? i.response.data.url : i.url,
        }))
      );
    };

    const handleRemove = file => {
      const res = file.response ? file.response.data.url : file.url;
      const i = fileList.value.findIndex(i => (i.response ? i.response.data.url : i.url) === res);
      if (i >= 0) {
        fileList.value.splice(i, 1);
        emit('update:modelValue', fileList.value);
      }
    };

    const beforeUpload = rawFile => {
      let res = rawFile.name.substring(rawFile.name.lastIndexOf('.'));
      if (attrs.accept.indexOf(res.toLowerCase()) === -1) {
        ElMessage.error(`上传文件只能是${attrs.accept}格式!`);
        return false;
      } else if (rawFile.size / 1024 / 1024 > props.fileSize) {
        ElMessage.error(`文件大小限制为${props.fileSize}MB!`);
        return false;
      } else {
        return true;
      }
    };

    const handlePreview = file => {
      const res = file.response ? file.response.data.url : file.url;
      let testmsg = res.substring(res.lastIndexOf('.'));
      if (imgTypes.includes(testmsg)) {
        window.open(res);
      } else {
        window.open(`${import.meta.env.VITE_PREVIEW}onlinePreview?url=${window.btoa(res)}`);
      }
    };

    const handleDownload = file => {
      const url = file.response ? file.response.data.url : file.url;
      window.open(url, '_blank');

      // const xhr = new window.XMLHttpRequest()
      // xhr.open('GET', url, true)
      // xhr.responseType = 'blob'
      // xhr.send()
      // xhr.onload = () => {
      // if (xhr.status === 200) {
      //   const url = window.URL.createObjectURL(xhr.response)
      //   const a = document.createElement('a')
      //   a.style.display = "none";
      //   a.href = url;
      //   a.download = file.name;
      //   document.body.appendChild(a);
      //   a.click();
      //   document.body.removeChild(a);
      //   window.URL.revokeObjectURL(url);
      // }}
    };

    const toggleClass = computed(() =>
      fileList.value.length === attrs.limit ? 'common-upload__hide' : 'common-upload'
    );

    const fileSlots = {
      file: ({ file }) => (
        <div style="display: flex;align-items: center;justify-content: space-between;">
          {attrs['list-type'] === 'picture-card' ? (
            <img
              class="el-upload-list__item-thumbnail"
              src={file.url}
              alt=""
            />
          ) : (
            <span style="display: flex;align-items: center; margin-left: 4px; overflow: hidden;">
              <el-icon>
                <Link />
              </el-icon>
              <a
                class="el-upload-list__item-fileTitle"
                title={file.name}>
                {file.name}
              </a>
            </span>
          )}
          {file.status === 'uploading' && (
            <el-progress
              type={attrs['list-type'] === 'picture-card' ? 'circle' : 'line'}
              color={'#aace3b'}
              percentage={parseInt(file.percentage)}
            />
          )}

          {file.status === 'success' && (
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__common-preview"
                onClick={() => handlePreview(file)}>
                <el-icon>
                  <ZoomIn />
                </el-icon>
              </span>
              <span
                class="el-upload-list__common-download"
                onClick={() => handleDownload(file)}>
                <el-icon>
                  <Download />
                </el-icon>
              </span>
              <span
                class="el-upload-list__common-delete"
                onClick={() => handleRemove(file)}>
                <el-icon>
                  <Delete />
                </el-icon>
              </span>
            </span>
          )}
        </div>
      ),
      ...(props.slots || {}),
    };

    return () => (
      <el-upload
        style="width: 100%;"
        class={[toggleClass.value, { 'common-upload__disabled': attrs.disabled }]}
        headers={{
          token: sessionStorage.getItem('token'),
        }}
        on-success={handleSuccess}
        before-upload={beforeUpload}
        multiple={true}
        action={import.meta.env.VITE_BASIC_API + 'oss/upload'}
        {...attrs}
        v-slots={fileSlots}
        v-model:file-list={fileList.value}
      />
    );
  },
});
</script>

<style scoped lang="scss">
::v-deep(.el-upload-list.is-disabled > .el-upload--picture-card) {
  display: none;
}
.common-upload__hide {
  ::v-deep(.el-upload--picture-card) {
    display: none;
  }
}

::v-deep(.el-upload-list.is-disabled .el-upload-list__common-delete) {
  display: none !important;
}

.el-upload-list__item-actions {
  display: flex;
  align-items: center;
}
.el-upload-list__common-preview,
.el-upload-list__common-download,
.el-upload-list__common-delete {
  cursor: pointer;
  display: flex;
  &:hover {
    color: var(--el-color-primary);
  }
}

.el-upload-list__item-actions {
  min-width: 55px;
  justify-content: space-around;
}

.el-upload-list__item-fileTitle {
  color: #567009;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 15px;
  margin-left: 5px;
}
</style>

<style>
.common-form-disabled .el-upload {
  display: none !important;
}
.common-upload__disabled .el-upload {
  display: none !important;
}
</style>
