/**
 * Created by Administrator on 2016/4/24.
 */
$(document).ready(function() {
   //调用bootstrap自己的方法
    $("#user-give-area").on('ifChecked', function(){
        $("#give-area-component").css("display","block");
            $("#user-defined").css("display","none");
    });
    $("#user-define").on('ifChecked', function(){
        $("#user-defined").css("display","block");
        $("#give-area-component").css("display","none");
    });
    //改变radio样式
    $('.iCheck').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue'
    });
    //显示集中式四张图
    $("#centralism-inverter").on('ifChecked', function(){
        $("#centralism-instrument").css("display","block");
        $("#group-instrument").css("display","none");
    });
    //显示组串式三张图
    $("#group-inverter").on('ifChecked', function(){
        $("#group-instrument").css("display","block");
        $("#centralism-instrument").css("display","none");
    });
});