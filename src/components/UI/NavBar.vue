<template>
  <div class="nawbar">
  <div @click="$router.push('/')">Vue 3</div>
  <div class="nawbar__btns">
      <MyButton @click="$router.push('/posts')">Посты</MyButton>
      <MyButton @click="$router.push('/about')" style="margin-left: 20px">О сайте</MyButton>
      <MyButton @click="$router.push('/store')" style="margin-left: 20px">Store</MyButton>
      <MyButton @click="$router.push('/composition')" style="margin-left: 20px">Composition</MyButton>
  </div>
  </div>
  
</template>
 
<script>
export default {

}
</script>

<style scoped>
.nawbar{
    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.nawbar__btns{
    margin-left: auto;
}
</style>