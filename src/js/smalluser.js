import { defineComponent } from 'vue'
import { getBooks, getSheets_all, getSheets_bigsheet, getSheets_smalluser, getSheets_fixsheet, createNewSheet, deleteSheet } from '@/api/service';
export default defineComponent({
    name: "OriginBookView",
    data() {
        return {
            activeBookName: "",
            allSheetsData: [],
            currentRow: 0,


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
                getSheets_smalluser(this.activeBookName).then(res => {
                    this.allSheetsData = res['data']['data'];
                });
            });

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
        to_bigSheet() {
            this.$router.push({
                path: '/bigsheet',
            })
        },
        to_smallUser() {
            this.$router.push({
                path: '/smalluser',
            })
        },
        to_fixSheet() {
            this.$router.push({
                path: '/fixsheet',
            })
        },
        to_inSheet() {
            this.$router.push({
                path: '/insheet',
            })
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
                        postdata.sheetname = "-";
                        postdata.outputtime = this.newsheet.outputtime;
                        postdata.createtime = postdata.sheetid.substring(1, postdata.sheetid.length);
                        postdata.updatetime = postdata.createtime;
                        postdata.createperson = this.newsheet.createperson;
                    } else if (this.isSelectFixSheet) {
                        postdata.sheettype = "维修单";
                        postdata.sheetid = this.newsheet.sheetid;
                        postdata.sheetname = "-";
                        postdata.outputtime = this.newsheet.outputtime;
                        postdata.createtime = postdata.sheetid.substring(1, postdata.sheetid.length);
                        postdata.updatetime = postdata.createtime;
                        postdata.createperson = this.newsheet.createperson;
                    } else if (this.isSelectInSheet) {
                        postdata.sheettype = "入库单";
                        postdata.sheetid = this.newsheet.sheetid;
                        postdata.sheetname = "-";
                        postdata.inputtime = this.newsheet.inputtime;
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
    },
})