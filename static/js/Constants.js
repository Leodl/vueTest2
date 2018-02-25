var Constants = function(){
	var obj = {};
	obj.getsession = function(){
		var session = sessionStorage.getItem("user");
        var info =eval('(' + session + ')');
        console.log(info)
        return info;
	};

	obj.url="106.15.137.203";

   obj.genderObj = {
		"1" : "男",
		"2" : "女",
		"男":"1",
		"女":"2"
	};
	obj.degreeObj = {
		"1" : "大专",
		"2" : "本科",
		"3" : "硕士",
		"4" : "博士",
		"5" : "博士后",
		"6" : "其他",
		"大专" : "1",
		"本科" : "2",
		"硕士" : "3",
		"博士" : "4",
		"博士后":"5",
		"其他" : "6"

	};

	obj.schoolageObj = {
		"1" : "不足1年",
		"2" : "1至3年",
		"3" : "3至5年",
		"4" : "5年以上",
		"不足1年": "1",
		"1至3年":"2",
		"3至5年":"3",
		"5年以上":"4"
	};
	obj.certificateObj = {
		"1" : "有",
		"2" : "无",
		"有" : "1",
		"无" : "2"
	};







	return obj
}()