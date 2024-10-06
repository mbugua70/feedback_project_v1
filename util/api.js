const form = document.getElementById("data_form");
const inputs = document.querySelectorAll("input");
const selectElements = document.querySelectorAll("select_els");
const selectElContainer_1 = document.getElementById("sub_1_19");
const selectElContainer_2 = document.getElementById("sub_1_6");
const selectElContainer_3 = document.getElementById("sub_1_11");
const selectElContainer_4 = document.getElementById("sub_1_21");
const selectElContainer_5 = document.getElementById("sub_1_13");
const selectElContainer_6 = document.getElementById("sub_1_15");

const hideContainerOne = document.getElementById("hide_container_one");
const hideContainerTwo = document.getElementById("hide_container_two");
const hideContainerThree = document.getElementById("hide_container_three");
const hideContainerFour = document.getElementById("hide_container_four");
const hideContainerFive = document.getElementById("hide_container_five");
const hideContainerSix = document.getElementById("hide_container_six");

// hide functionality

selectElContainer_1.addEventListener(
  "input",
  function () {
    valueOne = $("#sub_1_19").val();
    if ($("#others_4").val() === valueOne) {
      hideContainerOne.style.display = "block";
    } else {
      hideContainerOne.style.display = "none";
    }
  },
  false
);

selectElContainer_2.addEventListener(
  "input",
  function () {
    valueOne = $("#sub_1_6").val();
    if ($("#no_6").val() === valueOne) {
      hideContainerTwo.style.display = "block";
    } else {
      hideContainerTwo.style.display = "none";
    }
  },
  false
);

selectElContainer_3.addEventListener(
  "input",
  function () {
    valueOne = $("#sub_1_11").val();
    if ($("#yes_11").val() === valueOne) {
      hideContainerThree.style.display = "block";
    } else {
      hideContainerThree.style.display = "none";
    }
  },
  false
);

selectElContainer_4.addEventListener(
  "input",
  function () {
    valueOne = $("#sub_1_21").val();
    if ($("#others_21").val() === valueOne) {
      hideContainerFour.style.display = "block";
    } else {
      hideContainerFour.style.display = "none";
    }
  },
  false
);

selectElContainer_5.addEventListener(
  "input",
  function () {
    valueOne = $("#sub_1_13").val();
    if ($("#others_13").val() === valueOne) {
      hideContainerFive.style.display = "block";
    } else {
      hideContainerFive.style.display = "none";
    }
  },
  false
);

selectElContainer_6.addEventListener(
  "input",
  function () {
    valueOne = $("#sub_1_15").val();
    if ($("#others_15").val() === valueOne) {
      hideContainerSix.style.display = "block";
    } else {
      hideContainerSix.style.display = "none";
    }
  },
  false
);

form.addEventListener(
  "submit",
  async function (e) {
    e.preventDefault();
    const formData_one = new FormData(form);

    const sub_1_1 = formData_one.get("sub_1_1");
    const sub_1_2 = formData_one.get("sub_1_2");
    const sub_1_3 = formData_one.get("sub_1_3");
    const sub_1_4 = formData_one.get("sub_1_4");
    const sub_1_5 = formData_one.get("sub_1_5");
    const sub_1_6 = formData_one.get("sub_1_6");

    if (sub_1_1 === "") {
      appNotifier("Please fill in all the required fields!");
    } else {
      //  appending to the formData object created above

      //    checking the consent
      const { value: accept } = await Swal.fire({
        title: "CONSENT",
        input: "checkbox",
        inputValue: 1,
        inputPlaceholder: `
          By submitting this form, you agree to receive communications from KSPCA and understand that you can opt-out anytime
        `,
        confirmButtonText: `
          Continue&nbsp;<i class="fa fa-arrow-right"></i>
        `,
        inputValidator: (result) => {
          return !result && "You need to agree with T&C";
        },
      });

      if (accept) {
        // form submission

        setTimeout(() => {
          fetch("https://iguru.co.ke/kspca/process/BM.php", {
            method: "POST",
            body: formData_one,
          })
            .then((res) => res.json())
            .then((data) => {
              if (!data.error) {
                Toastify({
                  text: "Thank your for the feedback!",
                  duration: 3000,
                  newWindow: true,
                  close: true,
                  gravity: "top", // position the toast either top or bottom
                  position: "center", // toast left or right or center of the page
                  stopOnFocus: true, // Prevents dismissing of toast on hover
                  style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                  },
                  onClick: function () {}, // Callback after click
                }).showToast();
                shouldProceed = false;
              } else {
              }
            })
            .catch((err) => {
              console.log(err);
              if (err.message === "Failed to fetch") {
                appNotifier("Network error, Please try again!");
                shouldProceed = false;
              } else {
                appNotifier("Operation has not been completed!");
              }
            });
        }, 0);
      }

      inputs.forEach((input) => {
        input.value = "";
      });

      selectElements.forEach((selectItems) => {
        selectItems.value = "";
      });
    }
  },
  false
);



function validationForm(input_test) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return re.test(input_test);
}




const workingNotifier = (message) => {
  new swal({
    title: message,
    text: "",
    icon: "success",
  }).then((result) => {
    if(result.isConfirmed){
      location.reload();
    }
  });
};

function appNotifier(message) {
  new swal({
    title: message,
    text: "",
    icon: "warning",
  });
}
