<template>
    <div class="roles">
      <!-- 头部面包屑 -->
      <el-row>
        <el-col :span="24">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>
      <!-- 按钮 -->
      <el-button type="primary" plain @click="addDialogFormVisible=true">添加角色</el-button>

      <!-- 表格 -->
      <template>
        <el-table
          :data="roleList"
          class="mt-20"
          border
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-row v-for="firstChildren in scope.row.children" :key="firstChildren.id">
                <el-col :span="4">
                  <el-tag closable @close="deleteRight(scope.row,firstChildren.id)">{{firstChildren.authName}}</el-tag>
                  <i class="el-icon-arrow-right" v-if="firstChildren.children.length !==0"></i>
                </el-col>
                <el-col :span="20">
                  <el-row v-for="secondChildren in firstChildren.children" :key="secondChildren.id">
                    <el-col :span="5">
                      <el-tag closable @close="deleteRight(scope.row,secondChildren.id)" type="success">{{secondChildren.authName}}</el-tag>
                      <i class="el-icon-arrow-right" v-if="secondChildren.children.length !==0"></i>
                    </el-col>
                    <el-col :span="19">
                      <el-tag closable @close="deleteRight(scope.row,thirdChildren.id)" type="warning"  v-for="thirdChildren in secondChildren.children" :key="thirdChildren.id">
                        {{thirdChildren.authName}}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row v-if="scope.row.children.length === 0">
                <el-col :span="24">该角色没有分配权限，请前往分配！</el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            label="角色名称"
            prop="roleName"
            width="135px">
          </el-table-column>
          <el-table-column
            label="描述"
            prop="roleDesc"
            width="130px">
          </el-table-column>
          <el-table-column
            label="操作">
              <template slot-scope="scope">
                  <el-button size="mini" type="primary" plain icon="el-icon-edit"></el-button>
                  <el-button size="mini" type="danger" plain icon="el-icon-delete"></el-button>
                  <el-button size="mini" type="warning" plain icon="el-icon-check" title="授权角色" @click="showDialog"></el-button>
              </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 弹窗 -->
      <el-dialog title="授权角色" :visible.sync="dialogFormVisible">
        <el-tree
          :data="data2"
          show-checkbox
          node-key="id"
          :default-expand-all="true"
          :default-checked-keys="[5]"
          :props="defaultProps">
        </el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>
           
<script>
import { getRoleList, deleteRoleRight, getRightList } from "@/api";
export default {
  data() {
    return {
      roleList: [],
      dialogFormVisible: false,
      data2: [],
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  created() {
    getRoleList().then(res => {
      if (res.meta.status === 200) {
        this.roleList = res.data;
      }
    });
  },
  methods: {
    deleteRight(row, rightId) {
      // console.log(roleId , rightId);
      deleteRoleRight({ roleId: row.id, rightId: rightId }).then(res => {
        if (res.meta.status === 200) {
          row.children = res.data;
        } else {
          this.$message({
            type: "error",
            message: res.meta.msg
          });
        }
      });
    },
    showDialog() {
      this.dialogFormVisible = true
      getRightList({type:'tree'}).then(res => {
        console.log(res)
        if(res.meta.status === 200){
          this.data2 = res.data
        }else{
          this.$message({
            type:'error',
            message:res.meta.msg
          })
        }
      })
    }
  }
};
</script>
<style scoped>
</style>