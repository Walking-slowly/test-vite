<script lang="tsx">
import { useTable } from '@/hook/index.ts';
import { getSysRolePage } from '@/api/sysrole/index.js';
// import { ElMessage, ElMessageBox } from 'element-plus';

interface RuleForm {
  key?: string | undefined;
}

export default defineComponent({
  setup() {
    // 查询数据
    let formModel = ref<RuleForm>({});
    const FormSearchCols = [
      {
        elType: 'el-select',
        span: 4,
        prop: 'a',
        placeholder: '项目',
      },
      {
        elType: 'el-date-picker',
        span: 8,
        prop: 'g',
        type: 'monthrange',
        rangeSeparator: '至',
        valueFormat: 'YYYY-MM',
        startPlaceholder: '开始月份',
        endPlaceholder: '结束月份',
      },
      {
        elType: 'custom',
        span: 12,
        cellRenderer: () => (
          <div style="text-align: right; width: 100%">
            <el-button
              type="primary"
              onClick={init}>
              查询
            </el-button>
            <el-button>重置</el-button>
            <el-button type="primary">导出</el-button>
          </div>
        ),
      },
    ];

    // 表格数据
    const TableColumns = [
      {
        title: '序号',
        width: 60,
        type: 'index',
        align: 'center',
      },
      {
        title: '项目',
        minWidth: 200,
        prop: 'roleName',
        align: 'center',
      },
      {
        title: '项目公司',
        minWidth: 200,
        prop: 'sysType',
        align: 'center',
      },
      {
        title: '公司编码',
        minWidth: 200,
        prop: 'roleType',
        align: 'center',
      },
      {
        title: '月份',
        minWidth: 200,
        prop: 'remark',
        headerAlign: 'center',
      },
      {
        title: '资产种类数',
        width: 100,
        prop: 'sort',
        align: 'center',
      },
      {
        title: '资产总数量',
        width: 100,
        prop: 'createUserName',
        align: 'center',
      },
      {
        title: '各资产状态数量',
        width: 160,
        prop: 'createDate',
        align: 'center',
        cellRenderer: () => (
          <>
            <el-table-column
              label="在用"
              width="80"
            />
            <el-table-column
              label="备用"
              width="80"
            />
            <el-table-column
              label="闲置"
              width="80"
            />
            <el-table-column
              label="租赁"
              width="80"
            />
            <el-table-column
              label="调拨"
              width="80"
            />
            <el-table-column
              label="维修"
              width="80"
            />
            <el-table-column
              label="待报废"
              width="80"
            />
          </>
        ),
      },
      {
        title: '各资产状态数量',
        width: 160,
        prop: 'createDate',
        align: 'center',
        cellRenderer: () => (
          <>
            <el-table-column
              label="SAP全部资产数"
              width="130"
            />
            <el-table-column
              label="SAP绑定资产数"
              width="130"
            />
            <el-table-column
              label="绑定资产总原值(元)"
              width="150"
            />
            <el-table-column
              label="绑定资产总净值(元)"
              width="150"
            />
            <el-table-column
              label="绑定月折旧总额(元)"
              width="150"
            />
            <el-table-column
              label="绑定总预计净残值(元)"
              width="170"
            />
          </>
        ),
      },
    ];

    // 列表查询
    let tableList = ref([]);
    const search = () => {
      loading.value = true;
      getSysRolePage({ ...formModel.value, limit: pageSize.value, page: currentPage.value })
        .then(data => {
          tableList.value = data.rows || [];
          total.value = data.total || 0;
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    };
    let { currentPage, pageSize, total, loading, init, onChangePage } = useTable(search);

    init();

    return () => (
      <div
        class="flow"
        style="height: calc(100vh - 105px);">
        <common-form
          v-model={[formModel, 'modelValue']}
          cols={FormSearchCols}
        />

        <commonTable
          v-model:current-page={currentPage.value}
          v-model:page-size={pageSize.value}
          columns={TableColumns}
          data={tableList.value}
          loading={loading.value}
          border={true}
          is-pagination={true}
          total={total.value}
          onChangePage={onChangePage}
        />
      </div>
    );
  },
});
</script>
