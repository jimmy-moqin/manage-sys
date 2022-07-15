<template>
    <el-container>
        <el-header class="header">
            {{ sheettype }}
            <span class="header-span">料单号 {{ sheetid }}</span>
        </el-header>
        <el-main>
            <el-descriptions column=4 border>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <Collection />
                            </el-icon>
                            账本名称
                        </div>
                    </template>
                    <span>{{ bookname }}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <Coin />
                            </el-icon>
                            料单ID
                        </div>
                    </template>
                    <span>{{ sheetid }}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <CollectionTag />
                            </el-icon>
                            料单类型
                        </div>
                    </template>
                    <span>{{ sheettype }}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <Clock />
                            </el-icon>
                            料单创建时间
                        </div>
                    </template>
                    <span>{{ createtime }}</span>
                </el-descriptions-item>
            </el-descriptions>
            <el-divider />
            <el-table border style="width: 100%" :header-cell-style="tb_header_style" :row-class-name="stripe"
                :key="timeStamp" :cell-style="tb_cell_style" :data="table_original_data" @cell-click="ClickCell"
                :cell-class-name="tableCellClassName">
                <el-table-column prop="MaterialID" label="序号" width="90px" type="index">
                </el-table-column>
                <el-table-column prop="MaterialName" label="物料名称" width="400px">
                </el-table-column>
                <el-table-column prop="MaterialCount" label="领用数量" width="140px" />
                <el-table-column prop="MaterialPrice" label="物料单价" width="140px" />
                <el-table-column prop="MaterialTotal" label="物料总价" width="140px" />
            </el-table>

            <el-input class="float-input" v-model="test" id="finput" @keyup.enter="enterKeyDown" @change="whenInput">
            </el-input>

            <el-select :remote-method="whenInput" :loading="loading" v-model="select_item" filterable remote
                reserve-keyword ref="select" @change="selectChoose" @keyup.enter="enterKeyDown" class="input-select"
                id="sinput">

                <el-option v-for="item in options" :key="item" :label="item" :value="item" />
            </el-select>

            <el-button type="primary" @click="pull" class="pull-button" id="btn">
                <el-icon size="30px">
                    <ArrowLeftBold />
                </el-icon>
            </el-button>

        </el-main>
    </el-container>
    <!-- 此处存放抽屉 -->
    <el-drawer v-model="drawer" :direction="direction" @close="handleClose" @open="handleOpen" :with-header="false">
        <el-row class="drawer-header">
            <el-col span="24">
                功能面板
            </el-col>
        </el-row>
        <div style="height:32px"></div>
        <el-row>
            <el-col span="24">
                <el-icon>
                    <Edit />
                </el-icon>
                <span class="drawer-subtitle">录入统计</span>
            </el-col>
        </el-row>
        <el-row class="drawer-words">
            <el-col span="24">
                <span>本料单目前共录入<span class="highline">{{ entry }}</span>条货物信息</span>
            </el-col>
        </el-row>
        <el-row class="drawer-words">
            <el-col span="24">
                <span>录入总金额为<span class="highline">{{ totalmoney }}</span>元</span>
            </el-col>
        </el-row>
        <div style="height:32px"></div>
        <el-row>
            <el-col span="24">
                <el-icon>
                    <Clock />
                </el-icon>
                <span class="drawer-subtitle">自动保存时间设置</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col span="24" class="drawer-words">

                <el-slider v-model="time_spliter" class="time-slider" :format-tooltip="formatTooltip" :step="10"
                    show-stops />
                <span class="highline">{{ time_spliter / 10 }}</span><span class="unit-words">min</span>
            </el-col>
        </el-row>
        <div style="height:32px"></div>
        <el-row>
            <el-col span="24">
                <el-icon>
                    <Check />
                </el-icon>
                <span class="drawer-subtitle">校验与保存</span>
            </el-col>
        </el-row>
        <div style="height:32px"></div>
        <el-row justify="space-around">
            <el-col span="12">
                <el-button type="primary" @click="check" size="large">校验</el-button>
            </el-col>
            <el-col span="12">
                <el-button type="primary" @click="save" size="large">保存</el-button>
            </el-col>
        </el-row>
        <div style="height:64px"></div>
        <el-row>
            <el-col span="24">
                <el-icon>
                    <Back />
                </el-icon>
                <span class="drawer-subtitle">退出编辑</span>
            </el-col>
        </el-row>
        <div style="height:32px"></div>
        <el-row justify="space-around">
            <el-col span="24">
                <el-button type="primary" @click="to_OriginBook" size="large">返回料单总览</el-button>
            </el-col>
        </el-row>
    </el-drawer>
</template>
<style lang="sass" scoped>
@import '@/style/editsheet.sass'
.el-main
    padding-left: 20%
    padding-right: 20%

.el-input:deep().el-input__inner
    width:100%
    height:100%
    text-align: center 
    background-color: #C6EFCE
    border-radius: 5px
:deep().el-input__wrapper
    box-shadow: none !important
    background-color: transparent
    padding: 0
    margin: none

:deep().el-input__wrapper
    box-shadow: none !important
    background-color: transparent
    padding: 0
    margin: none


.el-select:deep().el-input__inner
    width:100%
    height:40px !important
    text-align: center 
    background-color: #FFEB9C
    border-radius: 5px
    
:deep().el-select__input
    width:400px !important
    height:40px !important
    max-width: 400px !important
    margin: 0 !important
    font-size: 18px
    text-align: center
    placeholder: ""
:deep().el-select__tags
    max-width: 400px !important
    width: 400px !important
    height: 40px !important
.el-select:deep().el-input__wrapper
    box-shadow: none
    background-color: transparent
    padding: 0
    margin: none
:deep().el-select-tags-wrapper.has-prefix
    transform: translateY(15%)

.el-select-dropdown__item.hover
    background-color: #fd8989
.el-select-dropdown__item
    color: $word-black

:deep().el-table__cell
    padding: 0
:deep().cell
    line-height: 40px
</style>

<script lang="js" src="@/js/editsheet.js"></script>