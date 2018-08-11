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
                  <el-tag closable>{{firstChildren.authName}}</el-tag>
                  <i class="el-icon-arrow-right" v-if="firstChildren.children.length !==0"></i>
                </el-col>
                <el-col :span="20">
                  <el-row v-for="secondChildren in firstChildren.children" :key="secondChildren.id">
                    <el-col :span="5">
                      <el-tag closable type="success">{{secondChildren.authName}}</el-tag>
                      <i class="el-icon-arrow-right" v-if="secondChildren.children.length !==0"></i>
                    </el-col>
                    <el-col :span="19">
                      <el-tag closable type="warning"  v-for="thirdChildren in secondChildren.children" :key="thirdChildren.id">
                        {{thirdChildren.authName}}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
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
                  <el-button size="mini" type="warning" plain icon="el-icon-check" ></el-button>
              </template>
          </el-table-column>
        </el-table>
      </template>

    </div>
</template>
           
<script>
import { getRoleList } from "@/api";
export default {
  data() {
    return {
      roleList: []
    };
  },
  created() {
    getRoleList().then(res => {
      console.log(res);
      if (res.meta.status === 200) {
        this.roleList = res.data;
      }
    });
  }
};
</script>
<style scoped>
</style>