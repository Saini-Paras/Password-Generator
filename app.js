const outputArea = document.querySelector(".output__area input");

const btn = document.querySelector(".btn");

const range = document.querySelector(".character__lenght-bar");
const characters = document.querySelector(".characters");

const copyToClipboard = document.querySelector(".copy");
let checkboxes = document.querySelectorAll(".checkbox input");

const strenthText = document.querySelector(".strength");
const strengthBars = document.querySelectorAll(".bar");

//? adding click event on button to generate random password
btn.addEventListener("click", passwordGenerator);

const lowerCharacters = [..."abcdefghijklmnopqrstuvwxyzab"];
const upperCharacters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZAB"];
const numbers = [..."1234567891234567891234567891"];
const symbols = [..."~!@#$%^&*()_-+={[}]|:;<,>.?/"];

//? function to create random password
function passwordGenerator() {
  if (
    !checkboxes[0].checked &&
    !checkboxes[1].checked &&
    !checkboxes[2].checked &&
    !checkboxes[3].checked
  ) {
    alert(new Error("Please check atleast one checkbox"));
  } else {
    checkboxes = Array.from(checkboxes);
    const filteredCheckboxes = checkboxes.filter((checkbox) => {
      return checkbox.checked;
    });
    let newArray = [];

    for (let checkbox of filteredCheckboxes) {
      const selectedCheckbox = checkbox.classList[0];

      if (selectedCheckbox === "symbols") {
        newArray.push(...symbols);
      } else if (selectedCheckbox === "numbers") {
        newArray.push(...numbers);
      } else if (selectedCheckbox === "lowerCharacters") {
        newArray.push(...lowerCharacters);
      } else if (selectedCheckbox === "upperCharacters") {
        newArray.push(...upperCharacters);
      }
    }

    const passwordLength = range.value;

    let combinePassword = "";
    for (i = 0; i < passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * newArray.length);
      let letter = newArray[randomNumber];
      combinePassword += letter;
    }
    outputArea.value = combinePassword;

    //? strenth bars and text 
    if (filteredCheckboxes.length === 1 ) {
      strenthText.textContent = "Too Weak !";

      strengthBars.forEach(bar=>{
        bar.style.background='none';
        bar.style.borderColor='var(--clr-white)';
      })

      strengthBars[0].style.background = "var(--clr-red)";
      strengthBars[0].style.borderColor = "var(--clr-red)";
    } else if (filteredCheckboxes.length === 2) {
      strenthText.textContent = "Weak";
      
      strengthBars.forEach(bar=>{
        bar.style.background='none';
        bar.style.borderColor='var(--clr-white)';
      })
      for (i = 0; i < 2; i++) {
        strengthBars[i].style.background = "var(--clr-orange)";
        strengthBars[i].style.borderColor = "var(--clr-orange)";
      }
    } else if (filteredCheckboxes.length === 3) {
      strenthText.textContent = "Medium";
      
      strengthBars.forEach(bar=>{
        bar.style.background='none';
        bar.style.borderColor='var(--clr-white)';
      })
      for (i = 0; i < 3; i++) {
        strengthBars[i].style.background = "var(--clr-yellow)";
        strengthBars[i].style.borderColor = "var(--clr-yellow)";
      }
    } else if (filteredCheckboxes.length === 4) {
      strenthText.textContent = "Strong";
      
      strengthBars.forEach(bar=>{
        bar.style.background='none';
        bar.style.borderColor='var(--clr-white)';
      })
      for (i = 0; i < 4; i++) {
        strengthBars[i].style.background = "var(--clr-primary)";
        strengthBars[i].style.borderColor = "var(--clr-primary)";
      }
    }
  }
}

// ? updating characters
range.addEventListener("input", (e) => {
  characters.textContent = range.value;
});

//? copy to clipboard functionality
copyToClipboard.addEventListener("click", () => {
  //* navigator.clipboard.writeText() is not working on mobiles
  // navigator.clipboard.writeText(outputArea.value);
  outputArea.select();
  document.execCommand('copy');
  window.getSelection().removeAllRanges()


  //* copy clipboard icon change
  copyToClipboard.classList.add("active");
  copyToClipboard.classList.add("uil-check");
  copyToClipboard.classList.remove("uil-copy-alt");
  document.querySelector(".copied__text").style.display = "block";
  setTimeout(() => {
    document.querySelector(".copied__text").style.display = "none";
    copyToClipboard.classList.add("uil-copy-alt");
    copyToClipboard.classList.remove("uil-check");
    copyToClipboard.classList.remove("active");
  }, 800);
});
