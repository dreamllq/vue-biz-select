<template>
  <el-select-v2
    v-if='ready'
    style='width: 100%'
    :model-value='selectData.selected'
    :options='selectData.options'
    :placeholder='placeholder'
    :remote='remote'
    :remote-method='remoteMethod'
    :disabled='disabled'
    :filterable='filterable'
    :loading='loading'
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
  </el-select-v2>
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
  fetchData: {
    type: Function as PropType<FetchDataType>,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  selectFirst: {
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

let filterContent = '';
let searchFlag = false;
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
const selectedLabelMap:{[index: ModelValueType]: string} = {};

watch(() => props.modelValue, (newValue) => {
  selectData.selected = newValue;
});

watch(() => selectData.options, () => {
  selectData.options.forEach(item => {
    selectedLabelMap[item.value] = item.label;
  });
}, { deep: true });

const selectedLabel = computed(() => selectedLabelMap[selectData.selected!]);

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
  emit('focus', event);
};

const onClear = async () => {
  emit('clear');
};

const onVisibleChange = (val: any) => {
  if (val === true && searchFlag === true) {
    searchFlag = false;
    remoteMethod(''); 
  } else if (val === false) {
    searchFlag = filterContent !== '';
  }
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
  filterContent = query;
  loading.value = true;
  fetchDataDebounce(query);
};
</script>

<style lang="scss" scoped>

</style>