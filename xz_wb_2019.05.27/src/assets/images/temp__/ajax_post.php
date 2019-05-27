<?php
    header("Content-Type:text/html; charset=utf-8");
	sleep(3);//效果演示，该句可移除;
	
	//表单数据是以POST方式提交过来;
	
	//$name=$_POST["name"];
	
	//注意json数据必须严格按如下格式输出：{"info":"demo info","status":"y"};
	//info: 输出提示信息;
	//status: 返回提交数据的状态,是否提交成功。“y”表示提交成功，“n”表示提交失败，在callback函数里可以根据该值执行相应的回调操作;
    
	echo '{
    "info": "数据提交成功！",
    "status": "y",
    "code": "200",
    "data": {
        "list": [
            {
                "imSrc": "../../images/temp__/luntai.jpg",
                "tit": "风神轮胎股份有限",
                "sub": "风神轮胎股份有限公司是国家520户大型重点企业、全国大型轮胎制造企业、轮胎出口基地、中国十大品牌轮胎，连续多",
                "time": "2018-04-08"
            }
        ]
    }
}';
	
	//echo '{"info":"'.$name.'","status":"y"}';
?>