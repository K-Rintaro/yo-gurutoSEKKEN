var request = window.superagent;
var mymap = L.map('map');
L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>',
}).addTo(mymap);
//以下６行はテスト用
request
  .post("/logs")
  .send({caution: "危険速度(一般道の場合)", ido: 34.79128922409639, keido: 135.43262141323024, detail: `50km/h`})
  .end(function(err, res){
  });
//ここまで
const utterance = new SpeechSynthesisUtterance();
utterance.name = "Google 日本語"
utterance.lang = "ja-JP"
utterance.rate = 0.7
document.getElementById("tenkibutton").onclick = function() {
document.getElementById('hyouji').innerHTML = `<h1>運転サポートモードON</h1>`
document.getElementById('onoff').innerHTML = `<button type="button" class="btn btn-danger" id="offbutton">運転支援を終了する</button>`
  if( navigator.geolocation ){
	navigator.geolocation.getCurrentPosition(

		function( position )
		{
		  var yomiage = `運転支援モードがオンになりました。運転支援を開始します`
      utterance.text = yomiage;
      speechSynthesis.speak(utterance);
			var data = position.coords ;

			var lat = data.latitude ;
			var lng = data.longitude ;
			var alt = data.altitude ;
			console.log(lat,lng)
			
           
           async function postData(url = '', data = {}) {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                body: JSON.stringify({ ido: lat, keido: lng }) 
               })
               return response.json();
            }
           postData('https://foryo-gurutosekken.herokuapp.com/')
           .then(data => {
               console.log(data);
               var tenkidetail = data[1]
               if (tenkidetail == "clear sky"){
               	var yomiagetenki = `現在地のお天気は快晴です。安全な運転を宜しくお願いいたします`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail == "few clouds"){
               	var yomiagetenki = `現在地のお天気は晴れです。安全な運転を宜しくお願いいたします`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail == "scattered clouds"){
               	var yomiagetenki = `現在地のお天気は曇りです。急な天気の変化にはご注意ください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail == "broken clouds"){
               	var yomiagetenki = `現在地のお天気は千切れ雲です。急な天気の変化にはご注意ください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail == "shower rain"){
               	var yomiagetenki = `現在地のお天気は小雨です。スリップにはご注意ください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail == "rain"){
               	var yomiagetenki = `現在地のお天気は雨です。視界が悪い場合があります。スリップにはご注意ください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail == "thunderstorm"){
               	var yomiagetenki = `現在地のお天気は雷雨です。視界が悪い場合があります。スリップにはご注意ください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail == "snow"){
               	var yomiagetenki = `現在地のお天気は雪です。視界が悪い場合があります。スリップにはご注意ください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail == "mist"){
               	var yomiagetenki = `現在地のお天気は霧です。視界が悪い場合があります。注意して走行してください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail == "light rain"){
               	var yomiagetenki = `現在地のお天気は雨です。視界が悪い場合があります。スリップにはご注意ください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail == "moderate rain"){
               	var yomiagetenki = `現在地のお天気は雨です。視界が悪い場合があります。スリップにはご注意ください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else{
               	var yomiagetenki = `現在地のお天気は${tenkidetail}です。`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }
            });
		},
		function( error )
		{
			var errorInfo = [
				"原因不明のエラーが発生しました…。" ,
				"位置情報の取得が許可されませんでした…。" ,
				"電波状況などで位置情報が取得できませんでした…。" ,
				"位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
			] ;
			var errorNo = error.code ;
			var errorMessage = "エラー番号:" + errorNo + errorInfo[ errorNo ] ;
			utterance.text = errorMessage;
			speechSynthesis.speak(utterance);
		} ,

		{
			"enableHighAccuracy": true,
			"timeout": 10000,
			"maximumAge": 2000,
		}

	) ;
	
	const checkdayo = () => {
		navigator.geolocation.getCurrentPosition((position) => {
		let lat = position.coords.latitude;
	    let lng = position.coords.longitude;
	    let speed  = position.coords.speed;
	    let speednumber = Math.floor(speed);
	    
	    if (speed > 3){
	           	var sokudochoukadayo = `危険速度を感知しました。感知速度は時速${speednumber}キロメートルです。高速道路の場合はこの限りではありません。`
               	utterance.text = sokudochoukadayo;
               	speechSynthesis.speak(utterance);
	        $.ajax({
	            url: urldesuu,
	            type: "POST",
	            data: {caution: "危険速度(一般道の場合)", ido: lat, keido: lng, detail: `${speednumber}km/h`}
	        })
	    }
	    mymap.setView([lat, lng], 17);   
	    console.log("SPEED: " + speed)
	    document.getElementById("jisoku").innerHTML = `
	    <div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h2>現在時速 ${speednumber} km(目安)</h2>
    </div>
	    `;
		})
	}
	setInterval(checkdayo, 1000);


	navigator.geolocation.watchPosition((position) => {
	let speed  = position.coords.speed;
	window.setTimeout(nullhantei, 5000);
    function nullhantei(){
	    if(speed === null){
	    document.getElementById("jisoku").innerHTML =`
	    <div class="alert alert-danger" role="alert">
            お使いの端末ではスピードを測定できません。対応するAndroid端末ないしはiPhoneでご利用ください
        </div>
	    `
	    }
    }
});
}
else
{
	var errorMessage = "お使いの端末は、GeoLacation APIに対応していません。" ;
	utterance.text = errorMessage;
	speechSynthesis.speak(utterance);
}

document.getElementById("offbutton").onclick = function() {
    document.getElementById('hyouji').innerHTML = `<h1>運転支援モードを終了します。マイページに移動します。</h1>`
    var yomiage = `運転支援モードを終了します。マイページに移動します。`
    utterance.text = yomiage;
    speechSynthesis.speak(utterance);
    window.setTimeout(dispMsg, 6000);
    function dispMsg(){
        let motourl = document.getElementById('kokogairu')
        let url = motourl.childNodes[0].href
        location.href = url;
    }
};
};