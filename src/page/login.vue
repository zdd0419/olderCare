<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin">
                <div class="manage_tip">
                    <p class="headline">欢迎使用智慧养老系统！</p>
                </div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm">
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
                    </el-form-item>
                </el-form>
                <p class="tip">温馨提示：</p>
                <!-- <br> -->
                <p class="tip">&nbsp;&nbsp;&nbsp;&nbsp;1.未登录过的新用户，自动注册</p>
                <p class="tip">&nbsp;&nbsp;&nbsp;&nbsp;2.注册过的用户可凭账号密码登录</p>
            </section>
        </transition>
    </div>
</template>

<script>
import {login, getAdminInfo} from '@/api/getData'
import {mapActions, mapState} from 'vuex'
import {log} from "nightwatch/lib/util/logger";
import axios from "axios";

export default {
    data(){
        return {
            loginForm: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            },
            showLogin: false,
        }
    },
    mounted(){
        this.showLogin = true;
        if (!this.adminInfo.id) {
            this.getAdminData()
        }
    },
    computed: {
        ...mapState(['adminInfo']),
    },
    methods: {
        ...mapActions(['getAdminData']),
        async submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    let _this=this;
                    axios.post('http://39.105.102.68:8000/oldcare/login/', {
                        email: this.loginForm.username,
                        password: this.loginForm.password
                    },{headers: {
                        'Authorization':'Bearer '+window.localStorage.getItem('jwToken')
                        }
                    }).then(function (response) {
                        console.log(response);
                        console.log(response.data.access)


                        // if(response.data.status==1){
                            localStorage.setItem('jwToken', response.data.access)
                            _this.$router.push('manage')                    // }


                    }).catch(function (error) {
                        console.log(error);

                    });
                }
            });
        },
    },
    watch: {
        adminInfo: function (newValue){
            if (newValue.id) {
                this.$message({
                    type: 'success',
                    message: '检测到您之前登录过，将自动登录'
                });
                this.$router.push('manage')
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../style/mixin';
// .login_page{
//     background-color: #324057;
// }
.login_page {
    width: 100%;
    height: 100%;
    min-width: 1000px;
    background-color: #f4a80f;
    background-image: url("../assets/img/login_bg.jpg");
    background-size: 100% 100%;
    background-position: center center;
    overflow: auto;
    background-repeat: no-repeat;
    position: fixed;
    line-height: 100%;
    padding-top: 150px;
}
.manage_tip{
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p{
        font-size: 35px;
        color: rgba(0, 0, 0, 0.745);
    }
}
.form_contianer{
    .wh(340px, 210px);
    .ctp(320px, 210px);
    top: 340px;
    padding: 35px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn{
        width: 100%;
        font-size: 16px;
    }
}
.tip{
    font-size: 13px;
    color: rgb(203, 29, 29);
    text-align:left;
}
.form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
}
.form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
}
// .headline{
//     font-size: 22px;
//     color: rgba(0, 0, 0, 0.745);
// }
</style>
