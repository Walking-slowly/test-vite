<script lang="jsx">
import { useTable } from '@/hook/index.ts';
import { scheduleJobLog } from '@/api/quartz/index.js';
export default defineComponent({
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },

  emits: ['update:dialogVisible'],

  setup(props, { emit }) {
    const handleClose = () => {
      emit('update:dialogVisible', false);
    };

    const formModel = ref({});
    const FormSearchCols = [
      {
        elType: 'el-input',
        span: 6,
        prop: 'beanName',
        placeholder: 'spring bean名称',
      },
      {
        elType: 'custom',
        span: 18,
        cellRenderer: () => (
          <div style="text-align: right; width: 100%">
            <el-button
              type="primary"
              onClick={init}>
              查询
            </el-button>
            <el-button onClick={handleRest}>重置</el-button>
          </div>
        ),
      },
    ];

    const handleRest = () => {
      formModel.value = {};
      init();
    };

    const TableColumns = [
      {
        title: '序号',
        width: 60,
        type: 'index',
        align: 'center',
      },
      {
        title: 'spring bean名称',
        minWidth: 120,
        prop: 'beanName',
        align: 'center',
      },
      {
        title: '参数',
        minWidth: 100,
        prop: 'params',
        align: 'center',
      },
      {
        title: '任务状态',
        width: 90,
        prop: 'status',
        align: 'center',
        formatter: row => (row.status === 0 ? '成功' : '失败'),
      },
      {
        title: '失败信息',
        minWidth: 150,
        prop: 'error',
        align: 'center',
      },
      {
        title: '耗时(单位：毫秒)',
        minWidth: 100,
        prop: 'times',
        align: 'center',
      },
      {
        title: 'ip地址',
        minWidth: 100,
        prop: 'ipAddress',
        align: 'center',
      },
      {
        title: '执行时间',
        minWidth: 100,
        prop: 'createDate',
        align: 'center',
      },
    ];

    const search = () => {
      loading.value = true;
      scheduleJobLog({
        ...formModel.value,
        limit: pageSize.value,
        page: currentPage.value,
      })
        .then(data => {
          tableList.value = data.rows || [];
          total.value = data.total || 0;
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    };

    let { tableList, currentPage, pageSize, total, loading, init, onChangePage } = useTable(search);

    init();

    return () => (
      <el-dialog
        v-model={props.dialogVisible}
        title="查看"
        width="1300"
        close-on-click-modal={false}
        before-close={handleClose}>
        <common-form
          v-model={[formModel, 'modelValue']}
          cols={FormSearchCols}
        />

        <commonTable
          v-model:current-page={currentPage.value}
          v-model:page-size={pageSize.value}
          columns={TableColumns}
          style={{ height: '500px' }}
          data={tableList.value}
          loading={loading.value}
          border={true}
          is-pagination={true}
          total={total.value}
          onChangePage={onChangePage}
        />
      </el-dialog>
    );
  },
});
</script>
