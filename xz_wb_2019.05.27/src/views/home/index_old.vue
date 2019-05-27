<template>
    <div class="root">
        <div v-for="(it,index) in pageDatas.items" :key="index" :style="[{'overflow': 'hidden'}]">
            <!-- 优惠券 start-->
            <div
                name="show_page_yhq"
                v-if="it.id == 'yhq'"
                :style="{'background': it.params.styledata == 1 ? ('url('+it.params.backgroundimg+')') : ('' + ' '+ it.params.positiony + ' '+ it.params.positionx + ' ' +  it.params.repeat + ' '+ it.style.background), 'background-size': it.params.size==1? 'cover' : ((it.style.sizew + '%') + ' ' + (it.params.size == 1? '' : (it.style.sizeh+'%'))), 'margin-top' :  rpxTorem( it.style.mt * 2),  'padding' : rpxTorem(it.style.paddingtop*2) + ' '+ rpxTorem(it.style.paddingleft*2) }"
            >
                <div
                    class="display-inline-block"
                    data-link="/sudu8_page/coupon/coupon"
                    :style="{'width': (100/it.params.rownum + '%')}"
                    v-for="co in it.data"
                    :key="co"
                >
                    <div
                        :style="{ 'margin': rpxTorem(it.style.paddingtop*2) + ' ' + rpxTorem(it.style.paddingleft*2), 'border-radius': rpxTorem(10),'height':rpxTorem(100), 'color': '#fff', 'background': 
                        'linear-gradient(to right,' + it.style.yhqbg + ' 0%' + ',' +  it.style.yhqbg2 + ' ' + '100%)' ,'position': 'relative', 'padding': rpxTorem(10) + '  0', 'overflow':'hidden'}"
                    >
                        <div
                            :style="{'font-size': rpxTorem(28), 'width':'100%', 'text-align':'center'}"
                        >
                            ¥
                            <span :style="{'font-size': rpxTorem(36)}">{{co.title}}</span>
                        </div>
                        <div
                            :style="{'font-size': rpxTorem(it.params.rownum==2?'28':'24'), 'width': '100%', 'text-align': 'center', 'margin-top':0}"
                        >{{co.text}}</div>
                        <div class="yhqj1" :style="{'background-color': it.style.background }"></div>
                        <div class="yhqj2" :style="{ 'background-color':it.style.background }"></div>
                    </div>
                </div>
            </div>
            <!-- 优惠券  end-->
            <!-- swiper start -->
            <div
                v-if=" it.id == 'banner'"
                :style="{'background':it.params.styledata==1?'url('+it.params.backgroundimg+')':''+ ' '+  it.params.positiony+ ' '+ it.params.positionx+ ' '+ it.params.repeat+ ' ' + it.style.background,
    	     'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+ it.params.size==1?'':it.style.sizeh+'%',
          'margin-top': rpxTorem(it.style.mt*2),
		      'padding': rpxTorem(it.style.paddingtop*2) + ' '+ rpxTorem(it.style.paddingleft*2),
		      'height':rpxTorem(it.params.imgh*2)}"
            >
                <van-swipe
                    class="diy-banner"
                    :autoplay="it.style.speed*1000"
                    :indicator-color="it.style.background"
                    :show-indicators="it.params.navstyle==1?false:true"
                    v-if="it.params.navstyle2==0"
                >
                    <van-swipe-item
                        :style="{'position':'relative'}"
                        v-for="banner in it.data"
                        :key="banner"
                    >
                        <img
                            @click="openUrl(banner.linkurl)"
                            :data-link="banner.linkurl"
                            :data-linktype="banner.linktype?banner.linktype:'page'"
                            id="mjltest"
                            :src="banner.imgurl"
                            :style="{'width':'100%','height':'100%','display':'block'}"
                        >
                        <div
                            class="hbj"
                            :style="{'position':'absolute','left':'0','bottom':'0',
				'padding': rpxTorem(it.style.pdh*2) + ' '+ rpxTorem(it.style.pdw*2),
				'color':it.style.text_color,
				'font-size':rpxTorem(28),
				'background':it.style.bg,
				'opacity':it.style.opacity,
				'width':'100%',
				'box-sizing':'border-box'}"
                            v-if="it.params.navstyle==1"
                        >
                            <span style="flex:1;">{{banner.single}}</span>
                            <span>
                                <i
                                    :style="{'color':it.style.jsq_color,'font-style':'normal'}"
                                >{{it.index}}</i>
                                /{{ Object.keys(it.data).length}}
                            </span>
                        </div>
                    </van-swipe-item>
                </van-swipe>
                <van-swipe
                    class="diy-banner"
                    :autoplay="it.style.speed*1000"
                    :indicator-color="it.style.background"
                    :show-indicators="it.params.navstyle==1?false:true"
                    nextMargin="20rpx"
                    previousMargin="20rpx"
                    v-if="it.params.navstyle2==1"
                >
                    <van-swipe-item
                        :style="{'position':'relative'}"
                        v-for="banner in it.data"
                        :key="banner"
                    >
                        <img
                            @click="openUrl(banner.linkurl)"
                            :data-link="banner.linkurl"
                            :data-linktype="banner.linktype?banner.linktype:'page'"
                            id="mjltest"
                            :src="banner.imgurl"
                            :style="{'width':'100%','height':'100%','display':'block'}"
                        >
                        <div
                            class="hbj"
                            :style="{'position':'absolute','left':'0','bottom':'0','padding':rpxTorem(it.style.pdh*2)+''+rpxTorem(it.style.pdw*2),'color':it.style.text_color,'font-size':rpxTorem(28),'background':it.style.bg,'opacity':it.style.opacity,'width':'100%','box-sizing':'border-box'}"
                            v-if="it.params.navstyle==1"
                        >
                            <span :style="{'flex':'1'}">{{banner.single}}</span>
                            <span>
                                <i
                                    :style="{'color':it.style.jsq_color,'font-style':'normal'}"
                                >{{it.index}}</i>
                                /{{ Object.keys(it.data).length}}
                            </span>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!-- swiper end -->
            <!-- 富文本 start -->
            <div
                v-if="it.id == 'richtext'"
                :style="{ 'background':it.style.background, 'padding': rpxTorem(it.style.padding*2),'box-sizing':'border-box' }"
            >
                <div class="wxParse">
                    <div v-html="decode(it.params.content)"></div>
                </div>
            </div>
            <!-- 富文本 end -->
            <!-- 标题栏  start-->
            <div
                v-if=" it.id == 'title'"
                bindtap="redirectto"
                :data-link="it.params.link"
                :data-linktype="it.params.linktype"
                :style="{'padding': rpxTorem(it.style.paddingtop*2) + ' ' + rpxTorem(it.style.paddingleft*2), 'font-size': rpxTorem(it.style.fontsize*2),'text-align': it.style.textalign, 'background': it.params.styledata==1?'url('+it.params.backgroundimg+')':'' + ' ' + it.params.positiony + ' ' + it.params.positionx+ ' '+ it.params.repeat+ ' ' + it.style.background, 'background-size': it.params.size==1?'cover': it.style.sizew+'%' + ' '+ it.params.size==1?'': rpxTorem(it.style.sizeh) + '%', 'margin-top': rpxTorem(it.style.mt*2) , 'color':it.style.color}"
            >
                <i :class="'iconfont' + it.params.icon"></i>
                {{ it.params.title}}
            </div>
            <!-- 标题栏  end-->
            <!-- 辅助线 start -->
            <div
                v-if="it.id == 'line'"
                :style="{'padding': rpxTorem(it.style.padding*2) + ' '+ 0, 'background':it.params.styledata==1?'url('+it.params.backgroundimg+')':''+  it.params.positiony + ' '+ it.params.positionx + ' '+  it.params.repeat + ' '+ it.style.background, 'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+ it.params.size==1?'':it.style.sizeh+'%', 'margin-top': rpxTorem(it.style.mt*2), 'padding': rpxTorem(it.style.padding*2) + ' '+ rpxTorem(it.style.pd*2)}"
            >
                <div
                    :style="'border-top:' + rpxTorem(it.style.height*2) + ' ' + it.style.linestyle + ' ' +  it.style.border"
                ></div>
            </div>
            <!-- 辅助线 end  -->
            <!-- 辅助空白 start  -->
            <div
                v-if="it.id == 'blank'"
                :style="{'height': rpxTorem(it.style.height*2), 'background': it.params.styledata==1?'url('+it.params.backgroundimg+')':'' + ' '+ it.params.positiony + ' '+  it.params.positionx + ' '+  it.params.repeat + ' '+  it.style.background, 'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+  it.params.size==1?'':it.style.sizeh+'%', 'margin-top': rpxTorem(it.style.mt*2)}"
            ></div>
            <!-- 辅助空白 end  -->
            <!-- 按钮组 start  -->
            <div
                v-if=" it.id== 'menu'"
                :style="{'background':it.params.styledata==1?'url('+ it.params.backgroundimg+')':'' + ' '+ it.params.positiony+ ' '+ it.params.positionx + ' ' + it.params.repeat + ' '+  it.style.background, 'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+ it.params.size==1?'':it.style.sizeh+'%', 'margin-top': rpxTorem(it.style.mt*2) , 'padding': rpxTorem(it.style.padding*2) + ' '+ rpxTorem(it.style.paddingleft*2)}"
            >
                <div v-if="it.style.showtype==0">
                    <div
                        v-for="mu in  it.data"
                        :key="mu"
                        bindtap="redirectto"
                        class="display-inline-block"
                        @click="openUrl(mu.linkurl)"
                        :data-link="mu.linkurl"
                        :data-linktype="mu.linktype?mu.linktype:'page'"
                        :style="{'padding': rpxTorem(20) + ' ' + 0, 'width': 100/it.style.rownum + '%' }"
                    >
                        <img
                            v-if="it.style.navstyle=='radius'"
                            class="display-block"
                            mode="widthFix"
                            :src="mu.imgurl"
                            :style="{ 'width': rpxTorem(88), 'margin': '0 auto', 'border-radius': rpxTorem(20)}"
                        >
                        <img
                            v-if="it.style.navstyle==''"
                            class="display-block"
                            mode="widthFix"
                            :src="mu.imgurl"
                            :style="{'width': rpxTorem(88), 'margin':'0 auto'}"
                        >
                        <img
                            v-if="it.style.navstyle=='circle'"
                            class="display-block"
                            mode="widthFix"
                            :src="mu.imgurl"
                            :style="{'width': rpxTorem(88), 'margin':'0 auto', 'border-radius': rpxTorem(88)}"
                        >
                        <div
                            class="font-size-24 margin-top-20"
                            :style="{ 'width':'100%', 'text-align':'center', 'color': mu.color }"
                        >{{mu.text}}</div>
                    </div>
                </div>
                <div v-if="it.style.showtype==1">
                    <div scrollX style="white-space:nowrap;">
                        <div
                            v-for="mu in it.data"
                            :key="mu"
                            bindtap="redirectto"
                            class="display-inline-block"
                            @click="openUrl(mu.linkurl)"
                            :data-link="mu.linkurl"
                            :data-linktype="mu.linktype?mu.linktype:'page'"
                            :style="{'padding': rpxTorem(20) + ' '+  0, 'width': rpxTorem(750/it.style.rownum)}"
                        >
                            <img
                                v-if="it.style.navstyle=='radius'"
                                class="display-block"
                                mode="widthFix"
                                :src="mu.imgurl"
                                :style="{ 'width': rpxTorem(88), 'margin':'0 auto', 'border-radius': rpxTorem(20)}"
                            >
                            <img
                                v-if="it.style.navstyle==''"
                                class="display-block"
                                mode="widthFix"
                                :src="mu.imgurl"
                                :style="{'width': rpxTorem(88), 'margin':'0 auto'}"
                            >
                            <img
                                v-if="it.style.navstyle=='circle'"
                                class="display-block"
                                mode="widthFix"
                                :src="cu.imgurl"
                                :style="{'width': rpxTorem(88), 'margin':'0 auto','border-radius':rpxTorem(88)}"
                            >
                            <div
                                class="font-size-24 margin-top-20"
                                :style="{'width': '100%', 'text-align': 'center','color': mu.color}"
                            >{{mu.text}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 按钮组 end  -->
            <!-- 文字按钮 start  -->
            <div
                v-if="it.id == 'menu2'"
                :style=" {'background': it.params.styledata==1?'url('+it.params.backgroundimg+')':'' + ' '+ it.params.positiony + ' ' +  it.params.positionx + ' '+ it.params.repeat+ ' ' + it.style.background, 'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+  it.params.size==1?'':it.style.sizeh+'%', 'margin-top': rpxTorem(it.style.mt*2), 'margin-top': rpxTorem(it.style.margintop*2), 'padding':  rpxTorem(it.style.padding*2) + ' '+ rpxTorem(it.style.paddingleft*2)}"
            >
                <div
                    v-for=" mu in it.data"
                    :key="mu"
                    bindtap="redirectto"
                    class="display-inline-block anz2"
                    :data-link="mu.linkurl"
                    :data-linktype="mu.linktype"
                    :style="{ 'width': 100/ Object.keys(it.data).length+'%', 'color': mu.textcolor}"
                >
                    <i
                        :class="'iconfont '+ mu.iconclass"
                        :style="{'color':mu.iconcolor, 'margin-right': rpxTorem(18)}"
                    ></i>
                    <span>{{mu.text}}</span>
                </div>
            </div>
            <!-- 文字按钮 end  -->
            <!-- 组图模块 start  -->
            <div
                v-if="it.id =='picture'"
                :style="{'padding-bottom':0, 'background':it.params.styledata==1?'url('+it.params.backgroundimg+')':''+ '' + it.params.positiony + ' '+ it.params.positionx + ' '+   it.params.repeat + ' '+ it.style.background, 'background-size': it.params.size==1?'cover':it.style.sizew+'%' + ' ' + it.params.size==1?'':it.style.sizeh+'%','margin-top': rpxTorem(it.style.mt*2)}"
            >
                <div
                    v-for="im in it.data"
                    :key="im"
                    bindtap="redirectto"
                    :data-link="im.linkurl"
                    :data-linktype="im.linktype"
                    :style="{'padding':rpxTorem(it.style.paddingtop*2)+ ' '+ rpxTorem(it.style.paddingleft*2)}"
                >
                    <img mode="widthFix" :src="im.imgurl" style="width:100%;display:block">
                </div>
            </div>
            <!-- 组图模块 end  -->
            <!-- 图片橱窗 start  -->
            <div v-if="it.id == 'picturew'">
                <div
                    v-if="it.params.row==1"
                    class="hbj"
                    :style="{ 'width': rpxTorem(750), 'padding': rpxTorem(it.style.paddingtop*2)+ ' '+ rpxTorem(it.style.paddingleft*2), 'box-sizing': 'border-box', 'margin-top': rpxTorem(it.style.mt)}"
                >
                    <div style="width:100%;overflow:hidden">
                        <div v-if="Object.keys(it.data).length >=4">
                            <img
                                bindtap="redirectto"
                                :data-link="it.data[0].linkurl"
                                :data-linktype="it.data[0].linktype"
                                mode="widthFix"
                                :src="it.data[0].imgurl"
                                :style="{'width':'50%', 'box-sizing':'border-box', 'display':'block', 'float':'left', 'padding': rpxTorem(it.style.paddingtop*2) + ' '+  rpxTorem(it.style.paddingleft*2) }"
                            >
                            <div style="width:50%;display:inline-block">
                                <img
                                    bindtap="redirectto"
                                    :data-link="it.data[1].linkurl"
                                    :data-linktype="it.data[1].linktype"
                                    :src="it.data[1].imgurl"
                                    :style="{'width':'100%', 'height': rpxTorem(188),'box-sizing':'border-box', 'display':'block', 'padding':  rpxTorem(it.style.paddingtop)+ ' '+ rpxTorem(it.style.paddingleft)}"
                                >
                                <div
                                    :style="{ 'width':'100%', 'height': rpxTorem(187.5), 'overflow':'hidden','height':'50%'}"
                                >
                                    <img
                                        bindtap="redirectto"
                                        :data-link="it.data[2].linkurl"
                                        :data-linktype="it.data[2].linktype"
                                        :src="it.data[2].imgurl"
                                        :style="{ 'width':'50%', 'height': rpxTorem(188), 'box-sizing':'border-box', 'float':'left', 'display':'block','padding': rpxTorem(it.style.paddingtop)+ ' '+ rpxTorem(it.style.paddingleft), 'box-sizing':'border-box'}"
                                    >
                                    <img
                                        bindtap="redirectto"
                                        :data-link="it.data[3].linkurl"
                                        :data-linktype="it.data[3].linktype"
                                        :src="it.data[3].imgurl"
                                        :style="{ 'width':'50%', 'height': rpxTorem(188), 'box-sizing':'border-box', 'float':'left', 'display':'block','padding': rpxTorem(it.style.paddingtop)+ ' '+ rpxTorem(it.style.paddingleft), 'box-sizing':'border-box'}"
                                    >
                                </div>
                            </div>
                        </div>
                        <div v-if="Object.keys(it.data).length==3">
                            <img
                                bindtap="redirectto"
                                :data-link="it.data[0].linkurl"
                                :data-linktype="it.data[0].linktype"
                                mode="widthFix"
                                :src="it.data[0].imgurl"
                                :style="{ 'width':'50%', 'height': rpxTorem(376), 'box-sizing':'border-box', 'display':'block', 'float':'left','padding': rpxTorem(it.style.paddingtop*2) + ' '+ rpxTorem(it.style.paddingleft*2)}"
                            >
                            <div style="width:50%;display:inline-block">
                                <img
                                    bindtap="redirectto"
                                    :data-link="it.data[1].linkurl"
                                    :data-linktype="it.data[1].linktype"
                                    :src="it.data[1].imgurl"
                                    :style="{ 'width':'100%', 'height': rpxTorem(188), 'box-sizing':'border-box', 'display':'block','padding': rpxTorem(it.style.paddingtop*2)+ ' '+ rpxTorem(it.style.paddingleft*2)} "
                                >
                                <img
                                    bindtap="redirectto"
                                    :data-link="it.data[2].linkurl"
                                    :data-linktype="it.data[2].linktype"
                                    :src="it.data[2].imgurl"
                                    :style="{ 'width':'100%', 'height': rpxTorem(188), 'box-sizing':'border-box','float':'left','display':'block','padding': rpxTorem(it.style.paddingtop*2) + ' '+ rpxTorem(it.style.paddingleft*2)}"
                                >
                            </div>
                        </div>
                        <div v-if="Object.keys(it.data).length==2">
                            <img
                                bindtap="redirectto"
                                :data-link="it.data[0].linkurl"
                                :data-linktype="it.data[0].linktype"
                                mode="widthFix"
                                :src="it.data[0].imgurl"
                                :style=" {'width':'50%','box-sizing':'border-box', 'height': rpxTorem(376),'display':'block','float':'left','padding': rpxTorem(it.style.paddingtop*2) + ' '+ rpxTorem(it.style.paddingleft*2)}"
                            >
                            <img
                                bindtap="redirectto"
                                :data-link="it.data[1].linkurl"
                                :data-linktype="it.data[1].linktype"
                                mode="widthFix"
                                :src="it.data[1].imgurl"
                                :style=" {'width':'50%','box-sizing':'border-box', 'height': rpxTorem(376),'display':'block','float':'left','padding': rpxTorem(it.style.paddingtop*2) + ' '+ rpxTorem(it.style.paddingleft*2)}"
                            >
                        </div>
                    </div>
                </div>
                <div v-if="it.params.row!=1">
                    <div v-if="it.params.showtype==0">
                        <div
                            v-for="im in it.data"
                            :key="im"
                            bindtap="redirectto"
                            :data-link="im.linkurl"
                            :data-linktype="im.linktype"
                            :style=" { 'background': it.params.styledata==1?'url('+it.params.backgroundimg+')':'' + ' ' + it.params.positiony+ ' '+  it.params.positionx+ ' ' + it.params.repeat+ ' '+ it.style.background,'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+ it.params.size==1?'':it.style.sizeh+'%', 'display':'inline-block','width':100/it.params.row+ '%'}"
                        >
                            <img
                                mode="widthFix"
                                :src=" im.imgurl"
                                :style="{ 'width':'100%', 'display':'block','box-sizing':' border-box','padding': rpxTorem(it.style.paddingtop*2) + ' '+ rpxTorem(it.style.paddingleft*2)}"
                            >
                        </div>
                    </div>
                    <div v-if="it.params.showtype==1">
                        <div
                            v-for="im in data"
                            :key="im"
                            bindtap="redirectto"
                            :data-link="im.linkurl"
                            :data-linktype="im.linktype"
                            :style=" { 'background': it.params.styledata==1?'url('+it.params.backgroundimg+')':'' + ' ' + it.params.positiony+ ' '+  it.params.positionx+ ' ' + it.params.repeat+ ' '+ it.style.background,'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+ it.params.size==1?'':it.style.sizeh+'%', 'margin-top':rpxTorem(it.style.mt*2), 'display':'inline-block','width':100/it.params.row+ '%'}"
                        >
                            <img
                                mode="widthFix"
                                :src="im.imgurl"
                                :style="{ 'width':'100%','display':'block','box-sizing': 'border-box','padding': rpxTorem(it.style.paddingtop*2) + ' '+ rpxTorem(it.style.paddingleft*2)} "
                            >
                        </div>
                    </div>
                </div>
            </div>
            <!-- 图片橱窗 end  -->
            <!-- 单个按钮 start  -->
            <div
                v-if="it.id == 'anniu'"
                :style="{'background':it.params.styledata==1?'url('+it.params.backgroundimg+')':''+ ' '+  it.params.positiony+ ' '+ it.params.positionx+ ' '+ it.params.repeat+ ' ' + it.style.background,'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+ it.params.size==1?'':it.style.sizeh+'%', 'margin-top': rpxTorem(it.style.mt*2), 'padding': rpxTorem(it.style.paddingtop*2)+ ' '+ rpxTorem(it.style.paddingleft*2)}"
            >
                <div
                    bindtap="redirectto"
                    :data-link="it.params.link"
                    :data-linktype="it.params.linktype"
                    :style="{ 'padding': rpxTorem(it.style.pdz*2)+ ' 0', 'font-size': rpxTorem(it.style.fs*2), 'border': rpxTorem(2)+ ' solid '+  it.style.bordercolor, 'background': it.style.btnbg, 'color': it.style.color, 'margin':'0 auto', 'text-align':'center', 'border-radius': rpxTorem(it.style.borderradius*2)}"
                >
                    <i
                        :class="'iconfont '+ it.params.icon"
                        :style="{'margin-right': rpxTorem(15), 'font-size': rpxTorem(it.style.fs*2)}"
                    ></i>
                    {{it.params.title}}
                </div>
            </div>
            <!-- 单个按钮 end  -->
            <!-- 公告 start  -->
            <div
                v-if="it.id == 'notice'"
                class="hbj"
                :style="{
              'padding': rpxTorem(it.style.paddingtop*2) + ' '+ rpxTorem(it.style.paddingleft*2),
              'background':it.params.styledata==1?'url('+it.params.backgroundimg+')':''+ ' '+  it.params.positiony+ ' '+ it.params.positionx+ ' '+ it.params.repeat+ ' ' + it.style.background,
              'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+ it.params.size==1?'':it.style.sizeh+'%',
              'margin-top': rpxTorem(it.style.mt*2),
          }"
            >
                <div :style="{'position':'relative','padding-right':rpxTorem(20)}">
                    <i
                        class="xz-icon xz-icon-gonggao"
                        :style="{'font-size':rpxTorem(36),'color':it.style.iconcolor,'vertical-align':'top'}"
                    ></i>
                    <div
                        :style="{'width':rpxTorem(2),'background':'#e2e2e2','height':rpxTorem(30),'position':'absolute','right':'0','top':rpxTorem(5)}"
                    ></div>
                </div>
                <van-swipe
                    :autoplay="it.params.speed*1000"
                    class="swiper_container"
                    :show-indicators="false"
                    :vertical="true"
                >
                    <van-swipe-item v-for="notice in it.data " :key="notice" style="width: 100%">
                        <div class="swiper_item">
                            <span
                                bindtap="redirectto"
                                class="swiper_item_text"
                                @click="openUrl(notice.linkurl)"
                                :data-link="notice.linkurl"
                                :data-linktype="notice.linktype?notice.linktype:'page'"
                                :style="{'color':it.style.color}"
                            >{{ notice.title }}</span>
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!-- 公告 end  -->
            <!--秒杀模块 start-->
            <div v-if="it.id == 'msmk'">
                <div
                    :style="{
        'padding':' 0' + rpxTorem(it.style.pdw*2),
        'background':it.params.styledata==1?'url('+it.params.backgroundimg+')':''+ ' '+  it.params.positiony+ ' '+ it.params.positionx+ ' '+ it.params.repeat+ ' ' + it.style.background,
        'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+ it.params.size==1?'':it.style.sizeh+'%',
        'margin-top':rpxTorem(it.style.mt*2),
        'box-sizing':'border-box',
        'overflow':'hidden'}"
                >
                    <div
                        bindtap="redirectto"
                        class="hbj"
                        @click="openUrl(ms.linkurl)"
                        :data-link="ms.linkurl"
                        :data-linktype="ms.linktype?ms.linktype:'page'"
                        :style="{
            'padding':rpxTorem(it.style.pdh*2)+ ' 0',
            'background':'#fff',
            'border-bottom':'1px solid #eee',
            'position':'relative'}"
                        v-if="it.params.navstyle==1"
                        v-for="ms in it.data"
                        :key="ms"
                    >
                        <img
                            :src="ms.imgurl"
                            :style="{'width':rpxTorem(168),'height':rpxTorem(168)}"
                        >
                        <div :style="{'margin-left':rpxTorem(30),'flex':'1'}">
                            <div style="overflow:hidden;">
                                <h4
                                    class="text-hide"
                                    :style="{'font-size':rpxTorem(28),'color':'#434343','max-width':rpxTorem(340),'line-height':rpxTorem(46),'float':'left'}"
                                >{{ms.title}}</h4>
                                <div
                                    :style="{'font-size':rpxTorem(24),'float':'right','color':'#434343','margin-top':rpxTorem(4)}"
                                >
                                    已抢
                                    <span style="color:#FF4A47">{{ms.count}}</span>件
                                </div>
                            </div>
                            <div
                                class="text-hide"
                                :style="{
                    'font-size':rpxTorem(24),
                    'color':'#838383',
                    'margin-top':rpxTorem(10),
                    'width':rpxTorem(750-it.style.pdw*4-30-168),
                    'line-height':rpxTorem(46),
                    'height':rpxTorem(46)}"
                            >{{ms.description}}</div>
                            <div class="hbj">
                                <div
                                    :style="{'width':rpxTorem(220),'height':rpxTorem(44),'text-align':'center','line-height':rpxTorem(44),'color':'#fff','font-size':rpxTorem(24),'background':'#FF4A47','border-radius':rpxTorem(6)}"
                                >
                                    <img
                                        mode="widthFix"
                                        src="http://wxkf2.nttrip.cn/addons/sudu8_page/template/diy/resource/images/diypage/default/flash.png"
                                        :style="{'width':rpxTorem(16),'margin-right':rpxTorem(2),'vertical-align':rpxTorem(-4)}"
                                    >
                                    距结束 {{ms.hour}}:{{ms.min}}:{{ms.second}}
                                </div>
                                <div style="flex:1;"></div>
                                <div :style="{'font-size':rpxTorem(36),'color':'#FF4A47'}">
                                    <span :style="{'font-size':rpxTorem(24)}">￥</span>
                                    {{ms.tgj}}
                                </div>
                                <div
                                    :style="{'font-size':rpxTorem(24),'color': '#838383','padding-top':rpxTorem(10),'margin-left': rpxTorem(10),'text-decoration': 'line-through'}"
                                >
                                    <span>￥</span>
                                    {{ms.price}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        bindtap="redirectto"
                        @click="openUrl(ms.linkurl)"
                        :data-link="ms.linkurl"
                        :data-linktype="ms.linktype?ms.linktype:'page'"
                        :style="{
            'float':'left',
            'display':'inline-block',
            'box-sizing':'border-box',
            'width':'50%',
            'padding':rpxTorem(it.style.pdh*2) + ' '+ rpxTorem(it.style.pdw*2)}"
                        v-if="it.params.navstyle==2"
                        v-for="ms in it.data"
                        :key="ms"
                    >
                        <img mode="widthFix" :src="ms.imgurl" style="width:100%;display:block">
                        <div
                            :style="{
                'width':'100%',
                'height':rpxTorem(48),
                'font-size':rpxTorem(20),
                'line-height':rpxTorem(48),
                'color':'#fff',
                'text-align':'center',
                'overflow':'hidden',
                'background':'#FF4A47'}"
                        >
                            <img
                                mode="widthFix"
                                src="http://wxkf2.nttrip.cn/addons/sudu8_page/template/diy/resource/images/diypage/default/flash.png"
                                :style="{'width':rpxTorem(16),'vertical-align':rpxTorem(-4),'margin-right':rpxTorem(2)}"
                            >
                            距离结束：{{ms.hour}}小时{{ms.min}}分钟{{ms.second}}秒
                        </div>
                        <div
                            class="text-hide"
                            :style="{'margin-top':rpxTorem(20),'width':'100%','font-size':rpxTorem(28),'line-height':rpxTorem(52),'color':'#434343'}"
                        >{{ms.title}}</div>
                        <div
                            class="text-hide"
                            :style="{'width':'100%','font-size':rpxTorem(24),'color':'#838383','height':rpxTorem(46),'line-height':rpxTorem(46)}"
                        >{{ms.description}}</div>
                        <div class="hbj" :style="{'margin-top':rpxTorem(10)}">
                            <div :style="{'font-size':rpxTorem(36),'color':'#FF4A47','flex':'1'}">
                                <span :style="{'font-size':rpxTorem(24)}">￥</span>
                                {{ms.price}}
                            </div>
                            <div
                                :style="{'font-size':rpxTorem(24),'color':'#838383','padding-top':rpxTorem(8),'margin-left':rpxTorem(10)}"
                            >
                                已抢
                                <span style="color:#FF4A47">{{ms.count}}</span>件
                            </div>
                        </div>
                    </div>
                    <div
                        bindtap="redirectto"
                        @click="openUrl(ms.linkurl)"
                        :data-link="ms.linkurl"
                        :data-linktype="ms.linktype?ms.linktype:'page'"
                        :style="{'padding':rpxTorem(it.style.pdh*2)+ ' 0','background-color':'#fff'}"
                        v-if="it.params.navstyle==3"
                        v-for="ms in it.data"
                        :key="ms"
                    >
                        <img mode="widthFix" :src="ms.imgurl" style="width:100%;display:block">
                        <div
                            class="hbj"
                            :style="{'height': rpxTorem(72),'color': '#FFF','background':'#FF4A47','padding':'0'+ rpxTorem(10)}"
                        >
                            <div
                                :style="{'font-size':rpxTorem(24)}"
                            >距离结束：{{ms.hour}}小时{{ms.min}}分钟{{ms.second}}秒</div>
                            <div style="flex:1"></div>
                            <div :style="{'font-size':rpxTorem(24)}">
                                <span :style="{'font-size':rpxTorem(20)}">￥</span>
                                {{ms.price}}
                            </div>
                        </div>
                        <div
                            class="text-hide"
                            :style="{'margin-top':rpxTorem(10),'font-size':rpxTorem(28),'line-height':rpxTorem(48),'width':'100%','color':'#434343'}"
                        >{{ms.title}}</div>
                        <div
                            class="text-hide"
                            :style="{'line-height':rpxTorem(46),'height':rpxTorem(46),'font-size':rpxTorem(24),'color':'#838383','width':'100%'}"
                        >{{ms.description}}</div>
                        <div class="hbj" :style="{'margin-top':rpxTorem(20)}">
                            <progress
                                active
                                activeColor="#FF4A47"
                                backgroundColor="#FFA4A3"
                                percent="20"
                                :style="{'width':rpxTorem(530),'height':rpxTorem(20),'border-radius':rpxTorem(100),'overflow':'hidden'}"
                            ></progress>
                            <div style="flex:1"></div>
                            <div style="font-size: 12px;color: #434343">
                                已抢
                                <span style="color:#FF4A47">{{ms.count}}</span>件
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--秒杀模块 end-->
            <!--产品模块 start-->
            <div v-if="it.id == 'goods'">
                <div
                    :style="{'background':it.params.styledata==1?'url('+it.params.backgroundimg+')':''+ ' '+  it.params.positiony+ ' '+ it.params.positionx+ ' '+ it.params.repeat+ ' ' + it.style.background,
        'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+ it.params.size==1?'':it.style.sizeh+'%',
        'margin-top':rpxTorem(it.style.mt*2),
        'padding': rpxTorem(it.style.paddingtop*2) + ' '+ rpxTorem(it.style.paddingleft*2),
        'box-sizing':'border-box'}"
                >
                    <div
                        bindtap="redirectto"
                        class="display-inline-block"
                        @click="openUrl(goods.linkurl)"
                        :data-link="goods.linkurl"
                        :data-linktype="goods.linktype?goods.linktype:'page'"
                        :style="{
            'width':appendStr(it.style.liststyle == 'block one'? 100: it.style.liststyle == 'block' ? 50:33,'%'),
            'margin-bottom':rpxTorem(20),
            'padding': 0 + rpxTorem(it.style.paddingleft),
            'box-sizing':'border-box',
        }"
                        v-for="(goods,index2) in it.data"
                        :key="index2"
                    >
                        <div>
                            <div
                                :style="{'display':'block','width':'100%','position':'relative','overflow':'hidden','height':rpxTorem(it.params.imgh_is == 1 ? it.params.imgh * 2 : '')}"
                            >
                                <img
                                    :mode="it.params.imgh_is==0?'widthFix':''"
                                    :src="goods.thumb"
                                    alt
                                    style="width:100%;height:100%"
                                >
                                <div v-if="it.params.showicon==1">
                                    <div class="product_tb1" v-if="it.style.iconstyle=='triangle'">
                                        <span v-if="it.style.goodsicon=='recommand'">推荐</span>
                                        <span v-if="it.style.goodsicon=='hotsale'">热销</span>
                                        <span v-if="it.style.goodsicon=='isnew'">新上</span>
                                        <span v-if="it.style.goodsicon=='istime'">限时</span>
                                        <span v-if="it.style.goodsicon=='bigsale'">促销</span>
                                    </div>
                                    <div class="product_tb2" v-if="it.style.iconstyle=='circle'">
                                        <span v-if="it.style.goodsicon=='recommand'">推荐</span>
                                        <span v-if="it.style.goodsicon=='hotsale'">热销</span>
                                        <span v-if="it.style.goodsicon=='isnew'">新上</span>
                                        <span v-if="it.style.goodsicon=='istime'">限时</span>
                                        <span v-if="it.style.goodsicon=='bigsale'">促销</span>
                                    </div>
                                    <div class="product_tb3" v-if="it.style.iconstyle=='square'">
                                        <span v-if="it.style.goodsicon=='recommand'">推荐</span>
                                        <span v-if="it.style.goodsicon=='hotsale'">热销</span>
                                        <span v-if="it.style.goodsicon=='isnew'">新上</span>
                                        <span v-if="it.style.goodsicon=='istime'">限时</span>
                                        <span v-if="it.style.goodsicon=='bigsale'">促销</span>
                                    </div>
                                    <div class="product_tb4" v-if="it.style.iconstyle=='echelon'">
                                        <span v-if="it.style.goodsicon=='recommand'">推荐</span>
                                        <span v-if="it.style.goodsicon=='hotsale'">热销</span>
                                        <span v-if="it.style.goodsicon=='isnew'">新上</span>
                                        <span v-if="it.style.goodsicon=='istime'">限时</span>
                                        <span v-if="it.style.goodsicon=='bigsale'">促销</span>
                                    </div>
                                    <div class="product_tb5" v-if="it.style.iconstyle=='rectangle'">
                                        <span v-if="it.style.goodsicon=='recommand'">推荐</span>
                                        <span v-if="it.style.goodsicon=='hotsale'">热销</span>
                                        <span v-if="it.style.goodsicon=='isnew'">新上</span>
                                        <span v-if="it.style.goodsicon=='istime'">限时</span>
                                        <span v-if="it.style.goodsicon=='bigsale'">促销</span>
                                    </div>
                                </div>
                                <div class="product_tb1" v-if="it.params.showicon==2">自定义的图标</div>
                            </div>
                            <div :style="{'padding':rpxTorem(10),'background':'#FFF'}">
                                <div
                                    :style="{'font-size':rpxTorem(28),'margin-bottom':rpxTorem(20),'color':it.style.titlecolor,'width':'100%'}"
                                    v-if="it.params.showtitle==1"
                                >{{goods.title}}</div>
                                <div
                                    :style="{'color':'#838383','font-size':rpxTorem(24),'height':rpxTorem(32)}"
                                >{{goods.desc}}</div>
                                <div
                                    :style="{'font-size':rpxTorem(24),'color':it.style.pricecolor,'display':'flex','align-items':'center'}"
                                >
                                    ¥
                                    <span
                                        :style="{'margin': '0 '+ rpxTorem(10)+ ' 0 0','font-size': rpxTorem(36), 'flex': it.style.liststyle!='block three'?'1;':'' }"
                                    >{{goods.price}}</span>
                                    <span
                                        style="color:#838383;"
                                    >销量：{{goods.sales==null?0:goods.sales}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--产品模块 end-->
            <!-- 单个视频 start  -->
            <div name="show_page_video" v-if=" it.id == 'video' ">
                <div
                    :style="{'z-index':'100','width':'100%','box-sizing':'border-box','background':it.params.styledata==1?'url('+it.params.backgroundimg+')':'' + ' ' + it.params.positiony + ' ' + it.params.positionx + ' ' + it.params.repeat + ' ' + it.style.background,'background-size':it.params.size==1?'cover':it.style.sizew+'%' + ' ' + it.params.size==1?'':it.style.sizeh+'%','margin-top':rpxTorem(it.style.mt*2),'padding':rpxTorem(it.style.paddingtop*2) + ' ' + rpxTorem(it.style.paddingleft*2)}"
                >
                    <video
                        controls
                        :poster="it.params.poster"
                        :src="it.params.videourl"
                        :style="{'margin':'0 auto','display':'block','width':'100%','height': it.style.ratio==0?'5rem':it.style.ratio==1?'7rem':'9.5rem'}"
                        v-if="it.params.videostyle==0"
                    ></video>
                    <div v-if="it.params.videostyle==1">
                        <div
                            @click="showvideo_diy= !showvideo_diy"
                            class="bg_f mb10 index_video"
                            :data-video="it.params.videourl"
                        >
                            <img class="index_video_i" :src="i">
                            <img class="index_video_p" :src="it.params.poster">
                        </div>
                        <div class="index_video_v" v-if="showvideo_diy==1">
                            <video
                                autoplay="true"
                                class="index_video_c"
                                controls="true"
                                objectFit="contain"
                                :src="it.params.videourl"
                                :style="{'display':'block','width':'100%'}"
                            ></video>
                            <img
                                bindtap="cvideo_idy"
                                @click="closeVedio"
                                class="cvideo_close"
                                src="../../assets/images/uccenter/v-close.png"
                            >
                        </div>
                    </div>
                </div>
            </div>
            <!-- 单个视频 end  -->
            <!-- 列表导航 start  -->
            <div name="show_page_listmenu" v-if=" it.id == 'listmenu' ">
                <div
                    :style="{'background':it.params.styledata==1?'url('+it.params.backgroundimg+')':'' + ' ' +it.params.positiony + ' ' + it.params.positionx + ' ' + it.params.repeat + ' ' + it.style.background,'background-size':it.params.size==1?'cover':it.style.sizew+'%' + ' ' + it.params.size==1?'':it.style.sizeh+'%', 'margin-top':rpxTorem(it.style.mt*2),'padding':rpxTorem(it.style.padding*2)+ ' ' + rpxTorem(it.style.paddingleft*2)}"
                >
                    <div
                        bindtap="redirectto"
                        class="hbj lbdh"
                        @click="openUrl(nav.linkurl)"
                        :data-link="nav.linkurl"
                        :data-linktype="nav.linktype"
                        v-for="nav in  it.data"
                        :key="nav"
                    >
                        <div
                            :style="{'font-size':rpxTorem(28),'flex':1,'color':it.style.textcolor }"
                        >
                            <icon
                                :class=" 'iconfont' + nav.iconclass"
                                :style="{'color':it.style.iconcolor,'margin-right':rpxTorem(10)}"
                            ></icon>
                            <span>{{nav.text}}</span>
                        </div>
                        <div
                            :style="{'font-size':rpxTorem(24),'color':it.style.remarkcolor }"
                        >{{nav.remark}}</div>
                    </div>
                </div>
            </div>
            <!-- 列表导航 end  -->
            <!--图文组 start-->
            <div v-if="it.id == 'cases'">
                <div
                    :style="{'background':it.params.styledata==1?'url('+it.params.backgroundimg+')':''+ ' '+  it.params.positiony+ ' '+ it.params.positionx+ ' '+ it.params.repeat+ ' ' + it.style.background,
        	'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+ it.params.size==1?'':it.style.sizeh+'%',
        	'margin-top':rpxTorem(it.style.mt*2),
        	'padding': rpxTorem(it.style.paddingtop*2) + ' '+ rpxTorem(it.style.paddingleft*2)}"
                    v-if="it.params.showtype==0"
                >
                    <div
                        bindtap="redirectto"
                        class="display-inline-block"
                        @click="openUrl(cases.linkurl)"
                        :data-link="cases.linkurl"
                        :data-linktype="cases.linktype?cases.linktype:'page'"
                        :style="{'width':appendStr(100/it.params.rownum,'%')}"
                        v-for="cases in it.data"
                        :key="cases"
                    >
                        <div
                            :style="{'padding':rpxTorem(it.style.paddingtop*2) + ' ' + rpxTorem(it.style.paddingleft*2)}"
                        >
                            <div style="position:relative" v-if="it.style.navstyle==''">
                                <img
                                    :style="{'width':'100%','display':'block' + !cases.imgurl ? 'height:0' : ''}"
                                    :src="cases.imgurl"
                                >
                                <p
                                    class="anli"
                                    :style="{
								'background': 'linear-gradient(to bottom,' + it.style.titlebg1 + ' 0%' + ',' +  it.style.titlebg2 + ' ' + '100%)',
								'color':it.style.titlecolor,
								'text-align':it.style.titlealign,
								'padding':'0',
								'opacity':'0.8',
								'height':rpxTorem(50),'line-height':rpxTorem(50),'font-size':rpxTorem(24),
								'overflow':'hidden','text-overflow': 'ellipsis','white-space':'nowrap',
							}"
                                >{{cases.title}}</p>
                            </div>
                            <div style="position:relative" v-if="it.style.navstyle=='radius'">
                                <img
                                    :style="{'width':'100%','display':'block' + !cases.imgurl ? 'height:0' : ''}"
                                    :src="cases.imgurl"
                                >
                                <p
                                    class="anli"
                                    :style="{
								'background': 'linear-gradient(to bottom,' + it.style.titlebg1 + ' 0%' + ',' +  it.style.titlebg2 + ' ' + '100%)',
								'color':it.style.titlecolor,
								'text-align':it.style.titlealign,
								'padding':'0',
								'opacity':'0.8',
								'height':rpxTorem(50),'line-height':rpxTorem(50),'font-size':rpxTorem(24),
								'overflow':'hidden','text-overflow': 'ellipsis','white-space':'nowrap',
							}"
                                >{{cases.title}}</p>
                            </div>
                            <div style="position:relative" v-if="it.style.navstyle=='circle'">
                                <img
                                    :style="{'width':'100%','display':'block' + !cases.imgurl ? 'height:0' : ''}"
                                    :src="cases.imgurl"
                                >
                                <p
                                    class="anli"
                                    :style="{
								'background': 'linear-gradient(to bottom,' + it.style.titlebg1 + ' 0%' + ',' +  it.style.titlebg2 + ' ' + '100%)',
								'color':it.style.titlecolor,
								'text-align':it.style.titlealign,
								'padding':'0',
								'opacity':'0.8',
								'height':rpxTorem(50),'line-height':rpxTorem(50),'font-size':rpxTorem(24),
								'overflow':'hidden','text-overflow': 'ellipsis','white-space':'nowrap',
							}"
                                >{{cases.title}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    :style="{
			'white-space': 'nowrap',
			'background':it.params.styledata==1?'url('+it.params.backgroundimg+')':''+ ' '+  it.params.positiony+ ' '+ it.params.positionx+ ' '+ it.params.repeat+ ' ' + it.style.background,
        	'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+ it.params.size==1?'':it.style.sizeh+'%',
			'margin-top':rpxTorem(it.style.mt*2),
			'padding': rpxTorem(it.style.paddingtop*2) + ' '+ rpxTorem(it.style.paddingleft*2)}"
                    v-if="it.params.showtype==1"
                >
                    <div
                        bindtap="redirectto"
                        class="display-inline-block"
                        @click="openUrl(cases.linkurl)"
                        :data-link="cases.linkurl"
                        :data-linktype="cases.linktype?cases.linktype:'page'"
                        :style="{'width':appendStr(100/it.params.rownum,'%')}"
                        v-for="cases in it.data"
                        :key="cases"
                    >
                        <div
                            :style="{'padding':rpxTorem(it.style.paddingtop*2) + ' ' + rpxTorem(it.style.paddingleft*2)}"
                        >
                            <div style="position:relative" v-if="it.style.navstyle==''">
                                <img
                                    :style="{'width':'100%','display':'block' + !cases.imgurl ? 'height:0' : ''}"
                                    :src="cases.imgurl"
                                >
                                <p
                                    class="anli"
                                    :style="{
								'background': 'linear-gradient(to top, #d36bc1 0%,#58bab3 100%)',
								'color':it.style.titlecolor,
								'text-align':it.style.titlealign,
								'padding':'0',
								'opacity':'0.8',
								'height':rpxTorem(50),'line-height':rpxTorem(50),'font-size':rpxTorem(24),
								'overflow':'hidden','text-overflow': 'ellipsis','white-space':'nowrap',
							}"
                                >{{cases.title}}</p>
                            </div>
                            <div style="position:relative" v-if="it.style.navstyle=='radius'">
                                <img
                                    :style="{'width':'100%','display':'block' + !cases.imgurl ? 'height:0' : ''}"
                                    :src="cases.imgurl"
                                >
                                <p
                                    class="anli"
                                    :style="{
								'background': 'linear-gradient(to top, #d36bc1 0%,#58bab3 100%)',
								'color':it.style.titlecolor,
								'text-align':it.style.titlealign,
								'padding':'0',
								'opacity':'0.8',
								'height':rpxTorem(50),'line-height':rpxTorem(50),'font-size':rpxTorem(24),
								'overflow':'hidden','text-overflow': 'ellipsis','white-space':'nowrap',
							}"
                                >{{cases.title}}</p>
                            </div>
                            <div style="position:relative" v-if="it.style.navstyle=='circle'">
                                <img
                                    :style="{'width':'100%','display':'block' + !cases.imgurl ? 'height:0' : ''}"
                                    :src="cases.imgurl"
                                >
                                <p
                                    class="anli"
                                    :style="{
								'background': 'linear-gradient(to top, #d36bc1 0%,#58bab3 100%)',
								'color':it.style.titlecolor,
								'text-align':it.style.titlealign,
								'padding':'0',
								'opacity':'0.8',
								'height':rpxTorem(50),'line-height':rpxTorem(50),'font-size':rpxTorem(24),
								'overflow':'hidden','text-overflow': 'ellipsis','white-space':'nowrap',
							}"
                                >{{cases.title}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--图文组 end-->
            <!--文章列表 start-->
            <div v-if="it.id == 'listdesc'">
                <div
                    :style="{ 'white-space': 'nowrap', 'background':it.params.styledata==1?'url('+it.params.backgroundimg+')':''+ ' '+  it.params.positiony+ ' '+ it.params.positionx+ ' '+ it.params.repeat+ ' ' + it.style.background,'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+ it.params.size==1?'':it.style.sizeh+'%','margin-top':rpxTorem(it.style.mt*2),'padding': rpxTorem(it.style.paddingtop*2) + ' '+ rpxTorem(it.style.paddingleft*2)}"
                >
                    <div
                        bindtap="redirectto"
                        class="hbj"
                        @click="openUrl(listdesc.linkurl)"
                        :data-link="listdesc.linkurl"
                        :data-linktype="listdesc.linktype?listdesc.linktype:'page'"
                        :style="{'padding':rpxTorem(it.style.paddingtop*2)+ ' 0','position': 'relative','background-color':'#fff','border-bottom':appendStr(rpxTorem(2),' solid #eee')}"
                        v-if="it.params.navstyle==1"
                        v-for="listdesc in it.data"
                        :key="listdesc"
                    >
                        <div
                            :style="{'position':'absolute','top':rpxTorem(20),'right':rpxTorem(it.style.paddingleft*2),'bottom':rpxTorem(it.style.paddingtop*2),'font-size':rpxTorem(30),'color':'#FF4A47'}"
                            v-if="listdesc.video!=''"
                        >
                            <span
                                :style="{'padding':rpxTorem(4) + ' '+rpxTorem(10),'background-color':'#FF4A47','color':'#fff','font-size':rpxTorem(14),'display':'inline-block','border-radius':rpxTorem(4),'vertical-align':rpxTorem(4)}"
                            >付费</span>
                            <span :style="{'font-size':rpxTorem(20)}">￥</span>
                            <span :style="{'font-size':rpxTorem(28)}">3000</span>
                        </div>
                        <img
                            :src="listdesc.thumb"
                            :style="{'width':rpxTorem(168),'height':rpxTorem(168),'border-radius':appendStr(it.style.radius,'%')}"
                        >
                        <div
                            :style="{'margin-left':rpxTorem(30),'width':rpxTorem(750-it.style.paddingleft*4-30-168)}"
                        >
                            <p
                                class="text-hide"
                                :style="{'width': rpxTorem(320),'font-size':rpxTorem(28),'color':it.style.color,'height':rpxTorem(40),'overflow':'hidden','text-overflow': 'ellipsis','white-space': 'nowrap'}"
                            >{{listdesc.title}}</p>
                            <div
                                class="text-hide"
                                :style="{'color':'#939393','font-size':rpxTorem(24),'line-height':rpxTorem(60),'height':rpxTorem(60),'overflow':'hidden','text-overflow': 'ellipsis','border-bottom':appendStr(rpxTorem(2),' dashed #eee')}"
                            >
                                <span v-if="listdesc.intro!=NULL">{{listdesc.intro}}</span>
                            </div>
                            <div class="hbj" :style="{'margin-top':rpxTorem(10)}">
                                <div v-if="it.params.show2==1">
                                    <span :style="{'font-size': rpxTorem(24),'color':'#434343'}">
                                        <i class="xz-icon xz-icon-iconview"></i>
                                        阅读量:{{listdesc.ydl}}
                                    </span>
                                    <span
                                        :style="{'font-size': rpxTorem(20),'color': '#eee','margin': '0'+ rpxTorem(12)}"
                                    ></span>
                                </div>
                                <div v-if="it.params.show3==1">
                                    <span :style="{'font-size': rpxTorem(24),'color':'#434343'}">
                                        <i class="xz-icon xz-icon-dianji"></i>
                                        点击量:{{listdesc.dzl}}
                                    </span>
                                    <span
                                        :style="{'font-size': rpxTorem(20),'color': '#eee','margin': '0'+ rpxTorem(12)}"
                                    ></span>
                                </div>
                                <span
                                    :style="{'font-size': rpxTorem(24),'color':'#434343'}"
                                    v-if="it.params.show4==1"
                                >
                                    <i class="xz-icon xz-icon-wenjian"></i>
                                    浏览量:{{listdesc.pll}}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div
                        bindtap="redirectto"
                        @click="openUrl(listdesc.linkurl)"
                        :data-link="listdesc.linkurl"
                        :data-linktype="listdesc.linktype?listdesc.linktype:'page'"
                        :style="{'display':'inline-block','padding':rpxTorem(it.style.paddingtop*2) + ' '+ rpxTorem(it.style.paddingleft*2),'width':'50%','box-sizing':'border-box','position':'relative'}"
                        v-if="it.params.navstyle==2"
                        v-for="listdesc in it.data"
                        :key="listdesc"
                    >
                        <div
                            :style="{'position':'absolute','top':rpxTorem(20),'right':rpxTorem(it.style.paddingleft*2),'bottom':rpxTorem(it.style.paddingtop*2),'font-size':rpxTorem(30),'color':'#FF4A47'}"
                            v-if="listdesc.video!=''"
                        >
                            <span
                                :style="{'padding':rpxTorem(4) + ' '+rpxTorem(10),'background-color':'#FF4A47','color':'#fff','font-size':rpxTorem(14),'display':'inline-block','border-radius':rpxTorem(4),'vertical-align':rpxTorem(4)}"
                            >付费</span>
                            <span :style="{'font-size':rpxTorem(20)}">￥</span>
                            <span :style="{'font-size':rpxTorem(28)}">3000</span>
                        </div>
                        <img
                            :src="listdesc.thumb"
                            :style="{'width':'100%','display':'block','border-radius':rpxTorem(it.style.radius)}"
                        >
                        <p
                            class="text-hide"
                            :style="{'width': rpxTorem(320),'font-size':rpxTorem(28),'color':it.style.color,'height':rpxTorem(40),'padding':rpxTorem(6) + '0','overflow':'hidden','text-overflow': 'ellipsis','white-space': 'nowrap'}"
                        >{{listdesc.title}}</p>
                        <div
                            class="text-hide"
                            :style="{'color':'#939393','font-size':rpxTorem(24),'line-height':rpxTorem(60),'height':rpxTorem(60),'overflow':'hidden','text-overflow': 'ellipsis','border-bottom':appendStr(rpxTorem(2),' dashed #eee')}"
                        >
                            <span v-if="listdesc.intro!=NULL">{{listdesc.intro}}</span>
                        </div>
                        <div :style="{'margin-top':rpxTorem(6)}">
                            <span
                                :style="{'font-size': rpxTorem(24),'color': '#434343','float':'left','margin-right':rpxTorem(10)}"
                                v-if="it.params.show2==1"
                            >
                                <i class="xz-icon xz-icon-iconview"></i>
                                {{listdesc.ydl}}
                            </span>
                            <span
                                :style="{'font-size': rpxTorem(24),'color': '#434343','float':'left','margin-right':rpxTorem(10)}"
                                v-if="it.params.show3==1"
                            >
                                <i class="xz-icon xz-icon-dianji"></i>
                                {{listdesc.dzl}}
                            </span>
                            <span
                                :style="{'font-size': rpxTorem(24),'color': '#434343','float':'left','margin-right':rpxTorem(10)}"
                                v-if="it.params.show4==1"
                            >
                                <i class="xz-icon xz-icon-wenjian"></i>
                                {{listdesc.pll}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <!--文章列表 end-->
            <!--拼团模块 start-->
            <div v-if="it.id == 'pt'">
                <div
                    :style="{
        'background':it.params.styledata==1?'url('+it.params.backgroundimg+')':''+ ' '+  it.params.positiony+ ' '+ it.params.positionx+ ' '+ it.params.repeat+ ' ' + it.style.background,
        'background-size': it.params.size==1?'cover':it.style.sizew+'%'+ ' '+ it.params.size==1?'':it.style.sizeh+'%',
        'margin-top':rpxTorem(it.style.mt*2),
		'padding':rpxTorem(it.style.pdh*2) + ' ' + rpxTorem(it.style.pdw*2),
        'box-sizing':'border-box',}"
                >
                    <div
                        bindtap="redirectto"
                        class="hbj"
                        @click="openUrl(pt.linkurl)"
                        :data-link="pt.linkurl"
                        :data-linktype="pt.linktype?pt.linktype:'page'"
                        :style="{'padding':rpxTorem(it.style.pdh*2)+ ' 0','background':'#fff','border-bottom':appendStr(rpxTorem(2),' solid #eee'),'position':'relative'}"
                        v-if="it.params.navstyle==1"
                        v-for="pt in it.data"
                        :key="pt"
                    >
                        <img
                            :src="pt.imgurl"
                            :style="{'width':rpxTorem(168),'height':rpxTorem(168)}"
                        >
                        <div :style="{'margin-left':rpxTorem(30)}">
                            <div class="hbj">
                                <p
                                    class="text-hide"
                                    :style="{'font-size':rpxTorem(28),'color':'#434343','line-height':rpxTorem(46)}"
                                >{{pt.title}}</p>
                            </div>
                            <div
                                class="text-hide"
                                :style="{'width':rpxTorem(750-168-it.style.pdw*4-30),'line-height':rpxTorem(46),'height':rpxTorem(46),'margin-top':rpxTorem(10),'color':'#838383','font-size':rpxTorem(24)}"
                            >{{pt.description}}</div>
                            <div class="hbj" :style="{'margin-top':rpxTorem(10),'display':'flex'}">
                                <span :style="{'font-size':rpxTorem(36),'color':'#FF4A47'}">
                                    <i :style="{'font-size':rpxTorem(24)}">￥</i>
                                    {{pt.tgj}}
                                </span>
                                <span
                                    :style="{'font-size':rpxTorem(24),'color':'#838383','padding-top':rpxTorem(8),'margin-left':rpxTorem(10),'flex':'1'}"
                                >{{pt.person}}人团</span>
                                <span
                                    :style="{'color':'#FFF','font-size':rpxTorem(24),'padding':rpxTorem(8) + ' '+ rpxTorem(10),'background':'#FF4A47','border-radius':rpxTorem(10),'display':'inline-block'}"
                                >
                                    <i
                                        class="xz-icon xz-icon-cart"
                                        :style="{'font-size':rpxTorem(24)}"
                                    ></i>
                                    <span
                                        :style="{'margin':'0'+rpxTorem(10),'display':'inline-block'}"
                                    >|</span>立即开团
                                </span>
                            </div>
                        </div>
                    </div>
                    <div
                        bindtap="redirectto"
                        @click="openUrl(pt.linkurl)"
                        :data-link="pt.linkurl"
                        :data-linktype="pt.linktype?pt.linktype:'page'"
                        :style="{'display':'inline-block','box-sizing':'border-box','width':'50%','padding':rpxTorem(it.style.pdh*2) + ' ' + rpxTorem(it.style.pdw*2),'background':'#fff'}"
                        v-if="it.params.navstyle==2"
                        v-for="pt in it.data"
                        :key="pt"
                    >
                        <img :src="pt.imgurl" :style="{'width':'100%','display':'block'}">
                        <p
                            class="text-hide"
                            :style="{'margin-top':rpxTorem(20),'width':'100%','line-height':rpxTorem(50),'color':'#434343','font-size':rpxTorem(28)}"
                        >{{pt.title}}</p>
                        <div
                            class="text-hide"
                            :style="{'font-size':rpxTorem(24),'width':'100%','color':'#838383','line-height':rpxTorem(46),'height':rpxTorem(46)}"
                        >{{pt.description}}</div>
                        <div class="hbj" :style="{'margin-top':rpxTorem(10)}">
                            <span :style="{'font-size':rpxTorem(36),'color':'#FF4A47'}">
                                <i :style="{'font-size':rpxTorem(24)}">￥</i>
                                {{pt.tgj}}
                            </span>
                            <span
                                :style="{'font-size':rpxTorem(24),'color':'#838383','padding-top':rpxTorem(8),'margin-left':rpxTorem(10),'text-decoration':'line-through'}"
                            >
                                <i :style="{'font-size':rpxTorem(20)}">￥</i>
                                {{pt.price}}
                            </span>
                        </div>
                        <div>
                            <span
                                :style="{'padding':rpxTorem(4) + ' ' + rpxTorem(8),'background':'#2F74FD','color':'#FFF','margin-left':rpxTorem(14),'font-size':rpxTorem(20),'border-radius':rpxTorem(6),'display':'inline-block'}"
                            >已团{{pt.count}}件</span>
                            <span
                                :style="{'padding':rpxTorem(4) + ' ' + rpxTorem(8),'background':'#2F74FD','color':'#FFF','margin-left':rpxTorem(14),'font-size':rpxTorem(20),'border-radius':rpxTorem(6),'display':'inline-block'}"
                            >{{pt.person}}人团</span>
                        </div>
                    </div>
                    <div
                        bindtap="redirectto"
                        @click="openUrl(pt.linkurl)"
                        :data-link="pt.linkurl"
                        :data-linktype="pt.linktype?pt.linktype:'page'"
                        :style="{'padding':rpxTorem(it.style.pdh*2) + '0'}"
                        v-if="it.params.navstyle==3"
                        v-for="pt in it.data"
                        :key="pt"
                    >
                        <div style="position:relative;">
                            <img
                                mode="widthFix"
                                :src="pt.imgurl"
                                :style="{'width':'100%','display':'block'}"
                            >
                            <span
                                :style="{'width':rpxTorem(176),'height':rpxTorem(64),'background-color':'#FF4A47','color':'#fff','font-size':rpxTorem(36),'text-align':'center','position':'absolute','line-height':rpxTorem(64),'right':'0','bottom':rpxTorem(30),'border-top-left-radius': rpxTorem(6),'border-bottom-left-radius': rpxTorem(6)}"
                            >
                                <i :style="{'font-size':rpxTorem(30)}">￥</i>
                                {{pt.price}}
                            </span>
                        </div>
                        <p
                            class="text-hide"
                            :style="{'margin-top':rpxTorem(10),'font-size':rpxTorem(28),'line-height':rpxTorem(48),'width':'100%','color':'#434343'}"
                        >{{pt.title}}</p>
                        <div
                            class="text-hide"
                            :style="{'line-height':rpxTorem(46),'height':rpxTorem(46),'font-size':rpxTorem(24),'color':'#838383','width':'100%'}"
                        >{{pt.description}}</div>
                        <div class="hbj">
                            <img
                                src="../../assets/images/user-pic.png"
                                :style="{'width':rpxTorem(60),'height':rpxTorem(60),'border-radius':rpxTorem(60),'border':appendStr(rpxTorem(2),' solid #fff')}"
                            >
                            <img
                                src="../../assets/images/user-pic.png"
                                :style="{'width':rpxTorem(60),'height':rpxTorem(60),'border-radius':rpxTorem(60),'border':appendStr(rpxTorem(2),' solid #fff'),'margin-left':rpxTorem(-20)}"
                            >
                            <img
                                src="../../assets/images/user-pic.png"
                                :style="{'width':rpxTorem(60),'height':rpxTorem(60),'border-radius':rpxTorem(60),'border':appendStr(rpxTorem(2),' solid #fff'),'margin-left':rpxTorem(-20)}"
                            >
                            <img
                                src="../../assets/images/user-pic.png"
                                :style="{'width':rpxTorem(60),'height':rpxTorem(60),'border-radius':rpxTorem(60),'border':appendStr(rpxTorem(2),' solid #fff'),'margin-left':rpxTorem(-20)}"
                            >
                            <img
                                src="../../assets/images/user-pic.png"
                                :style="{'width':rpxTorem(60),'height':rpxTorem(60),'border-radius':rpxTorem(60),'border':appendStr(rpxTorem(2),' solid #fff'),'margin-left':rpxTorem(-20)}"
                            >
                        </div>
                        <p
                            :style="{'width':rpxTorem(300),'height':rpxTorem(40),'text-align':'center','line-height':rpxTorem(40),'font-size':rpxTorem(20),'color':'#fff','margin-top':rpxTorem(10),'border-radius':rpxTorem(6),'background':'#FF4A47'}"
                        >{{pt.tz}}位团长发起{{pt.tgr}}人接龙{{pt.count}}件</p>
                    </div>
                </div>
            </div>
            <!--拼团模块 end-->
            <!-- 引导页 start-->
            <!-- <div class="guide-page" v-if="pageSet.kp_m>0 && !kp">
                <img :src="pageSet.kp" alt>
                <span class="timeout">{{pageSet.kp_m}}S跳过</span>
            </div> -->
            <!--引导页 end -->
            <!--弹窗广告 start-->
            <div class="popup-ad" v-if="isAD">
                <div class="popup-wrap">
                    <div class="popup-cont">
                        <span
                            @click="openUrl(pageSet.tc_url)"
                            :data-link="pageSet.tc_url"
                            class="img-box"
                        >
                            <img :src="pageSet.tc" alt>
                        </span>
                        <a
                            href="javascript:void(0);"
                            class="close-btn"
                            style="background-image:url(http://wxkf2.nttrip.cn/addons/sudu8_page/template/diy/resource/images/diypage/default/c.png);"
                            @click="isAD=false"
                        ></a>
                    </div>
                </div>
            </div>
            <!--弹窗广告 end-->
        </div>
    </div>
</template>
<script>
import { Swipe, SwipeItem, Tab, Tabs } from "vant";
export default {
    data() {
        return {
            bak: 0,
            pageDatas: {
                items: []
            },
            pageSet: {
                //引导页和弹窗广告的测试数据
                id: "38",
                pid: "209",
                uniacid: "7",
                go_home: "1",
                kp:
                    "http://wxkf2.nttrip.cn/addons/sudu8_page/template/diy/resource/images/diypage/default/default_start.jpg",
                kp_is: "2",
                kp_url: "",
                kp_urltype: "",
                kp_m: "0",
                tc:
                    "http://wxkf2.nttrip.cn/addons/sudu8_page/template/diy/resource/images/diypage/default/tcgg.jpg",
                tc_is: "1",
                tc_url: "www.baidu.com",
                tc_urltype: "",
                foot_is: "1",
                diy_bg_music: ""
            },
            showvideo_diy: 0,
            timer: {},
            kp: false,
            isAD:false
        };
    },
    components: {
        "van-swipe": Swipe,
        "van-swipe-item": SwipeItem,
        "van-tab": Tab,
        "van-tabs": Tabs
    },
    mounted() {
        let _this = this;
        let _bak = _this.$route.query.bak;
        if (!_this.util.isEmpty(_bak)) {
            _this.bak = _bak;
        }
        let _kp = sessionStorage.getItem("kp");
        if (!_this.util.isEmpty(_kp)) {
            _this.kp = _kp;
        }
        let _loading = _this.$xzLoading();
        _this.post(
            {
                method: "api.module.diy.diy.one",
                bak: _this.bak
            },
            function(res) {
                _loading.clear();
                res.result.page = JSON.parse(res.result.page);
                res.result.items = JSON.parse(res.result.items);
                res.result.page_config = JSON.parse(res.result.page_config);
                _this.pageDatas = res.result;
                // console.log(_this.pageDatas);
                // if (!_this.kp) {
                //     _this.startTimer();
                // }
            }
        );
    },
    computed: {
        winW() {
            return document.body.clientWidth;
        }
    },
    methods: {
        rpxTorem(rpx) {
            return rpx / 75 + "rem";
        },
        appendStr(num, str) {
            return num + str;
        },
        decode(input) {
            var _keyStr =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            output = _utf8_decode(output);
            return output;

            function _utf8_decode(utftext) {
                var string = "";
                var i = 0;
                var c, c1, c2, c3;
                c = c1 = c2 = c3 = 0;
                while (i < utftext.length) {
                    c = utftext.charCodeAt(i);
                    if (c < 128) {
                        string += String.fromCharCode(c);
                        i++;
                    } else if (c > 191 && c < 224) {
                        c2 = utftext.charCodeAt(i + 1);
                        string += String.fromCharCode(
                            ((c & 31) << 6) | (c2 & 63)
                        );
                        i += 2;
                    } else {
                        c2 = utftext.charCodeAt(i + 1);
                        c3 = utftext.charCodeAt(i + 2);
                        string += String.fromCharCode(
                            ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
                        );
                        i += 3;
                    }
                }
                return string;
            }
        },
        closeVedio() {
            this.showvideo_diy = 0;
        },
        openUrl(url) {
            // 跳转页面
            window.location.href = url;
        },
        startTimer() {
            let _this = this;
            if (!_this.util.isEmpty(_this.pageSet.kp_m)) {
                _this.pageSet.kp_m = Number(_this.pageSet.kp_m);
                _this.timer = setInterval(() => {
                    if (_this.pageSet.kp_m > 0) {
                        _this.pageSet.kp_m--;
                    } else {
                        clearInterval(_this.timer);
                        _this.timer = null;
                        sessionStorage.setItem("kp", true);
                    }
                }, 1000);
            }
        }
    },
    created() {}
};
</script>
<style>
.van-swipe__indicator {
    width: 0.2rem;
    height: 0.2rem;
    border-radius: 50%;
}

.text-hide {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.index_video_p {
    width: 100%;
    height: 100%;
}

.index_video_v {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 10000;
}

.cvideo_close {
    display: block;
    width: 50px;
    height: 50px;
    margin: 10px auto;
    z-index: 10000;
}
.guide-page {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100% !important;
    z-index: 10001;
}
.guide-page img {
    display: block;
    width: 100%;
    height: 100%;
}
.guide-page .timeout {
    z-index: 3000;
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 12px;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    color: #fff;
}

.popup-ad {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.2);
}
.popup-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    display: table;
}
.popup-cont {
    padding: 0 80px;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
.img-box {
    display: block;
    margin: 0 auto;
    width: 500px;
    height: 600px;
    background-color: #fff;
    border: 1px solid #e4eaec;
    border-radius: 8px;
    -webkit-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    overflow: hidden;
}
.img-box img {
    display: block;
    width: 100%;
    height: 100%;
}
.close-btn {
    margin: 30px auto;
    display: block;
    width: 80px;
    height: 80px;
    background-size: cover;
}
</style>
