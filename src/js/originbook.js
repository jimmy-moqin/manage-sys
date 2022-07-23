import { defineComponent } from 'vue'
import { genFileId } from 'element-plus'
import AsideMenu from "@/components/AsideMenu";
import { getBooks, getSheets_all, createNewSheet, deleteSheet, uploadInSheet } from '@/api/service';
export default defineComponent({
    name: "OriginBookView",
    components: {
        AsideMenu
    },
    data() {
        return {
            activeBookName: "",
            allSheetsData: [],
            showSheetsData: [],
            currentRow: 0,

            sheetTypeFilter: [{
                    text: "大料单",
                    value: "大料单",
                },
                {
                    text: "小用户",
                    value: "小用户",
                },
                {
                    text: "维修单",
                    value: "维修单",
                },
                {
                    text: "入库单",
                    value: "入库单",
                },
            ],

            dialogNewSheetFormVisible: false,
            outtimePickerVisible: false,

            newsheet: {
                opt: "",
                date: "",
                sheettype: "",
                big_sheetid: "",
                sheetid: "",
                sheetname: "",
                outputtime: "",
                createtime: "",
                updatetime: "",
                createperson: '张颖',
            },

            isSelectBigSheet: false,
            isSelectSmallUser: false,
            isSelectFixSheet: false,
            isSelectInSheet: false,

            newsheetRules: {
                sheettype: [
                    { required: true, message: "请选择料单类型", trigger: "change" },
                ],
                big_sheetid: [
                    { required: true, message: "请输入大料单ID", trigger: "blur" },
                    { pattern: /^D\d{7}$/, message: "请输入正确的大料单ID", trigger: "blur" },
                ],
                sheetid: [
                    { required: true, message: "请输入料单ID", trigger: "blur" },
                ],
                sheetname: [
                    { required: true, message: "请输入料单名称", trigger: "blur" },
                ],
                outputtime: [
                    { required: true, message: "请选择出库时间", trigger: "change" },
                ],
                inputtime: [
                    { required: true, message: "请选择入库时间", trigger: "change" },
                ],
                createperson: [
                    { required: true, message: "请输入制表人员", trigger: "blur" },
                ],
            },
            searchinfo: "",

            file_list: [],

            uploadView: false,
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
                this.activeBookName = activedata[0].BookName;
                getSheets_all(this.activeBookName).then(res => {
                    this.allSheetsData = res['data']['data'];
                    this.showSheetsData = this.allSheetsData;
                });
            });

        },

        filterMethod(value, row, column) {
            const property = column['property']
            return row[property] === value;
        },

        createNewSheetMethod() {
            this.dialogNewSheetFormVisible = true;
        },

        selectTypeMethod(value) {
            if (value == 'bigsheet') {
                this.isSelectBigSheet = true;
                this.isSelectSmallUser = false;
                this.isSelectFixSheet = false;
                this.isSelectInSheet = false;
            } else if (value == 'smalluser') {
                this.isSelectSmallUser = true;
                this.isSelectBigSheet = false;
                this.isSelectFixSheet = false;
                this.isSelectInSheet = false;
                this.newsheet.sheetid = "X" + new Date().getTime().toString();

            } else if (value == 'fixsheet') {
                this.isSelectFixSheet = true;
                this.isSelectBigSheet = false;
                this.isSelectSmallUser = false;
                this.isSelectInSheet = false;
                this.newsheet.sheetid = "W" + new Date().getTime().toString();

            } else if (value == 'insheet') {
                this.isSelectInSheet = true;
                this.isSelectBigSheet = false;
                this.isSelectSmallUser = false;
                this.isSelectFixSheet = false;
                this.newsheet.sheetid = "R" + new Date().getTime().toString();
            }

        },

        inputBigSheetID() {
            if ((this.newsheet.big_sheetid.length == 7) && (this.newsheet.big_sheetid.substring(0, 1)) != 'D') {
                this.newsheet.big_sheetid = "D" + this.newsheet.big_sheetid;
            }
        },

        postNewSheet() {
            this.$refs.newSheetForm.validate((valid) => {
                if (valid) {
                    // 如果均通过校验
                    var postdata = {};
                    postdata.opt = "add";
                    postdata.date = this.activeBookName;
                    if (this.isSelectBigSheet) {
                        postdata.sheettype = "大料单";
                        postdata.sheetid = this.newsheet.big_sheetid;
                        postdata.sheetname = this.newsheet.sheetname;
                        postdata.outputtime = this.newsheet.outputtime;
                        postdata.createtime = new Date().getTime().toString();
                        postdata.updatetime = postdata.createtime;
                        postdata.createperson = this.newsheet.createperson;
                    } else if (this.isSelectSmallUser) {
                        postdata.sheettype = "小用户";
                        postdata.sheetid = this.newsheet.sheetid;
                        postdata.sheetname = this.newsheet.sheetname;
                        postdata.outputtime = this.newsheet.outputtime;
                        postdata.createtime = postdata.sheetid.substring(1, postdata.sheetid.length);
                        postdata.updatetime = postdata.createtime;
                        postdata.createperson = this.newsheet.createperson;
                    } else if (this.isSelectFixSheet) {
                        postdata.sheettype = "维修单";
                        postdata.sheetid = this.newsheet.sheetid;
                        postdata.sheetname = this.newsheet.sheetname;
                        postdata.outputtime = this.newsheet.outputtime;
                        postdata.createtime = postdata.sheetid.substring(1, postdata.sheetid.length);
                        postdata.updatetime = postdata.createtime;
                        postdata.createperson = this.newsheet.createperson;
                    } else if (this.isSelectInSheet) {
                        postdata.sheettype = "入库单";
                        postdata.sheetid = this.newsheet.sheetid;
                        postdata.sheetname = this.newsheet.sheetname;
                        postdata.outputtime = this.newsheet.inputtime;
                        postdata.createtime = postdata.sheetid.substring(1, postdata.sheetid.length);
                        postdata.updatetime = postdata.createtime;
                        postdata.createperson = this.newsheet.createperson;
                    }
                    console.log(postdata);
                    createNewSheet(postdata).then(res => {
                        var code = res['data']['code'];
                        if (code == 200) {
                            this.dialogNewSheetFormVisible = false;
                            this.$message({
                                message: '新建成功',
                                type: 'success'
                            });
                            this.$refs.newSheetForm.resetFields();
                            this.isSelectBigSheet = false;
                            this.isSelectSmallUser = false;
                            this.isSelectFixSheet = false;
                            this.isSelectInSheet = false;
                            this.convert();
                        } else if (code == 501) {
                            this.$message({
                                message: '新建失败，可能已经存在该单号，请查验后重试！',
                                type: 'error'
                            });
                        } else {
                            this.$message({
                                message: '新建失败，其他错误，请电话联系 15365285077 ！',
                                type: 'error'
                            });
                        }
                    });
                } else {
                    this.$message.error('请正确填写各个字段');
                }
            });


        },

        handleCurrentChange(val) {
            this.currentRow = val;

        },

        delSheet(row) {
            row = this.currentRow;
            if (row == 0) {
                this.$message({
                    message: '请选择要删除的行',
                    type: 'warning'
                });
            } else {
                this.$confirm('确认删除该条记录吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var postdata = {};
                    postdata.opt = "del";
                    postdata.date = this.activeBookName;
                    postdata.sheetid = row.SheetID;
                    deleteSheet(postdata).then(res => {
                        console.log(res);
                        var code = res['data']['code'];
                        if (code == 200) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.convert();
                            this.currentRow = 0;
                        } else {
                            this.$message({
                                message: '删除失败',
                                type: 'error'
                            });
                            this.currentRow = 0;
                        }
                    });
                }).catch(() => {
                    this.$message({
                        message: '已取消删除',
                        type: 'info'
                    });
                    this.currentRow = 0;
                });
            }
        },

        editSheet(row) {
            row = this.currentRow;
            var type = '';
            if (row == 0) {
                this.$message({
                    message: '请选择要编辑的行',
                    type: 'warning'
                });
            } else {
                this.$confirm('确认编辑' + row.SheetID + '这份料单吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$router.push({
                        path: '/edit/' + row.SheetID,
                        name: "Edit",
                        params: {
                            sheetid: row.SheetID,
                            sheettype: row.SheetType,
                            bookname: row.BookName,
                            createtime: row.CreateTime,
                            sheetname: row.SheetName,

                        }
                    });
                    this.currentRow = 0;
                }).catch((err) => {
                    this.$message({
                        message: '已取消编辑',
                        type: 'info'
                    });
                    console.log(err);
                    this.currentRow = 0;
                });
            }
        },

        handleExceed(files) {
            this.$refs.upload.clearFiles()
            var file = files[0]
            file.uid = genFileId()
            this.$refs.upload.handleStart(file)
        },
        handleBeforeRemove(file) {
            return this.$confirm(`确定移除 ${ file.name }?`)
        },

        uploadSheet() {
            this.uploadView = true;
        },

        checkFileType(file) {
            var type = file.type;
            if (type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
                return true;
            } else {
                // warning
                this.$message({
                    message: '请上传后缀名为.xlsx的Excel文件',
                    type: 'warning'
                });
                return false;
            }
        },
        uploadRequest(file) {
            console.log(file.file);
            var formData = new FormData();
            formData.append("file", file.file);
            formData.append("option", 'upload');
            formData.append("sheetid", this.currentRow.SheetID);
            uploadInSheet(formData).then(res => {
                console.log(res);
                var code = res['data']['code'];
                if (code == 200) {
                    this.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                    this.convert();
                    this.uploadView = false;
                } else {
                    this.$message({
                        message: '上传失败',
                        type: 'error'
                    });
                    this.uploadView = false;
                }
            });
        },
        uploadAct() {
            this.$refs.upload.submit();
        },

        whenSearch() {
            var info = this.searchinfo
            if (info != '') {
                this.showSheetsData = this.allSheetsData.filter(item => {
                    return item.SheetID.indexOf(info) > -1 || item.SheetName.indexOf(info) > -1 || item.BookName.indexOf(info) > -1 || item.CreateTime.indexOf(info) > -1;
                })
            } else {
                this.showSheetsData = this.allSheetsData;
            }
        },
    }
});