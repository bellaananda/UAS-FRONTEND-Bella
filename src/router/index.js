//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
    {
        path: "/register",
        name: "register",
        component: () =>
            import(/* webpackChunkName: "siswa.index" */ "@/views/auth/Register.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import(/* webpackChunkName: "siswa.index" */ "@/views/auth/Index.vue"),
    },
    {
        path: "/",
        name: "siswa.index",
        component: () =>
            import(/* webpackChunkName: "siswa.index" */ "@/views/siswa/Index.vue"),
    },
    {
        path: "/create",
        name: "siswa.create",
        component: () =>
            import(/* webpackChunkName: "siswa.create" */ "@/views/siswa/Create.vue"),
    },
    {
        path: "/edit/:id",
        name: "siswa.edit",
        component: () =>
            import(/* webpackChunkName: "siswa.edit" */ "@/views/siswa/Edit.vue"),
    },
];

//create router
const router = createRouter({
    history: createWebHistory(),
    routes, // config routes
});

export default router;

