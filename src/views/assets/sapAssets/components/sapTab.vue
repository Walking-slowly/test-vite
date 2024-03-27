<script lang="tsx">
export default defineComponent({
  props: {
    assetsDetailsInfo: {
      type: Object,
      default: () => {},
    }
  },

  setup(props) {
    const FormCols = [
      {
        elType: 'el-input',
        span: 8,
        prop: 'remark',
        label: '资产描述',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'archivesCode',
        label: '资产编号',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'projectName',
        label: '项目',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'companyName',
        label: '项目公司',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'companyCode',
        label: '公司编号',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'baseProjectCode',
        label: '项目WBS',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'vehTypeName',
        label: '车辆型号',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'frameNo',
        label: '车架号',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'billNo',
        label: '发票号',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'totalNum',
        label: 'SAP数量',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'unitName',
        label: '单位',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'sapType',
        label: '资产类型',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'acquisitionDate',
        label: '购置日期',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'depreciationDate',
        label: '拆旧开始日期',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'cost',
        label: '资产原值（元）',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'netWorth',
        label: '最新净值（元）',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'netSalvage',
        label: '预计净残值（元）',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'depreciationAmount',
        label: '最新折旧额（元）',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'serviceLife',
        label: '使用寿命（月）',
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'remainingLife',
        label: '剩余寿命（月）',
      },
    ];

    return () => (
      <common-form
        label-position="top"
        disabled={true}
        modelValue={props.assetsDetailsInfo}
        cols={FormCols}
        isDivider={false}
      />
    );
  },
});
</script>
