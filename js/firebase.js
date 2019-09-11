let geopoint;
function saveData() {
  db.collection("users").add({
    name: document.forms.form_id.name.value,
    address: document.forms.form_id.address.value,
    geopoint: geopoint
  })
  .then(function(docRef) {
    document.forms.form_id.name.value = '';
    document.forms.form_id.address.value = '';
    document.getElementById("results").innerHTML = '<p class="success">保存に成功しました</p>';
    console.log("Document written with ID: ", docRef.id);
  })
  .catch(function (error) {
    document.getElementById("results").innerHTML = '<p class="success">保存に失敗しました</p>';
    console.error("Error adding document: ", error);
  });  
}

function getLatLng() {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    address: document.forms.form_id.address.value
  }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        geopoint = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        }
      }
  })
  setTimeout(saveData, 1000)
}