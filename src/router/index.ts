import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    // index,originbook,creatbook,classifysheets,outdetail,indetail,outsum,insum,allsum,inventory
    {
        path: '/index',
        name: 'Index',
        component: () => import('../views/IndexView.vue'),
    },
    {
        path: '/originbook',
        name: 'OriginBook',
        component: () => import('../views/OriginBookView.vue'),
    },
    {
        path: '/edit/:sheetid',
        name: 'Edit',
        component: () => import('../views/EditSheetView.vue'),
    },
    {
        path: '/classifysheets',
        name: 'Classify',
        component: () => import('../views/ClassifySheetsView.vue'),
    },
    {
        path: '/outdetail',
        name: 'OutDetail',
        component: () => import('../views/OutDetailView.vue'),
    },
    {
        path: '/indetail',
        name: 'InDetail',
        component: () => import('../views/InDetailView.vue'),
    },
    {
        path: '/outsum',
        name: 'OutSum',
        component: () => import('../views/OutSumView.vue'),
    },
    {
        path: '/insum',
        name: 'InSum',
        component: () => import('../views/InSumView.vue'),
    },
    {
        path: '/allsum',
        name: 'AllSum',
        component: () => import('../views/AllSumView.vue'),
    },
    {
        path: '/inventory',
        name: 'Inventory',
        component: () => import('../views/InventoryView.vue'),
    },
    {
        path: '/showclassify/:sheetid',
        name: 'ShowClassify',
        component: () => import('../views/ShowClassifyView.vue'),
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
