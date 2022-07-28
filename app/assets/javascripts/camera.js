(function () {
    if (
      !"mediaDevices" in navigator ||
      !"getUserMedia" in navigator.mediaDevices
    ) {
      alert("エラー：カメラを起動できませんでした。設定をご確認ください。");
      return;
    }
  
    // get page elements
    const video = document.querySelector("#video");
    const btnScreenshot = document.querySelector("#btnScreenshot");
    const screenshotsContainer = document.querySelector("#screenshots");
    const canvas = document.querySelector("#canvas");
  
    // video constraints
    const constraints = {
      video: {
        width: {
          min: 1280,
          ideal: 1920,
          max: 2560,
        },
        height: {
          min: 720,
          ideal: 1080,
          max: 1440,
        },
        facingMode: "environment"
      },
    };
    let videoStream;

    // take screenshot
    btnScreenshot.addEventListener("click", function () {
      const img = document.createElement("img");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      img.src = canvas.toDataURL("image/png");
      screenshotsContainer.prepend(img);
      initializeCamera();
    });

      // initialize
  async function initializeCamera() {
    try {
      videoStream = await navigator.mediaDevices.getUserMedia(constraints);
      video.srcObject = videoStream;
    } catch (err) {
      alert("Could not access the camera");
    }
  }

  function start(id) {
	id = setInterval(function () {
        const img = document.createElement("img");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);
        img.src = canvas.toDataURL("image/png");
        screenshotsContainer.prepend(img);
        initializeCamera();
        cocoSsd.load().then(model => {
          model.detect(img).then(predictions => {
              console.log('Predictions: ', predictions);
          });
      });
	}, 20000);
  }

start('id');


  })();