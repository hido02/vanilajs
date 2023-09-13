// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyAj9RPqB0Hq9bBR_vPofutC-RdCvcoyhAM",
  authDomain: "profile-72fa5.firebaseapp.com",
  databaseURL: "https://profile-72fa5-default-rtdb.firebaseio.com",
  projectId: "profile-72fa5",
  storageBucket: "profile-72fa5.appspot.com",
  messagingSenderId: "89887876522",
  appId: "1:89887876522:web:0b7a48cfc65eb009a537d3",
  measurementId: "G-VKDKR915SC"
};
firebase.initializeApp(firebaseConfig);
  
  function uploadPhoto() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (!file) {
      alert('Please select a photo.');
      return;
    }
  
    const photoKey = Date.now().toString();
    const photoUrl = `https://profile-72fa5.appspot.com/${photoKey}.jpg`;
  
    // Firebase Storage에 사진 업로드
    uploadPhotoToStorage(photoKey, file).then(() => {
      // Firebase에 메타데이터 저장
      savePhotoMetadata(photoKey, photoUrl);
    }).catch((error) => {
      console.error(error);
      alert('An error occurred while uploading the photo.');
    });
  }
  
  // Firebase Storage에 사진 업로드
  function uploadPhotoToStorage(photoKey, file) {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const photoRef = storageRef.child(`${photoKey}.jpg`);
  
    return photoRef.put(file);
  }
  
  // Firebase에 사진 메타데이터 저장
  function savePhotoMetadata(photoKey, photoUrl) {
    const db = firebase.database();
    const photoRef = db.ref('photos/' + photoKey);
    photoRef.set({
      url: photoUrl,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    }, (error) => {
      if (error) {
        console.error(error);
        alert('An error occurred while saving photo metadata.');
      } else {
        displayPhoto(photoKey, photoUrl);
      }
    });
  }
  
  // 업로드된 사진 표시
  function displayPhoto(photoKey, photoUrl) {
    const photoList = document.getElementById('photoList');
    const img = document.createElement('img');
    const photoUrl2 = `https://firebasestorage.googleapis.com/v0/b/profile-72fa5.appspot.com/o/${photoKey}.jpg?alt=media&token=b39e814f-6b94-417b-a824-f866a4d37f13`;
    img.src = photoUrl2;
    img.alt = 'Uploaded Photo';
    img.style.maxWidth = '300px';
    photoList.appendChild(img);
  }