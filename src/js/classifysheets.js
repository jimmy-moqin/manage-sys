import { defineComponent } from 'vue'
import AsideMenu from "@/components/AsideMenu";
import { getBooks, getSheets_all } from "@/api/service";
export default defineComponent({
    components: { AsideMenu },
    data() {
        return {
            allSheetsData: [],
            currentRow: 0,
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
                });
            });

        },

        handleCurrentChange(val) {
            this.currentRow = val;
        },

        classify() {
            if (this.currentRow == 0) {
                this.$message.warning('请选择一个料单');
                return;
            } else {
                console.log(this.currentRow);
                var sheetid = this.currentRow.SheetID;
                this.$router.push({
                    path: '/showclassify/' + sheetid,
                    name: 'ShowClassify',
                    params: {
                        sheetid: sheetid,
                        sheetname: this.currentRow.SheetName,
                        date: this.currentRow.BookName,
                    }
                });
            }
        }
    },
})