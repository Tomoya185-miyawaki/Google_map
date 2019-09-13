window.onload = function displayGoogleMap() {
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
  db.collection("users").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      marker = new google.maps.Marker({
        title: doc.data().name,
        map: map,
        position: doc.data().geopoint,
      });
    });
  });
};