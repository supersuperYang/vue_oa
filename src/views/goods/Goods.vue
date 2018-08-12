<template>
    <div class="goods">
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

       <!-- 按钮 -->
      <el-button type="primary" plain @click="addGoods">添加商品</el-button>
    </div>
</template>
           
<script>
export default {
    methods:{
        addGoods(){
            this.$router.push({name:'AddGoods'})
        }
    }
}
</script>
<style lang="scss" scoped>
</style>