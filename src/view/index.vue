<template>
    <div class="main-container">
        <todoBox></todoBox>
    </div>
</template>
  
<script setup>
import todoBox from './component/todo-box.vue';

</script>
  
<style scoped>
.main-container {
    width: 100vw;
    height: 100vh;

    background-image: linear-gradient(45deg, #EDF3F8, #FFFFFF);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
</style>