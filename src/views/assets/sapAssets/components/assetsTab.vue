<script lang="tsx">
import type { FormInstance } from 'element-plus';
import CarOrFacSelect from '../dialog/carOrFacSelect.vue';

import { getBindVehTypes } from '@/api/index.js';

interface formModel {
  totalNum: string;
  bindType: string;
  bindList: any[];
}

export default defineComponent({
  props: {
    assetsDetailsInfo: {
      type: Object,
      default: () => {},
    },
    pageType: {
      type: String,
      default: 'add',
    },
  },
  setup(props, { expose }) {
    const formModel = ref<formModel>({
      totalNum: props.assetsDetailsInfo.totalNum,
      bindType: props.pageType === 'add' ? props.assetsDetailsInfo.bindType || 'c' : props.assetsDetailsInfo.bindType,
      bindList: props.assetsDetailsInfo.bindList || [],
    });

    const dialogVisible = ref(false);
    const vehTypesloading = ref(false);
    const options = ref([]);

    // 表单
    const FormCols = computed(() => [
      {
        elType: 'common-select',
        span: 8,
        prop: 'bindType',
        required: true,
        clearable: false,
        rules: [{ required: true, message: '请选择', trigger: 'blur' }],
        label: '拆分绑定类型',
        slots: {
          default: () => (
            <>
              <el-option
                label="车辆"
                value="c"
              />
              <el-option
                label="设施"
                value="s"
              />
            </>
          ),
        },
        events: {
          change: () => (formModel.value.bindList = []),
        },
      },
      {
        elType: 'el-input',
        span: 8,
        prop: 'totalNum',
        label: 'SAP数量',
        disabled: true,
      },
      {
        elType: 'custom',
        span: 24,
        required: true,
        label: { c: '拆分绑定车辆', s: '拆分绑定设施' }[formModel.value.bindType],
        cellRenderer: () => (
          <>
            {props.pageType === 'add' && (
              <el-button
                type="primary"
                onClick={() => formModel.value.bindList.push({})}>
                新增
              </el-button>
            )}
            {props.pageType === 'add' && (
              <el-button
                type="primary"
                onClick={handleSelect}>
                {{ c: '绑定已有车辆', s: '绑定已有设施' }[formModel.value.bindType]}
              </el-button>
            )}

            <commonTable
              style={{ width: '100%', marginTop: '5px' }}
              columns={TableColumns.value}
              loading={false}
              data={formModel.value.bindList}
              border={true}
            />
          </>
        ),
      },
    ]);

    // 表格
    const TableColumns = computed(() => [
      {
        title: '序号',
        width: 60,
        type: 'index',
        align: 'center',
      },
      {
        title: { c: '项目车号', s: '设施编号' }[formModel.value.bindType],
        minWidth: 100,
        prop: 'a',
        align: 'center',
        cellRenderer: ({ $index, rowData }) => {
          return (
            <el-form-item
              prop={`bindList.${$index}.a`}
              rules={[{ required: true, message: '请输入', trigger: 'blur' }]}
              style={{ marginBottom: '0' }}>
              <el-input
                v-model={[rowData.a, 'modelValue']}
                placeholder="请输入"
              />
            </el-form-item>
          );
        },
      },
      {
        title: '车辆类型',
        minWidth: 100,
        prop: 'assetType',
        align: 'center',
        cellRenderer: ({ $index, rowData }) => (
          <el-form-item
            prop={`bindList.${$index}.assetType`}
            rules={[{ required: true, message: '请输入', trigger: 'blur' }]}
            style={{ marginBottom: '0' }}>
            <el-select
              v-model={[rowData.assetType, 'modelValue']}
              remote-show-suffix
              remote
              filterable
              readonly
              reserve-keyword
              v-slots={{
                loading: () => (
                  <svg
                    class="assetsTab-circular"
                    viewBox="0 0 50 50">
                    <circle
                      class="assetsTab-path"
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                    />
                  </svg>
                ),
              }}
              remote-method={getBindVehTypesFc}
              loading={vehTypesloading.value}>
              {options.value.map((i: any) => (
                <el-option
                  label={i.vehTypeName}
                  value={i.id}
                />
              ))}
            </el-select>
          </el-form-item>
        ),
      },
      {
        title: '是否机动车',
        minWidth: 100,
        prop: 'isMotor',
        align: 'center',
        cellRenderer: ({ $index, rowData }) => (
          <el-form-item
            prop={`bindList.${$index}.isMotor`}
            rules={[{ required: true, message: '请输入', trigger: 'blur' }]}
            style={{ marginBottom: '0' }}>
            <el-select v-model={[rowData.isMotor, 'modelValue']}>
              <el-option
                label="是"
                value={1}
              />
              <el-option
                label="否"
                value={0}
              />
            </el-select>
          </el-form-item>
        ),
      },
      {
        title: '数量',
        minWidth: 100,
        prop: 'num',
        align: 'center',
        cellRenderer: ({ $index, rowData }) => (
          <el-input-number
            prop={`bindList.${$index}.num`}
            rules={[{ required: true, message: '请输入', trigger: 'blur' }]}
            style={{ marginBottom: '0' }}>
            <el-input
              placeholder="请输入"
              min={1}
              controls-position="right"
              v-model={[rowData.num, 'modelValue']}
            />
          </el-input-number>
        ),
      },
      {
        title: '备注',
        minWidth: 100,
        prop: 'remark',
        align: 'center',
        cellRenderer: ({ rowData }) => (
          <el-form-item style={{ marginBottom: '0' }}>
            <el-input
              type="textarea"
              rows={2}
              placeholder="请输入"
              v-model={[rowData.remark, 'modelValue']}
            />
          </el-form-item>
        ),
      },
      {
        title: '操作',
        width: 70,
        align: 'center',
        cellRenderer: a => (
          <el-button
            link
            onClick={() => handleDelete(a)}
            type="danger">
            删除
          </el-button>
        ),
      },
    ]);

    const getBindVehTypesFc = () => {
      vehTypesloading.value = true;
      getBindVehTypes()
        .then(data => {
          options.value = data || [];
          vehTypesloading.value = false;
        })
        .catch(() => {
          vehTypesloading.value = false;
        });
    };

    const handleDelete = ({ $index }) => {
      formModel.value.bindList.splice($index, 1);
    };

    const handleSelect = () => {
      dialogVisible.value = true;
    };

    const onCallBack = val => {
      console.log(val, 's');
    };

    const assetsTab = ref<FormInstance>();
    const assetsTabValidate = () => (assetsTab.value as FormInstance).validate();
    expose({ assetsTabValidate });

    return () => (
      <div class="assetsTab">
        <common-form
          ref={assetsTab}
          label-position="top"
          v-model={[formModel, 'modelValue']}
          isDivider={false}
          cols={FormCols.value}
          disabled={props.pageType === 'view'}
        />

        {dialogVisible.value && (
          <CarOrFacSelect
            v-model:dialogVisible={dialogVisible.value}
            type={formModel.value.bindType}
            onCallBack={onCallBack}
            projectId={props.assetsDetailsInfo.projectId}
          />
        )}
      </div>
    );
  },
});
</script>

<style lang="scss">
.el-select-dropdown__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 20px;
  .assetsTab-circular {
    display: inline;
    height: 30px;
    width: 30px;
    animation: loading-rotate 2s linear infinite;
  }
  .assetsTab-path {
    animation: loading-dash 1.5s ease-in-out infinite;
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
    stroke-width: 2;
    stroke: var(--el-color-primary);
    stroke-linecap: round;
  }
}
</style>
