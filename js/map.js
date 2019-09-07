let output = document.getElementById("result");
let friend = document.getElementById("friend");
function getMyPlace() {
  if (!navigator.geolocation){//Geolocation apiがサポートされていない場合
    output.innerHTML = "<p>Geolocationはあなたのブラウザーでサポートされておりません</p>";
    return;
  }
  navigator.geolocation.getCurrentPosition(success, error);//成功と失敗を判断
}

function success(position) {  
  let latitude  = position.coords.latitude;//緯度
  let longitude = position.coords.longitude;//経度
  let geocoder = new google.maps.Geocoder();
  // 位置情報
  let latlng = new google.maps.LatLng(latitude, longitude);
  geocoder.geocode({ 'latLng': latlng }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      let address_comp = results[0].address_components;
      let pref = address_comp[address_comp.length -3].short_name;
      let city = address_comp[address_comp.length -4].short_name;
      let prefCity = pref + city
      getNearFriend(pref, city);
      document.getElementById('address').innerHTML = prefCity;
    } else {
      alert("エラー！" + status);
    }
  });
  // Google Mapsに書き出し
  let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15 ,// ズーム値
      center: latlng ,// 中心座標
  });
  // マーカーの新規出力
  new google.maps.Marker({
      map: map,
      position: latlng,
  });
};

function error() {
  //エラーの場合
  output.innerHTML = "座標位置を取得できません";
};

function getNearFriend(pref, city) {
  let name = [];
  let ref = db.collection("users")
              .where("prefecture", "==", pref)
              .where("city", "==", city);
  ref.get().then(function (query) {
    query.forEach(function (doc) {
      name.push(doc.data().name);
      friend.innerHTML = "<span>近くに" + name + "さんがいます。</span>";
    });
    output.innerHTML = "<span>近くの友達は" + query.docs.length + "人です。</span>";
  })
    .catch((error) => {
      console.log(error);
  });
}