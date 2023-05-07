<template>
    <div class="dialog-append" v-if="visible">
        <div class="box">
            <div class="row t-center w-p-100">
                <input class="g-input w-p-50" ref="input" type="text" v-model="content">
            </div>
            <div class="row">
                <button class="g-button g-confirm" @click="confirm">CONFIRM</button>
                <button class="g-button g-cancel m-l-12" @click="cancel">CANCEL</button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { v4 as uuidv4 } from 'uuid';
import { ref, onMounted, onUnmounted, watchEffect } from 'vue'

const emit = defineEmits(['comfirm', 'cancel'])

const props = defineProps({
    visible: Boolean
})

const content = ref('')
const input = ref(null)

onMounted(() => {
    document.addEventListener('keyup', enterEvent)
})

onUnmounted(() => {
    document.removeEventListener('keyup', enterEvent)
})

watchEffect(() => {
    if (input.value) {
        input.value.focus()
    }
})

function confirm() {
    // TODO check content
    emit('confirm', generateTodoItme(content.value))
    content.value = ""
}

function checkContent() {

}

function generateTodoItme(content) {
    let date = new Date(Date.now())

    let todoItem = {
        _uuid: uuidv4(),
        content: content,
        down: false,
        _create_time: date.toLocaleString(),
        _delete_time: '',
        _down_time: '',
        _delete: false,
    }

    return todoItem
}

function cancel() {
    emit('cancel')
    content.value = ""
}

function enterEvent(event){
    if (!props.visible) { return }

    let e = event || window.event
    let keyCode = e.keyCode || e.which
    switch (keyCode) {
    	case 13:
	    confirm()
    }
}
</script>
  
<style scoped lang="scss">
.dialog-append {

    width: 100vw;
    height: 100vh;

    backdrop-filter: blur(10px);
    background: #dddddd33;

    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .box {
        width: 38vw;
        height: 40vh;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .row {
            padding: 12px 0;
        }
    }

}
</style>
