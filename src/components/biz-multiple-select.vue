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
          clearable
          :disabled='disabled'
          :filterable='filterable'
          @update:model-value='onUpdateModelValue'
        />
        <el-button v-else loading />
      </template>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, reactive, computed, PropType } from 'vue'; 
import { cloneDeep, differenceWith, isEqual } from 'lodash';
import { ModelValueType } from '../types';

const props = defineProps({
  modelValue: {
    type: Array as PropType<ModelValueType[]>,
    default: () => []
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  fetchData: {
    type: Function,
    default: () => []
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
const ready = ref(false);
const selectData:{
  selected: ModelValueType[],
  options:{value: number|string, label: string}[]
} = reactive({
  selected: [],
  options: [] 
});
const tooltipList = computed(() => selectData.selected.map(selectedValue => selectData.options.find(item => item.value === selectedValue)!));

watch(() => props.modelValue, (newValue) => {
  if (newValue!.length !== selectData.selected.length || differenceWith(newValue, selectData.selected, isEqual).length > 0) {
    selectData.selected = cloneDeep(newValue)!;
  }
  return;
});

const selectedLabel = computed(() => selectData.selected.map(value => {
  const result = selectData.options.find((option => option.value === value));
  if (result === undefined) {
    return undefined;
  } else {
    return result.label;
  }
}));

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