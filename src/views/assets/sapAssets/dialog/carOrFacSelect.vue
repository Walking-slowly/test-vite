<script lang="jsx">
import { useTable } from '@/hook/index.ts';
import { getFacilityForSap, getVehInfoForSap } from '@/api/index.js';
export default defineComponent({
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    // 类型
    type: {
      type: String,
      required: true,
    },
  },

  emits: ['update:dialogVisible', 'callBack'],

  setup(props, { emit }) {
    const handleClose = () => {
      emit('update:dialogVisible', false);
    };

    const footer = () => (
      <div>
        <el-button onClick={handleClose}>关 闭</el-button>
        <el-button
          type="primary"
          onClick={handleOk}>
          确 认
        </el-button>
      </div>
    );

    const formModel = ref({});

    const FormSearchCols = computed(() => {
      let arr =
        props.type === 'c'
          ? [
              {
                elType: 'el-input',
                span: 6,
                prop: 'vtiVehTypeName',
                placeholder: '车辆型号',
              },
              {
                elType: 'el-input',
                span: 6,
                prop: 'frameNo',
                placeholder: '车架号',
              },
              {
                elType: 'el-input',
                span: 6,
                prop: 'vbiLicense',
                placeholder: '车牌号/项目车号',
              },
            ]
          : [
              {
                elType: 'el-input',
                span: 6,
                prop: 'facilityName',
                placeholder: '设施名称',
              },
            ];
      return [
        ...arr,
        {
          elType: 'custom',
          span: props.type === 'c' ? 6 : 18,
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
    });

    const TableColumns = computed(() => {
      let arr =
        props.type === 'c'
          ? [
              {
                title: '序号',
                width: 60,
                type: 'index',
                align: 'center',
              },
              {
                title: '项目车号',
                width: 100,
                prop: 'manufacturingNo',
                align: 'center',
              },
              {
                title: '车牌号',
                width: 100,
                prop: 'vbiLicense',
                align: 'center',
              },
              {
                title: '车辆型号',
                width: 160,
                prop: 'vtiVehTypeName',
                align: 'center',
              },
              {
                title: '车架号',
                minWidth: 140,
                prop: 'frameNo',
                align: 'center',
              },
              {
                title: '出厂编号',
                minWidth: 140,
                prop: 'productSerialNo',
                align: 'center',
              },
            ]
          : [
              {
                title: '序号',
                width: 60,
                type: 'index',
                align: 'center',
              },
              {
                title: '设施名称',
                minWidth: 100,
                prop: 'facilityName',
                align: 'center',
              },
              {
                title: '设施类型',
                minWidth: 100,
                prop: 'facilityTypeName',
                align: 'center',
              },
              {
                title: '设施编号',
                minWidth: 160,
                prop: 'facilityCode',
                align: 'center',
              },
            ];
      return [
        ...arr,
        {
          title: '备注',
          minWidth: 110,
          prop: 'remark',
          align: 'center',
        },
      ];
    });
    const tableList = ref([]);
    const selectList = ref([]);
    const search = () => {
      loading.value = true;
      const params = {
        projectId: props.projectId,
        ...formModel.value,
        limit: pageSize.value,
        page: currentPage.value,
      };
      let server = props.type === 'c' ? getVehInfoForSap(params) : getFacilityForSap(params);
      server
        .then(data => {
          tableList.value = data.rows || [];
          total.value = data.total || 0;
          loading.value = false;
          console.log(tableList, 's');
        })
        .catch(() => {
          loading.value = false;
        });
    };
    let { currentPage, pageSize, total, loading, init, onChangePage } = useTable(search);

    const handleRest = () => {
      formModel.value = {};
      init();
    };

    const handleOk = () => {
      handleClose();
      emit('callBack', selectList);
    };

    const onChangeSelect = val => {
      selectList.value = val || [];
    };

    init();

    return () => (
      <el-dialog
        v-model={props.dialogVisible}
        title={props.type === 'c' ? '车辆' : '设施'}
        width="1000"
        append-to-body={true}
        close-on-click-modal={false}
        v-slots={{ footer }}
        before-close={handleClose}>
        <common-form
          v-model={[formModel, 'modelValue']}
          cols={FormSearchCols.value}
        />

        <commonTable
          v-model:current-page={currentPage.value}
          v-model:page-size={pageSize.value}
          columns={TableColumns.value}
          style={{ height: '500px' }}
          data={tableList.value}
          loading={loading.value}
          border={true}
          isSelect={true}
          is-pagination={true}
          total={total.value}
          onChangeSelect={onChangeSelect}
          onChangePage={onChangePage}
        />
      </el-dialog>
    );
  },
});
</script>
