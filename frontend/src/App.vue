<template>
  <router-view />
</template>

<script>
export default {
    name: 'App',
    components: {
    },
    created: async function(){
        document.title = "Stellection";
    }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
