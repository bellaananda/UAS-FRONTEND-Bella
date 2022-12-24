<template>
    <div class="login">
        <div class="container mt-3 mb-3 p-lg-4">
            <div class="row justify-content-center">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <span class="display-6">Daftar</span>
                            <hr>
                            <form @submit.prevent="store">

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
                                        <option value="Admin" >Admin</option>
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
    import { reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    export default {

        setup() {

            const user = reactive({
                name: '',
                email: '',
                password: '',
                confirm_password: '',
                role: ''
            })

            const validation = ref([])
            const router = useRouter()

            function store() {

                let name = user.name
                let email = user.email
                let password = user.password
                let role = user.role

                axios.post('http://localhost:8000/api/register', {
                    name: name,
                    email: email,
                    password: password,
                    role: role
                }).then(() => {
                    router.push({
                        name: 'login'
                    })
                }).catch(error => {
                    //assign state validation with error
                    validation.value = error.response.data
                })
            }
            //return
            return {
                user,
                validation,
                router,
                store
            }
        }
    }
</script>