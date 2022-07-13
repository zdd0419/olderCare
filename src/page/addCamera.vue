<template>
    <div>
<!--        <el-breadcrumb separator-class="el-icon-arrow-right">-->
<!--&lt;!&ndash;            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>&ndash;&gt;-->
<!--            <el-breadcrumb-item>监控画面</el-breadcrumb-item>-->
<!--        </el-breadcrumb>-->
        <head-top></head-top>
        <table>
            <tr>
                <td>
                    <video
                        ref="videoElement"
                        id="videoElement"
                        controls
                        autoplay
                        muted
                        width="600"
                        height="550"
                    ></video>
                    <div>
                        <el-button type="primary" size="medium" @click="show">开始</el-button>
                        <el-button type="success" size="medium" @click="close">结束</el-button>
                    </div>
                </td>
                <td>
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>事件列表</span>
                        </div>
                        <div class="box" >
                            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                                <div :key="index" v-for="(item, index) in alist"  >{{ item }}</div>
                            </ul>

                        </div>
                    </el-card>

                    <!-- <div :key="index" v-for="(item, index) in list">{{ item }}</div> -->
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
// import { findAllEvents } from "../../api/supermanage";
import flvjs from "flv.js";
import axios from "axios";
import headTop from "../components/headTop";

export default {
    data() {
        return {
            websock: null,
            iframeWin: {},
            alist: [],
            count: 0,
            speed:30
        };
    },
    created() {
        this.init();
        setInterval(() => {
            if (!this.player.buffered.length) {
                return;
            }
            let end = this.player.buffered.end(0);
            let diff = end - this.player.currentTime;
            if (diff >= 1.5) {
                this.player.currentTime = end;
            }
        }, 3000);
    },

    mounted() {
        this.show()
        this.scrollToBottom();
    },
    destroyed() {
        this.websock.close(); //离开路由之后断开websocket连接
    },
    update() {
        this.scrollToBottom();
    },
    components: {
        headTop,
    },
    methods: {
        load () {
            this.count += 2
        },
        init() {
            let url = "ws://39.105.102.68:8000/ws/room_name/"; // 创建websocket连接
            this.websock = new WebSocket(url); // 监听打开
            this.websock.onopen = this.websockOpen; // 监听关闭
            this.websock.onclose = this.websockClose; //监听异常
            this.websock.onerror = this.websockError; //监听服务器发送的消息
            this.websock.onmessage = this.websockMessage;
        },
        websockOpen() {
            console.log("监听打开");
        },
        websockClose() {
            console.log("监听关闭");
        },
        websockError() {
            console.log("监听异常");
        },
        websockMessage(e) {
            console.log("监听服务器发送的消息", e.data);
            let message=JSON.parse(e.data)
            let redata = JSON.parse(e.data).event_info
            let test=JSON.parse(JSON.stringify(redata))
            console.log('test')
            console.log(test.event_date)
            console.log(test.event_date)
            console.log(message)
            let str = redata.event_desc + "----" + redata.event_date.substring(0,10)+" "+redata.event_date.substring(12,19);
            this.alist.push(str);
            console.log(this.alist)

        },
        //play for flv
        show() {
            let video = this.$refs.videoElement; //定义播放路径
            if (flvjs.isSupported()) {
                this.player = flvjs.createPlayer({
                    type: "flv",
                    isLive: true,
                    hasAudio: false,
                    cors: true,
                    url: "http://zrp.cool:7001/live/movie_01.flv",
                });

            } else {
                // "不支持的格式";
                return;
            }
            {
                enableStashBuffer: false
            }

            // console.log(video)
            this.player.attachMediaElement(video);
            this.player.load();
            this.player.play();
        },

        close() {
            //销毁对象
            if (this.player) {
                this.player.pause();
                this.player.destroy();
                this.player = null;
            }
            this.websock.onclose = this.websockClose;
        },


//自动滚动上滑
        scrollToBottom() {
            this.$nextTick(() => {
                let box = this.$el.querySelector(".box");
                // box.scrollTop = box.scrollHeight;
                setInterval(() => {
                    // 元素自增距离顶部1像素
                    box.scrollTop += 1;
                    // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
                    if (box.clientHeight + box.scrollTop == box.scrollHeight) {
                        // 重置table距离顶部距离
                        box.scrollTop = 0;
                    }
                }, 30);  // 滚动速度

            });

        },

    },
};
</script>
<style>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both;
}

.box-card {
    margin-left: 10px;
    margin-top: 12px;
    width: 580px;
    height: 600px;
}

.box {
    overflow-y: auto;
    width: 480px;
    height: 600px;
}
.box-card2 {
    margin-left: 10px;
    margin-top: 10px;
    height: 700px;
    width: 600px;
}
.iframe {
    width: 85vh;
    height: 85vh;
}
</style>


