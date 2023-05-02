# lc-vue-biz-select
## 基础用法

<el-card>
  <biz-select :fetchData='fetchData' v-model='value1'/>
</el-card>

<script setup>
import {BizSelect} from 'lc-vue-biz-select'
import {ref} from 'vue'

const value1 = ref();

const fetchData = async ()=>{
  return [{
    label:'aaa',
    value:1
  }, {
    label:'bbb',
    value:2
  }]
}
</script>