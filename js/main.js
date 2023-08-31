const customerName = document.getElementById("name");
const email = document.getElementById("email");
const dob = document.getElementById("dob");
const address = document.getElementById("location");
const pincode = document.getElementById("pincode");
const password = document.getElementById("password");
const image = document.getElementById("bulb-image");
const button = document.querySelector(".on-off-button");
const body = document.querySelector("body");
const glowCount = document.getElementById("glow-count");
const welcome = document.getElementById("welcome");
const informationOn = document.getElementById("information-on");
const informationOff = document.getElementById("information-off");
const dataInformation = document.querySelector(".information");
const inputData = JSON.parse(localStorage.getItem("userData")) || [];
const uniqueName = inputData[inputData.length - 1].name;
const burnCountKey = `burnCount_${uniqueName}`;
const bulbStateKey = `bulbState_${uniqueName}`;
const isBulbOn = localStorage.getItem(bulbStateKey) === 'true';

let burnCount = 0;
burnCount = localStorage.getItem(burnCountKey) || 0;
glowCount.innerHTML = burnCount;

function saveData() {
  if (
    !customerName.value ||
    !email.value ||
    !dob.value ||
    !address.value ||
    !pincode.value ||
    !password.value
  ) {
    alert("Blank Field Not Allowed");
  } else window.location.href = "action.html";
  inputData.push({
    name: customerName.value,
    email: email.value,
    dob: dob.value,
    location: address.value,
    pincode: pincode.value,
    password: password.value,
    id: new Date().getTime(),
  });
  localStorage.setItem("userData", JSON.stringify(inputData));
}

welcome.innerHTML = `<div>
<p class="text-4xl text-center p-5">Welcome: ${inputData[inputData.length - 1].name
  }</p>
</div>`;

button.onclick = () => {
  dataInformation.classList.remove("hidden");
  if (image.src.match("on")) {
    image.src = "./image/off.png";
    informationOff.innerHTML += `<div>
      <p>Turned Off</p>
      <p>${new Date()}</p>
    </div>`;
  } else {
    image.src = "./image/on.png";
    burnCount++;
    localStorage.setItem(burnCountKey, burnCount);
    glowCount.innerHTML = burnCount;
    informationOn.innerHTML += `<div>
      <p>Turned On</p>
      <p>${new Date()}</p>
    </div>`;
  }
  body.classList.toggle("on");

  const isBulbOn = image.src.includes("on");
  localStorage.setItem(bulbStateKey, isBulbOn);
};

if (isBulbOn) {
  image.src = "./image/on.png";
  body.classList.add("on");
} else {
  image.src = "./image/off.png";
  body.classList.remove("on");
}
