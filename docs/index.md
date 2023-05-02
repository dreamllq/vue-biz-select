# lc-vue-biz-select

## 安装

```
npm i lc-vue-biz-select
```

## 基础用法

<el-card>
  <p>value1: {{ value1 }}</p>
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

```vue
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

<template>
  <el-card>
    <biz-select :fetchData='fetchData' v-model='value1'/>
  </el-card>
</template>
```

## Api

### Attributes

| 属性名 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| fetchData | 获取下拉选择数据 | ()=>Promise<\{value: number|string, label:string\}[]> | () => [] |
| modelValue/v-model | 选中值 | 多选：string[] \| number[] ; 单选：string \| number | - |
| placeholder | placeholder | string | 请选择 |
| multiple | 是否多选 | boolean | false |
| filterable | 是否可过滤 | boolean | false |
| oneLine | 是否只显示一行，针对多选场景 | boolean | false |
| disabled | 是否不可用 | boolean | false |

### Events

| 事件名 | 说明 | 类型 |
| ---- | ---- | ---- |
| update:modelValue | 选中值变化 | 多选：string[] \| number[] ; 单选：string \| number |
| update:label | 选中文案变化 | string |
