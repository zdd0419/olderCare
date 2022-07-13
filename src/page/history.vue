<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">

                <el-table-column
                    label="监测种类"
                    prop="event_type">
                </el-table-column>
                <el-table-column
                    label="监测时间"
                    prop="event_date">
                </el-table-column>
                <el-table-column
                    label="监测地点"
                    prop="event_location">
                </el-table-column>
                <el-table-column
                    label="监测描述"
                    prop="event_desc">
                </el-table-column>

            </el-table>
            <div class="Pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="20"
                    layout="total, prev, pager, next"
                    :total="count">
                </el-pagination>
            </div>

        </div>

    </div>




</template>

<script>
import headTop from '../components/headTop'
import {baseUrl, baseImgPath} from '@/config/env'

import {
    getResturantsCount,
    updateResturant,
    searchplace,
    deleteResturant,
    adminList,
    cityGuess
} from '../api/getData'
import {getResturants} from "../api/getData";
import axios from "axios";
// import {getResturants} from "../api/getData";

export default {
    data(){
        return {

            tableData: [],


        }
    },
    created(){
        this.initData();
        console.log(11111);
        this.webSocketInit();
    },
    components: {
        headTop,
    },
    methods: {


        initData(){
            axios.get('http://39.105.102.68:8000/oldcare/event/', {headers: {
                    'Authorization':'Bearer '+window.localStorage.getItem('jwToken')
                }
            }).then(response=> {
                console.log(window.localStorage.getItem('jwToken'))
                this.tableData=[];
                var i=0;
                const data=response.data
                data.forEach(item=>{
                    const tableData = {};
                    i++;
                    tableData.id=item.id;
                    console.log(tableData.id)
                    tableData.event_location = item.event_location;
                    tableData.event_type = item.event_type;
                    tableData.event_date = item.event_date.substring(0,10)+" "+item.event_date.substring(12,19)
                    tableData.event_desc = item.event_desc;

                    this.tableData.push(tableData);

                })
                const countData=i;
                this.count=countData;
                var _this=this
                if(_this.tableData.gender=="男"){
                    _this.radio='1';
                }else{
                    _this.radio='2'
                }
                console.log(response);
                console.log(response.data)
                console.log(response.data[0])

            }).catch(function (error) {
                console.log('获取数据失败', err);
            })

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            this.getResturants()
        },

        //处理上传的照片
        handleServiceAvatarScucess(res, file) {
            if (res.status == 1) {
                this.selectTable.image_path = res.image_path;
            }else{
                this.$message.error('上传图片失败！');
            }
        },
        //照片选择
        beforeAvatarUpload(file) {
            const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isRightType) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isRightType && isLt2M;
        },


    },
}
</script>

<style lang="less">
@import '../style/mixin';
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.table_container{
    padding-left: 20px;
    padding-top: 10px;
}
.Pagination{
    display: flex;
    justify-content: flex-start;
    margin-top: 8px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.avatar {
    width: 120px;
    height: 120px;
    display: block;
}
.button{
    position: relative;
    padding-left: 20px;
    padding-top: 10px;

}
</style>
