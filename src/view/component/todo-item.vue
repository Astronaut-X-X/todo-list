<template>
    <div class="todo-item">
        <input class="checkbox" type="checkbox" name="" id="" v-model="item.down">
        <div class="content" :style="contentClass()">{{ item.content }}</div>
        <img class="icon" @click="deleteItem" src="../../image/icon_delete.png">
    </div>
</template>
  
<script setup>
const props = defineProps({
    item: Object
})

const emit = defineEmits(['deleteItem'])

function deleteItem() {
    emit('deleteItem', props.item._uuid)
}

function contentClass() {
    if (props.item.down) {
        return { 'text-decoration': 'line-through 1px' }
    }
}

</script>
  
<style scoped lang="scss">
.todo-item {
    display: flex;
    align-items: center;
    padding: 12px 24px;
    margin: 6px 0px;
    border-radius: 6px;
    background: #FFF;


    .checkbox {
        width: 16px;
        height: 16px;
    }

    .content {
        flex: 1;
        padding: 0 12px;
        display: flex;
        align-items: center;
        color: #4D555C;
        font-weight: lighter;
    }

    .icon {
        width: 24px;
        height: 24px;
        opacity: 0;
        transition: .2s;
    }

    .icon:hover {
        opacity: 0.9;
    }

    .icon:active{
        opacity: 0.618;
    }
}
</style>