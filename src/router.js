import Vue from "vue";
import VueRouter from "vue-router";
const carefree = process.env.NODE_ENV === "carefree";

// 懒加载（按需加载）
const SignUp = () => import("./view/sign_up/sign_up.vue");

Vue.use(VueRouter);

const routes = [

    {
        path: "/",
        component: SignUp,
        meta: {
            title: "test"
        }
    },
];

const router = new VueRouter({
    mode: carefree ? "hash" : "history",
    routes
});



export default router;
