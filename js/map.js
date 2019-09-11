window.onload = function displayGooglemMap() {
  // 東京をMapの中心におく
  let latitude  = 35.710063;//緯度
  let longitude = 139.8107;//経度
  // 位置情報
  let latlng = new google.maps.LatLng(latitude, longitude);
  // Google Mapsに書き出し
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5 ,// ズーム値
    center: latlng,// 中心座標
  });
  console.log(latlng.lat());
  db.collection("users").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data().geopoint);
      marker = new google.maps.Marker({
        map: map,
        position: doc.data().geopoint,
      });
    });
  });
};