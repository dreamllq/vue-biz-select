<template>
  <el-select-v2
    v-if='ready'
    style='width: 100%'
    :model-value='selectData.selected'
    :options='selectData.options'
    :placeholder='placeholder'
    clearable
    :disabled='disabled'
    :filterable='filterable'
    @update:model-value='onUpdateModelValue'
  />
  <el-button v-else loading />
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive, computed, PropType } from 'vue'; 
import { FetchDataType, ModelValueType } from '../types';

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
  }
});

const emit = defineEmits(['update:modelValue', 'update:label']);
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
  ready.value = true;
});

const onUpdateModelValue = (newValue: ModelValueType | undefined) => {
  console.log('single-select', 'update:modelValue', newValue);
  emit('update:modelValue', newValue);
};

</script>

<style lang="scss" scoped>

</style>