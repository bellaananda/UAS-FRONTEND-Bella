<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid mx-2">
          <a class="navbar-brand">
            <router-link :to="{name: 'siswa.index'}" class="navbar-brand">V3421024</router-link>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav me-auto">
            </ul>
            <div class="d-flex">
              <a @click.prevent="logout" v-if="loggedIn" class="btn btn-light text-black">Logout</a>
            </div>
          </div>
        </div>
  
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'App',

    data() {
      return {
        loggedIn: null,
        role:null
      }
    },

    methods: {
      getLoggedIn() {
        this.loggedIn = localStorage.getItem("loggedIn"),
        this.role = localStorage.getItem("role")
      },
      logout() {
            axios.get('http://localhost:8000/api/logout')
            .then(() => {
                //remove localStorage
                localStorage.removeItem("loggedIn")    


                //redirect
                return this.$router.push({ name: 'login' })
            })
        }
    },

    watch: {
      $route: {
        immediate: true,
        handler() {
          this.getLoggedIn()
        }
      }
    },

  }
</script>