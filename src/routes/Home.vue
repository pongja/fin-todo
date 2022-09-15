<template>
  <TodoCreator />
  <TodoFilters />
  <div
    ref="todos"
    class="todos">
    <TodoItem
      v-for="todo in todoStore.filteredTodos"
      :key="todo.id"
      :todo="todo" />
  </div>
</template>
<script>
    import Sortable from 'sortablejs'
    import { mapStores } from 'pinia'
    import { todoStore } from '~/store/todo.js'
    import TodoCreator from '~/components/TodoCreator.vue'
    import TodoFilters from '~/components/TodoFilters.vue'
    import TodoItem from '~/components/TodoItem.vue'
    export default {
        components: {
            TodoCreator,
            TodoFilters,
            TodoItem
        },
        computed: {
            ...mapStores(todoStore)
        },
        created() {
            this.todoStore.readTodos()
        },
        mounted() {
            this.initSortableTodos()
        },
        methods: {
            initSortableTodos() {
                new Sortable(this.$refs.todos, {
                group: 'Todos', // 한 목록에서 다른 목록으로 요소를 끌어오려면(DnD) 두 목록의 그룹 값이 같아야 합니다.
                handle: '.order-handle', // 드래그 핸들이 될 요소의 선택자를 입력합니다.
                delay: 50, // 클릭이 밀리는 것을 방지하기 위해 약간의 지연 시간을 추가합니다.
                animation: 0, // 정렬할 때 애니메이션 속도(ms)를 지정합니다.
                forceFallback: true, // 다양한 환경의 일관된 Drag&Drop(DnD)을 위해 HTML5 기본 DnD 동작을 무시하고 내장 기능을 사용합니다.
                // 요소의 DnD가 종료되면 실행할 핸들러(함수)를 지정합니다.
                onEnd: event => {
                    const { oldIndex, newIndex } = event
                    console.log(oldIndex, newIndex)
                    this.todoStore.reorderTodos({
                        oldIndex,
                        newIndex
                    })
                }
            })
        }
    }
}
</script>
