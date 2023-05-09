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