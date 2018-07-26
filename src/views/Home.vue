<template>
    <div class="home">
      天不生我李淳罡,剑道万古长如夜!
    </div>
</template>
           
<script>
import {getUserList} from '@/api'

export default{
    mounted() {
        let params = {params:{query:'', pagenum:1, pagesize:1}}
        getUserList(params).then(res =>{
            console.log(res)
        })
    },
}
</script>
<style>
            
</style>