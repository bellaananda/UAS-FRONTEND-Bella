<!-- <template>
  <router-view></router-view>
</template>
<script>
  export default {

  }
</script> -->

<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand">
            <router-link :to="{name: 'siswa.index'}" class="navbar-brand">V3421024</router-link>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault"
            aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <router-link :to="{name: 'siswa.index'}" class="nav-link">HOME</router-link>
              </li>
              <li class="nav-item float-end">
              </li>
            </ul>
            <div class="d-flex">
              <router-link :to="{name: 'login'}" v-if="!loggedIn" class="btn btn-secondary">Login</router-link>
              <a @click.prevent="logout" v-if="loggedIn" class="btn btn-secondary">Logout</a>
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
  export default {
    name: 'App',

    data() {
      return {
        loggedIn: null
      }
    },

    methods: {
      getLoggedIn() {
        this.loggedIn = localStorage.getItem("loggedIn")
      },
      logout() {
        //change state
        this.loggedIn = false

        //redirect dashboard
        return this.$router.push({ name: 'home' })
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