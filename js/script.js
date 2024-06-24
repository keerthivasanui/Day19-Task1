const select = document.getElementsByClassName("currency");
const button = document.getElementsByClassName("btnn")[0]; 
const input = document.getElementsByClassName("input")[0];

// Fetch currency data from the API and initialize dropdown
fetch("https://api.frankfurter.app/currencies")
  .then((res) => res.json())
  .then((res) => dropDown(res));
// Function to populate dropdowns with currency options
function dropDown(res) {
  let curr = Object.entries(res);
  for (let i = 0; i < curr.length; i++) {
    let opt = `<option value="${curr[i][0]}">${curr[i][0]}</option>`;
 // Append options to both select elements (left and right)
    select[0].innerHTML += opt;
    select[1].innerHTML += opt;
  // }
}
// Add event listener to the "Convert" button
button.addEventListener("click", () => {
  let curr1 = select[0].value;
  let curr2 = select[1].value;
  let inputValue = input.value;
  if (curr1 === curr2) alert("Choose different country");
  else convert(curr1, curr2, inputValue);
});

// Fetch data for currency conversion
function convert(curr1, curr2, inputValue) {
  const host = 'api.frankfurter.app';
fetch(`https://${host}/latest?amount=${inputValue}&from=${curr1}&to=${curr2}`)
    .then((resp) => resp.json())
    .then((data) => {
      document.getElementsByClassName("result")[0].value = Object.values(data.rates)[0];
    });
}}