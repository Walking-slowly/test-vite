<script lang="tsx">
import { ElTree, ElMessage } from 'element-plus';

import { getRoleMenuTree, getRoleMenu, bind } from '@/api/sysrole/index.js';

interface Tree {
  [key: string]: any;
}

export default defineComponent({
  name: 'SetRoleAuth',

  props: {
    visible: {
      type: Boolean,
      default: false,
    },

    currenId: {
      type: String,
      required: true,
    },
  },

  emits: ['update:visible'],

  setup(props, { emit }) {
    const searchName = ref<string>('');
    const treeRef = ref<InstanceType<typeof ElTree>>();
    const loading = ref<boolean>(false);
    const treeList = ref<Tree[]>([]);
    const defaultCheckedKeys = ref([]);
    const submitLoading = ref<boolean>(false);
    let allKeys: string[] = [];

    const handleClose = () => {
      emit('update:visible', false);
    };

    const handleSubmit = () => {
      const menuIdList = treeRef.value!.getCheckedKeys(false);
      submitLoading.value = true;
      bind({ roleId: props.currenId, menuIdList })
        .then(() => {
          ElMessage({
            message: '设置成功！',
            type: 'success',
          });
          handleClose();
          submitLoading.value = false;
        })
        .catch(() => {
          submitLoading.value = false;
        });
    };

    watch(searchName, val => {
      treeRef.value!.filter(val);
    });

    const filterNode = (value: string, data: Tree) => {
      if (!value) return true;
      return data.name.includes(value);
    };

    const handleClear = () => {
      treeRef.value!.setCheckedKeys([], false);
    };

    const handleSetAll = () => {
      treeRef.value!.setCheckedKeys(allKeys, false);
    };

    const getRoleMenuTreeFc = () => {
      loading.value = true;
      getRoleMenuTree()
        .then(data => {
          treeList.value = data || [];
          getAllKeys(treeList.value);
          getRoleMenuFc();
        })
        .catch(() => {
          loading.value = false;
        });
    };

    const getAllKeys = arr => {
      arr.map(i => {
        allKeys.push(i.id);
        if (i.list && i.list.length) getAllKeys(i.list);
      });
    };

    const getRoleMenuFc = () => {
      getRoleMenu({ roleId: props.currenId })
        .then(data => {
          defaultCheckedKeys.value = data || [];
          loading.value = false;
        })
        .catch(() => {
          loading.value = false;
        });
    };

    getRoleMenuTreeFc();

    const footer = () => (
      <div>
        <el-button
          onClick={handleClose}
          loading={submitLoading.value}>
          取消
        </el-button>
        <el-button
          type="primary"
          loading={submitLoading.value}
          onClick={handleSubmit}>
          确定
        </el-button>
      </div>
    );

    return () => (
      <el-dialog
        v-model={props.visible}
        title="设置权限"
        width="700"
        top="5vh"
        close-on-click-modal={false}
        v-slots={{ footer }}
        before-close={handleClose}>
        <div
          style="height: 100%;
          overflow: hidden;
          display: flex;
          flex-flow: column;">
          <el-row>
            <el-col span={18}>
              <el-input
                style="width: 100%;"
                clearable
                v-model={[searchName.value, 'modelValue']}
                placeholder="请输入关键字搜索"
              />
            </el-col>
            <el-col
              span={6}
              style={{ textAlign: 'right' }}>
              <el-button
                type="primary"
                onClick={handleSetAll}>
                全选
              </el-button>
              <el-button
                type="primary"
                onClick={handleClear}>
                清空
              </el-button>
            </el-col>
          </el-row>

          <el-scrollbar
            style="flex: 1; margin-top: 10px;"
            class="flow">
            <el-tree
              ref={treeRef}
              data={treeList.value}
              default-expand-all
              show-checkbox
              check-strictly
              node-key="id"
              v-loading={loading.value}
              default-checked-keys={defaultCheckedKeys.value}
              props={{
                children: 'list',
                label: 'name',
              }}
              expand-on-click-node={false}
              filter-node-method={filterNode}
            />
          </el-scrollbar>
        </div>
      </el-dialog>
    );
  },
});
</script>
