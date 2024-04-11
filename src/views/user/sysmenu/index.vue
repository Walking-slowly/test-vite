<script lang="jsx">
import { getAllMenuList, getSysMenuDetails, putObj, addObj, delObj, getList } from '@/api/sysmenu/index.js';
import SelectIcon from './components/selectIcon.vue';

import { ElMessage, ElMessageBox } from 'element-plus';
export default defineComponent({
  setup() {
    const searchName = ref('');
    let menuList = ref([]);
    const leftLoading = ref(false);
    const treeRef = ref();
    const rightLoading = ref(false);
    const formModel = ref({});
    const isEdit = ref(false);
    const formRef = ref();
    const btnData = ref([]);
    const updateVisible = ref(false);
    const updateLoading = ref(false);
    let updateFormModel = ref({});
    let updateForm = ref();

    const FormCols = computed(() => [
      {
        elType: 'el-input',
        span: 24,
        prop: 'name',
        label: '菜单名称',
        placeholder: '请输入菜单名称',
        required: true,
      },
      {
        elType: 'el-select',
        span: 24,
        prop: 'type',
        label: '类型',
        placeholder: '请选择类型',
        required: true,
        slots: {
          default: () =>
            ['目录', '菜单'].map((item, i) => (
              <el-option
                label={item}
                value={i}
              />
            )),
        },
      },
      {
        elType: 'el-select',
        span: 24,
        prop: 'parentId',
        label: '父节点',
        vShow: formModel.value.type,
        placeholder: '请选择父节点',
        required: true,
        filterable: true,
        slots: {
          default: () =>
            (menuList.value[0].list || []).map(item => (
              <el-option
                label={item.name}
                value={item.id}
              />
            )),
        },
      },
      {
        elType: 'el-input',
        span: 24,
        prop: 'orderNum',
        label: '排序',
        placeholder: '请输入排序',
      },
      {
        elType: 'custom',
        span: 24,
        prop: 'icon',
        vShow: !formModel.value.type,
        label: '图标',
        cellRenderer: () => <SelectIcon v-model={[formModel.value.icon, 'modelValue']} />,
      },
      {
        elType: 'el-input',
        span: 24,
        prop: 'path',
        label: 'path',
        placeholder: '请输入path',
        required: true,
      },
      {
        elType: 'el-input',
        span: 24,
        type: 'textarea',
        rows: 2,
        prop: 'remark',
        placeholder: '请输入描述',
        label: '描述',
      },
    ]);

    watch(searchName, val => {
      treeRef.value && treeRef.value.filter(val);
    });

    const filterNode = (value, data) => {
      if (!value) return true;
      return data.name.includes(value);
    };

    const getAllMenuListFc = () => {
      leftLoading.value = true;
      getAllMenuList()
        .then(data => {
          menuList.value = data || [];
          leftLoading.value = false;
          nextTick(() => {
            if (treeRef.value && formModel.value.id) {
              treeRef.value.setCurrentKey(formModel.value.id);
            }
          });
        })
        .catch(() => {
          leftLoading.value = false;
        });
    };

    // 查询权限按钮
    const getListFc = () => {
      getList({ parentId: formModel.value.id, page: 1, limit: 999, type: 2 })
        .then(data => {
          btnData.value = data.rows || [];
          rightLoading.value = false;
        })
        .catch(() => {
          rightLoading.value = false;
        });
    };

    // 节点点击
    const handleNodeClick = ({ id, parentId }) => {
      formModel.value = {};
      if (parentId === '-1') return;
      isEdit.value = false;
      rightLoading.value = true;
      getSysMenuDetails(id)
        .then(data => {
          formModel.value = data || {};
          if (formModel.value.type === 1) {
            getListFc();
          } else {
            rightLoading.value = false;
          }
        })
        .catch(() => {
          rightLoading.value = false;
        });
    };

    // 更新和新增
    const handleOk = async () => {
      if (!formRef || !formRef.value) return;
      await formRef.value.validate();
      rightLoading.value = true;
      if (formModel.value.id) {
        putObj(formModel.value.id, { ...formModel.value })
          .then(() => {
            ElMessage({
              message: '更新成功！',
              type: 'success',
            });
            rightLoading.value = false;
            isEdit.value = false;
            getAllMenuListFc();
          })
          .catch(() => {
            rightLoading.value = false;
          });
      } else {
        addObj({ parentId: '0', ...formModel.value, url: formModel.value.path })
          .then(() => {
            ElMessage({
              message: '新增成功！',
              type: 'success',
            });
            isEdit.value = false;
            rightLoading.value = false;
            getAllMenuListFc();
          })
          .catch(() => {
            rightLoading.value = false;
          });
      }
    };

    const handleAdd = () => {
      isEdit.value = true;
      formModel.value = {};
      formRef.value && formRef.value.resetFields();
    };

    const handleDelete = () => {
      ElMessageBox({
        title: '提示',
        message: '此操作将永久删除, 是否继续?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            delObj(formModel.value.id)
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
          message: '删除成功！',
          type: 'success',
        });
        formModel.value = {};
        getAllMenuListFc();
      });
    };

    // 权限按钮编辑
    const handleBtnEdit = row => {
      updateFormModel.value = { ...row };
      updateVisible.value = true;
    };

    const handleDialogAdd = () => {
      updateVisible.value = true;
    };

    const handleDialogClose = () => {
      updateFormModel.value = {};
      updateForm.value && updateForm.value.resetFields();
      updateVisible.value = false;
      updateLoading.value = false;
    };

    const handleBtnDelte = ({ id }) => {
      ElMessageBox({
        title: '提示',
        message: '此操作将永久删除, 是否继续?',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            delObj(id)
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
          message: '删除成功！',
          type: 'success',
        });
        getListFc();
      });
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
              getListFc();
            })
            .catch(() => {
              updateLoading.value = false;
            });
        } else {
          addObj({ ...updateFormModel.value, type: 2, parentId: formModel.value.id })
            .then(() => {
              ElMessage({
                message: '新增成功！',
                type: 'success',
              });
              handleDialogClose();
              getListFc();
            })
            .catch(() => {
              updateLoading.value = false;
            });
        }
      });
    };

    const rightForm = () => (
      <el-scrollbar
        v-loading={rightLoading.value}
        style="flex: 1; margin: 10px 8px 0px 8px; padding-bottom: 5px;">
        <el-divider content-position="left">基础配置</el-divider>
        <common-form
          ref={formRef}
          show-message={false}
          label-position="right"
          label-width="80px"
          style={{ margin: '25px 8px 5px 8px' }}
          v-model={[formModel.value, 'modelValue']}
          isDivider={false}
          cols={FormCols.value}
          disabled={!isEdit.value}
        />
        {isEdit.value && (
          <div style="text-align: right;">
            <el-button onClick={() => (isEdit.value = false)}>取消</el-button>
            <el-button
              type="primary"
              onClick={handleOk}>
              确定
            </el-button>
          </div>
        )}
        {formModel.value.type === 1 && formModel.value.id && (
          <>
            <el-divider content-position="left">按钮配置</el-divider>
            <div style="margin-top: 20px; text-align: right;">
              <el-button
                type="primary"
                onClick={handleDialogAdd}>
                新增
              </el-button>
            </div>
            <el-table
              border
              data={btnData.value}
              style={{ marginTop: '8px' }}>
              <el-table-column
                type="index"
                width="70"
                label="序号"
                align="center"
              />
              <el-table-column
                label="资源名称"
                prop="name"
                align="center"
              />
              <el-table-column
                label="资源编码"
                prop="perms"
                align="center"
              />
              <el-table-column
                width="110"
                label="操作"
                align="center"
                v-slots={{
                  default: ({ row }) => (
                    <>
                      <el-button
                        type="primary"
                        onClick={() => handleBtnEdit(row)}
                        link>
                        编辑
                      </el-button>
                      <el-button
                        type="danger"
                        onClick={() => handleBtnDelte(row)}
                        link>
                        删除
                      </el-button>
                    </>
                  ),
                }}
              />
            </el-table>
          </>
        )}
      </el-scrollbar>
    );

    onActivated(() => {
      searchName.value = '';
      formModel.value = {};
      isEdit.value = false;
      getAllMenuListFc();
    });

    return () => (
      <el-row
        gutter={20}
        class="sysmenu-page">
        <el-col span={10}>
          <div class="sysmenu-page__left">
            <h3>菜单结构</h3>

            <div style="margin: 5px 8px;display: flex;">
              <el-input
                style="width: auto; flex: 1; margin-right: 10px;"
                clearable
                v-model={[searchName.value, 'modelValue']}
                placeholder="请输入关键字搜索"
              />

              <el-button-group>
                <el-button
                  type="primary"
                  onClick={handleAdd}>
                  添加
                </el-button>
                <el-button
                  type="primary"
                  disabled={isEdit.value || !formModel.value.id}
                  onClick={() => (isEdit.value = true)}>
                  编辑
                </el-button>
                <el-button
                  type="primary"
                  disabled={!formModel.value.id}
                  onClick={handleDelete}>
                  删除
                </el-button>
              </el-button-group>
            </div>
            <el-scrollbar style="flex: 1; margin: 0 8px 0px 8px; padding-bottom: 5px;">
              <el-tree
                ref={treeRef}
                data={menuList.value}
                default-expand-all
                highlight-current
                node-key="id"
                current-node-key={formModel.value.id}
                v-loading={leftLoading.value}
                props={{
                  children: 'list',
                  label: 'name',
                }}
                expand-on-click-node={false}
                filter-node-method={filterNode}
                onNodeClick={handleNodeClick}
              />
            </el-scrollbar>
          </div>
        </el-col>
        <el-col span={14}>
          <div class="sysmenu-page__right">
            <h3>设置</h3>
            {formModel.value.id || isEdit.value ? <rightForm /> : <div class="assets-empty">暂无数据</div>}
          </div>
        </el-col>

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
                prop: 'name',
                required: true,
                label: '资源名称',
                placeholder: '请输入',
              },
              {
                elType: 'el-input',
                span: 24,
                prop: 'perms',
                label: '资源编码',
                required: true,
                placeholder: '请输入',
              },
              {
                elType: 'el-input',
                span: 24,
                type: 'textarea',
                rows: 2,
                prop: 'remark',
                label: '描述',
                placeholder: '请输入',
              },
            ]}
          />
        </el-dialog>
      </el-row>
    );
  },
});
</script>

<style lang="scss" scoped>
.sysmenu-page {
  overflow: hidden;
  height: calc(100vh - 105px);
  &::v-deep(.el-col) {
    height: 100%;
  }
  &__right,
  &__left {
    border: 1px var(--el-border-color) var(--el-border-style);
    height: 100%;
    border-radius: 4px;
    display: flex;
    flex-flow: column;
    h3 {
      background: #f5f5f5;
      border-radius: 4px 4px 0px 0px;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      margin: 0;
      padding: 0 15px;
      border-bottom: 1px var(--el-border-color) var(--el-border-style);
    }
  }
}
</style>
