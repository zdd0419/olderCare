<template>
    <div id="app">
        <head-top></head-top>
        <div id="myChart" style="width: 600px;height:400px;" ></div>
    </div>
</template>
<script>
import headTop from "../components/headTop";
import axios from "axios";

export default {
    // name: "app",
    data(){
        old:[]
    },

    methods: {
        drawChart() {
            axios.get('http://39.105.102.68:8000/oldcare/volunteer/', {headers: {
                    'Authorization':'Bearer '+window.localStorage.getItem('jwToken')
                }
            }).then(response=> {
                console.log(window.localStorage.getItem('jwToken'))
                this.old=response.data
            }).catch(function (error) {
                console.log('获取数据失败', err);
            })


            // 基于准备好的dom，初始化echarts实例【这里存在一个问题，请看到最后】
            let myChart = this.$echarts.init(document.getElementById("myChart"));
            // 指定图表的配置项和数据
            let option = {
                title: {
                    text: "工作人员年龄分布"
                },
                tooltip: {},
                legend: {
                    data: ["岁"]
                },
                xAxis: {
                    data: ["60", "70", "80", "80以上"]
                },
                yAxis: {},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data:this.old,
                        // [5, 20, 36, 10]
                    }
                ]
            };

            // this.series.data=getolddata();

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        //获取数据
        getolddata(){

        }



    },
    mounted() {
        this.drawChart();
    },
    components: {
        headTop,
    },


};
</script>
