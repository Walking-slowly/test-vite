<script lang="tsx">
import AssetsTab from './assetsTab.vue';
import SapTab from './sapTab.vue';

import { getSapDetail } from '@/api/sapAssets/index.js';

export default defineComponent({
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },

    isEdit: {
      type: Boolean,
      default: false,
    },

    currentId: {
      type: String,
      default: '',
    },

    pageType: {
      type: String,
      default: 'add',
    },
  },

  emits: ['update:dialogVisible'],

  setup(props, { emit }) {
    let loading = ref(false);
    const activeName = ref<string>('a');
    const assetsDetails = ref();
    const assetsDetailsInfo = ref({});

    const getSapDetailFc = () => {
      loading.value = true;
      getSapDetail(props.currentId)
        .then(data => {
          assetsDetailsInfo.value = data || {};
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const handleClose = () => {
      emit('update:dialogVisible', false);
    };

    const handleSubmit = async () => {
      await nextTick;
      if (!assetsDetails.value) return;
      assetsDetails.value.assetsTabValidate().then(() => {
        console.log(111);
      });
    };

    const footer = () => (
      <div>
        <el-button onClick={handleClose}>关 闭</el-button>
        {props.pageType === 'add' && (
          <el-button
            type="primary"
            onClick={handleSubmit}>
            提 交
          </el-button>
        )}
      </div>
    );

    getSapDetailFc();

    return () => (
      <el-dialog
        v-model={props.dialogVisible}
        title="资产详情"
        width="1200"
        close-on-click-modal={false}
        v-slots={{ footer }}
        before-close={handleClose}>
        <el-tabs
          v-model={[activeName.value, 'modelValue']}
          tab-position="left"
          style="margin: -15px -20px -15px 0;">
          <el-tab-pane
            label="SAP信息"
            lazy
            name="a">
            <SapTab
              assetsDetailsInfo={assetsDetailsInfo.value}
              v-loading={loading.value}
            />
          </el-tab-pane>
          <el-tab-pane
            label="关联资产"
            lazy
            name="b">
            <AssetsTab
              ref={assetsDetails}
              assetsDetailsInfo={assetsDetailsInfo.value}
              pageType={props.pageType}
              v-loading={loading.value}
            />
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    );
  },
});
</script>

<style lang="scss" scoped>
::v-deep(.el-tabs__nav-wrap) {
  padding: 15px 0 0 15px;
  margin-right: -2px !important;
}
::v-deep(.el-tabs__header) {
  margin-right: 0 !important;
}
::v-deep(.el-tabs__content) {
  padding: 15px 30px;
  border-left: 2px solid #e4e7ed;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
}
</style>
