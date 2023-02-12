import Main from "@/components/MainPage";
import RepositoryPage from "@/components/RepositoryPage";
import {createRouter, createWebHistory} from "vue-router";
const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/repository/:title',
        component: RepositoryPage
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;
