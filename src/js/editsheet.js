import { defineComponent } from 'vue'
import { getDetail, saveSheet, getSheetCon, saveClsSheet } from '@/api/service';

export default defineComponent({
    name: "EditSheetView",
    data() {
        return {

            tb_header_style: {
                'background-color': '#ECF5FF',
                'color': 'rgba(0,0,0,0.87)',
                'line-hight': '60px',
                'text-align': 'center',
                'font-size': '18px',
            },
            tb_cell_style: {
                'font-size': '16px',
                'color': 'rgba(0,0,0,0.87)',
                'text-align': 'center',
            },

            test: '',
            sheettype: "",
            sheetid: "",
            bookname: "",
            sheetname: "",
            createtime: "",

            timeStamp: new Date().getTime(),
            table_original_data: [{
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                },
                {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                },
                {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                }, {
                    'MaterialPrice': '-',
                    'MaterialTotal': '-',
                },
                // repeat 30 times


            ],

            select_item: '',
            loading: false,
            options: [],
            drawer: false,
            time_spliter: 50,
            isRight: false,
            isSave: false,

            entry: 0,
            totalmoney: 0,
        }
    },
    created() {
        this.convert();
        console.log(this.sheetname);

    },
    methods: {
        convert() {
            this.sheettype = this.$route.params.sheettype;
            this.sheetid = this.$route.params.sheetid;
            this.bookname = this.$route.params.bookname;
            this.createtime = this.$route.params.createtime;
            this.sheetname = this.$route.params.sheetname;

            this.detailList = [];
            this.detail_priceMap = new Map();
            getDetail(0).then(res => {
                var detail = res["data"]["data"];
                for (var i = 0; i < detail.length; i++) {
                    this.detailList.push(detail[i]["GoodsName"] + "-" + detail[i]["GoodsAlias"]);
                    this.detail_priceMap.set(detail[i]["GoodsName"], detail[i]["GoodsPrice"]);
                }
            });
            getSheetCon(this.sheetid).then(res => {
                console.log(res);
                var sheet = res["data"]["data"]["SheetConJson"];
                this.table_original_data = JSON.parse(sheet);
            }).catch(err => {
                console.log(err);
            })
        },
        stripe(row, index) {
            if (index % 2 == 0) {
                return '#fafafa';
            }
        },

        tableCellClassName({ row, column, rowIndex, columnIndex }) { //注意这⾥是解构
            //利⽤单元格的 className 的回调⽅法，给⾏列索引赋值
            row.index = rowIndex + 1;
            column.index = columnIndex + 1;
        },

        ClickCell(row, column, cell, event) {
            // console.log(event);
            var x = event.pageX - event.offsetX;
            var y = event.pageY - event.offsetY;
            var input_div = document.getElementsByClassName("float-input")[0];
            var input = document.getElementById("finput");
            var select_div = document.getElementsByClassName("input-select")[0];
            var select = document.getElementById("sinput");
            this.row_index = row.index;
            this.column_index = column.index;
            input.value = "";
            select.value = "";
            this.options = []
            if (column.index == 2) {
                input_div.style.visibility = "hidden";
                select_div.style.visibility = "hidden";
                select_div.style.left = x + "px";
                select_div.style.top = y + "px";
                select_div.style.width = "400px";
                select_div.style.visibility = "visible";
            } else if (column.index == 3) {
                input_div.style.visibility = "hidden";
                select_div.style.visibility = "hidden";
                input_div.style.left = x + "px";
                input_div.style.top = y + "px";
                input_div.style.width = "140px";
                input_div.style.visibility = "visible";
            }
            select.focus();
            input.focus();
        },

        selectChoose(val) {
            this.choose_value = val;
            this.$refs.select.visibility = false;
            // console.log(this.choose_value)
        },

        enterKeyDown() {
            this.$refs.select.visible = false;
            var input_div = document.getElementsByClassName("float-input")[0];
            var input = document.getElementById("finput");

            var select_div = document.getElementsByClassName("input-select")[0];
            var select = document.getElementById("sinput");

            var inputcontent = input.value;
            var selectcontent = this.choose_value;
            if (this.row_index < 30) {
                if (this.column_index == 3) {
                    if (inputcontent == 0 || inputcontent == "") {
                        this.table_original_data[this.row_index - 1]["MaterialName"] = null;
                        this.table_original_data[this.row_index - 1]["MaterialCount"] = null;
                        this.table_original_data[this.row_index - 1]["MaterialPrice"] = "-";
                        this.table_original_data[this.row_index - 1]["MaterialTotal"] = "-";
                    } else {
                        this.table_original_data[this.row_index - 1]["MaterialCount"] = inputcontent;
                        if (this.table_original_data[this.row_index - 1]["MaterialName"] != null) {
                            this.table_original_data[this.row_index - 1]["MaterialPrice"] = this.detail_priceMap.get(this.table_original_data[this.row_index - 1]["MaterialName"]);
                            this.table_original_data[this.row_index - 1]["MaterialTotal"] = (Number(inputcontent) * Number(this.table_original_data[this.row_index - 1]["MaterialPrice"])).toFixed(2);
                        } else {
                            this.table_original_data[this.row_index - 1]["MaterialPrice"] = "-";
                            this.table_original_data[this.row_index - 1]["MaterialTotal"] = "-";
                        }
                        input.value = "";
                        select_div.style.left = Number(input_div.style.left.replace("px", "")) - 400 + "px";
                        select_div.style.top = Number(input_div.style.top.replace("px", "")) + 40.99 + "px";

                        select_div.style.visibility = "visible";
                        input_div.style.visibility = "hidden";
                        select.focus();
                        this.column_index = 2;
                        this.row_index = this.row_index + 1;
                    }
                } else if (this.column_index == 2) {
                    this.table_original_data[this.row_index - 1]["MaterialName"] = selectcontent.split("-")[0];
                    this.options = [];
                    select.value = "";
                    input_div.style.left = Number(select_div.style.left.replace("px", "")) + 400 + "px";
                    input_div.style.top = select_div.style.top;
                    select_div.style.visibility = "hidden";
                    input_div.style.visibility = "visible";
                    input.focus();
                    this.column_index = 3;
                }

            } else if (this.row_index == 30) { //此处判断是否是最后一行
                if (this.column_index == 3) {
                    if (inputcontent == 0 || inputcontent == "") {
                        this.table_original_data[this.row_index - 1]["MaterialName"] = null;
                        this.table_original_data[this.row_index - 1]["MaterialCount"] = null;
                        this.table_original_data[this.row_index - 1]["MaterialPrice"] = "-";
                        this.table_original_data[this.row_index - 1]["MaterialTotal"] = "-";
                    } else {
                        this.table_original_data[this.row_index - 1]["MaterialCount"] = inputcontent;
                        if (this.table_original_data[this.row_index - 1]["MaterialName"] != null) {
                            this.table_original_data[this.row_index - 1]["MaterialPrice"] = this.detail_priceMap.get(this.table_original_data[this.row_index - 1]["MaterialName"]);
                            this.table_original_data[this.row_index - 1]["MaterialTotal"] = (Number(inputcontent) * Number(this.table_original_data[this.row_index - 1]["MaterialPrice"])).toFixed(2);
                        } else {
                            this.table_original_data[this.row_index - 1]["MaterialPrice"] = "-";
                            this.table_original_data[this.row_index - 1]["MaterialTotal"] = "-";
                        }
                        input.value = "";
                        input_div.style.visibility = "hidden";
                    }
                } else if (this.column_index == 2) {
                    this.table_original_data[this.row_index - 1]["MaterialName"] = selectcontent;
                    this.options = [];
                    select.value = "";
                    input_div.style.left = Number(select_div.style.left.replace("px", "")) + 400 + "px";
                    input_div.style.top = select_div.style.top;
                    select_div.style.visibility = "hidden";
                    input_div.style.visibility = "visible";
                    input.focus();
                    this.column_index = 3;
                }
            }
            // console.log(this.table_original_data);
            this.timeStamp = new Date().getTime();

        },

        whenInput(query) {
            if (query) {
                this.isvisible = true;
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.options = this.detailList.filter((item) => {
                        return item.includes(query);
                    });
                }, 0);
            } else {
                this.options = []
            }
        },
        pull() {
            // 侧边抽屉的拉出方法，绑定在侧边蓝色按钮的@click上
            // 在打开抽屉前，先计算录入信息，包括录入多少条，录入总金额

            // 置零 
            this.entry = 0
            this.totalmoney = 0
            for (var i = 0; i < this.table_original_data.length; i++) {
                if (this.table_original_data[i]["MaterialName"] != null && this.table_original_data[i]["MaterialCount"] != null) {
                    this.entry++;
                    this.totalmoney = (Number(this.totalmoney) + Number(this.table_original_data[i]["MaterialTotal"])).toFixed(2);
                }
                this.drawer = true;
            }
        },
        handleOpen() {
            var btn = document.getElementById("btn");
            btn.style.transform = "TranslateX(-465px)";
        },
        handleClose() {
            var btn = document.getElementById("btn");
            btn.style.transform = "TranslateX(0px)";
        },
        formatTooltip(val) {
            return val / 10;
        },
        to_OriginBook() {
            if (this.isSave) {
                this.$router.push({
                    path: '/originbook',
                })
            } else {
                this.$message({
                    message: '请先保存',
                    type: 'warning'
                })
            }
        },
        check() {
            for (var i = 0; i < this.table_original_data.length; i++) {
                var name = this.table_original_data[i]["MaterialName"];
                var count = this.table_original_data[i]["MaterialCount"];
                if ((name == null && count == null)) {
                    console.log("pass");
                } else if ((name != null && count == null) || (name == null && count != null)) {
                    this.isRight = false;
                    this.$message({
                        showClose: true,
                        message: "请填写完整第" + (i + 1) + "行",
                        type: "error"
                    });
                    this.drawer = false;
                    return;
                }
            }
            this.$message({
                showClose: true,
                message: "校验通过",
                type: "success"
            });
            this.isRight = true;
            this.drawer = false;
        },
        save() {
            this.isSave = false;
            this.check();
            if (this.isRight) {
                var post_data = {
                    "opt": "save",
                    "date": this.bookname,
                    "sheetid": this.sheetid,
                    "sheetname": this.sheetname,
                    "sheettype": this.sheettype,
                    "createtime": this.createtime,
                    "updatetime": new Date().getTime(),
                    "content": JSON.stringify(this.table_original_data)
                };
                saveSheet(post_data).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            showClose: true,
                            message: "保存成功",
                            type: "success"
                        });
                        this.drawer = false;
                        this.isSave = true;
                    } else {
                        this.$message({
                            showClose: true,
                            message: "保存失败",
                            type: "error"
                        });
                    }
                });

            } else {
                this.$message({
                    showClose: true,
                    message: "请填写完整",
                    type: "error"
                });
            }
        },

        savecls() {
            getDetail(0).then(res => {
                var detailMap = new Map();
                for (var i = 0; i < res.data.data.length; i++) {
                    detailMap.set(res.data.data[i]["GoodsName"], {
                        "GoodsPrice": res.data.data[i]["GoodsPrice"],
                        "GoodsUnit": res.data.data[i]["GoodsUnit"],
                        "GoodsType": res.data.data[i]["GoodsType"],
                        "GoodsModel": res.data.data[i]["GoodsModel"],
                    });
                }
                var cls_data = [];
                for (var j = 0; j < this.table_original_data.length; j++) {
                    var name = this.table_original_data[j]["MaterialName"];
                    var count = this.table_original_data[j]["MaterialCount"];
                    var price = this.table_original_data[j]["MaterialPrice"];
                    var total = this.table_original_data[j]["MaterialTotal"];
                    if (name != null && count != null) {
                        var cls_item = {
                            "MaterialName": name,
                            "MaterialCount": count,
                            "MaterialPrice": price,
                            "MaterialTotal": total,
                            "MaterialUnit": detailMap.get(name)["GoodsUnit"],
                            "MaterialType": detailMap.get(name)["GoodsType"],
                            "MaterialModel": detailMap.get(name)["GoodsModel"],
                        };
                        var type = detailMap.get(name)["GoodsType"];
                        if (type == "管材类") {
                            cls_item.MaterialType = "1";
                        } else if (type == "管件类") {
                            cls_item.MaterialType = "2";
                        } else if (type == "水表类") {
                            cls_item.MaterialType = "3";
                        } else if (type == "阀门类") {
                            cls_item.MaterialType = "4";
                        } else if (type == "修备类") {
                            cls_item.MaterialType = "5";
                        } else if (type == "其他类") {
                            cls_item.MaterialType = "6";
                        }
                        cls_data.push(cls_item);
                    }
                }
                this.cls_data = cls_data;
                this.cls_data.sort(function(a, b) {
                    return a.MaterialType - b.MaterialType;
                });
                var post_cls_data = {
                    "opt": "save",
                    "sheetid": this.sheetid,
                    "clscontent": JSON.stringify(this.cls_data),
                };
                saveClsSheet(post_cls_data).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            showClose: true,
                            message: "分类成功",
                            type: "success"
                        });
                        this.drawer = false;
                        this.isSave = true;
                    } else {
                        this.$message({
                            showClose: true,
                            message: "分类失败",
                            type: "error"
                        });
                    }
                })
            }).catch(err => {
                console.log(err);
            })
        },

        saveall() {
            this.save();
            this.savecls();
        }
    },
})