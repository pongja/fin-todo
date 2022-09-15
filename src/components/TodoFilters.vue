<template>
  <div class="filters">
    <div
      v-for="(value, key) in filters"
      :key="key">
      {{ value.title }}
      <select v-model="todoStore.filters[key]">
        <option
          v-for="item in value.values"
          :key="item.name"
          :value="item.value">
          {{ item.name }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
import { mapStores } from 'pinia'
import { todoStore } from '~/store/todo'

export default {
  data(){
    return{
      filters: {
        done:{
          title: '표시',
          values: [
            { name: '모두', value: 'all' },
            { name: '완료만', value: 'true' },
            { name: '미완료만', value: 'false' },
          ]
        },
        sortBy: {
          title: '정렬',
          values: [
            { name: '사용자지정 순', value: 'none' },
            { name: '최신 순', value: 'newest' },
            { name: '오래된 순', value: 'oldest' }
          ]
        }
      }
    }
  },
  computed: {
    ...mapStores(todoStore)
  },
}
</script>
<style scoped>

</style>
