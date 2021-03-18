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
               var tenki = data[0]
               var tenkidetail = data[1]
               if (tenkidetail = "clear sky"){
               	var yomiagetenki = `現在地のお天気は快晴です。安全な運転を宜しくお願いいたします`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail = "few clouds"){
               	var yomiagetenki = `現在地のお天気は晴れです。安全な運転を宜しくお願いいたします`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail = "scattered clouds"){
               	var yomiagetenki = `現在地のお天気は曇りです。急な天気の変化にはご注意ください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail = "broken clouds"){
               	var yomiagetenki = `現在地のお天気は千切れ雲です。急な天気の変化にはご注意ください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail = "shower rain"){
               	var yomiagetenki = `現在地のお天気は小雨です。スリップにはご注意ください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail = "rain"){
               	var yomiagetenki = `現在地のお天気は雨です。視界が悪い場合があります。スリップにはご注意ください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail = "thunderstorm"){
               	var yomiagetenki = `現在地のお天気は雷雨です。視界が悪い場合があります。スリップにはご注意ください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail = "snow"){
               	var yomiagetenki = `現在地のお天気は雪です。視界が悪い場合があります。スリップにはご注意ください`
               	utterance.text = yomiagetenki;
               	speechSynthesis.speak(utterance);
               }else if (tenkidetail = "mist"){
               	var yomiagetenki = `現在地のお天気は霧です。視界が悪い場合があります。注意して走行してください`
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
			"enableHighAccuracy": false,
			"timeout": 10000,
			"maximumAge": 2000,
		}

	) ;
	navigator.geolocation.watchPosition((position) => {
	    const speed  = position.coords.speed;
	    console.log("SPEED: " + speed)
	    document.getElementById("jisoku").innerHTML = `
	    <div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h2>現在時速 ${speed} km(目安)</h2>
    </div>
	    `
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