<script lang="tsx">
import { isAuth } from '@/utils/index.js';
import { useTable } from '@/hook/index.ts';
import { getSysUserPage, deleteSysUser, getObj, getEmployeeUserPage, addObj, putObj } from '@/api/sysuser/index.js';
import { getSysRolePage } from '@/api/sysrole/index.js';
import { ElMessage, ElMessageBox } from 'element-plus';
import { OptionGroup } from 'element-plus/es/components/select-v2/src/select.types';

interface RuleForm {
  key?: string;
  roleId?: string;
}

export default defineComponent({
  name: 'Sysuser',
  setup() {
    // 查询数据
    let formModel = ref<RuleForm>({});
    const updateVisible = ref(false);
    const updateLoading = ref(false);
    const updateFormModel = ref<{
      id?: string;
      status?: number;
      roleIdList?: Array<string>;
      company?: string;
      projects?: string;
      realName?: string;
      mobile?: string;
      username?: string;
      userCode?: string;
      password?: string;
    }>({});
    const updateForm = ref();

    // 获取角色
    let roleList = ref([]);
    const getSysRolePageFc = () => {
      getSysRolePage({ limit: 500, page: 1 }).then(({ rows }) => {
        roleList.value = rows || [];
        FormSearchCols[1].options = rows || [];
      });
    };

    const FormSearchCols = [
      {
        elType: 'el-input',
        span: 4,
        prop: 'key',
        placeholder: '角色名称或角色编码',
      },
      {
        elType: 'el-select',
        span: 4,
        prop: 'roleId',
        placeholder: '请选择角色',
        options: [],
        props: {
          label: 'roleName',
          value: 'id',
        },
      },
      {
        elType: 'custom',
        span: 16,
        cellRenderer: () => (
          <div style="text-align: right; width: 100%">
            <el-button
              type="primary"
              onClick={init}>
              查询
            </el-button>
            <el-button onClick={handleRest}>重置</el-button>
            {isAuth('user:sysuser:add') && (
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
        title: '用户名',
        minWidth: 120,
        prop: 'username',
        align: 'center',
      },
      {
        title: '姓名',
        minWidth: 120,
        prop: 'realName',
        align: 'center',
      },
      {
        title: '手机号',
        minWidth: 100,
        prop: 'mobile',
        align: 'center',
      },
      {
        title: '状态',
        width: 80,
        prop: 'status',
        align: 'center',
        cellRenderer: ({ rowData }) => {
          return { 0: '禁用', 1: '正常' }[rowData.status];
        },
      },
      {
        title: '操作',
        width: 120,
        align: 'center',
        fixed: 'right',
        cellRenderer: rowData => {
          return (
            <>
              {isAuth('user:sysuser:edit') && (
                <el-button
                  link
                  onClick={() => handleEdit(rowData)}
                  type="primary">
                  修改
                </el-button>
              )}
              {isAuth('user:sysuser:delete') && (
                <el-button
                  link
                  onClick={() => handleDelete(rowData)}
                  type="danger">
                  删除
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
        message: `是否确认删除${rowData.username}用户？`,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            deleteSysUser(rowData.id)
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

    const handleAdd = () => {
      updateFormModel.value = { status: 1, password: 'a123456' };
      updateForm.value?.resetFields();
      updateVisible.value = true;
    };

    const handleEdit = ({ rowData }) => {
      updateLoading.value = true;
      updateVisible.value = true;
      updateFormModel.value = { ...rowData };
      getObj(rowData.id)
        .then(data => {
          updateFormModel.value.roleIdList = data.roleIdList || [];
          updateFormModel.value.company = data.company;
          updateFormModel.value.projects = (data.projectList || []).map(i => i.projectName).join(',');
          updateLoading.value = false;
        })
        .catch(() => {
          updateLoading.value = false;
        });
    };

    // 列表查询
    const search = () => {
      loading.value = true;
      getSysUserPage({ ...formModel.value, limit: pageSize.value, page: currentPage.value })
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

    const handleDialogClose = () => {
      updateForm.value?.resetFields();
      updateVisible.value = false;
    };

    const handleDialogOk = () => {
      updateForm.value?.validate().then(() => {
        updateLoading.value = true;
        if (updateFormModel.value.id) {
          putObj(updateFormModel.value.id, { ...updateFormModel.value })
            .then(() => {
              ElMessage({
                type: 'success',
                message: '更新成功！',
              });
              updateLoading.value = false;
              handleDialogClose();
              init();
            })
            .catch(() => {
              updateLoading.value = false;
            });
        } else {
          addObj({ ...updateFormModel.value })
            .then(() => {
              ElMessage({
                type: 'success',
                message: '新增成功！',
              });
              updateLoading.value = false;
              handleDialogClose();
              init();
            })
            .catch(() => {
              updateLoading.value = false;
            });
        }
      });
    };

    const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
      if (!queryString) {
        cb([]);
      } else {
        getEmployeeUserPage({ keywords: queryString })
          .then(data => {
            cb(data.length && data ? data : [{ text: '暂无数据' }]);
          })
          .catch(() => {
            cb([{ text: '暂无数据' }]);
          });
      }
    };

    const handleSelect = (item: any) => {
      updateFormModel.value.realName = item.realName;
      updateFormModel.value.mobile = item.mobile;
      updateFormModel.value.username = item.userName;
      updateFormModel.value.company = item.company;
      updateFormModel.value.projects = item.projects;
      updateFormModel.value.userCode = item.userCode;
    };

    onActivated(() => {
      getSysRolePageFc();
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
                  loading={updateLoading.value}
                  onClick={handleDialogClose}>
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
            v-loading={updateLoading.value}
            ref={updateForm}
            v-model={[updateFormModel.value, 'modelValue']}
            show-message={false}
            label-width="80px"
            is-divider={false}
            cols={[
              {
                elType: 'custom',
                span: 24,
                required: true,
                prop: 'realName',
                label: '姓名',
                rules: [
                  {
                    validator: (rule: any, value: any, callback: any) => {
                      if (!updateFormModel.value.userCode) {
                        updateFormModel.value.realName = '';
                        callback(new Error(''));
                      } else {
                        callback();
                      }
                    },
                    trigger: 'blur',
                  },
                ],
                cellRenderer: () => (
                  <>
                    <el-autocomplete
                      disabled={!!updateFormModel.value.id}
                      v-model={[updateFormModel.value.realName, 'modelValue']}
                      fetchSuggestions={querySearchAsync}
                      onSelect={handleSelect}
                      v-slots={{
                        default: ({ item }) => (
                          <div style={item.text ? { textAlign: 'center', fontSize: '12px', color: '#909399' } : {}}>
                            {item.text || item.realName}
                          </div>
                        ),
                      }}
                      placeholder="请选择"
                    />
                  </>
                ),
              },
              {
                elType: 'el-input',
                span: 24,
                prop: 'username',
                disabled: true,
                label: '用户名',
                placeholder: '请输入',
              },
              {
                elType: 'el-input',
                span: 24,
                prop: 'mobile',
                disabled: true,
                label: '手机号码',
                placeholder: '请输入',
              },
              {
                elType: 'el-input',
                span: 24,
                prop: 'company',
                type: 'textarea',
                disabled: true,
                rows: 2,
                label: '机构',
                placeholder: '请输入',
              },
              {
                elType: 'el-input',
                span: 24,
                type: 'textarea',
                autosize: { minRows: 2, maxRows: 6 },
                disabled: true,
                prop: 'projects',
                label: '项目',
                placeholder: '请输入',
              },
              {
                elType: 'custom',
                span: 24,
                prop: 'status',
                label: '状态',
                required: true,
                placeholder: '请选择',
                cellRenderer: () => (
                  <>
                    <el-radio-group v-model={[updateFormModel.value.status, 'modelValue']}>
                      <el-radio value={0}>禁用</el-radio>
                      <el-radio value={1}>正常</el-radio>
                    </el-radio-group>
                  </>
                ),
              },
              {
                elType: 'custom',
                span: 24,
                prop: 'roleIdList',
                label: '菜单角色',
                cellRenderer: () => (
                  <>
                    <el-checkbox-group v-model={[updateFormModel.value.roleIdList, 'modelValue']}>
                      {roleList.value!.map((i: OptionGroup) => (
                        <el-checkbox
                          label={i.roleName}
                          value={i.id}
                        />
                      ))}
                    </el-checkbox-group>
                  </>
                ),
              },
            ]}
          />
        </el-dialog>
      </div>
    );
  },
});
</script>
