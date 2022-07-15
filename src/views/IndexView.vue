<template>
    <el-container>
        <AsideMenu />
        <el-container>
            <el-header class="header">
                <el-icon>
                    <HomeFilled />
                </el-icon>
                <span>首页</span>
            </el-header>
            <el-main>
                <el-row class="active-book-title">
                    <el-icon>
                        <CollectionTag />
                    </el-icon>
                    工作中的账本
                </el-row>

                <el-row>
                    <el-col span="24">
                        <div class="active-div">
                            <el-card>
                                <el-icon class="active-book-icon">
                                    <Notebook />
                                </el-icon>
                                <div class="active-card-field-words">
                                    账本名称: <br />
                                    账本类型: <br />
                                    账本状态: <br />
                                    创建时间: <br />
                                    更新时间: <br />
                                    创建人员: <br />
                                </div>
                                <div class="active-card-words" v-for="(key) in activeData" :key="key">
                                    {{ key.BookName }} <br />
                                    {{ key.BookType }} <br />
                                    {{ key.BookState }} <br />
                                    {{ key.CreateTime }} <br />
                                    {{ key.UpdateTime }} <br />
                                    {{ key.CreatePerson }} <br />

                                </div>
                            </el-card>
                        </div>
                    </el-col>
                </el-row>

                <el-row class="inactive-book-title">
                    <el-icon>
                        <CollectionTag />
                    </el-icon>
                    已结算的账本
                </el-row>
                <!-- {{ inactiveDataFormatArr }} -->
                <el-row class="inactive-row" :gutter="32" v-for="(subarr, i) in inactiveDataFormatArr" :key="i">
                    <el-col :span="8" v-for="(item, k) in inactiveDataFormatArr[i]" :key="k">
                        <el-card class="inactive-cards">
                            <el-icon class="inactive-book-icon">
                                <Notebook />
                            </el-icon>
                            <div class="inactive-book-words">
                                账本名称: {{ item.BookName }} <br />
                                更新时间: {{ item.UpdateTime }}<br />
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>

    </el-container>
</template>

<script lang="js">
import { defineComponent } from 'vue'
import AsideMenu from "@/components/AsideMenu";
import { getBooks } from "@/api/service";
export default defineComponent({
    name: "IndexView",
    components: {
        AsideMenu
    },
    data() {

        return {
            activeData: [],
            activeBookName: "",
            inactiveDataFormatArr: [],
        }
    },
    created() {
        this.convert();
    },
    methods: {
        convert() {
            getBooks().then(res => {
                var data = res['data']['data'];
                var activedata = data.filter(item => {
                    return item.BookState == '活动';
                });
                var inactivedata = data.filter(item => {
                    return item.BookState == '已结算';
                });

                this.inactivedata = inactivedata;
                var inactiveDataFormatArr = [];
                var subArr = [];
                for (var i = 0; i < this.inactivedata.length; i++) {
                    var item = inactivedata[i];
                    subArr.push(item);
                    if (i % 3 == 0) {
                        inactiveDataFormatArr.push(subArr.reverse());
                        subArr = [];
                    }

                }
                this.inactiveDataFormatArr = inactiveDataFormatArr.reverse();

                this.activeData = activedata;
                this.activeBookName = activedata[0].BookName;

            })
        },

        to_Index() {
            this.$router.push({
                path: '/index',
            })
        },

        to_OriginBook() {
            this.$router.push({
                path: '/originbook',
            })
        },
    }
})
</script>

<style lang="sass" scoped>
@import '../style/index.sass'
.el-main
    padding-left: 10%
    padding-right: 10%

</style>
