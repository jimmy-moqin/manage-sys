<template>
    <el-container>
        <el-main>
            <div style="height:32px" />
            <el-row class="sheet-title">
                <el-col>
                    宜兴水务集团有限公司材料出库单
                </el-col>
            </el-row>
            <div style="height:16px" />
            <el-row class="sheet-id">
                <el-col>
                    <span class="No-word">No:</span><span class="ID-word">{{ sheetid_num }}</span>
                </el-col>
            </el-row>
            <div style="height:32px" />
            <el-row class="sheet-info" justify="space-around">
                <el-col span="12">
                    <span class="info-field">材料类型:</span><span class="info-con">{{ sheetname }}</span>
                </el-col>
                <el-col span="12">
                    <span class="info-field">出库时间:</span><span class="info-con">{{ year }}</span>年<span
                        class="info-con">{{ month }}</span>月<span class="info-con">{{ day }}</span>日
                </el-col>
            </el-row>
            <div style="height:8px" />
            <el-table stripe="true" style="width: 100%" :data="classifyData" highlight-current-row
                :header-cell-style="{ 'text-align': 'center' }" border="true" show-summary
                :summary-method="getSummaries">
                <el-table-column prop="index" label="序号" width="80" type="index" align="center" />
                <el-table-column prop="name" label="货物名称" />
                <el-table-column prop="model" label="规格型号" width="100" />
                <el-table-column prop="unit" label="单位" width="80" align="center" />
                <el-table-column prop="number" label="领用数量" width="100" align="center" />
                <el-table-column label="实发数量" width="100" />
                <el-table-column prop="unitprice" label="单价" width="100" align="right" />
                <el-table-column prop="totalprice" label="金额" width="100" align="right" />
            </el-table>
        </el-main>
    </el-container>
</template>
<script src="@/js/showclassify.js">

</script>
<style lang="sass" scoped>
@import "@/style/showclassify.sass"
.el-main
    margin-left: 20%
    margin-right: 20%
</style>