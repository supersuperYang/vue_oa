<template>
    <div class="category">
      <!-- 头部面包屑 -->
      <el-row>
        <el-col :span="24">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <!-- 按钮 -->
      <el-button type="primary" plain @click="addCategory">添加分类</el-button>

        <tree-grid 
        :treeStructure="true"
        :columns="columns"
        :data-source="dataSource"
        @deleteCate="deleteCategory"
        @editCate="editCatery">

        </tree-grid>
      <!-- 分页 -->
        <div class="page">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[5, 10, 15, 20]" :page-size="this.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>

        <!-- 添加fenlei对话框 -->
      <el-dialog title="添加分类" :visible.sync="addDialogFormVisible">
        <el-form :model="addForm" label-width="80px" :rules="rules" ref="addCateForm">
          <el-form-item label="分类名" prop="cat_name">
            <el-input v-model="addForm.cat_name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="父级名称">
            <div class="block">
              <el-cascader
              :props="props"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange">
              </el-cascader>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addCateSubmit('addCateForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
           
<script>
import TreeGrid from "@/components/TreeGrid/TreeGrid";
import { getCategories, addCategories } from "@/api";
export default {
  data() {
    return {
      addDialogFormVisible: false,
      dataSource: [],
      pagesize: 10,
      pagenum: 1,
      total: 0,
      options: [], //级联选择器的数据源
      selectedOptions: [], //级联选择器选中后的数据
      props:{
        value:'cat_id',
        label:'cat_name'
      }, //配置级联选择器 展示的数据字段
      columns: [
        {
          text: "分类名称",
          dataIndex: "cat_name",
          width: ""
        },
        {
          text: "是否有效",
          dataIndex: "cat_deleted",
          width: ""
        },
        {
          text: "排序",
          dataIndex: "cat_level",
          width: ""
        }
      ],
      addForm: {
        cat_name: "",
        cat_pid:0,
        cat_level:0
      },
      rules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.initList();
  },
  methods: {
    deleteCategory(cid) {},
    editCatery(cid) {},
    handleSizeChange(val) {
      this.pagesize = val;
      this.initList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.initList();
    },
    initList() {
      getCategories({
        type: "3",
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        console.log(res);
        if (res.meta.status === 200) {
          this.total = res.data.total;
          this.dataSource = res.data.result;
        }
      });
    },
    handleChange(value) {
      console.log(value);
    },
    addCategory(){
      this.addDialogFormVisible = true
      getCategories({type:'2'}).then(res =>{
        console.log(res)
        if(res.meta.status === 200){
          this.options = res.data
        }
      })
    },
    addCateSubmit(formName){
      this.$refs[formName].validate(valide => {
        if(valide){
          if(this.selectedOptions.length === 0){
            this.addForm.cat_pid = 0
            this.addForm.cat_level = 0
          }else if(this.selectedOptions.length === 1){
            this.addForm.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
            this.addForm.cat_level = 1
          }else {
            this.addForm.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
            this.addForm.cat_level = 2
          }
          addCategories(this.addForm).then(res =>{
            // console.log(res)
            if(res.meta.status === 201){
              this.addDialogFormVisible = false
              this.initList()
              this.$message({
                type:'success',
                message:res.meta.msg
              })
            }
          })
        }
      })
    }
  },
  components: {
    TreeGrid
  }
};
</script>
<style lang="scss" scoped>
</style>