<template>
  <div class="todo-creator">
    <input
      :value="title"
      type="text"
      placeholder="할 일을 추가하세요 :)"
      @input="title = $event.target.value"
      @keydown.enter="createTodo" />
    <button @click="createTodo">
      추가
    </button>
  </div>
</template>
<script>
    import { mapStores } from 'pinia'
    import { todoStore } from '~/store/todo'
    export default {
        data(){
            return {
                title:''
            }
        },
        computed: {
            ...mapStores(todoStore)
        },
        methods: {
            createTodo(event) {
                if (event.isComposing) return
                if (!this.title.trim()) return
                this.todoStore.createTodo(this.title)
                this.title = ''
            }
        }
    }
</script>
