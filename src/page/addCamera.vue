<!--<template>-->
<!--    <div>-->
<!--        <head-top></head-top>-->
<!--        <el-row style="margin-top: 20px;">-->
<!--            <div class="left">-->
<!--                <div class="add">-->
<!--                    <el-table>-->
<!--&lt;!&ndash;                        :data="tableData"&ndash;&gt;-->
<!--&lt;!&ndash;                        style="width: 100%">&ndash;&gt;-->
<!--                        <el-table-column-->
<!--                            prop="camera"-->
<!--                            label="摄像头显示"-->
<!--                            >-->
<!--                        </el-table-column>-->

<!--                        <div class="content">-->
<!--                            <video id="my-video" style="width:100%;height:100%;position:relative;" autoplay muted></video>-->
<!--                        </div>-->

<!--                    </el-table>-->

<!--                </div>-->

<!--            </div>-->
<!--            <div class="right">-->
<!--                <div class="message">-->
<!--                    <el-table-->
<!--                        :data="tableData"-->
<!--                        style="width: 100%">-->
<!--                        <el-table-column-->
<!--                            prop="list"-->
<!--                            label="事件列表">-->
<!--                        </el-table-column>-->
<!--                    </el-table>-->
<!--                </div>-->
<!--            </div>-->
<!--        </el-row>-->
<!--    </div>-->
<!--</template>-->

<!--<script>-->
<!--import headTop from '@/components/headTop'-->
<!--import {cityGuess, addShop, searchplace, foodCategory} from '@/api/getData'-->
<!--import {baseUrl, baseImgPath} from '@/config/env'-->
<!--export default {-->
<!--    data() {-->
<!--        return {-->
<!--            city: {},-->
<!--            form: {-->
<!--                desc: ""-->
<!--            },-->
<!--            tableData: [{-->
<!--                list: '2016-05-02',-->
<!--                name: '王小虎',-->
<!--                address: '上海市普陀区金沙江路 1518 弄'-->
<!--            }, {-->
<!--                date: '2016-05-04',-->
<!--                name: '王小虎',-->
<!--                address: '上海市普陀区金沙江路 1517 弄'-->
<!--            }, {-->
<!--                date: '2016-05-01',-->
<!--                name: '王小虎',-->
<!--                address: '上海市普陀区金沙江路 1519 弄'-->
<!--            }, {-->
<!--                date: '2016-05-03',-->
<!--                name: '王小虎',-->
<!--                address: '上海市普陀区金沙江路 1516 弄'-->
<!--            }]-->


<!--        }-->
<!--    },-->


<!--    components: {-->
<!--        headTop,-->
<!--    },-->
<!--    mounted() {-->
<!--        this.startPlay()-->
<!--        this.initData();-->
<!--    },-->
<!--    methods: {-->


<!--        startPlay() {-->
<!--            if (flvjs.isSupported()) {-->
<!--                const videoElement = document.getElementById("my-video");-->
<!--                const flvPlayer = flvjs.createPlayer(-->
<!--                    {-->
<!--                        type: "flv",-->
<!--                        isLive: true,-->
<!--                        hasAudio: false,-->
<!--                        //必须与node搭建的流媒体服务器中的http的端口和推流的参数吻合-->
<!--                        url: "ws://localhost:8000/live/test.flv"-->
<!--                    },-->
<!--                    {-->
<!--                        enableStashBuffer: true,-->
<!--                        stashInitialSize: 128-->
<!--                    }-->
<!--                );-->
<!--                flvPlayer.attachMediaElement(videoElement)-->
<!--                flvPlayer.load()-->
<!--                flvPlayer.play()-->
<!--            } else {-->
<!--                console.log("flvjs不支持")-->
<!--            }-->
<!--        },-->


<!--    },-->



<!--    }-->

<!--</script>-->

<!--<style lang="less">-->
<!--@import '../style/mixin';-->

<!--</style>-->


<template>
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
</template>
<script>
export default {
    name:"Xiu",
    data() {
        return {
            videoWidth: 550,
            videoHeight: 550,
            imgSrc: "",
            thisCancas: null,
            thisContext: null,
            thisVideo: null,
            openVideo:false,
            img:[],
            webSocketObject: null,
            dataJason:[]
        };
    },
    mounted(){
        // this.getCompetence()//进入页面就调用摄像头
        this.webSocketInit()

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
        },
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
        }
    }
};
</script>
<style  scoped>
.button_submit{
    text-align: center;
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




