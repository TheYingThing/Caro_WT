import {createRouter, createWebHistory} from "vue-router";
import Home from "../components/Home.vue";
import Rules from "../components/Rules.vue";
import Board from "../components/Board.vue";
import Score from "../components/Score.vue";

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
            component: Board
        },
        {
            path: "/rules",
            name: "Rules",
            component: Rules
        },
        {
            path: "/score",
            name: "Score",
            component: Score
        }
    ]
});

export default router;