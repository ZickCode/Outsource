/*import MdBanner from './modules/banner.vue';
import MdTab from './modules/tab.vue';
import MdBtns from './modules/btns.vue';
import MdSubline from './modules/subline.vue';
import MdBlank from './modules/blank.vue';
import MdAtlas from './modules/atlas.vue';
import MdSearch from './modules/search.vue';
import MdBtn from './modules/btn.vue';
import MdPicwindow from './modules/picwindow.vue';
import MdTitle from './modules/title.vue';
import MdNotice from './modules/notice.vue';
import MdProduct from './modules/product.vue';
import MdCoupon from './modules/coupon.vue';

export { MdBanner, MdTab, MdBtns, MdSubline, MdBlank, MdAtlas, MdSearch, MdBtn, MdPicwindow, MdTitle, MdNotice, MdProduct, MdCoupon }*/

exports.MdBanner = resolve => {
  require(['./modules/banner.vue'], resolve)
}
exports.MdTab = resolve => {
  require(['./modules/tab.vue'], resolve)
}
exports.MdBtns = resolve => {
  require(['./modules/btns.vue'], resolve)
}
exports.MdSubline = resolve => {
  require(['./modules/subline.vue'], resolve)
}
exports.MdBlank = resolve => {
  require(['./modules/blank.vue'], resolve)
}
exports.MdAtlas = resolve => {
  require(['./modules/atlas.vue'], resolve)
}
exports.MdSearch = resolve => {
  require(['./modules/search.vue'], resolve)
}
exports.MdBtn = resolve => {
  require(['./modules/btn.vue'], resolve)
}
exports.MdPicwindow = resolve => {
  require(['./modules/picwindow.vue'], resolve)
}
exports.MdTitle = resolve => {
  require(['./modules/title.vue'], resolve)
}
exports.MdNotice = resolve => {
  require(['./modules/notice.vue'], resolve)
}
exports.MdProduct = resolve => {
  require(['./modules/product.vue'], resolve)
}
exports.MdCoupon = resolve => {
  require(['./modules/coupon.vue'], resolve)
}