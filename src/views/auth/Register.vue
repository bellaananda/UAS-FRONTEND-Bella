<template>
    <div class="login">
        <div class="container mt-3 mb-3 p-lg-4">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <span class="display-6">Daftar</span>
                            <hr>
                            <form @submit.prevent="register">

                                <div class="form-group mb-3">
                                    <label class="form-label">Nama Lengkap</label>
                                    <input type="text" class="form-control" v-model="user.name"
                                        placeholder="Masukkan Nama Lengkap" required>
                                    <div v-if="validation.name" class="mt-2 alert alert-danger">
                                        Masukkan Nama Lengkap
                                    </div>
                                </div>

                                <div class="form-group mb-3">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-control" v-model="user.email"
                                        placeholder="Masukkan Email" required>
                                    <div v-if="validation.email" class="mt-2 alert alert-danger">
                                        Masukkan Email
                                    </div>
                                </div>

                                <div class="form-group mb-3">
                                    <label class="form-label">Password</label>
                                    <input type="password" class="form-control" v-model="user.password"
                                        placeholder="Masukkan Password" required>
                                    <div v-if="validation.password" class="mt-2 alert alert-danger">
                                        Masukkan Password
                                    </div>
                                </div>

                                <div class="form-group mb-3">
                                    <label class="form-label">Konfirmasi Password</label>
                                    <input type="password" class="form-control" v-model="user.confirm_password"
                                        placeholder="Konfirmasi Password" required>
                                    <div v-if="validation.password" class="mt-2 alert alert-danger">
                                        Masukkan Konfirmasi Password
                                    </div>
                                </div>

                                <div class="form-group mb-3">
                                    <label class="form-label">Hak Akses</label>
                                    <select class="form-select" required v-model="user.role">
                                        <option value="Admin">Admin</option>
                                        <option value="User">User</option>
                                    </select>
                                    <div v-if="validation.role" class="mt-2 alert alert-danger">
                                        Pilih Hak Akses
                                    </div>
                                </div>

                                Sudah punya akun?<router-link :to="{name: 'login'}" class="btn btn-link">Login</router-link>
                                <button type="submit" class="btn btn-dark mt-3 float-end">Daftar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Register',

        data() {
            return {
                //state user
                user: [],
                //state validation
                validation: []
            }
        },
        methods: {
            register() {
                if (this.email && this.password && this.name && this.confirm_password && this.role) {
                    axios.get('http://localhost:8000/sanctum/csrf-cookie')
                        .then(response => {

                            //debug cookie
                            console.log(response)

                            axios.post('http://localhost:8000/api/register', {
                                email: this.email,
                                password: this.password,
                                name: this.name,
                                role: this.role
                            }).then(res => {

                                //debug user login
                                console.log(res)

                                if (res.data.success) {

                                    //set localStorage
                                    localStorage.setItem("loggedIn", "true")

                                    //set localStorage Token
                                    localStorage.setItem("token", res.data.token)
                                    localStorage.setItem("role", res.data.user.role)

                                    //change state
                                    this.loggedIn = true

                                    //redirect dashboard
                                    return this.$router.push({ name: 'siswa.index' })

                                } else {

                                    //set state login failed
                                    this.loginFailed = true

                                }

                            }).catch(error => {
                                console.log(error)
                            })

                        })
                }

                this.validation = []

                if (!this.user.email) {
                    this.validation.email = true
                }

                if (!this.user.password) {
                    this.validation.password = true
                }

            }
        },

        mounted() {
            return this.$router.push({ name: 'register' })
        }
    }
</script>