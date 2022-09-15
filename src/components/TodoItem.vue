<template>
  <div class="todo-item">
    <span class="order-handle">:::</span>
    <input
      v-model="done"
      type="checkbox"
      @change="updateTodo" />
    <input
      :value="title"
      type="text"
      @input="title = $event.target.value"
      @change="updateTodo" />
    {{ dateFormatter(todo.createdAt) }}
    <button @click="todoStore.deleteTodo(todo.id)">
      삭제
    </button>
  </div>
</template>
<script>
  import dayjs from 'dayjs'
  import { mapStores } from 'pinia'
  import { todoStore } from '~/store/todo'
  export default {
        props: {
            todo: {
                type: Object,
                required: true
            }
        },
        data(){
          return {
            title: '',
            done:false
          }
        },
        computed: {
          ...mapStores(todoStore)
          // this.todoStore
        },
        created(){
          this.title = this.todo.title
          this.done = this.todo.done
        },
        methods: {
           dateFormatter(date) {
           return dayjs(date).format('YYYY년 MM월 DD일 HH시 mm분 ss초')
           },
           updateTodo() {
           this.todoStore.updateTodo({
              id: this.todo.id,
              title: this.title,
              done: this.done
      })
           }
        }
    }
</script>
<style>
</style>
