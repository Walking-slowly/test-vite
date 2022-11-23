import Mock from 'mockjs'


Mock.mock("/api/login", {
	code: 200,
	msg: "登陆成功",
	user: {
		name: "zeng8",
		score: 2048,
		rank: 10
	},
	token: "kjkjalsdiiuioayeuryqowierqiwerqowiery"
})