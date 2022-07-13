<template>
    <div id="app" :gutter="20" class="con">
        <head-top></head-top>
        <div class="toge">
            <div id="myChart" class="char1" style="width: 600px;height:400px;" ></div>
            <div id="myChart2" class="char2" style="width: 600px;height:400px;" ></div>
            <div id="myChart3" class="char3" style="width: 600px;height:400px;" ></div>
        </div>

    </div>
</template>
<script>
import headTop from "../components/headTop";
import axios from "axios";

export default {
    // name: "app",
    data(){
        return{
            old_y:[]
        }


    },

    methods: {
        drawChart1() {
            axios.get('http://39.105.102.68:8000/oldcare/volunteer/', {headers: {
                    'Authorization':'Bearer '+window.localStorage.getItem('jwToken')
                }
            }).then(response=> {
                console.log(window.localStorage.getItem('jwToken'))
                this.old_y=response.data
            }).catch(function (error) {
                console.log('获取数据失败', err);
            })


            // 基于准备好的dom，初始化echarts实例【这里存在一个问题，请看到最后】
            let myChart = this.$echarts.init(document.getElementById("myChart"));
            // 指定图表的配置项和数据
            let option = {
                title: {
                    text: "老人年龄分布图",
                    padding:[20,0,0,220]
                },
                tooltip: {},
                legend: {
                    data: ["岁"]
                },
                xAxis: {
                    data: ["60以下", "60-70", "70-80", "80以上"]
                },
                yAxis: {},
                series: [
                    {
                        name: "人数",
                        type: "bar",
                        data:this.old_y,
                        barWidth: '25%'
                            // [5, 20, 36, 10]
                    },

                ]
            };

            // this.series.data=getolddata();

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        //获取数据
        getolddata(){
            axios.get('http://39.105.102.68:8000/oldcare/oldperson/statistics/', {headers: {
                    'Authorization':'Bearer '+window.localStorage.getItem('jwToken')
                }
            }).then(response=> {
                console.log(window.localStorage.getItem('jwToken'))
                this.old_y=response.data
                this.drawChart1()

            }).catch(function (error) {
                console.log('获取数据失败', err);
            })
        },

        drawChart2() {
            axios.get('http://39.105.102.68:8000/oldcare/volunteer/', {headers: {
                    'Authorization':'Bearer '+window.localStorage.getItem('jwToken')
                }
            }).then(response=> {
                console.log(window.localStorage.getItem('jwToken'))
                this.volunteery=response.data
            }).catch(function (error) {
                console.log('获取数据失败', err);
            })


            // 基于准备好的dom，初始化echarts实例【这里存在一个问题，请看到最后】
            let myChart = this.$echarts.init(document.getElementById("myChart2"));
            // 指定图表的配置项和数据
            let option = {
                title: {
                    text: "义工年龄分布图",
                    padding:[20,0,0,220]
                },
                tooltip: {data:"人数"},
                legend: {
                    data: ["岁"]
                },
                xAxis: {
                    data: ["18-25", "25-35", "35-45", "45以上"]
                },
                yAxis: {},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data:this.volunteery,
                        barWidth: '25%'
                        // [5, 20, 36, 10]
                    }
                ]
            };

            // this.series.data=getolddata();

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        //获取数据
        getolddata2(){
            axios.get('http://39.105.102.68:8000/oldcare/volunteer/statistics/', {headers: {
                    'Authorization':'Bearer '+window.localStorage.getItem('jwToken')
                }
            }).then(response=> {
                console.log(window.localStorage.getItem('jwToken'))
                this.volunteery=response.data
                this.drawChart2()
                console.log(3333333333333333333333333333333333333333)
                console.log(this.volunteery)
            }).catch(function (error) {
                console.log('获取数据失败', err);
            })
        },

        drawChart3() {


            console.log(44444444444444444444444444)
            console.log(this.worker_y)
            // 基于准备好的dom，初始化echarts实例【这里存在一个问题，请看到最后】
            let myChart = this.$echarts.init(document.getElementById("myChart3"));
            // 指定图表的配置项和数据
            let option = {
                title: {
                    text: "工作人员年龄分布图",
                    padding:[20,0,0,220]
                },
                tooltip: {},
                legend: {
                    data: ["岁"]
                },
                xAxis: {
                    data: ["18-25", "25-35", "35-45", "45以上"]
                },
                yAxis: {},
                series: [
                    {
                        name: "人数",
                        type: "bar",
                        data:this.worker_y,
                        barWidth: '25%'
                        // [5, 20, 36, 10]
                    }
                ]
            };

            // this.series.data=getolddata();

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        //获取数据
        getolddata3(){
            // var _this=this
            axios.get('http://39.105.102.68:8000/oldcare/employee/statistics/', {headers: {
                    'Authorization':'Bearer '+window.localStorage.getItem('jwToken')
                }
            }).then(response=> {
                console.log(window.localStorage.getItem('jwToken'))
                this.worker_y=response.data
                this.drawChart3()
                console.log(3333333333333333333333333333333333333333)
                console.log(this.worker_y)
            }).catch(function (error) {
                console.log('获取数据失败', err);
            })
        }



    },
    mounted() {
        this.getolddata()
        this.getolddata2()
        this.getolddata3()


    },
    components: {
        headTop,
    },


};
</script>

<style>
.con{
    position: relative;
}
.char1{
    position: center;
    margin-left: 330px;
    margin-top: 20px;
}

.char2{
    position: center;
    margin-left: 330px;
}
.char3{
    position: center;
    margin-left: 330px;
}


</style>
