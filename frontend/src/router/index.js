import { createWebHistory, createRouter } from "vue-router"
import HomeTemp from '@/views/HomeTemp.vue'
import About from '@/views/About.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import AirportDetail from '@/views/AirportDetail.vue'
import AirportDestinations from '@/views/AirportDestinations.vue'
import Home from '@/views/Home.vue'

// https://www.digitalocean.com/community/tutorials/how-to-navigate-between-views-with-vue-router

const routes = [{
        path: "/",
        name: "Home",
        component: HomeTemp,
    },
    {
        path: "/home",
        name: "HomeReal",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: '/airport/:code',
        name: "AirportDetail",
        component: AirportDetail,
        children: [{
            path: 'destinations',
            name: 'AirportDestinations',
            component: AirportDestinations
        }]
    },
    {
        path: '/:catchAll(.*)*',
        name: "PageNotFound",
        component: PageNotFound,
    }
]

// TODO dynamic titles https://stackoverflow.com/a/64811064

// https://next.router.vuejs.org/guide/essentials/nested-routes.html#nested-routes
// https://router.vuejs.org/guide/essentials/named-routes.html
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router