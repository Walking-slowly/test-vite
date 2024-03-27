<script lang="jsx">
import { useTable, useDownload } from '@/hook/index.ts';
import { getSapAssetsPage, getSapTotal } from '@/api/sapAssets/index.js';
import { getAuthProjectList, getCompanyList, getSapType } from '@/api/index.js';

import Details from './components/details.vue';
// import { ElMessage, ElMessageBox } from 'element-plus';

export default defineComponent({
  setup() {
    let dialogVisible = ref(false);
    // 查询数据
    let formModel = ref({});
    let totalInfo = ref({});
    let sapTypes = ref([]);
    let currentId = ref('');
    let pageType = ref('add');

    // 表单配置
    const FormSearchCols = ref([
      {
        elType: 'common-select',
        span: 4,
        prop: 'bindStatus',
        placeholder: '拆分绑定状态',
        slots: {
          default: () => (
            <>
              <el-option
                label="未绑定"
                value="0"
              />
              <el-option
                label="已绑定"
                value="1"
              />
            </>
          ),
        },
      },
      {
        elType: 'el-input',
        span: 4,
        prop: 'archivesCode',
        placeholder: '资产描述/资产编号',
      },
      {
        elType: 'common-select',
        span: 4,
        prop: 'projectId',
        isVirtualized: true,
        props: {
          label: 'name',
          value: 'projectId',
        },
        filterable: true,
        options: [],
        placeholder: '项目',
      },
      {
        elType: 'common-select',
        span: 4,
        prop: 'companyCode',
        isVirtualized: true,
        props: {
          label: 'companyName',
          value: 'companyCode',
        },
        filterable: true,
        options: [],
        placeholder: '项目公司',
      },
      {
        elType: 'el-input',
        span: 4,
        prop: 'vehTypeName',
        placeholder: '车辆型号',
      },
      {
        elType: 'el-input',
        span: 4,
        prop: 'frameNo',
        placeholder: '车架号',
      },
      {
        elType: 'el-input',
        span: 4,
        prop: 'billNo',
        placeholder: '发票号',
      },
      {
        elType: 'common-select',
        span: 4,
        prop: 'sapType',
        placeholder: '资产类型',
        slots: {
          default: () =>
            sapTypes.value.map(i => (
              <el-option
                label={i.sapTypeName}
                value={i.sapType}
              />
            )),
        },
      },
      {
        elType: 'el-date-picker',
        span: 8,
        prop: 'time1',
        type: 'daterange',
        rangeSeparator: '至',
        valueFormat: 'YYYY-MM-DD',
        startPlaceholder: '购置开始日期',
        endPlaceholder: '购置结束日期',
      },
      {
        elType: 'el-date-picker',
        span: 8,
        prop: 'time2',
        type: 'daterange',
        rangeSeparator: '至',
        valueFormat: 'YYYY-MM-DD',
        startPlaceholder: '拆旧开始日期',
        endPlaceholder: '拆旧结束日期',
      },
      {
        elType: 'common-inputrange',
        span: 8,
        prop: 'g',
        startPlaceholder: '最低资产原值',
        endPlaceholder: '最高资产原值',
      },
      {
        elType: 'common-inputrange',
        span: 8,
        prop: 'h',
        startPlaceholder: '最低预计净残值',
        endPlaceholder: '最高预计净残值',
      },
      {
        elType: 'custom',
        span: 8,
        cellRenderer: () => (
          <div style="text-align: right; width: 100%">
            <el-button
              type="primary"
              onClick={() => {
                init();
                getSapTotalFc();
              }}>
              查询
            </el-button>
            <el-button onClick={handleRest}>重置</el-button>
            <el-button
              type="primary"
              l>
              刷新SAP资产
            </el-button>
            <el-button
              type="primary"
              onClick={handleDownload}>
              导出
            </el-button>
          </div>
        ),
      },
    ]);

    // 查询项目
    const getAuthProjectListFc = () => {
      getAuthProjectList({ level: 4 }).then(data => {
        FormSearchCols.value[2].options = data || [];
      });
    };

    // 查询项目公司
    const getCompanyListFc = () => {
      getCompanyList().then(data => {
        FormSearchCols.value[3].options = data || [];
      });
    };

    // 查询统计
    const getSapTotalFc = () => {
      getSapTotal(filterParams()).then(data => {
        totalInfo.value = data || {};
      });
    };

    // 资产类型
    const getSapTypeFc = () => {
      getSapType().then(data => {
        sapTypes.value = data || [];
      });
    };

    // 表格数据
    const TableColumns = [
      {
        title: '序号',
        width: 60,
        type: 'index',
        align: 'center',
      },
      {
        title: '拆分绑定状态',
        width: 110,
        prop: 'bindStatus',
        align: 'center',
        cellRenderer: ({ rowData }) => (
          <el-tag type={rowData.bindStatus === '0' ? 'danger' : 'primary'}>{rowData.bindStatusName}</el-tag>
        ),
      },
      {
        title: 'SAP资产描述',
        minWidth: 200,
        prop: 'remark',
        showOverflowTooltip: true,
        headerAlign: 'center',
        cellRenderer: ({ rowData }) => (
          <span
            onClick={() => handleClick(rowData, 'view')}
            className="el-text el-text--primary cursor">
            {rowData.remark}
          </span>
        ),
      },
      {
        title: 'SAP资产编号',
        width: 125,
        prop: 'archivesCode',
        align: 'center',
      },
      {
        title: '项目',
        minWidth: 150,
        prop: 'projectName',
        showOverflowTooltip: true,
        headerAlign: 'center',
      },
      {
        title: '项目公司',
        minWidth: 200,
        prop: 'companyName',
        headerAlign: 'center',
        showOverflowTooltip: true,
      },
      {
        title: '公司编号',
        width: 90,
        prop: 'companyCode',
        align: 'center',
      },
      {
        title: 'SAP数量',
        width: 90,
        prop: 'totalNum',
        align: 'center',
      },
      {
        title: '拆分绑定数量',
        width: 110,
        prop: 'bindNum',
        align: 'center',
      },
      {
        title: 'SAP车辆型号',
        width: 110,
        prop: 'vehTypeName',
        align: 'center',
        showOverflowTooltip: true,
      },
      {
        title: 'SAP车架号',
        width: 110,
        prop: 'frameNo',
        align: 'center',
        showOverflowTooltip: true,
      },
      {
        title: 'SAP发票号',
        width: 110,
        prop: 'billNo',
        align: 'center',
        showOverflowTooltip: true,
      },
      {
        title: 'SAP资产类型',
        width: 110,
        prop: 'sapType',
        align: 'center',
      },
      {
        title: '购置日期',
        width: 100,
        prop: 'acquisitionDate',
        align: 'center',
      },
      {
        title: '折旧开始日期',
        width: 110,
        prop: 'depreciationDate',
        align: 'center',
      },
      {
        title: '资产原值(元)',
        width: 110,
        prop: 'cost',
        align: 'center',
      },
      {
        title: '最新净值(元)',
        width: 110,
        prop: 'netWorth',
        align: 'center',
      },
      {
        title: '预计净残值(元)',
        width: 120,
        prop: 'netSalvage',
        align: 'center',
      },
      {
        title: '最新折旧额(元)',
        width: 120,
        prop: 'depreciationAmount',
        align: 'center',
      },
      {
        title: '使用寿命(月)',
        width: 110,
        prop: 'serviceLife',
        align: 'center',
      },
      {
        title: '剩余寿命(月)',
        width: 110,
        prop: 'remainingLife',
        align: 'center',
      },
      {
        title: '操作',
        width: 90,
        fixed: 'right',
        align: 'center',
        cellRenderer: ({ rowData }) => {
          return (
            <>
              <el-button
                link
                onClick={() => handleClick(rowData, 'add')}
                type="primary">
                拆分绑定
              </el-button>
            </>
          );
        },
      },
    ];

    const handleClick = (row, type) => {
      currentId.value = row.id;
      pageType.value = type;
      dialogVisible.value = true;
    };

    const handleRest = () => {
      formModel.value = {};
      init();
      getSapTotalFc();
    };

    const filterParams = () => {
      const params = {
        ...formModel.value,
      };
      if (params.time1 && params.time1.length) {
        params.acquisitionStartDate = params.time1[0];
        params.acquisitionEndDate = params.time1[1];
      }
      if (params.time2 && params.time2.length) {
        params.depreciationStartDate = params.time2[0];
        params.depreciationEndDate = params.time2[1];
      }
      if (params.g && params.g.length) {
        params.costStart = params.g[0];
        params.costEnd = params.g[1];
      }
      if (params.h && params.h.length) {
        params.netSalvageStart = params.h[0];
        params.netSalvageEnd = params.h[1];
      }
      delete params.time1;
      delete params.time2;
      delete params.g;
      delete params.h;
      return params;
    };

    const { handleDownload } = useDownload({
      url: 'assetsInfo/export',
      params: filterParams(),
    });

    // 列表查询
    let tableList = ref([]);
    let { currentPage, pageSize, total, loading, init, onChangePage } = useTable(() => {
      loading.value = true;
      getSapAssetsPage({ ...filterParams(), limit: pageSize.value, page: currentPage.value })
        .then(data => {
          tableList.value = data.rows || [];
          total.value = data.total || 0;
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    });

    init();
    getSapTotalFc();
    getAuthProjectListFc();
    getCompanyListFc();
    getSapTypeFc();

    return () => (
      <div
        class="flow"
        style="height: calc(100vh - 105px);">
        <common-form
          v-model={[formModel, 'modelValue']}
          cols={FormSearchCols.value}
        />

        <el-row class="sapAssets-total">
          <el-col span={4}>
            <b>{totalInfo.value.typeNum || 0}</b>
            <span>资产种类数</span>
          </el-col>
          <el-col span={4}>
            <b>{totalInfo.value.totalNum || 0}</b>
            <span>SAP总数量</span>
          </el-col>
          <el-col span={4}>
            <b>{totalInfo.value.cost || 0}</b>
            <span>资产总原值(元)</span>
          </el-col>
          <el-col span={4}>
            <b>{totalInfo.value.netWorth || 0}</b>
            <span>最新总净值(元)</span>
          </el-col>
          <el-col span={4}>
            <b>{totalInfo.value.depreciationAmount || 0}</b>
            <span>最新折旧总额(元)</span>
          </el-col>
          <el-col span={4}>
            <b>{totalInfo.value.netsalvage || 0}</b>
            <span>预计总净残值(元)</span>
          </el-col>
        </el-row>

        <commonTable
          v-model:current-page={currentPage.value}
          v-model:page-size={pageSize.value}
          columns={TableColumns}
          data={tableList.value}
          loading={loading.value}
          border={true}
          stripe
          is-pagination={true}
          total={total.value}
          onChangePage={onChangePage}
        />

        {dialogVisible.value && (
          <Details
            v-model:dialogVisible={dialogVisible.value}
            pageType={pageType.value}
            currentId={currentId.value}
          />
        )}
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
.sapAssets-total {
  margin-bottom: 8px;
  background-color: #ecf8ff;
  border-radius: 4px;
  ::v-deep(.el-col) {
    text-align: center;
    padding: 14px 0;
    b,
    span {
      display: block;
    }
    b {
      font-size: 24px;
      line-height: 30px;
    }
    span {
      font-size: 12px;
    }
  }
}
</style>
