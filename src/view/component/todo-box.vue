<template>
    <div class="todo-box">
        <div class="tool-row">
            <div class="timer" v-show="false">{{ timeStr }}</div>
            <button class="g-button g-default" @click="append"> APPEND </button>
        </div>

        <div class="todo-list">
            <div class="item-row" v-for="item in todoList" :key="item._uuid">
                <transition enter-active-class="animate__animated animate__fadeOutRight"
                    leave-active-class="animate__animated animate__fadeOutRight">
                    <todoItem v-if="!item._delete" :item="item" @deleteItem="deleteItem"></todoItem>
                </transition>
            </div>
        </div>

        <dialogAppend :visible="visible" @confirm="confirm" @cancel="cancel"></dialogAppend>
    </div>
</template>
  
<script setup>
import dialogAppend from './dialog-append.vue'
import todoItem from './todo-item.vue'
import { ref, onMounted, onBeforeUnmount, toRaw } from 'vue'

const todoData = ref({})
const todoList = ref([])

const visible = ref(false)

const timer = ref(-1)
const timeStr = ref('')

onMounted(() => {
    let date = new Date()

    let tempData = JSON.parse(localStorage.getItem('todoData'))
    todoData.value = new Map(tempData)
    todoList.value = todoData.value.get(date.toLocaleDateString()) || []

    startTimer()

    window.addEventListener('beforeunload', (event) => {
        updateTodoData()
        stopTimer()
    })
})

function startTimer() {
    timer.value = setInterval(() => {
        let date = new Date()
        timeStr.value = date.toLocaleString()
    }, 1000)
}

function stopTimer() {
    clearInterval(timer.value)
}

function append() {
    visible.value = true
}

function deleteItem(_uuid) {
    todoList.value.forEach((item) => {
        if (item._uuid == _uuid) {
            item._delete = true
            item._delete_time = new Date(Date.now()).toLocaleString();
        }
    })
}

function confirm(todoItem) {
    todoList.value.push(todoItem)
    visible.value = false
}

function cancel() {
    visible.value = false
}

function updateTodoData() {
    let date = new Date()

    todoData.value.set(date.toLocaleDateString(), todoList.value)
    let tempData = JSON.stringify([...toRaw(todoData.value)])
    localStorage.setItem('todoData', tempData)
}

</script>
  
<style scoped lang="scss">
.todo-box {
    width: 560px;
    height: 85.4%;
    position: relative;
    padding: 24px;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    background-color: #EDF3F8;
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);

    .tool-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .timer {
            font-size: 20px;
            color: #4A555CAA;
        }

    }

    .todo-list {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
    }

}
</style>