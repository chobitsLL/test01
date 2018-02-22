//zTree树的 配置信息
var setting = {
            view: {
                selectedMulti: true//设置是否同时选中多个节点
            },
            check: {
                enable: true
            },
            data: {
                simpleData: {
                    enable: true//使用简单数据模式。。简单数据模式就是Array
                }
            },
           /* callback: {
                beforeClick: beforeClick,//捕获单击节点之前的事件回调函数
                beforeCollapse: beforeCollapse,//用于捕获父节点折叠之前的事件回调函数
                beforeExpand: beforeExpand,//用于捕获父节点展开之前的事件回调函数
                onCollapse: onCollapse,//用于捕获节点被折叠的事件回调函数
                onExpand: onExpand//用于捕获节点被展开的事件回调函数
            }*/
            
        };

            function beforeClick(treeId, treeNode) {
                alert("节点点击之前事件"+treeId+treeNode.name);
                return true;
            }
            function beforeCollapse(treeId, treeNode) {
                alert("父节点折叠之前事件"+treeId+treeNode.name);
                return true;
            }
            function beforeExpand(treeId, treeNode) {
                alert("父节点展开之前事件"+treeId+treeNode.name);
                return true;
            }
            function onCollapse(event, treeId, treeNode) {
                alert("节点折叠事件"+treeId+treeNode.name);
            }        
            function onExpand(event, treeId, treeNode) {
                alert("节点展开事件"+treeId+treeNode.name);
            }


$(document).ready( function () {
    
    //为添加角色的表单加验证效果
    $('#form-user-add').bootstrapValidator();
    /**
     * 添加角色的按钮
     */
        $("#roleAdd").click(function(){
            $('#form-role-add').bootstrapValidator('validate');//为表单的添加按钮  添加一个绑定表单的方法
            var roleName = $("input[name='roleName']").val();
            var roleCre = $("input[name='roleCre']").val();
            var temp;
            var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            var checkedNodes = treeObj.getCheckedNodes();
            var nodeArr = new Array();
            if(treeObj == null){
                layer.msg('未分配权限！', {
                      icon: 3,
                        time: 2000 
                      }, function(){
                      });
            }else if(checkedNodes.length > 0){//勾选了
                $.each(checkedNodes,function(i,node){
                    nodeArr.push(node.id);
                });
                if(roleName !="" ){
                    $.ajax({url:"roleAdd.htmls",
                            dataType:'json',
                            type:"post",
                            traditional:true,
                            data:{
                                "roleName" : roleName,
                                "roleCre" : roleCre,
                                "nodeArr" : nodeArr,
                            },
                            success:function(data){
                                if(data != null){
                                    parent.page.pageSet(); 
                                }    
                                parent.layer.close(parent.indexRoleAdd); //获取到layer的弹出窗 关闭它  indexRoleAdd
                    }});
                }
                return false;
            }else if(checkedNodes.length == 0){
                parent.layer.msg('未分配权限！', {
                      icon: 3,
                        time: 2000 
                      }, function(){
                      });
                parent.layer.close(parent.indexRoleAdd);
            }
        });
        
        //点击 分配权限 则展示zTree树
        $(".fen").click(function(){
            $("#treeDemo").show();
            $.getJSON("../roleDeal/showAllAuthority.htmls", function(data){//去后台获取到所有权限信息 用于构造zTree树
                if (null != data) {
                    //获取角色名作为根节点名字
                    var rootName = $("#roleName").val();
                    //自定义的根节点  设置pId为0则为根节点   open代表默认打开的   nocheck表示不对根节点显示单选/复选框
                    var rootNodes = {id:1, pId:0, name:rootName, open:true,nocheck:true};
                  //构建整个权限树
                    var zNodes = [];
                        var d = data;
                        $.each(data,function(i,d){
                            var o = {};
                            o.id = d.authorityId;
                            o.operation = d.operation;
                            o.name = d.authorityName;
                            o.isEnable = d.isEnable;
                            o.updateDate = d.updateDate;
                            o.pId = d.authorityCre;
                            o.nocheck = false;
                            o.open = false;
                            zNodes.push(o);//再将整个的异步加载的数据 子节点给权限树  构成一个完整的树
                        });
                        
                        zNodes.push(rootNodes);//首先将根节点给权限树
                        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                } else {
                    parent.layer.msg('没有获得项目类型信息，或分类下没有项目信息！', {//弹出框
                          icon: 3,
                          time: 2000 //2秒关闭（如果不配置，默认是3秒）
                        }, function(){
                          //do something
                        });
                }
            });    
        });
        //点击隐藏  则隐藏树
        $(".yin").click(function(){
            $("#treeDemo").hide();
        });
        
        //为角色名输入框 绑定change事件  狂内容改变 则树根名字变化
        $("#roleName").change(function(){
            var roleName = $("input[name='roleName']").val();
            var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            if(treeObj == null ){
                
            }else{
                var nodes = treeObj.getNodesByParam("id", 1, null);
                nodes[0].name =roleName;
                treeObj.refresh();
            }
        });
        
} );