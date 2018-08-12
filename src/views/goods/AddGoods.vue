<template>
    <div class="add-goods">
        <!-- 头部面包屑 -->
        <el-row>
            <el-col :span="24">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                <el-breadcrumb-item>商品列表</el-breadcrumb-item>
            </el-breadcrumb>
            </el-col>
        </el-row>

        <!-- 步骤条 -->
        <el-steps :active="active" finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
            <el-step title="步骤 4"></el-step>
            <el-step title="步骤 5"></el-step>
        </el-steps>

        <!-- 标签页 -->
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left" class="mt-20">
                <el-tab-pane label="基本信息" name="first">用户管理</el-tab-pane>
                <el-tab-pane label="基本内容" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="商品属性" name="third">角色管理</el-tab-pane>
                <el-tab-pane label="商品图片" name="fourth">定时任务补偿</el-tab-pane>
                <el-tab-pane label="商品内容" name="fifth">定时任务补偿</el-tab-pane>
            </el-tabs>
        </template>
    </div>
</template>
           
<script>
export default {
  data() {
    return {
      active: 0,
      activeName: "first"
    };
  },
  methods: {
    // next() {
    //   if (this.active++ > 2) this.active = 0;
    // },
    handleClick(tab, event) {
      switch (tab.name) {
        case "first":
          this.active = 0;
          break;
        case "second":
          this.active = 1;
          break;
        case "third":
          this.active = 2;
          break;
        case "fourth":
          this.active = 3;
          break;
        case "fifth":
          this.active = 4;
          break;
        default:
          this.active = 0;
          break;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.add-goods {
  .mt-20 {
    margin-top: 20px;
  }
}
</style>