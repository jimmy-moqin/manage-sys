import { defineComponent } from 'vue'
import AsideMenu from "@/components/AsideMenu";
import { getSheetCon, getSingleSheet, getDetail } from "@/api/service";

export default defineComponent({
    components: { AsideMenu },
    data() {
        return {
            sheetid: this.$route.params.sheetid,
            sheetid_num: this.$route.params.sheetid.replace("D", ""),
            sheetname: this.$route.params.sheetname,
            date: this.$route.params.date,

            sheetcon: [],

            outputtime: '',
            year: "",
            month: "",
            day: "",

            classifyData: [], // 分类完成后的数据
            detailData: [], // 货物类目数据
        }
    },
    created() {
        this.convert();
    },

    methods: {
        convert() {

            getSingleSheet(this.sheetid).then(res => {
                this.outputtime = res['data']['data']['OutputTime'];
                this.year = this.outputtime.split('-')[0];
                this.month = this.outputtime.split('-')[1];
                this.day = this.outputtime.split('-')[2];
            });
            getDetail(0).then(res => {
                var detailData = res['data']['data'];
                var dataMap = new Map();
                for (var i = 0; i < detailData.length; i++) {
                    dataMap.set(detailData[i]["GoodsName"], { "model": detailData[i]["GoodsModel"], "unit": detailData[i]["GoodsUnit"], "type": detailData[i]["GoodsType"] });
                }
                this.detailData = dataMap;

                getSheetCon(this.sheetid).then(res => {
                    this.sheetcon = JSON.parse(res['data']["data"]["SheetConJson"]);

                    for (var j = 0; j < this.sheetcon.length; j++) {
                        if (this.sheetcon[j]["MaterialName"] != null) {
                            var sub = { "name": "", "model": "", "unit": "", "number": "", "unitprice": "", "totalprice": "", "type": "" };
                            sub.name = this.sheetcon[j]['MaterialName'];
                            sub.number = this.sheetcon[j]['MaterialCount'];
                            sub.unitprice = this.sheetcon[j]['MaterialPrice'];
                            sub.totalprice = this.sheetcon[j]['MaterialTotal'];
                            sub.model = this.detailData.get(sub.name).model;
                            sub.unit = this.detailData.get(sub.name).unit;
                            var type = this.detailData.get(sub.name).type;

                            if (type == "管材类") {
                                sub.type = "1";
                            } else if (type == "管件类") {
                                sub.type = "2";
                            } else if (type == "水表类") {
                                sub.type = "3";
                            } else if (type == "阀门类") {
                                sub.type = "4";
                            } else if (type == "修备类") {
                                sub.type = "5";
                            } else if (type == "其他类") {
                                sub.type = "6";
                            }
                            this.classifyData.push(sub);
                        } else {
                            this.classifyData.push({ "name": "", "model": "", "unit": "", "number": "", "unitprice": "-", "totalprice": "-", "type": "7" });
                        }
                    }
                    this.classifyData.sort(function(a, b) {
                        return a.type - b.type;
                    });

                });
            });
        },
        getSummaries() {
            var sumArr = ["", "合计", "", "", "", "", ""];
            var total = 0;

            for (var i = 0; i < this.classifyData.length; i++) {
                if (this.classifyData[i].totalprice != "-") {
                    total += parseFloat(this.classifyData[i].totalprice);
                }
            }
            sumArr.push(total.toFixed(2).toString());
            return sumArr;
        },
    },
})