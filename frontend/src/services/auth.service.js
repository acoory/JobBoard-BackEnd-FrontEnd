import axios from "axios";

// LOG IN USER AND COMPANIE
export const SignIn = async (
  loginEmail,
  loginPassword,
  setloader,
  setUser,
  setisModal,
  setloginerror
) => {
  setloader(true);
  let data = JSON.stringify({
    email: loginEmail,
    password: loginPassword,
  });

  let config = {
    method: "post",
    url: "http://141.94.31.123:4000/api/auth",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  if (loginEmail && loginPassword) {
    setTimeout(() => {
      axios(config)
        .then(function (response, status) {
          setloader(false);
          setUser(JSON.stringify(response.data));
          setisModal(false);

          // CREATION DU COOKIE
          let date = new Date(Date.now() + 8000000); //86400000ms = 1 jour
          date = date.toUTCString();
          document.cookie =
            "user=" +
            JSON.stringify(response.data) +
            "; path=/; expires=" +
            date;
        })
        .catch(function (error) {
          setloginerror("Email ou mot de passe incorrect.");
          setloader(false);
        });
    }, 1000);
  } else {
    setloginerror("Veuillez remplir tous les champs.");
    setloader(false);
  }
};
