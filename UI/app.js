const dropArea = document.getElementById("dropArea");
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const resultDiv = document.getElementById("result");
const dropText = document.getElementById("dropText");

// Prevent default drag behaviors
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, (e) => e.preventDefault());
  dropArea.addEventListener(eventName, (e) => e.stopPropagation());
});

// Highlight drop area on dragover
["dragenter", "dragover"].forEach((eventName) => {
  dropArea.addEventListener(eventName, () =>
    dropArea.classList.add("dragover")
  );
});
["dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, () =>
    dropArea.classList.remove("dragover")
  );
});

// Handle dropped files
dropArea.addEventListener("drop", (e) => {
  const files = e.dataTransfer.files;
  if (files.length) {
    imageInput.files = files;
    showPreview(files[0]);
  }
});

// Handle click to open file dialog
dropArea.addEventListener("click", () => imageInput.click());

// Handle file selection
imageInput.addEventListener("change", function (e) {
  if (e.target.files[0]) {
    showPreview(e.target.files[0]);
  }
});

function showPreview(file) {
  preview.innerHTML = "";
  const reader = new FileReader();
  reader.onload = function (evt) {
    const img = document.createElement("img");
    img.src = evt.target.result;
    preview.appendChild(img);
  };
  reader.readAsDataURL(file);
}

document.getElementById("uploadBtn").addEventListener("click", function () {
  const file = imageInput.files[0];
  resultDiv.textContent = "";
  if (!file) {
    resultDiv.textContent = "Please select an image.";
    return;
  }

  resultDiv.innerHTML = '<span style="color:#2563eb;">Detecting...</span>';

  const reader = new FileReader();
  reader.onload = function (evt) {
    fetch("http://localhost:5000/classify_image", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "image_data=" + encodeURIComponent(evt.target.result),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const res = data[0];
          resultDiv.innerHTML = `
                    <div>
                        <span style="font-size:1.2em;color:#2563eb;font-weight:700;">${
                          res.class
                        }</span><br>
                        <span style="color:#555;">Confidence: <b>${
                          res.class_probability[res.class_dictionary[res.class]]
                        }%</b></span>
                    </div>
                `;
        } else {
          resultDiv.innerHTML =
            '<span style="color:#e11d48;">No face detected or unable to classify.</span>';
        }
      })
      .catch(() => {
        resultDiv.innerHTML =
          '<span style="color:#e11d48;">Error connecting to server.</span>';
      });
  };
  reader.readAsDataURL(file);
});
