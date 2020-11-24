<template>
  <div class="sort-box">
    <el-container>
      <el-header>
        <el-row>
          <el-button type="primary" icon="el-icon-plus" @click="addLevelOne">添加一级</el-button>
          <el-button type="success" icon="el-icon-plus" @click="addLevelTwo">添加二级</el-button>
        </el-row>
      </el-header>
      <el-main>
        <el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                            <el-button type="text" size="mini" @click="() => remove(node, data)"> 删除 </el-button>
                        </span>
                    </span>
        </el-tree>
      </el-main>
    </el-container>
    <!-- 添加一级分类弹出框 -->
    <el-dialog title="添加一级分类名称" :visible.sync="levelOne" width="30%">
      <el-form label-width="70px">
        <el-form-item label="一级分类">
          <el-input v-model="oneLevelMenu" placeholder="请输入一级分类名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="addLevelOne = false">取 消</el-button>
                <el-button type="primary" @click="confirmBtnOne">确 定</el-button>
            </span>
    </el-dialog>
    <!-- 添加二级分类弹出框 -->
    <el-dialog title="添加二级分类名称" :visible.sync="levelOne" width="30%">
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form label-width="70px">
        <el-form-item label="二级分类">
          <el-input v-model="twoLevelMenu" placeholder="请输入二级分类名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="addLevelTwo = false">取 消</el-button>
                <el-button type="primary" @click="confirmBtnOne">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelOne: false, // 一级
      oneLevelMenu: '', //一级分类名
      levelTwo: false, // 一级
      twoLevelMenu: '', //一级分类名
      form: {
        region: ''
      },
      data: [
        {
          id: 1,
          label: '一级 1',
          level: 1,
          children: [
            {
              id: 4,
              label: '二级 1-1',
              level: 2
            }
          ]
        },
        {
          id: 2,
          label: '一级 2',
          level: 1,
          children: [
            {
              id: 5,
              label: '二级 2-1',
              level: 2
            },
            {
              id: 6,
              label: '二级 2-2',
              level: 2
            }
          ]
        },
        {
          id: 3,
          label: '一级 3',
          level: 1,
          children: [
            {
              id: 7,
              label: '二级 3-1',
              level: 2
            },
            {
              id: 8,
              label: '二级 3-2',
              level: 2
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 添加一级
    addLevelOne() {
      this.levelOne = true;
    },
    addLevelTwo() {
    },
    confirmBtnOne() {
    },
    confirmBtnTwo() {
    },
    remove(node, data) {
      console.log(node);
      console.log(data);
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      console.log(index);

      // children.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.sort-box {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
<style>
.el-header {
  display: flex;
  align-items: center;
}

.el-tree-node__content {
  display: flex;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
</style>