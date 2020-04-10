var tall = document.querySelector('.tall')
var weight = document.querySelector('.weight')
var list = document.querySelector('.list');
var btn = document.querySelector('.btn')

var data = JSON.parse(localStorage.getItem('info'))||[];

update(data)


//儲存
btn.addEventListener('click',save)

function save(){

	var tallval = tall.value;
	var weightval = weight.value;
	if(tallval.trim() === ""||weightval.trim()===""){return}
	content = {ta: tallval, we: weightval};
	data.push(content)
	update(data)
	localStorage.setItem("info",JSON.stringify(data));
	tall.value = "";
	weight.value = "";
}

//更新
function update(){
	var str = "";


	for(var i=0; i<data.length; i++){
	var ta2 = (data[i].ta)/100
	var result
	var sty
	cacu = data[i].we/(ta2*ta2)
	var caculate = (cacu.toFixed(2))

	if(caculate <= 15){result = "非常嚴重的體重不足"}
	else if(caculate > 15 && caculate <= 16){result = " 嚴重體重不足"}
	else if(caculate > 16 && caculate <= 18.5){result = " 體重過輕"}
	else if(caculate > 18.5 && caculate <= 25){result = " 體重正常"}
	else if(caculate > 25 && caculate <= 30){result = " 體重過重"}
	else if(caculate > 30 && caculate <= 35){result = " 中等肥胖"}
	else if(caculate > 35 && caculate <= 40){result = " 嚴重肥胖"}
		else{result ="非常嚴重肥胖"}

	if(caculate <= 15){sty = '#6f2fff'}
	else if(caculate > 15 && caculate <= 16){sty = '#2f96ff'}
	else if(caculate > 16 && caculate <= 18.5){sty = '#2fffd5'}
	else if(caculate > 18.5 && caculate <= 25){sty = '#2fff39'}
	else if(caculate > 25 && caculate <= 30){sty = '#ff982d'}
	else if(caculate > 30 && caculate <= 35){sty = '#ff6c03'}
	else if(caculate > 35 && caculate <= 40){sty = '#ff6c03'}
		else{sty ='#ff1200'}
	
	var dt = new Date();
	var year = dt.getFullYear();
	var month = dt.getMonth()+1;
	var date = dt.getDate();
	var dash = "-";
		content='<div class="input" style="border-left: 4px solid '+sty+'">'
				+'<div class="result">'+result+'</div>'
				+'<div class="bmi">BMI: '+caculate+'</div>'
				+'<div class="tall">身高 '+data[i].ta+' 公分</div>'
				+'<div class="weight">體重 '+data[i].we+' 公斤</div>'
				+'<div class="date">'+date+dash+month+dash+year+'</div>'
				+'<input data-num="'+i+'" type="button" class="del" value="刪除">'
				+'</div>'
				
	str+=content
	}
list.innerHTML=str;
};

//刪除資料
list.addEventListener('click',rem);

function rem(e){
	var el = e.target.nodeName;
	if(el !== "INPUT"){return}
	var num = e.target.dataset.num;
	data.splice(num,1);
	localStorage.setItem("info",JSON.stringify(data));
	update(data);
};

//ENTER 輸入資料
tall.addEventListener("keydown",ent)

function ent(e){
	switch(e.keyCode){
	case 13:
		save(data);
		break;
	}
}

weight.addEventListener("keydown",ent)

function ent(e){
	switch(e.keyCode){
	case 13:
		save(data);
		break;
	}
}

