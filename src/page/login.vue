<template>
    <div class="login_page fillcontain">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin">
                <div class="manage_tip">
                    <p>养老系统</p>
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
                <p class="tip">未登录过的新用户，自动注册</p>
                <p class="tip">注册过的用户可凭账号密码登录</p>
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
                            _this.$router.push('manage')
                        // }


                    }).catch(function (error) {
                        console.log(error);

                    });



                //     if (res.status == 200) {
                //         // this.$store.commit("changeLogin", res.headers["x-auth-token"]);
                //         var json=res.json();
                //         json.then((result)=>{
                //             console.log("result",result)
                //         })
                //         this.$message({
                //             type: 'success',
                //             message: '登录成功'
                //         });
                //         this.$router.push('manage')
                //     }else{
                //         this.$message({
                //             type: 'error',
                //             message: res.message
                //         });
                //     }
                // } else {
                //     this.$notify.error({
                //         title: '错误',
                //         message: '请输入正确的用户名密码',
                //         offset: 100
                //     });
                //     return false;
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
.login_page{
    background-color: #324057;
}
.manage_tip{
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p{
        font-size: 34px;
        color: #fff;
    }
}
.form_contianer{
    .wh(320px, 210px);
    .ctp(320px, 210px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn{
        width: 100%;
        font-size: 16px;
    }
}
.tip{
    font-size: 12px;
    color: red;
}
.form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
}
.form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
}
</style>
