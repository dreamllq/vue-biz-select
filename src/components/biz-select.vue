<template>
  <biz-single-select
    v-if='multiple === false'
    :model-value='modelValue as ModelValueType'
    :placeholder='placeholder'
    :filterable='filterable'
    :fetch-data='fetchData'
    :disabled='disabled'
    :select-first='selectFirst'
    :remote='remote'
    @update:model-value='onUpdateModelValue'
    @update:label='onUpdateLabel' 
    @change='onChange' 
    @blur='onBlur'
    @focus='onFocus'
    @clear='onClear'
    @visible-change='onVisibleChange'
    @remove-tag='onRemoveTag'
  />
  <biz-multiple-select
    v-else
    :model-value='modelValue as ModelValueType[]'
    :placeholder='placeholder'
    :filterable='filterable'
    :fetch-data='fetchData'
    :one-line='oneLine'
    :disabled='disabled'
    :select-first='selectFirst'
    :remote='remote'
    @update:model-value='onUpdateModelValue'
    @update:label='onUpdateLabel'
    @change='onChange' 
    @blur='onBlur'
    @focus='onFocus'
    @clear='onClear'
    @visible-change='onVisibleChange'
    @remove-tag='onRemoveTag'
  />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { FetchDataType, ModelValueType } from '../types';
import BizMultipleSelect from './biz-multiple-select.vue';
import BizSingleSelect from './biz-single-select.vue';

defineProps({
  fetchData: {
    type: Function as PropType<FetchDataType>,
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
  },
  selectFirst: {
    type: Boolean,
    default: false
  },
  remote: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits([
  'update:modelValue',
  'update:label',
  'change',
  'blur',
  'focus',
  'clear',
  'visible-change',
  'remove-tag'
]);

const onUpdateModelValue = (newValue: ModelValueType) => {
  emit('update:modelValue', newValue);
};

const onUpdateLabel = (newValue: string) => {
  emit('update:label', newValue);
};

const onChange = (val:any) => {
  emit('change', val);
};

const onBlur = (event: FocusEvent) => {
  emit('blur', event);
};

const onFocus = (event: FocusEvent) => {
  emit('blur', event);
};

const onClear = () => {
  emit('clear');
};

const onVisibleChange = (val:any) => {
  emit('visible-change', val);
};

const onRemoveTag = (val:any) => {
  emit('remove-tag', val);
};

</script>

<style lang="scss" scoped>

</style>