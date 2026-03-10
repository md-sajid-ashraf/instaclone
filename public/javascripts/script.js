const fileInputBtn = document.getElementById("fileInput-btn");
const previewImage = document.getElementById("myImage");

const editProfileBtn = document.getElementById("edit-profile");
const profileImage = document.getElementById("profileImage");

const errorMessage = document.querySelector(".animated");
const editBtn = document.querySelector("#editBtn");
const editDropdown = document.querySelector(".edit-dropdown");

editBtn.addEventListener("click", () => {
  editDropdown.classList.toggle("dropdown-content");
  console.log("clicked");
});

if (!(errorMessage === "")) {
  setTimeout(() => {
    errorMessage.classList.remove("animated");
  }, 2000);
}

// insert photo and preview
// function defaultBtnActive() {
//   fileInputBtn.click();
// }

// document.addEventListener("DOMContentLoaded", function () {

//   const fileInputBtn = document.getElementById("fileInput-btn");
//   const previewImage = document.getElementById("myImage");

//   if (fileInputBtn) {
//     fileInputBtn.addEventListener("change", function () {
//       const file = this.files[0];

//       if (file) {
//         const reader = new FileReader();

//         reader.onload = function () {
//           document.querySelector(".upload-btn").style.display = "none";
//           previewImage.style.display = "block";
//           previewImage.src = reader.result;
//         };

//         reader.readAsDataURL(file);
//         document.querySelector(".bottom button").disabled = false;
//       }
//     });
//   }

// });

document.addEventListener("DOMContentLoaded", function () {
  const fileInput = document.getElementById("fileInput");
  const previewContainer = document.getElementById("previewContainer");
  const previewContainer2 = document.getElementById("previewContainer2");

  fileInput.addEventListener("change", function () {
    previewContainer.innerHTML = "";
    previewContainer2.innerHTML = "";

    const files = this.files;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();

      reader.onload = function (e) {
        const img1 = document.createElement("img");
        img1.src = e.target.result;

        const img2 = document.createElement("img");
        img2.src = e.target.result;

        img1.classList.add("w-full", "object-cover", "rounded-lg", "shadow");
        img2.classList.add("w-full", "object-cover", "rounded-lg", "shadow");
        

        previewContainer.appendChild(img1);
        previewContainer2.appendChild(img2);
      };

      reader.readAsDataURL(file);
    });
  });
});
