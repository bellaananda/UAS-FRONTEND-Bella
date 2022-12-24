<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow mt-5 mb-5">
                    <div class="card-body">
                        <h4>Edit Data Siswa</h4>
                        <hr>
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label for="title" class="font-weight-bold form-label">Nama Siswa</label>
                                <input type="text" class="form-control" v-model="post.nama" placeholder="Masukkan nama siswa">
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="title" class="font-weight-bold form-label">Alamat</label>
                                <input type="text" class="form-control" v-model="post.alamat" placeholder="Nama jalan dan nomor rumah">
                                <!-- validation -->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="title" class="font-weight-bold form-label">Kota</label>
                                <input type="text" class="form-control" v-model="post.kota" placeholder="Masukkan nama kota tempat tinggal">
                                <!-- validation -->
                                <div v-if="validation.kota" class="mt-2 alert alert-danger">
                                    {{ validation.kota[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="title" class="font-weight-bold form-label">Provinsi</label>
                                <input type="text" class="form-control" v-model="post.provinsi" placeholder="Masukkan nama provinsi tempat tinggal">
                                <!-- validation -->
                                <div v-if="validation.provinsi" class="mt-2 alert alert-danger">
                                    {{ validation.provinsi[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="title" class="font-weight-bold form-label">Email</label>
                                <input type="text" class="form-control" v-model="post.email" placeholder="Masukkan alamat email siswa">
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>
                            <!-- <input type="hidden" name="_method" value="PUT">
                            <input type="hidden" name="_token" value="<?php echo
                            csrf_token(); ?>"> -->
                            <button type="submit" class="btn btn-dark mt-5 float-end">Simpan</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, ref, onMounted } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import axios from 'axios'
    
    export default {

        setup() {

            //initial state
            const post = reactive({
                nama: '',
                alamat: '',
                kota: '',
                provinsi: '',
                email: ''
            })

            //state validation
            const validation = ref([])

            //vue router
            const router = useRouter()

            //vue router
            const route = useRoute()

            //mounted
            onMounted(() => {
                //get API from Laravel Backend
                axios.get(`http://localhost:8000/api/siswa/${route.params.id}`)
                .then(response => {
                    //assign state posts with response data
                    post.nama = response.data.data.nama
                    post.alamat = response.data.data.alamat
                    post.kota = response.data.data.kota
                    post.provinsi = response.data.data.provinsi
                    post.email = response.data.data.email
                }).catch(error => {
                    console.log(error.response.data)
                })
            })

            //method update
            function update() {
                let nama = post.nama
                let alamat = post.alamat
                let kota = post.kota
                let provinsi = post.provinsi
                let email = post.email
                axios.put(`http://localhost:8000/api/siswa/${route.params.id}`, {
                    nama: nama,
                    alamat: alamat,
                    kota: kota,
                    provinsi: provinsi,
                    email: email,
                }).then(() => {
                    //redirect to siswa index
                    router.push({
                    name: 'siswa.index'
                })
                }).catch(error => {
                    //assign state validation with error
                    validation.value = error.response.data
                })
            }

            //return
            return {
                post,
                validation,
                router,
                update
            }

        }

    }
</script>

<style>
    body {
        background: lightgray;
    }
</style>
