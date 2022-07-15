<template>
    <el-aside class="aside">
        <div class="aside-title">
            <el-icon>
                <Management />
            </el-icon>
            仓库管理系统
        </div>
        <el-menu default-active="2" class="menu-vertical" route @select="routeTrans">

            <el-menu-item index="index">
                <template #title>
                    <el-icon>
                        <HomeFilled />
                    </el-icon>
                    <span>首页</span>
                </template>
            </el-menu-item>

            <el-menu-item index="originbook">
                <template #title>
                    <el-icon>
                        <Notebook />
                    </el-icon>
                    <span>原始账本</span>
                </template>
            </el-menu-item>


            <el-sub-menu index="createbook">
                <template #title>
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>生成账本</span>
                </template>
                <el-menu-item index="classifysheets">
                    <template #title>
                        <el-icon>
                            <Finished />
                        </el-icon>
                        <span>已分类料单</span>
                    </template>
                </el-menu-item>
                <el-sub-menu index="#1">
                    <template #title>
                        <el-icon>
                            <List />
                        </el-icon>
                        <span>材料明细</span>
                    </template>
                    <el-menu-item index="outdetail">
                        <template #title>
                            <el-icon>
                                <Back />
                            </el-icon>
                            <span>出库材料明细</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="indetail">
                        <template #title>
                            <el-icon>
                                <Right />
                            </el-icon>
                            <span>入库材料明细</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="#2">
                    <template #title>
                        <el-icon>
                            <DataAnalysis />
                        </el-icon>
                        <span>料单汇总</span>
                    </template>

                    <el-menu-item index="outsum">
                        <template #title>
                            <el-icon>
                                <Back />
                            </el-icon>
                            <span>出库料单汇总</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="insum">
                        <template #title>
                            <el-icon>
                                <Right />
                            </el-icon>
                            <span>入库料单汇总</span>
                        </template>

                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item index="allsum">
                    <template #title>
                        <el-icon>
                            <MoreFilled />
                        </el-icon>
                        <span>汇总表</span>
                    </template>
                </el-menu-item>
            </el-sub-menu>

            <el-menu-item index="inventory">
                <el-icon>
                    <Fold />
                </el-icon>
                <span>库存明细</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script lang="js" scoped >
import { defineComponent } from 'vue'
export default defineComponent({
    name: "AsideMenu",
    data() {
        return {
        }
    },

    methods: {
        // 此处方法是用来控制侧边栏与路由的跳转
        // 用在AsideMenu组件中
        routeTrans(index) {
            console.log(index)
            this.$router.push("/" + index).catch(err => { console.log(err) })
        }
    },
})
</script>
<style lang="sass" scoped>
@import ../../public/css/common.sass

</style>