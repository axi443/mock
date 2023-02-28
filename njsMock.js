const fs = require("fs");
// mock.js
const Mock = require("mockjs");
const Random = Mock.Random;
const area = require("./area");

Random.extend({
  area: function () {
    return this.pick(area);
  },
});
Random.extend({
  date: function (index) {
    var res;
    var date = [
      "2020-01-01",
      "2020-02-01",
      "2020-03-01",
      "2020-04-01",
      "2020-05-01",
      "2020-06-01",
      "2020-07-01",
      "2020-08-01",
      "2020-09-01",
      "2020-10-01",
      "2020-11-01",
      "2020-12-01",
    ];
	return res = date[index];
  },
});
// 判断市级行政
Random.extend({
  switch: function (code) {
    var res;
    if (code >= 130100 && code < 130200) {
      res = ["石家庄", 130100];
    } else if (code >= 130200 && code < 130300) {
      res = ["唐山市", 130200];
    } else if (code >= 130300 && code < 130400) {
      res = ["秦皇岛市", 130300];
    } else if (code >= 130400 && code < 130500) {
      res = ["邯郸市", 130400];
    } else if (code >= 130500 && code < 130600) {
      res = ["邢台市", 130500];
    } else if (code >= 130600 && code < 130700) {
      res = ["保定市", 130600];
    } else if (code >= 130700 && code < 130800) {
      res = ["张家口市", 130700];
    } else if (code >= 130800 && code < 130900) {
      res = ["承德市", 130800];
    } else if (code >= 130900 && code < 131000) {
      res = ["沧州市", 130900];
    } else if (code >= 131000 && code < 131100) {
      res = ["廊坊市", 131000];
    } else {
      res = ["衡水市", 131100];
    }
    return res;
  },
});

var result = [];
var index = 12;

for (let a = 0; a < area.length; a++) {
	for (var i = 0; i < index; i++) {
		// 地址县级编码
		// var xj_code = Random.area().code;
		// console.log(xj_code);
		// 地址县级名称
		// var xj_name = Random.area().name;
		// console.log(xj_name);
		var xj_code = area[a].code;
		var xj_name = area[a].name;
		var date = Random.date(i);
		var work_area =  Random.natural(10000, 30000);
		var upstandard_area = work_area - Random.natural(2500, 5000);
		// 所属地区
		var ssdq = Random.switch(xj_code);
		// console.log(ssdq);
		const data = Mock.mock({
		  // 全局自增ID
		  id: i + 1,
		  // 地址——乡镇级——编码
		  xzj_code: "",
		  // 地址——乡镇级——编码
		  xzj_name: "",
		  // 地址——县级——编码
		  xj_code: xj_code,
		  // 县级行政名称
		  xj_name: xj_name,
		  // 地址-市级-编码
		  sj_code: ssdq[1],
		  // 市级行政名称
		  sj_name: ssdq[0],
		  // 作业数量
		  work_num: Random.natural(1000, 3000),
		  // 作业面积
		  work_area: work_area,
		  // 达标面积
		  upstandard_area,
		  // 达标作业率
		  upstandard_work: parseInt((upstandard_area/work_area).toFixed(2) *100)+"%",
		  // 组及行政编码
		  ancestors: `130000,${ssdq[1]},${xj_code}`,
		  // 统计日期
		  summary_date: date,
		  // 作业类型数量
		  type_count: Random.natural(1, 13)
		});
		// console.log(data);
		result.push(data);
	  }
	
}




result = JSON.stringify(result);
fs.writeFile("./result.json", result, function (err) {
  if (err) throw err;
  console.log("生成完毕");
});
