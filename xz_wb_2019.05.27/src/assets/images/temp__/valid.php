<?php
$arr = [];
$length = 25; //模拟每页加载多少条数据

$arr = array();
$arr['code'] = 200;

$arr['msg'] = '号码通过正确';
$arr['url'] = "http://www.baidu.com";
$arr['total'] = 10;

$arr['data']['list'] = array();
$arr['data']['page'] = 1;//当前页
$arr['data']['total'] = $length;//总条数
$arr['data']['limit'] = 10;//每页显示条数
$arr['data']['count'] = ceil($length/$arr['data']['limit']);//总页数
$brr = array();
for($i = 0; $i < $arr['data']['limit']; $i++) {
	$brr['id'] = $i;
	$brr['url'] = "http://www.baidu.com";
	$brr['img'] = "http://img4.imgtn.bdimg.com/it/u=1952016862,1880307894&fm=26&gp=0.jpg";
	$brr['title'] =  "商品标题，最多占两行，超出部分省略号表示1";
	$brr['price'] = 2899;
	$brr['sellNem'] =15625;
	
	$arr['data']['list'][] = $brr;
}

echo json_encode($arr);
?>