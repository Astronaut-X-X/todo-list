<template>
    <div class="dialog-append" v-if="visible">
        <div class="box">
            <div class="row t-center w-p-100">
                <input class="g-input w-p-50" type="text" v-model="content">
            </div>
            <div class="row">
                <button class="g-button g-comfirm" @click="comfirm">CONFIRM</button>
                <button class="g-button g-cancel m-l-12" @click="cancel">CANCEL</button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { v4 as uuidv4 } from 'uuid';
import { ref, onMounted } from 'vue'

const emit = defineEmits(['comfirm', 'cancel'])

const props = defineProps({
    visible: Boolean
})

const content = ref('')

onMounted(() => {

})

function comfirm() {
    // TODO check content
    emit('comfirm', generateTodoItme(content.value))
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