import {createRouter, createWebHistory} from "vue-router";
import Home from "../components/Home.vue";
import Rules from "../components/Rules.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/game",
            name: "Game",
            component: Home
        },
        {
            path: "/rules",
            name: "Rules",
            component: Rules
        },
        {
            path: "/score",
            name: "Score",
            component: Home
        }
    ]
});

export default router;