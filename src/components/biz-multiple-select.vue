<template>
  <div style='width: 100%;'>
    <el-popover
      placement='right'
      trigger='hover'
      :disabled='tooltipList.length === 0'
      :width='200'
    >
      <div>
        <el-tag
          v-for='item in tooltipList'
          :key='item.value'
          class='selected-tag'
          :closable='!disabled'
          @close='onClose(item)'>
          {{ item.label }}
        </el-tag>
      </div>
      <template #reference>
        <el-select-v2
          v-if='ready'
          class='biz-select multiple'
          :class='{filterable:filterable, "one-line":oneLine}'
          style='width: 100%'
          :model-value='selectData.selected'
          :options='selectData.options'
          :placeholder='placeholder'
          multiple
          :collapse-tags='oneLine'
          :remote='remote'
          :remote-method='remoteMethod'
          :disabled='disabled'
          :filterable='filterable'
          :loading='loading'
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
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive, computed, PropType } from 'vue'; 
import { cloneDeep, differenceWith, isEqual } from 'lodash';
import { FetchDataType, ModelValueType } from '../types';
import asyncDebounce from 'simple-async-debounce';

const props = defineProps({
  modelValue: {
    type: Array as PropType<ModelValueType[]>,
    default: () => []
  },
  fetchData: {
    type: Function as PropType<FetchDataType>,
    default: () => []
  },
  oneLine: {
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

let filterContent = '';
let searchFlag = false;
// let isVisible = false;
let isFocus = false;
const loading = ref(false);
const ready = ref(false);
const selectData:{
  selected: ModelValueType[],
  options:{value: number|string, label: string}[]
} = reactive({
  selected: [],
  options: [] 
});
const selectedLabelMap:{[index: string]: string} = {};

const tooltipList = computed<{
    value: number | string;
    label: string;
}[]>(() => selectData.selected.map(selectedValue => ({
  value: selectedValue,
  label: selectedLabelMap[selectedValue]
})));

watch(() => props.modelValue, (newValue) => {
  if (newValue!.length !== selectData.selected.length || differenceWith(newValue, selectData.selected, isEqual).length > 0) {
    selectData.selected = cloneDeep(newValue)!;
  }
  return;
});

watch(() => selectData.options, () => {
  selectData.options.forEach(item => {
    selectedLabelMap[item.value] = item.label;
  });
}, { deep: true });

const selectedLabel = computed(() => selectData.selected.map(value => selectedLabelMap[value]));

watch(selectedLabel, (value) => {
  emit('update:label', cloneDeep(value));
});

onMounted(async () => {
  selectData.selected = cloneDeep(props.modelValue);
  let res = await props.fetchData();
  selectData.options = res;
  ready.value = true;
});

const onUpdateModelValue = (newValue: ModelValueType[]) => {
  console.log('multiple-select', 'update:modelValue', newValue);
  emit('update:modelValue', cloneDeep(newValue));
};

const onClose = (item:{value: number|string}) => {
  selectData.selected = selectData.selected.filter(id => id !== item.value);
  emit('update:modelValue', cloneDeep(selectData.selected));
};

const onChange = (val: any) => {
  emit('change', val);
};

const onBlur = (event: FocusEvent) => {
  isFocus = false;
  emit('blur', event);
};

const onFocus = (event: FocusEvent) => {
  isFocus = true;
  emit('focus', event);
};

const onClear = async () => {
  emit('clear');
};

const onVisibleChange = (val: any) => {
  // isVisible = val;

  if (props.remote) {
    if (val === true && searchFlag === true) {
      remoteMethod(''); 
    } else if (val === false) {
      searchFlag = filterContent !== '';
      filterContent = '';
    }
  }
  emit('visible-change', val);
};

const onRemoveTag = (val: any) => {
  emit('remove-tag', val);
};

const fetchDataDebounce = asyncDebounce(async (query?: string) => {
  const res = await props.fetchData(query);
  if (isFocus === true) {
    selectData.options = res;
  }
}, 300);

const remoteMethod = async (query: string) => {
  if (!props.remote) return;
  filterContent = query;
  loading.value = true;
  await fetchDataDebounce(query);
  loading.value = false;
};

</script>

<style lang="scss" scoped>
.selected-tag{
  margin: 0 4px 4px 0;
  max-width:170px;
  box-sizing: border-box;
  
  ::v-deep(.el-tag__content){
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 134px;
  }
}

.biz-select.multiple.one-line {
  &.filterable {
    ::v-deep(.el-select-v2__selection){
      .el-select-v2__selected-item{
      
        max-width: 75%;

        &:nth-child(2){
          max-width: none !important;
          width: 25% !important;
        }
      }
    }
  }

  &:not(.filterable){
    ::v-deep(.el-select-v2__selection){
      .el-select-v2__selected-item{
        &:nth-child(2){
          width: 0!important;
          margin: 0;
        }
      }
    }
  }

  ::v-deep(.el-select-v2__selection){
    flex-wrap: nowrap;
    flex: 1;
    overflow: hidden;
    .el-select-v2__selected-item{
      overflow: hidden;
      flex: 1;
      display: flex;

      &.el-select-v2__input-wrapper{
        flex: none;
        display: block;

      }

      .el-tag{
        flex: none;
        &:first-child{
          flex: 1;
          overflow: hidden;
          .el-tag__content{
            width: calc(100% - 21px);

            .el-select-v2__tags-text{
              min-width: none !important;
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>