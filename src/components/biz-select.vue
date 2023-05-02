<template>
  <biz-single-select
    v-if='multiple === false'
    :model-value='modelValue as ModelValueType'
    :placeholder='placeholder'
    :filterable='filterable'
    :fetch-data='fetchData'
    :disabled='disabled'
    @update:model-value='onUpdateModelValue'
    @update:label='onUpdateLabel' />
  <biz-multiple-select
    v-else
    :model-value='modelValue as ModelValueType[]'
    :placeholder='placeholder'
    :filterable='filterable'
    :fetch-data='fetchData'
    :one-line='oneLine'
    :disabled='disabled'
    @update:model-value='onUpdateModelValue'
    @update:label='onUpdateLabel' />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { ModelValueType } from '../types';
import BizMultipleSelect from './biz-multiple-select.vue';
import BizSingleSelect from './biz-single-select.vue';

defineProps({
  fetchData: {
    type: Function,
    default: () => []
  },
  modelValue: {
    type: [
      Array,
      String,
      Number
    ] as PropType<ModelValueType | ModelValueType[]>,
    default: undefined
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  multiple: {
    type: Boolean,
    default: false
  },
  filterable: {
    type: Boolean,
    default: false
  },
  oneLine: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'update:label']);

const onUpdateModelValue = (newValue: ModelValueType) => {
  emit('update:modelValue', newValue);
};

const onUpdateLabel = (newValue: string) => {
  emit('update:label', newValue);
};

</script>

<style lang="scss" scoped>

</style>