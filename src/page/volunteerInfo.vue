<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-button type="primary" margin-left="30px" width="30%"  @click="dialogFormVisible3 = true">添加义工</el-button>
        <div class="table_container">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="姓名">
                                <span>{{ props.row.username }}</span>
                            </el-form-item>
                            <el-form-item label="性别">
                                <span>{{ props.row.gender }}</span>
                            </el-form-item>
                            <el-form-item label="出生日期">
                                <span>{{ props.row.birthday }}</span>
                            </el-form-item>
                            <el-form-item label="身份证">
                                <span>{{ props.row.id_card }}</span>
                            </el-form-item>
                            <el-form-item label="手机号">
                                <span>{{ props.row.phone }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column
                    label="姓名"
                    prop="username">
                </el-table-column>
                <el-table-column
                    label="身份证"
                    prop="id_card">
                </el-table-column>
                <el-table-column
                    label="手机号"
                    prop="phone">
                </el-table-column>
                <el-table-column label="操作" width="350">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="Success"
                            @click="addFace(scope.$index, scope.row)">采集人脸信息</el-button>

                        <el-button
                            size="mini"
                            type="Success"
                            @click="detailInfo(scope.$index, scope.row)">查看详情信息</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
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
            <!--            修改信息-->
            <el-dialog title="修改信息" v-model="dialogFormVisible" :model="selectTable">
                <el-form >
                    <el-form-item label="姓名" label-width="100px">
                        <el-input v-model="selectTable.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" label-width="100px">
                        <el-radio v-model="radio" label="1">男</el-radio>
                        <el-radio v-model="radio" label="2">女</el-radio>
                    </el-form-item>
                    <el-form-item label="联系电话" label-width="100px">
                        <el-input v-model="selectTable.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号" label-width="100px">
                        <el-input v-model="selectTable.id_card"></el-input>
                    </el-form-item>

                    <el-form-item label="删除标志：（必填）">
                        <el-input v-model="selectTable.REMOVE" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updatePersonData">确 定</el-button>
                </div>
            </el-dialog>
            <!--查看详情信息-->
            <el-dialog title="详情信息" v-model="dialogFormVisible2" :model="selectTable2" >
                <el-form >
                    <el-form-item label="姓名:">
                        <span>{{ selectTable2.username }}</span>
                    </el-form-item>
                    <el-form-item label="性别：">
                        <span>{{ selectTable2.gender }}</span>
                    </el-form-item>
                    <el-form-item label="出生日期：">
                        <span>{{ selectTable2.birthday }}</span>
                    </el-form-item>
                    <el-form-item label="身份证：">
                        <span>{{ selectTable2.id_card }}</span>
                    </el-form-item>
                    <el-form-item label="手机号：">
                        <span>{{ selectTable2.phone }}</span>
                    </el-form-item>
                    <el-form-item label="入养老院日期：">
                        <span>{{ selectTable2.checkin_date }}</span>
                    </el-form-item>
                    <el-form-item label="出养老院日期：">
                        <span>{{ selectTable2.checkout_date }}</span>
                    </el-form-item>
                    <el-form-item label="描述：">
                        <span>{{  selectTable2.DESCRIPTION}}</span>
                    </el-form-item>
                    <el-form-item label="是否有效：">
                        <span>{{ selectTable2.ISACTIVE }}</span>
                    </el-form-item>
                    <el-form-item label="创建时间：">
                        <span>{{ selectTable2.CREATED }}</span>
                    </el-form-item>
                    <el-form-item label="创建人：">
                        <span>{{ selectTable2.CREATEBY }}</span>
                    </el-form-item>
                    <el-form-item label="更新时间：">
                        <span>{{ selectTable2.UPDATED }}</span>
                    </el-form-item>
                    <el-form-item label="更新人：">
                        <span>{{ selectTable2.UPDATEBY }}</span>
                    </el-form-item>
                    <el-form-item label="删除标志：">
                        <span>{{ selectTable2.REMOVE }}</span>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" size="medium" @click="dialogFormVisible2 = false">返回</el-button>
                </div>
            </el-dialog>
            <!--            添加义工信息-->
            <el-dialog title="添加义工信息" v-model="dialogFormVisible3" :model="selectTable3" >
                <el-form >
                    <el-form-item label="姓名:(必填)">
                        <el-input v-model="selectTable3.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证：（必填）">
                        <el-input v-model="selectTable3.id_card" auto-complete="off"></el-input>

                    </el-form-item>
                    <el-form-item label="删除标志：（必填）">
                        <el-input v-model="selectTable3.REMOVE" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：（必填）">
                        <el-input v-model="selectTable3.phone" auto-complete="off"></el-input>

                    </el-form-item>
                    <el-form-item label="性别：">
                        <el-input v-model="selectTable3.gender" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="出生日期：（格式：例：2001-03-26）">
                        <el-input v-model="selectTable3.birthday" auto-complete="off"></el-input>

                    </el-form-item>

                    <el-form-item label="入养老院日期：">
                        <!--                        <el-input v-model="selectTable3.checkin_date" auto-complete="off"></el-input>-->
                        <el-date-picker
                            v-model="selectTable3.checkin_date"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions0">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="出养老院日期：">
                        <!--                        <el-input v-model="selectTable3.checkout_date" auto-complete="off"></el-input>-->
                        <el-date-picker
                            v-model="selectTable3.checkout_date"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions1">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="描述：">
                        <el-input v-model="selectTable3.DESCRIPTION" auto-complete="off"></el-input>

                    </el-form-item>
                    <el-form-item label="是否有效：">
                        <el-input v-model="selectTable3.ISACTIVE" auto-complete="off"></el-input>

                    </el-form-item>
                    <el-form-item label="创建时间：">
                        <el-input v-model="selectTable3.CREATED " auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人：">
                        <el-input v-model="selectTable3.CREATEBY" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="更新时间：">
                        <el-input v-model="selectTable3.UPDATED" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="更新人：">
                        <el-input v-model="selectTable3.UPDATEBY " auto-complete="off"></el-input>
                    </el-form-item>


                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" size="medium"  @click="addOlder">确定</el-button>
                    <el-button size="medium" @click="dialogFormVisible3 = false" >返回</el-button>
                </div>
            </el-dialog>
<!--            采集人脸信息-->
            <el-dialog title="采集人脸信息" v-model="dialogFormVisible4" :model="selectTable4" >

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" size="medium"  @click="addOlder">确定</el-button>
                    <el-button size="medium" @click="dialogFormVisible4 = false" >返回</el-button>
                </div>
                <div class="camera_outer">
                    <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
                    <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight"></canvas>
                    <div class="left">
                        <div v-if="imgSrc" class="img_bg_camera">
                            <p>效果预览</p>
                            <img :src="imgSrc" alt class="tx_img" />
                        </div>
                        <div class="button">
                            <el-button @click="getCompetence()">打开摄像头</el-button>
                            <el-button @click="stopNavigator()">关闭摄像头</el-button>
                            <el-button @click="setImage()">拍照</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>

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
            baseUrl,
            baseImgPath,
            city:{},
            offset: 0,
            limit: 20,
            count: 0,
            tableData: [],
            videoWidth: 550,
            videoHeight: 550,
            imgSrc: "",
            thisCancas: null,
            thisContext: null,
            thisVideo: null,
            openVideo:false,
            img:[],
            webSocketObject: null,
            dataJason:[],
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
                }
            },
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
                }
            },

            tableData2: [],
            currentPage: 1,
            selectTable: {},
            selectTable2: {},
            selectTable3:{},
            selectTable4:{},
            dialogFormVisible: false,
            dialogFormVisible2: false,
            dialogFormVisible3:false,
            dialogFormVisible4:false,
            categoryOptions: [],
            selectedCategory: [],
            address: {},
            radio: '1',
            // flvPlayer:null
        }
    },
    created(){
        this.initData();
        console.log(11111);
        this.webSocketInit();

    },
    mounted() {
        this.getCompetence();
        // this.setImage();
    },

    components: {
        headTop,
    },
    methods: {
        //连接websocket
        webSocketInit(){
            const webSocketUrl = 'ws://39.105.102.68:8000/ws/chat/'
            this.webSocketObject = new WebSocket(webSocketUrl);
            this.webSocketObject.onopen = this.webSocketOnOpen
            this.webSocketObject.onmessage = this.webSocketOnMessage
            this.webSocketObject.onerror = this.webSocketOnError
            this.webSocketObject.onclose = this.webSocketOnClose
        },
        webSocketOnOpen(e){
            console.log('与服务端连接打开->',e);
        },
        webSocketOnMessage(e){
            var _this = this;
            _this.dataJson = JSON.parse(e.data).data
            console.log('来自服务端的消息->',_this.dataJson)
            console.log('来自服务端的消息->',e)
        },
        webSocketOnError(e){
            console.log('与服务端连接异常->',e)
        },
        webSocketOnClose(e){
            console.log('与服务端连接关闭->',e)
        },
        websocketsend(Data){//数据发送
            this.webSocketObject.send(Data);
        },
        // 调用权限（打开摄像头功能）
        getCompetence() {
            var _this = this;
            _this.thisCancas = document.getElementById("canvasCamera");
            _this.thisContext = this.thisCancas.getContext("2d");
            _this.thisVideo = document.getElementById("videoCamera");
            _this.thisVideo.style.display = 'block';
            // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
            if (navigator.mediaDevices === undefined) {
                navigator.mediaDevices = {};
            }
            // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
            // 使用getUserMedia，因为它会覆盖现有的属性。
            // 这里，如果缺少getUserMedia属性，就添加它。
            if (navigator.mediaDevices.getUserMedia === undefined) {
                navigator.mediaDevices.getUserMedia = function(constraints) {
                    // 首先获取现存的getUserMedia(如果存在)
                    var getUserMedia =
                        navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia ||
                        navigator.getUserMedia;
                    // 有些浏览器不支持，会返回错误信息
                    // 保持接口一致
                    if (!getUserMedia) {//不存在则报错
                        return Promise.reject(
                            new Error("getUserMedia is not implemented in this browser")
                        );
                    }
                    // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
                    return new Promise(function(resolve, reject) {
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                };
            }
            var constraints = {
                audio: false,
                video: {
                    width: this.videoWidth,
                    height: this.videoHeight,
                    transform: "scaleX(-1)"
                }
            };
            navigator.mediaDevices
                .getUserMedia(constraints)
                .then(function(stream) {
                    // 旧的浏览器可能没有srcObject
                    if ("srcObject" in _this.thisVideo) {
                        _this.thisVideo.srcObject = stream;
                    } else {
                        // 避免在新的浏览器中使用它，因为它正在被弃用。
                        _this.thisVideo.src = window.URL.createObjectURL(stream);
                    }
                    _this.thisVideo.onloadedmetadata = function(e) {
                        _this.thisVideo.play();
                    };
                })
                .catch(err => {
                    console.log(err);
                });
            setInterval("this.setImage()" +
                "1000")
        },
        // time(){
        //     setInterval("this.time()",1000)
        //     this.setImage()
        //     console.log(4444444444444444444444444444)
        // },

        //  绘制图片（拍照功能）
        setImage() {
            var _this = this;
            // canvas画图
            _this.thisContext.drawImage(
                _this.thisVideo,
                0,
                0,
                _this.videoWidth,
                _this.videoHeight
            );
            // 获取图片base64链接
            var image = this.thisCancas.toDataURL("image/png");
            _this.imgSrc = image;//赋值并预览图片
            console.log(_this.imgSrc)
            this.websocketsend(JSON.stringify({'message':_this.imgSrc}));
            //这里可以把转换的URL存到数组里面
            _this.img.push(_this.imgSrc);
            _this.img.reverse();//将数组倒序

        },
        // 关闭摄像头
        stopNavigator() {
            this.thisVideo.srcObject.getTracks()[0].stop();
        },
        // base64转文件，此处没用到
        dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(",");
            var mime = arr[0].match(/:(.*?);/)[1];
            var bstr = atob(arr[1]);
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, { type: mime });
        },

        initData(){
            axios.get('http://39.105.102.68:8000/oldcare/volunteer/', {headers: {
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
                    console.log(item.name)
                    tableData.username = item.name;
                    tableData.gender = item.gender;
                    tableData.birthday = item.birthday;
                    tableData.id_card = item.id_card;
                    tableData.phone = item.phone;
                    tableData.checkin_date=item.checkin_date;
                    tableData.checkout_date=item.checkout_date;
                    tableData.imgset_dir=item.imgset_dir;
                    tableData.profile_photo=item.profile_photo;
                    tableData.room_number=item.room_number;
                    tableData.DESCRIPTION=item.description;
                    tableData.ISACTIVE=item.isactive;
                    tableData.CREATED=item.created;
                    tableData.CREATEBY=item.createby;
                    tableData.UPDATED=item.updated;
                    tableData.UPDATEBY=item.updateby;
                    tableData.REMOVE=item.remove;
                    this.tableData.push(tableData);

                })
                const countData=i;
                this.count=countData;
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
        detailInfo(index, row){
            this.selectTable2 = row;
            this.dialogFormVisible2 = true;
        },
        addFace(index,row){
            this.selectTable4=row;
           this.dialogFormVisible4=true;
        },

        //添加义工信息
        addOlder(){
            // this.dialogFormVisible3=true;
            this.dialogFormVisible3 = false;
            console.log(this.selectTable3.username)
            axios.post(`http://39.105.102.68:8000/oldcare/volunteer/`,{
                    // id:this.selectTable.id,
                    name:this.selectTable3.username,
                    id_card:this.selectTable3.id_card,
                    gender: this.selectTable3.gender,
                    birthday :this.selectTable3.birthday,
                    phone:this.selectTable3.phone,
                    checkin_date:this.selectTable3.checkin_date,
                    checkout_date:this.selectTable3.checkout_date,
                    description:this.selectTable3.DESCRIPTION,
                    isactive:this.selectTable3.ISACTIVE,
                    createby:this.selectTable3.CREATEBY,
                    updateby:this.selectTable3.UPDATEBY,
                    remove:this.selectTable3.REMOVE

                }
                , {headers: {
                        'Authorization':'Bearer '+window.localStorage.getItem('jwToken')
                    }
                }).then(response=> {
                console.log("Suceess")
            }).catch(function (error) {
                console.log('更新', err);
            })
        },
        //修改数据
        handleEdit(index, row) {
            this.selectTable = row;
            this.dialogFormVisible = true;
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
        //更新信息
        async updatePersonData(){
            this.dialogFormVisible = false;
            console.log(this.selectTable.id)
            axios.put(`http://39.105.102.68:8000/oldcare/volunteer/${this.selectTable.id}/`,{
                    // id:this.selectTable.id,
                    name:this.selectTable.username,
                    id_card:this.selectTable.id_card,
                    phone:this.selectTable.phone,
                    remove:this.selectTable.REMOVE
                }
                , {headers: {
                        'Authorization':'Bearer '+window.localStorage.getItem('jwToken')
                    }
                }).then(response=> {
                console.log("Suceess")
                console.log(response.data[0])
                this.selectTable=response.data


            }).catch(function (error) {
                console.log('更新', err);
            })
        },

        async handleDelete(index, row) {
            console.log(row.id)
            axios.delete(`http://39.105.102.68:8000/oldcare/volunteer/${row.id}/`, {headers: {
                    'Authorization':'Bearer '+window.localStorage.getItem('jwToken')
                }
            }).then(response=> {
                console.log("Suceess")
                console.log(response.data[0])
                this.selectTable=response.data


            }).catch(function (error) {
                console.log('更新', err);
            })

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
    padding: 20px;
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
.el-table .info-row {
    background: #c9e5f5;
}

.el-table .positive-row {
    background: #e2f0e4;
}

.right {
    height: 100%;
    width: 40%;
    float: left;
}
.left {
    width: 60%;
    height: 100%;
    float: left;
    //background-color: blue;
}
</style>
