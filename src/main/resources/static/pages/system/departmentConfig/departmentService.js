define(['angular','bootstrap-dialog','pnotify','treeview'],function(angular,BootstrapDialog,PNotify){
	angular.module('department.service',[]).
	service('departmentService',function($http){
		this.columns=[{checkbox:true},{
	           field: 'user_name',
	           title: '部门名称',
	           halign:'center',
	           align:'center',
	           valign:'middle'
	       },{
	           field: 'user_name',
	           title: '部门编码',
	           halign:'center',
	           align:'center',
	           valign:'middle'
	       },{
	           field: 'user_name',
	           title: '上级部门名称',
	           halign:'center',
	           align:'center',
	           valign:'middle'
	       }];
		this.add=function(){
     	   BootstrapDialog.confirm({
               title: '提示信息',
               message: '注意未选择上级节点，将建立新的根节点，是否继续?',
               type: 'jambo_dialog',
               closable: true, 
               draggable: true, 
               btnCancelLabel: '取消', 
               btnOKLabel: '确定', 
               btnOKClass: 'btn-success', 
               callback: function(result) {
                   if(result) {
        	           BootstrapDialog.show({
        	               title:'添加记录',
        	              message:$('<div></div>').load('pages/system/departmentConfig/departmentEdit.html'),
        	               draggable: true,
        	               type:'jambo_dialog',
        	               size:BootstrapDialog.SIZE_SMALL,
        	               onshown:function(){
        	            	   $('#parent_departmentkey').val('顶级节点');
        	               },
        	               buttons: [{
        	                   label: '取消',
        	                   cssClass: 'btn-primary',
        	                   action: function(dialogItself){
        	                       dialogItself.close();
        	                   }
        	               },{
        	                   label: '重置',
        	                   cssClass: 'btn-primary',
        	                   action: function(dialogItself){
        	                   	$('form')[0].reset();
        	                   }
        	               },{
        	                   label: '保存',
        	                   cssClass: 'btn-success',
        	                   action: function(dialogItself){
        	                   /*var user ={user_name:$('#user_name').val(),login_account:$('#login_account').val()
        	                		   ,valid:$('#valid').val(),register_time:new Date()};
        		                   $.ajax({
        		            		   url:'user',
        		            		   type:'post',
        		            		   contentType:'application/json;charset=utf-8',
        		            		   data:JSON.stringify(user),
        		            		   dataType:'json',
        		            		   success:function(data){
        		            			   dialogItself.close();
        		            			   $('table[btable]').bootstrapTable('refresh');
        		            			   notice('提示信息','数据添加成功！','success');
        		            			  console.log(JSON.stringify(data))
        		            		   },error:function(data){
        		            			  console.error(JSON.stringify(data))
        		            		   }
        		            	   });*/
        	                   }
        	               }]
        	           });

                   }
               }
           });


		};
		this.edit=function(){
	    	   if(flag){
	        	   BootstrapDialog.show({
	                   title:'修改记录',
	                   message:$('<div></div>').load('pages/system/userConfig/userEdit.html'),
	                   draggable: true,
	                   type:'jambo_dialog',
	                   onshown:function(){
	                       $('#user_name').val(rows[0]['user_name']);
	                       $('#login_account').val(rows[0]['login_account']);
	                       $('#login_pass').val(rows[0]['login_pass']);
	                       $('#valid').select2("val",rows[0]['valid']);
	                   }, buttons: [{
	                       label: '保存',
	                       icon: 'fa fa-check-circle',
	                       cssClass: 'btn-success',
	                       action: function(dialogItself){
	                    	   var user ={user_id:rows[0]['user_id'],user_name:$('#user_name').val(),login_account:$('#login_account').val()
	                              		,valid:$('#valid').val()};
	    	                   	$.ajax({
	    	             		   url:'user',
	    	             		   type:'put',
	    	             		   contentType:'application/json;charset=utf-8;',
	    	             		   data:JSON.stringify(user),
	    	             		   dataType:'json',
	    	             		   success:function(data){
	    	             			   console.log(JSON.stringify(data))
	    	             			   dialogItself.close();
	    	             			  notice('提示信息','数据修改成功！','success');
	    	             			   $('table[btable]').bootstrapTable('refresh');
	    	             		   },
	    	             		   error:function(data){
	    	             			   console.error(JSON.stringify(data))
	    	             		   }
	    	             	   });
	                       }
	                   },{
	                       label: '取消',
	                       cssClass: 'btn-default',
	                       icon: 'fa fa-close',
	                       action: function(dialogItself){
	                           dialogItself.close();
	                       }
	                   }]
	               });
	    	   }else{
	    		   notice('提示信息','请选择要编辑的数据！','info');
	    	   }

		};
		this.del=function(){
	    	   if(flag){
	    		   var user = {login_account:rows[0]['login_account']};
	        	   BootstrapDialog.confirm({
	                   title: '提示信息',
	                   message: '确定要删除所选数据吗?',
	                   type: 'jambo_dialog',
	                   closable: true, 
	                   draggable: true, 
	                   btnCancelLabel: '取消', 
	                   btnOKLabel: '确定', 
	                   btnOKClass: 'btn-success', 
	                   callback: function(result) {
	                       if(result) {
	                    	   $.ajax({
	            	      		   url:'user',
	            	      		   type:'delete',
	            	      		   contentType:'application/json;charset=utf-8;',
	            	      		   data:JSON.stringify(user),
	            	      		   dataType:'json',
	            	      		   success:function(data){
	            	      			   console.log(JSON.stringify(data))
	            	      			   notice('提示信息','数据删除成功！','success');
	            	      			   $('table[btable]').bootstrapTable('refresh');
	            	      		   },
	            	      		   error:function(data){
	            	      			   console.error(JSON.stringify(data))
	            	      		   }
	            	      	   	});
	                       }
	                   }
	               });
	    	   }else{
	    		   notice('提示信息','请选择要删除的数据！','info');
	    	   }
		};
		this.treeData=[
			  {
				    text: "项目部",
				    nodes: [
				      {
				        text: "管理部",
				        nodes: [
				          {
				            text: "项目管理"
				          },
				          {
				            text: "质量管理"
				          }
				        ]
				      },
				      {
				        text: "开发部"
				      }
				    ]
				  },
				  {
				    text: "研发部"
				  },
				  {
				    text: "产品部"
				  },
				  {
				    text: "财务部"
				  },
				  {
				    text: "商务部"
				  }
				];
	})
});