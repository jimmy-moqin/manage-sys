<template>
    <el-container>
        <AsideMenu />
        <el-container>
            <el-header class="header">
                <el-icon>
                    <Notebook />
                </el-icon>
                <span>原始账本 料单总览</span>
                <span class="actbk-name"> {{ activeBookName }}</span>
            </el-header>
            <el-main>
                <el-row class="option-div" justify="center">
                    <el-col :span="4">
                        <el-button type="primary" @click="createNewSheetMethod">
                            <el-icon>
                                <DocumentAdd />
                            </el-icon>
                            <span> </span>
                            新建料单
                        </el-button>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="editSheet">
                            <el-icon>
                                <Edit />
                            </el-icon>
                            <span> </span>
                            修改料单
                        </el-button>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="danger" @click="delSheet">
                            <el-icon>
                                <Delete />
                            </el-icon>
                            <span> </span>
                            删除料单
                        </el-button>
                    </el-col>
                    <el-col :span="12">
                        <el-input style="width:100%" @input="whenSearch" v-model="searchinfo">
                            <template #prepend>
                                <el-icon class="search-icon">
                                    <Search />
                                </el-icon>
                            </template>
                        </el-input>
                    </el-col>

                </el-row>
                <el-divider />
                <el-table stripe="true" style="width: 100%" :data="showSheetsData" highlight-current-row
                    @current-change="handleCurrentChange">
                    <el-table-column prop="SheetID" sortable label="料单ID" width="150px" />
                    <el-table-column prop="BookName" label="账本名称" width="100" />
                    <el-table-column prop="SheetType" label="料单类型" :filters="sheetTypeFilter"
                        :filter-method="filterMethod" width="100" />
                    <el-table-column prop="SheetName" label="料单名称" width="240" />
                    <el-table-column prop="CreateTime" label="料单创建时间" width="120" />
                    <el-table-column prop="UpdateTime" label="最后编辑时间" width="120" />
                    <el-table-column prop="CreatePerson" label="操作">

                        <template #default="scope">
                            <el-button type="primary" size="small" @click="editSheet"
                                v-if="scope.row.SheetType != '入库单'">修改
                            </el-button>
                            <el-button type="success" size="small" @click="uploadSheet"
                                v-if="scope.row.SheetType == '入库单'">上传
                            </el-button>
                            <el-button type="danger" size="small" @click="delSheet">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>

    </el-container>
    <!-- 此处存放对话框 -->
    <!-- 新建料单对话框 -->
    <el-dialog v-model="dialogNewSheetFormVisible" title="新建料单" width="30%">
        <el-form :model="newsheet" label-width="100px" width="150px" :rules="newsheetRules" ref="newSheetForm">
            <el-form-item label="料单类型" placeholder="请选择料单类型" prop="sheettype">
                <el-select v-model="newsheet.sheettype" @change="selectTypeMethod">
                    <el-option label="大料单" value="bigsheet"></el-option>
                    <el-option label="小用户" value="smalluser"></el-option>
                    <el-option label="维修单" value="fixsheet"></el-option>
                    <el-option label="入库单" value="insheet"></el-option>
                </el-select>
            </el-form-item>
            <!-- 大料单的ID自己填写 -->
            <el-form-item label="料单ID" v-if="isSelectBigSheet == true" prop="big_sheetid">
                <el-input v-model="newsheet.big_sheetid" placeholder="请输入料单ID" @blur="inputBigSheetID" />
            </el-form-item>
            <!-- 小用户的料单ID直接生成，不可修改 -->
            <el-form-item label="料单ID"
                v-if="(isSelectSmallUser == true) | (isSelectFixSheet == true) | (isSelectInSheet == true)"
                prop="sheetid">
                <el-input v-model="newsheet.sheetid" disabled="true" />
            </el-form-item>
            <el-form-item label="料单名称" prop="sheetname">
                <el-input v-model="newsheet.sheetname" placeholder="请输入料单名称" />
            </el-form-item>
            <!-- 当选择三类出库单时显示 -->
            <el-form-item label="出库时间"
                v-if="(isSelectBigSheet == true) | (isSelectSmallUser == true) | (isSelectFixSheet == true)"
                prop="outputtime">
                <el-date-picker type="date" placeholder="请选择出库时间" v-model="newsheet.outputtime" format="YYYY-MM-DD"
                    value-format="x">
                </el-date-picker>
            </el-form-item>
            <!-- 当选择入库单时显示 -->
            <el-form-item label="入库时间" v-if="isSelectInSheet == true" prop="inputtime">
                <el-date-picker type="date" placeholder="请选择入库时间" v-model="newsheet.inputtime" format="YYYY-MM-DD"
                    value-format="x">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="制表人员" prop="createperson">
                <el-input v-model="newsheet.createperson" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="postNewSheet">确认</el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 上传对话框 -->
    <el-dialog v-model="uploadView" title="上传入库单">

        <el-upload class="upload-demo" drag :limit="1" :http-request="uploadRequest" :before-upload="checkFileType"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" :auto-upload="false"
            :exceed="handleExceed" :before-remove="handleBeforeRemove" ref="upload">

            <el-icon class="el-icon--upload">
                <upload-filled />
            </el-icon>
            <div class="el-upload__text">
                将文件拖拽至此处或<em>点击此处上传</em>
            </div>
            <template #tip>
                <div class="el-upload__tip">
                    仅能上传xlsx格式的文件, 若为xls格式请转换
                </div>

            </template>
        </el-upload>
        <template #footer>
            <el-button type="primary" @click="uploadAct">
                点击上传
            </el-button>
        </template>
    </el-dialog>

</template>

<script lang="js" src="@/js/originbook.js"></script>

<style lang="sass" scoped>
@import '@/style/originbook.sass'
@import '../../public/css/common.sass'
.el-main
    padding-left: 10%
    padding-right: 10%

.el-input
    width:220px

</style>
