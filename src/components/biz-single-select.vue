<template>
  <el-select-v2
    v-if='ready'
    style='width: 100%'
    :model-value='selectData.selected'
    :options='selectData.options'
    :placeholder='placeholder'
    clearable
    :remote='remote'
    :remote-method='remoteMethod'
    :disabled='disabled'
    :filterable='filterable'
    :loading='loading'
    @update:model-value='onUpdateModelValue'
    @change='onChange'
    @blur='onBlur'
    @focus='onFocus'
    @clear='onClear'
    @visible-change='onVisibleChange'
    @remove-tag='onRemoveTag'
  />
  <el-button v-else loading />
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive, computed, PropType } from 'vue'; 
import { FetchDataType, ModelValueType } from '../types';
import { debounce } from 'lodash';

const props = defineProps({
  modelValue: {
    type: [String, Number] as PropType<ModelValueType>,
    default: undefined
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  fetchData: {
    type: Function as PropType<FetchDataType>,
    default: () => []
  },
  filterable: {
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

const loading = ref(false);
const ready = ref(false);
const selectData:{
  selected: ModelValueType | undefined,
  options: {
    value: number | string,
    label: string
  }[]
} = reactive({
  selected: undefined,
  options: [] 
});

watch(() => props.modelValue, (newValue) => {
  selectData.selected = newValue;
});

const selectedLabel = computed(() => {
  const item = selectData.options.find(option => option.value === selectData.selected);
  if (item === undefined) {
    return undefined;
  } else {
    return item.label;
  }
});

watch(selectedLabel, (value) => {
  emit('update:label', value);
});

onMounted(async () => {
  selectData.selected = props.modelValue;
  let res = await props.fetchData();
  selectData.options = res;
  if (props.selectFirst && (props.modelValue === undefined || props.modelValue === null || props.modelValue === '') && selectData.options.length > 0) {
    selectData.selected = selectData.options[0].value;
    emit('update:modelValue', selectData.options[0].value);
  }
  ready.value = true;
});

const onUpdateModelValue = (newValue: ModelValueType | undefined) => {
  console.log('single-select', 'update:modelValue', newValue);
  emit('update:modelValue', newValue);
};

const onChange = (val: any) => {
  emit('change', val);
};

const onBlur = async (event: FocusEvent) => {
  emit('blur', event);
};

const onFocus = (event: FocusEvent) => {
  loading.value = true;
  fetchDataDebounce();
  emit('focus', event);
};

const onClear = async () => {
  emit('clear');
};

const onVisibleChange = (val: any) => {
  emit('visible-change', val);
};

const onRemoveTag = (val: any) => {
  emit('remove-tag', val);
};

const fetchDataDebounce = debounce(async (query?:string) => {
  const res = await props.fetchData(query);
  selectData.options = res;
  loading.value = false;
}, 300);

const remoteMethod = async (query: string) => {
  if (!props.remote) return;
  loading.value = true;
  fetchDataDebounce(query);
};
</script>

<style lang="scss" scoped>

</style>