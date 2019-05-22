let util = {};
const ajaxUrl = process.env.NODE_ENV === 'development' 
? ''//本地接口
: 'https://api.code.net.cn';//线上接口

util.API = ajaxUrl;
util.oauthUrl = ajaxUrl;

export default util;