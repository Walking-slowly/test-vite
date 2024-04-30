<script lang="tsx">
import { isAuth } from '@/utils/index.js';
import { useTable } from '@/hook/index.ts';
import { getSysRolePage, deleteSysRole, addObj, putObj } from '@/api/sysrole/index.js';
import { ElMessage, ElMessageBox } from 'element-plus';

import SetRoleAuth from './components/setRoleAuth.vue';

interface RuleForm {
  key?: string;
}

export default defineComponent({
  name: 'Sysrole',
  setup() {
    const updateVisible = ref(false);
    const updateLoading = ref(false);
    const visible = ref(false);
    const currenId = ref('');
    let updateFormModel = ref<{
      id?: string;
    }>({});
    let updateForm = ref();

    // 查询数据
    let formModel = ref<RuleForm>({});
    const FormSearchCols = [
      {
        elType: 'el-input',
        span: 4,
        prop: 'key',
        placeholder: '角色名称或角色编码',
      },
      {
        elType: 'custom',
        span: 20,
        cellRenderer: () => (
          <div style="text-align: right; width: 100%">
            <el-button
              type="primary"
              onClick={init}>
              查询
            </el-button>
            <el-button onClick={handleRest}>重置</el-button>
            {isAuth('user:sysrole:add') && (
              <el-button
                type="primary"
                onClick={handleAdd}>
                新增
              </el-button>
            )}
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
        title: '角色名称',
        minWidth: 200,
        prop: 'roleName',
        align: 'center',
      },
      {
        title: '权限类型',
        width: 120,
        prop: 'sysType',
        align: 'center',
        cellRenderer: ({ rowData }) => {
          return { 0: '权限菜单', 1: '项目流程角色', 2: '大区流程角色' }[rowData.sysType];
        },
      },
      {
        title: '角色编码',
        minWidth: 200,
        prop: 'roleType',
        align: 'center',
      },
      {
        title: '备注',
        minWidth: 200,
        prop: 'remark',
        headerAlign: 'center',
      },
      {
        title: '排序',
        width: 80,
        prop: 'sort',
        align: 'center',
      },
      {
        title: '创建者',
        width: 100,
        prop: 'createUserName',
        align: 'center',
      },
      {
        title: '创建时间',
        width: 160,
        prop: 'createDate',
        align: 'center',
      },
      {
        title: '更新时间',
        width: 160,
        prop: 'updateDate',
        align: 'center',
      },
      {
        title: '操作',
        width: 180,
        fixed: 'right',
        align: 'center',
        cellRenderer: rowData => {
          return (
            <>
              {isAuth('user:sysrole:edit') && (
                <el-button
                  link
                  onClick={() => handleEdit(rowData)}
                  type="primary">
                  修改
                </el-button>
              )}
              {isAuth('user:sysrole:delete') && (
                <el-button
                  link
                  type="danger"
                  onClick={() => handleDelete(rowData)}>
                  删除
                </el-button>
              )}
              {isAuth('user:sysrole:settring') && (
                <el-button
                  link
                  onClick={() => ((visible.value = true), (currenId.value = rowData.rowData.id))}
                  type="primary">
                  设置权限
                </el-button>
              )}
            </>
          );
        },
      },
    ];

    // 删除
    const handleDelete = ({ rowData }) => {
      ElMessageBox({
        title: '提示',
        message: `是否确认删除${rowData.roleName}角色？`,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            deleteSysRole(rowData.id)
              .then(() => {
                done();
                instance.confirmButtonLoading = false;
              })
              .catch(() => {
                instance.confirmButtonLoading = false;
              });
          } else {
            done();
          }
        },
      }).then(() => {
        ElMessage({
          type: 'success',
          message: '删除成功！',
        });

        init();
      });
    };

    // 列表查询
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
    let { tableList, currentPage, pageSize, total, loading, init, onChangePage } = useTable(search);

    const handleRest = () => {
      formModel.value = {};
      init();
    };

    const handleAdd = () => {
      updateVisible.value = true;
    };

    const handleEdit = ({ rowData }) => {
      updateFormModel.value = { ...rowData };
      updateVisible.value = true;
    };

    const handleDialogClose = () => {
      updateFormModel.value = {};
      updateForm.value && updateForm.value.resetFields();
      updateVisible.value = false;
      updateLoading.value = false;
    };

    const handleDialogOk = () => {
      if (!updateForm.value) return;
      updateForm.value.validate().then(() => {
        updateLoading.value = true;
        if (updateFormModel.value.id) {
          putObj(updateFormModel.value.id, updateFormModel.value)
            .then(() => {
              ElMessage({
                message: '更新成功！',
                type: 'success',
              });
              handleDialogClose();
              init();
            })
            .catch(() => {
              updateLoading.value = false;
            });
        } else {
          addObj({ ...updateFormModel.value, sysType: 0 })
            .then(() => {
              ElMessage({
                message: '新增成功！',
                type: 'success',
              });
              handleDialogClose();
              init();
            })
            .catch(() => {
              updateLoading.value = false;
            });
        }
      });
    };

    onActivated(() => {
      handleRest();
    });

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

        <el-dialog
          v-model={updateVisible.value}
          close-on-click-modal={false}
          title={updateFormModel.value.id ? '修改' : '新增'}
          width="540"
          before-close={handleDialogClose}
          v-slots={{
            footer: () => (
              <div class="dialog-footer">
                <el-button
                  onClick={handleDialogClose}
                  loading={updateLoading.value}>
                  取 消
                </el-button>
                <el-button
                  type="primary"
                  loading={updateLoading.value}
                  onClick={handleDialogOk}>
                  确 定
                </el-button>
              </div>
            ),
          }}>
          <common-form
            ref={updateForm}
            v-model={[updateFormModel.value, 'modelValue']}
            show-message={false}
            label-width="80px"
            is-divider={false}
            cols={[
              {
                elType: 'el-input',
                span: 24,
                prop: 'roleName',
                required: true,
                label: '角色名称',
                placeholder: '请输入',
              },
              {
                elType: 'el-input',
                span: 24,
                prop: 'roleType',
                label: '类型编码',
                required: true,
                placeholder: '请输入',
              },
              {
                elType: 'el-input',
                span: 24,
                prop: 'sort',
                label: '排序',
                placeholder: '请输入',
              },
              {
                elType: 'el-input',
                span: 24,
                type: 'textarea',
                rows: 2,
                prop: 'remark',
                label: '备注',
                required: true,
                placeholder: '请输入',
              },
            ]}
          />
        </el-dialog>

        {visible.value && (
          <SetRoleAuth
            currenId={currenId.value}
            v-model:visible={visible.value}
          />
        )}
      </div>
    );
  },
});
</script>
