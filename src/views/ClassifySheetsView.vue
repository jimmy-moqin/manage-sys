<template>
    <el-container>
        <AsideMenu />
        <el-container>
            <el-header class="header">
                <el-icon>
                    <Finished />
                </el-icon>
                <span>已分类料单</span>
            </el-header>
            <el-main>
                <el-divider />
                <el-table stripe="true" style="width: 100%" :data="allSheetsData" highlight-current-row
                    @current-change="handleCurrentChange">
                    <el-table-column prop="SheetID" sortable label="料单ID" width="150px" />
                    <el-table-column prop="BookName" label="账本名称" width="100" />
                    <el-table-column prop="SheetType" label="料单类型" :filters="sheetTypeFilter"
                        :filter-method="filterMethod" width="100" />
                    <el-table-column prop="SheetName" label="料单名称" width="260" />
                    <el-table-column prop="CreateTime" label="料单创建时间" width="120" />
                    <el-table-column prop="UpdateTime" label="最后编辑时间" width="120" />
                    <el-table-column prop="CreatePerson" label="操作">
                        <template #default>
                            <el-button type="primary" size="small" @click="classify">料单分类</el-button>

                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="js" src="@/js/classifysheets.js" scoped>

</script>
<style lang="sass" scoped>
@import "../../public/css/common.sass"
@import "@/style/classifysheets.sass"

.el-main
    padding-left: 10%
    padding-right: 10%
</style>