<script lang="tsx">
import { isAuth } from '@/utils/index.js';
import { useTable } from '@/hook/index.ts';
import { listQuery, delObj, addObj, putObj, pause, resume, trigger } from '@/api/quartz/index.js';
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus';

import Log from './dialog/log.vue';

interface RuleForm {
  jobName?: string;
}

export default defineComponent({
  setup() {
    // 查询数据
    let formModel = ref<RuleForm>({});
    const updateVisible = ref(false);
    const updateLoading = ref(false);
    const updateFormModel = ref<{
      triggerState?: string;
    }>({});
    const updateForm = ref();
    const jobParameter = ref<string>('');
    const logVisible = ref<boolean>(false);

    const FormSearchCols = [
      {
        elType: 'el-input',
        span: 4,
        prop: 'jobName',
        placeholder: '任务名称',
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
            {isAuth('setting:quartz:delete') && (
              <el-button
                type="primary"
                onClick={handleAdd}>
                新增
              </el-button>
            )}
            <el-button
              type="primary"
              onClick={handleStartLog}>
              执行日志
            </el-button>
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
        title: '任务名称',
        minWidth: 120,
        prop: 'jobName',
        align: 'center',
      },
      {
        title: '任务分组',
        minWidth: 120,
        prop: 'jobGroup',
        align: 'center',
      },
      {
        title: '描述',
        minWidth: 120,
        prop: 'description',
        align: 'center',
      },
      {
        title: '执行类',
        minWidth: 120,
        prop: 'jobClassName',
        align: 'center',
      },
      {
        title: '执行时间',
        width: 110,
        prop: 'cronExpression',
        align: 'center',
      },
      {
        title: '状态',
        width: 145,
        prop: 'runStatus',
        align: 'center',
        cellRenderer: ({ rowData }) => (
          <>
            <el-switch
              v-model={[rowData.runStatus, 'modelValue']}
              active-text="开启"
              inactive-text="关闭"
              active-value="2"
              inactive-value="1"
              before-change={() => handleChange(rowData)}
            />
          </>
        ),
      },
      {
        title: '操作',
        width: 160,
        align: 'center',
        fixed: 'right',
        cellRenderer: rowData => {
          return (
            <>
              {isAuth('setting:quartz:start') && (
                <el-button
                  link
                  onClick={() => handleStart(rowData)}
                  type="primary">
                  执行
                </el-button>
              )}
              {isAuth('setting:quartz:edit') && (
                <el-button
                  link
                  onClick={() => handleEdit(rowData)}
                  type="primary">
                  修改
                </el-button>
              )}
              {isAuth('setting:quartz:delete') && (
                <el-button
                  link
                  onClick={() => handleDelete(rowData)}
                  type="danger">
                  移除
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
        message: `确定对[${rowData.jobName}]进行删除操作?`,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            delObj(rowData.jobName, rowData.jobGroup)
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

    // 执行
    const handleStart = ({ rowData }) => {
      ElMessageBox({
        title: '执行参数',
        message: () => <el-input v-model={[jobParameter.value, 'modelValue']} />,
        showCancelButton: true,
        customClass: 'triggerMessageBox',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          console.log(action, '1');
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;

            trigger({ ...rowData, jobParameter: jobParameter.value })
              .then(() => {
                done();
                console.log('1');
                instance.confirmButtonLoading = false;
              })
              .catch(() => {
                console.log('2');
                instance.confirmButtonLoading = false;
              });
          } else {
            done();
          }
        },
      })
        .then(action => {
          ElMessage({
            type: 'success',
            message: '执行成功！',
          });
          jobParameter.value = '';
          init();
        })
        .catch(() => {
          jobParameter.value = '';
        });
    };

    // 切换状态
    const handleChange = rowData => {
      const loadingInstance1 = ElLoading.service({ fullscreen: true });
      return new Promise((resolve, reject) => {
        if (rowData.runStatus === '1') {
          resume({ ...rowData, runStatus: '2' })
            .then(() => {
              ElMessage({
                type: 'success',
                message: '操作成功！',
              });
              loadingInstance1.close();
              resolve(true);
            })
            .catch(() => {
              loadingInstance1.close();
              reject(false);
            });
        } else {
          pause({ ...rowData, runStatus: '1' })
            .then(() => {
              ElMessage({
                type: 'success',
                message: '操作成功！',
              });
              loadingInstance1.close();
              resolve(true);
            })
            .catch(() => {
              loadingInstance1.close();
              reject(false);
            });
        }
      });
    };

    const handleAdd = () => {
      updateVisible.value = true;
    };

    const handleEdit = ({ rowData }) => {
      updateVisible.value = true;
      updateFormModel.value = { ...rowData };
    };

    const handleStartLog = () => {
      logVisible.value = true;
    };

    // 列表查询
    const search = () => {
      loading.value = true;
      listQuery({ ...formModel.value, limit: pageSize.value, page: currentPage.value })
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
      updateFormModel.value = {};
      updateForm.value?.resetFields();
      updateVisible.value = false;
    };

    const handleDialogOk = () => {
      updateForm.value?.validate().then(() => {
        updateLoading.value = true;
        if (updateFormModel.value.triggerState) {
          putObj({ ...updateFormModel.value })
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
          title={updateFormModel.value.triggerState ? '修改' : '新增'}
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
            ref={updateForm}
            v-model={[updateFormModel.value, 'modelValue']}
            show-message={false}
            label-width="80px"
            is-divider={false}
            cols={[
              {
                elType: 'el-input',
                span: 24,
                required: true,
                prop: 'jobName',
                label: '任务名称',
                placeholder: '请输入',
              },
              {
                elType: 'el-input',
                span: 24,
                prop: 'jobGroup',
                required: true,
                label: '任务分组',
                placeholder: '请输入',
              },
              {
                elType: 'el-input',
                span: 24,
                prop: 'description',
                required: true,
                label: '任务描述',
                placeholder: '请输入',
              },
              {
                elType: 'el-input',
                span: 24,
                prop: 'jobClassName',
                required: true,
                label: '执行类',
                placeholder: '请输入',
              },
              {
                elType: 'el-input',
                span: 24,
                required: true,
                prop: 'cronExpression',
                label: '执行时间',
                placeholder: '请输入',
              },
            ]}
          />
        </el-dialog>

        {logVisible.value && <Log v-model:dialogVisible={logVisible.value} />}
      </div>
    );
  },
});
</script>

<style lang="scss">
.triggerMessageBox .el-message-box__message {
  width: 100%;
}
</style>
