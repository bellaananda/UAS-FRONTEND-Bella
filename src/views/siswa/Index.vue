<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-1 rounded shadow mt-5 mb-5">
                    <div class="card-body">
                        <h4>DATA SISWA</h4>
                        <hr>
                        <router-link :to="{name: 'siswa.create'}" class="btn btn-md btn-success">TAMBAH SISWA</router-link>
                        <table class="table table-striped mt-4 rounded">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Alamat</th>
                                    <th scope="col">Kota</th>
                                    <th scope="col">Provinsi</th>
                                    <th scope="col">E-mail</th>
                                    <th scope="col" colspan="2" class="text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(siswa, index) in siswas.data" :key="index">
                                    <td>{{ siswa.nama }}</td>
                                    <td>{{ siswa.alamat }}</td>
                                    <td>{{ siswa.kota }}</td>
                                    <td>{{ siswa.provinsi }}</td>
                                    <td>{{ siswa.email }}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'siswa.edit', params:{id:siswa.id }}" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                                    </td>
                                    <td>
                                        <button @click="postDelete(siswa.id)" class="btn btn-sm btn-danger ml-1">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <pagination align="center" :data="siswas" @pagination-change-page="getSiswas"></pagination>
                        <div class="text-center">
                            <v-pagination v-model="page" :length="6" :data="siswas" @pagination-change-page="getSiswas"></v-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    // import { onMounted, ref } from 'vue'
    import LaravelVuePagination from 'laravel-vue-pagination'

    export default {

        components: {
            'pagination': LaravelVuePagination
        },
        data() {
            return {
                siswas: {},
            }
        },
        mounted() {
            this.getSiswas();
        },
        methods: {
            getSiswas(page=1) {
                axios.get('http://localhost:8000/api/siswa?page=' + page)
                .then(response => {
                    this.siswas = response.data.data;
                });
            },
            postDelete(id) {
                //delete data post by ID
                axios.delete(`http://localhost:8000/api/siswa/${id}`)
                .then(() => {
                    // //splice posts
                    // const index = this.siswas.findIndex(siswa => siswa.id === id) // find the post index
                    // if (~index) {
                    //     // if the post exists in array
                    //     this.siswas.splice(index, 1)
                    // }
                    let i = this.siswas.map(siswa => siswa.id).indexOf(id); // find index of your object
                    this.siswas.splice(i, 1)
                }).catch(error => {
                    console.log(error.response.data)
                })
            }
        }
        
        // setup() {

        //     //reactive state
        //     let posts = ref([])

        //     //mounted
        //     onMounted(() => {
        //         //get API from Laravel Backend
        //         axios.get(`http://localhost:8000/api/siswa?page=1`)
        //         .then(response => {
        //             //assign state posts with response data
        //             posts.value = response.data.data
        //         }).catch(error => {
        //             console.log(error.response.data)
        //         })
        //     })

        //     //method delete
        //     function postDelete(id) {
        //         //delete data post by ID
        //         axios.delete(`http://localhost:8000/api/siswa/${id}`)
        //         .then(() => {
        //             //splice posts
        //             const index = this.posts.findIndex(post => post.id === id) // find the post index
        //             if (~index) {
        //                 // if the post exists in array
        //                 this.posts.splice(index, 1)
        //             }
        //         }).catch(error => {
        //             console.log(error.response.data)
        //         })
        //     }

        //     //return
        //     return {
        //         posts,
        //         postDelete
        //     }

        // }
    }
</script>

