/**
 * 角色详情对话框
 */
var DeptInfoDlg = {
    data: {
        pid: "",
        pName: ""
    }
};

layui.use(['layer', 'form', 'admin', 'ax'], function () {
    var $ = layui.jquery;
    var $ax = layui.ax;
    var form = layui.form;
    var admin = layui.admin;
    var layer = layui.layer;

    // 让当前iframe弹层高度适应
    admin.iframeAuto();

    // 点击上级角色时
    $('#pName').click(function () {
        var formName = encodeURIComponent("parent.DeptInfoDlg.data.pName");
        var formId = encodeURIComponent("parent.DeptInfoDlg.data.pid");
        var treeUrl = encodeURIComponent("/dept/tree");

        layer.open({
            type: 2,
            title: '父级部门',
            area: ['300px', '200px'],
            content: Feng.ctxPath + '/system/commonTree?formName=' + formName + "&formId=" + formId + "&treeUrl=" + treeUrl,
            end: function () {
                $("#pid").val(DeptInfoDlg.data.pid);
                $("#pName").val(DeptInfoDlg.data.pName);
            }
        });
    });

    // 表单提交事件
    form.on('submit(btnSubmit)', function (data) {
        var ajax = new $ax(Feng.ctxPath + "/dept/add", function (data) {
            Feng.success("添加成功！");

            //跳转列表页面并刷新
            window.location.href = Feng.ctxPath + "/dept";

        }, function (data) {
            Feng.error("添加失败！" + data.responseJSON.message)
        });
        ajax.set(data.field);
        ajax.start();

        //添加 return false 可成功跳转页面
        return false;
    });

    //返回按钮
    $("#backupPage").click(function () {
        window.location.href = Feng.ctxPath + "/dept";
    });
});