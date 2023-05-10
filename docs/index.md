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

## 单选

### 远程数据

<RemoteSingle />

```vue
<template>
  <biz-select
    v-model='value1'
    v-model:label='label1'
    :fetch-data='fetchData'
    remote
    filterable />
  <p>select：{{ value1 }}</p>
  <p>label：{{ label1 }}</p>
</template>

<script setup lang="ts">
import { BizSelect } from 'lc-vue-biz-select';
import { ref } from 'vue';

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];

const list = states.map((item) => ({
  value: `value:${item}`,
  label: `label:${item}` 
}));

const value1 = ref();
const label1 = ref();
const loading = ref(false);

const fetchData = (query = '') => new Promise(resolve => {
  if (query !== '') {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      const l = list.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
      resolve(l);
    }, 200);
  } else {
    setTimeout(() => {
      resolve(list);
    }, 200);
  }
});
</script>

<style scoped>

</style>
```

## 多选

### 远程数据

<RemoteMultiple />

```vue
<template>
  <biz-select
    v-model='value1'
    v-model:label='label1'
    :fetch-data='fetchData'
    remote
    multiple
    filterable />
  <p>select：{{ value1 }}</p>
  <p>label：{{ label1 }}</p>
</template>

<script setup lang="ts">
import { BizSelect } from 'lc-vue-biz-select';
import { ref } from 'vue';

const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];

const list = states.map((item) => ({
  value: `value:${item}`,
  label: `label:${item}` 
}));

const value1 = ref([]);
const label1 = ref([]);
const loading = ref(false);

const fetchData = (query = '') => new Promise(resolve => {
  if (query !== '') {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      const l = list.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
      resolve(l);
    }, 200);
  } else {
    setTimeout(() => {
      resolve(list);
    }, 200);
  }
});
</script>

<style scoped>

</style>
```

## Api

### Attributes

| 属性名 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| fetchData | 获取下拉选择数据 | (query?:string)=>Promise<\{value: number|string, label:string\}[]> | () => [] |
| modelValue/v-model | 选中值 | 多选：string[] \| number[] ; 单选：string \| number | - |
| placeholder | placeholder | string | 请选择 |
| multiple | 是否多选 | boolean | false |
| filterable | 是否可过滤 | boolean | false |
| oneLine | 是否只显示一行，针对多选场景 | boolean | false |
| disabled | 是否不可用 | boolean | false |
 | value-key | 	作为 value 唯一标识的键名，绑定值为对象类型时必填 | string	 | 	value | 
 | size | 	输入框尺寸 | 	string	large/default/small	 | default | 
 | clearable | 	是否可以清空选项 | 	boolean	 | 	true | 
 | multiple-limit | 	多选时用户最多可以选择的项目数， 为 0 则不限制 | 	number	 | 	0 | 
 | name | 	Select 输入框的原生 name 属性 | 	string	 | 	— | 
 | effect | Tooltip 主题，内置了 dark / light 两种 | 	string	 | 	light | 
 | autocomplete	 | 自动完成选择输入	 | string	 | 	off | 
 | placeholder	 | select input的原生autocomplete属性 | 	string	 | 	请选择 | 
 | filterable | 	是否可筛选 | 	boolean	 | 	false | 
 | allow-create | 	是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效。 | 	boolean	 | 	false | 
 | reserve-keyword | 	筛选时，是否在选择选项后保留关键字 | 	boolean	 | 	true | 
 | no-data-text	 | 选项为空时显示的文本，也可以使用 empty 插槽自定义内容 | 	string	 | 	无数据 | 
 | popper-class	 | 选择器下拉菜单的自定义类名 | string | 	—	 | 
 | teleported | 	该下拉菜单是否使用teleport插入body元素 | 	boolean	true / false	 | true | 
 | persistent | 	当下拉选择器未被激活并且persistent设置为false，选择器会被删除。	 | boolean	true / false | 	true | 
 | popper-options | 	自定义 popper 选项，更多请参考 popper.js | 	object	 | 	- | 
 | automatic-dropdown | 	对于不可过滤的 Select 组件，此属性决定是否在输入框获得焦点后自动弹出选项菜单 | 	boolean	 | 	false | 
 | height | 	下拉菜单的高度，每一个子选项的高度是 34px	 | number | 	  	170 | 
 | scrollbar-always-on | 	是否总是展示滚动条 | 	boolean	 | 	false | 
 | remote	是否从服务器搜索数据 | 	boolean	 | 	false | 
 | validate-event | 	输入时是否触发表单的校验 | 	boolean	 | 	true | 
 | placement	 | 下拉框出现的位置 | 	string	top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end	 | bottom-start | 

### Events

| 事件名 | 说明 | 类型 |
| ---- | ---- | ---- |
| update:modelValue | 选中值变化 | 多选：string[] \| number[] ; 单选：string \| number |
| update:label | 选中文案变化 | string |
 | change	 | 选中值发生变化时触发	 | val，目前的选中值 | 
 | visible-change | 	下拉框出现/隐藏时触发 | 	val，出现则为 true，隐藏则为 false | 
 | remove-tag	 | 多选模式下移除tag时触发 | 	val，移除的tag值 | 
 | clear | 	可清空的单选模式下用户点击清空按钮时触发 | 	— | 
 | blur	 | 当选择器的输入框失去焦点时触发	 | (event: FocusEvent) | 
 | focus | 	当选择器的输入框获得焦点时触发	 | (event: FocusEvent) | 

### Slots

 | 插槽名 | 	说明 | 
 | ---- | ---- |
 | default | 	自定义 Option 模板 | 
 | empty | 	自定义当选项为空时的内容 | 
 | prefix | 	输入框的前缀 | 