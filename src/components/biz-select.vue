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
    :value-key='valueKey'
    :size='size'
    :clearable='clearable'
    :name='name'
    :effect='effect'
    :autocomplete='autocomplete'
    :reserve-keyword='reserveKeyword'
    :no-data-text='noDataText'
    :popper-class='popperClass'
    :teleported='teleported'
    :persistent='persistent'
    :popper-options='popperOptions'
    :automatic-dropdown='automaticDropdown'
    :height='height'
    :scrollbar-always-on='scrollbarAlwaysOn'
    :validate-event='validateEvent'
    :placement='placement'
    @update:model-value='onUpdateModelValue'
    @update:label='onUpdateLabel' 
    @change='onChange' 
    @blur='onBlur'
    @focus='onFocus'
    @clear='onClear'
    @visible-change='onVisibleChange'
    @remove-tag='onRemoveTag'
  >
    <template v-if='$slots.default' #default='scope'>
      <slot v-bind='scope' />
    </template>

    <template v-if='$slots.empty' #empty>
      <slot name='empty' />
    </template>

    <template v-if='$slots.prefix' #prefix>
      <slot name='prefix' />
    </template>
  </biz-single-select>
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
    :multiple-limit='multipleLimit'
    :value-key='valueKey'
    :size='size'
    :clearable='clearable'
    :name='name'
    :effect='effect'
    :autocomplete='autocomplete'
    :reserve-keyword='reserveKeyword'
    :no-data-text='noDataText'
    :popper-class='popperClass'
    :teleported='teleported'
    :persistent='persistent'
    :popper-options='popperOptions'
    :automatic-dropdown='automaticDropdown'
    :height='height'
    :scrollbar-always-on='scrollbarAlwaysOn'
    :validate-event='validateEvent'
    :placement='placement'
    @update:model-value='onUpdateModelValue'
    @update:label='onUpdateLabel'
    @change='onChange' 
    @blur='onBlur'
    @focus='onFocus'
    @clear='onClear'
    @visible-change='onVisibleChange'
    @remove-tag='onRemoveTag'
  >
    <template v-if='$slots.default' #default='scope'>
      <slot v-bind='scope' />
    </template>

    <template v-if='$slots.empty' #empty>
      <slot name='empty' />
    </template>

    <template v-if='$slots.prefix' #prefix>
      <slot name='prefix' />
    </template>
  </biz-multiple-select>
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
  oneLine: {
    type: Boolean,
    default: false
  },
  selectFirst: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [
      Array,
      String,
      Number
    ] as PropType<ModelValueType | ModelValueType[]>,
    default: undefined
  },
  multiple: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  valueKey: {
    type: String,
    default: undefined
  },
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default'
  },
  clearable: {
    type: Boolean,
    default: true
  },
  multipleLimit: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: undefined
  },
  effect: {
    type: String as PropType<'dark' | 'light'>,
    default: 'light'
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  filterable: {
    type: Boolean,
    default: false
  },
  reserveKeyword: {
    type: Boolean,
    default: true
  },
  noDataText: {
    type: String,
    default: '无数据'
  },
  popperClass: {
    type: String,
    default: undefined
  },
  teleported: {
    type: Boolean,
    default: true
  },
  persistent: {
    type: Boolean,
    default: true
  },
  popperOptions: {
    type: Object,
    default: undefined
  },
  automaticDropdown: {
    type: Boolean,
    default: false
  },
  height: {
    type: Number,
    default: undefined
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: false
  },
  remote: {
    type: Boolean,
    default: false
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  placement: {
    type: String,
    default: undefined
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