<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4"  style="min-height: 100%; background-color: #324057;">
                <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
                    <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-document"></i>数据管理</template>
                        <el-menu-item index="olderInfo">老人信息管理</el-menu-item>
                        <el-menu-item index="workerInfo">工作人员信息管理</el-menu-item>
                        <el-menu-item index="volunteerInfo">义工信息管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-plus"></i>摄像头管理</template>
                        <el-menu-item index="addCamera">陌生人追踪和情绪识别摄像头</el-menu-item>
                        <el-menu-item index="interectDetect">交互检测摄像头</el-menu-item>
                        <el-menu-item index="invade">入侵检测摄像头</el-menu-item>
                        <el-menu-item index="shuaidaoDetect">摔倒检测摄像头</el-menu-item>
                        <el-menu-item index="history">历史检测记录</el-menu-item>
<!--                        <el-menu-item index="addGoods">添加商品</el-menu-item>-->
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-star-on"></i>数据图表</template>
                        <el-menu-item index="charts">数据信息统计图表</el-menu-item>
<!--                        <el-menu-item index="workerEcharts">工作人员信息统计</el-menu-item>-->
<!--                        <el-menu-item index="volunteerEcharts">义工信息统计</el-menu-item>-->
                        <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
                    </el-submenu>

<!--                    <el-submenu index="5">-->
<!--                        <template slot="title"><i class="el-icon-setting"></i>设置</template>-->
<!--                        <el-menu-item index="adminSet">管理员设置</el-menu-item>-->
<!--                        &lt;!&ndash; <el-menu-item index="sendMessage">发送通知</el-menu-item> &ndash;&gt;-->
<!--                    </el-submenu>-->

                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    computed: {
        defaultActive: function(){
            return this.$route.path.replace('/', '');
        }
    },
}
</script>


<style lang="less" scoped>
@import '../style/mixin';
.manage_page{

}
</style>
