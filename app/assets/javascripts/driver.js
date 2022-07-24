function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
var request = window.superagent;
var mymap = L.map('map');
if( storageAvailable('localStorage') ){
const key   = "speedkamo";
const value = "0";

try{
  localStorage.setItem(key, value);
}
catch(e){
  console.log(e);
}
}
else{
  alert("WebStorageが利用できないため急激な速度上昇を感知できません");
}
L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank">国土地理院</a>',
}).addTo(mymap);

// 音声読み上げON/OFFフラグ
let speakCommentFlg = 0;

// 音声読み上げスイッチ
function speakSwitch() {
  let speakMsg = new SpeechSynthesisUtterance('音声警告機能をオンにしました。');
  speakMsg.lang = 'ja-JP';
  speakMsg.rate = 1.0;
  if ( speakCommentFlg == 1 ) {
    speakCommentFlg = 0;
    speakMsg.text = 'コメント読み上げをオフにしました。';
    window.speechSynthesis.speak(speakMsg);
    return;
  }
  speakCommentFlg = 1;
  speakMsg.text = 'コメント読み上げをオンにしました。';
  window.speechSynthesis.speak(speakMsg);
}

var utterance = new SpeechSynthesisUtterance();
utterance.name = "Google 日本語"
utterance.lang = "ja-JP"
utterance.rate = 0.7
document.getElementById("tenkibutton").onclick = function() {
document.getElementById('hyouji').innerHTML = `<h1>運転サポートモードON</h1>`
document.getElementById('onoff').innerHTML = `<button type="button" class="btn btn-danger" id="offbutton">運転支援を終了する</button>`
  if( navigator.geolocation ){
  	let marker;
	navigator.geolocation.getCurrentPosition(

       
	function( position ){
		  var yomiage = `運転支援モードがオンになりました。運転支援を開始します`
      utterance.text = yomiage;
      speechSynthesis.speak(utterance);
			var data = position.coords ;

			var lat = data.latitude ;
			var lng = data.longitude ;
			var alt = data.altitude ;
			console.log(lat,lng)
			marker = L.marker([lat, lng]).addTo(mymap);
			
           
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
           postData('https://foryo-guruto.herokuapp.com/')
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
			var errorMessage = errorInfo[ errorNo ] ;
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
	    let speedmoto  = position.coords.speed;
	    let speed = speedmoto * 3.6
	    let speednumber = Math.floor(speed);
	    document.getElementById("jisoku").innerHTML = `
	    <div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h2>現在時速 ${speednumber} km(目安)</h2>
        </div>
	    `;
        if( storageAvailable('localStorage') ){
        	if (!speed === null){
        		const key = "speedkamo"
                const value1 = localStorage.getItem(key);
                const valuenum = Number(value1)
                const sabun = speed - value1
            if (sabun > 50){
            document.getElementById( "ido" ).value = lat ;
            document.getElementById( "keido" ).value = lng ;
            document.getElementById( "caution" ).value = "急激な速度上昇" ;
            document.getElementById( "detail" ).value = `差分${sabun}km/h` ;
            document.getElementById("formdesu").submit();
            document.getElementById( "ido" ).value = "" ;
            document.getElementById( "keido" ).value = "" ;
            document.getElementById( "caution" ).value = "" ;
            document.getElementById( "detail" ).value = "" ;
            var jyoushou = `急激な速度上昇を感知しました。差分は時速${sabun}キロメートルです。`
                utterance.text = jyoushou;
               	speechSynthesis.speak(utterance);
        	}}}
        	
        	const key   = "speedkamo";
            const value = speed;

            try{
                localStorage.setItem(key, value);
            }
            catch(e){
                console.log(e);
            }
	    mymap.setView([lat, lng], 17);
	    let marker = L.marker([lat, lng]).addTo(mymap);
	    console.log("SPEED: " + speed)
		})
	}

    const chousupan = () => {
        if (speed > 1){
            if (notifyto === "qqq"){
             document.getElementById( "ido" ).value = lat ;
             document.getElementById( "keido" ).value = lng ;
             document.getElementById( "caution" ).value = "危険速度" ;
             document.getElementById( "detail" ).value = `${speednumber}km/h` ;
             document.getElementById("formdesu").submit();
             document.getElementById( "ido" ).value = "" ;
             document.getElementById( "keido" ).value = "" ;
             document.getElementById( "caution" ).value = "" ;
             document.getElementById( "detail" ).value = "" ;
             document.getElementById("cautionpic").innerHTML = `<img src="https://raw.githubusercontent.com/K-Rintaro/yo-gurutoSEKKEN/main/app/assets/images/caution.png" class="img-fluid" alt="Responsive image">`
                    var sokudochoukadayo = `危険速度を感知しました。感知速度は時速${speednumber}キロメートルです。高速道路の場合はこの限りではありません。`
                    utterance.text = sokudochoukadayo;
                    speechSynthesis.speak(utterance);
            }else{
             async function postData(url = '', data = {}) {
                 const response = await fetch(url, {
                     method: 'POST',
                     headers: {
                         'Content-Type': 'application/json'
                     },
                 body: JSON.stringify({ ido: lat, keido: lng, caution: "危険速度", detail: `${speednumber}km/h`, to: notifyto }) 
                })
                return response.json();
             }
            postData('https://foryo-guruto.herokuapp.com/slacker')
            .then(data => {
                console.log(data)
            })
            setTimeout(function(){
             document.getElementById( "ido" ).value = lat ;
             document.getElementById( "keido" ).value = lng ;
             document.getElementById( "caution" ).value = "危険速度" ;
             document.getElementById( "detail" ).value = `${speednumber}km/h` ;
             document.getElementById("formdesu").submit();
             document.getElementById( "ido" ).value = "" ;
             document.getElementById( "keido" ).value = "" ;
             document.getElementById( "caution" ).value = "" ;
             document.getElementById( "detail" ).value = "" ;
             document.getElementById("cautionpic").innerHTML = `<img src="https://raw.githubusercontent.com/K-Rintaro/yo-gurutoSEKKEN/main/app/assets/images/caution.png" class="img-fluid" alt="Responsive image">`
                    var sokudochoukadayo = `危険速度を感知しました。感知速度は時速${speednumber}キロメートルです。高速道路の場合はこの限りではありません。`
                    utterance.text = sokudochoukadayo;
                    speechSynthesis.speak(utterance);
             }, 3000);
            }
         }
    }
	
	setInterval(checkdayo, 1000);
    setInterval(chousupan, 10000);


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