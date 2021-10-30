<template>
    <div>
    <navbar></navbar>
    <p>{{ greeting }}</p>
    <p>{{ flaskGreeting }}</p>
    <font-awesome-icon icon="user-secret"></font-awesome-icon>
    <footerr></footerr>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import Footerr from '@/components/Footerr.vue';

export default {
    components: {
        navbar: NavBar,
        footerr: Footerr
    },
    data: function(){
        return {
            greeting: 'Hello, Vue!',
            flaskGreeting: ''
        }
    },
    created: async function(){
        const gResponse = await fetch("http://localhost:5000/greeting");
        const gObject = await gResponse.json();
        this.flaskGreeting = gObject.greeting;
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
