import axios from "axios";

// read data
export const ReadCompanieData = async (user, setemail, setname) => {
  let config = {
    method: "get",
    url: "http://localhost:4000/api/companie/" + JSON.parse(user).userId,
    headers: {},
  };

  await axios(config)
    .then(function (response) {
      setemail(response.data.email);
      setname(response.data.name);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// update data
export const UpdateDataUser = async (
  user,
  name,
  email,
  logo,
  setsuccess,
  setUser,
  seterror
) => {
  // response et datapicture son charger de récupurer l'image de profil ainsi que les octets si seul le cv est envoyer
  let fetchPicture = await fetch(JSON.parse(user).logo);
  let datapicture = await fetchPicture.blob();

  let data = new FormData();
  data.append("name", name);
  data.append("email", email);
  // data.append("profilPicture", logo);
  !Array.isArray(logo)
    ? data.append("profilPicture", logo)
    : data.append(
        "profilPicture",
        new File([datapicture], JSON.parse(user).logo, {
          type: null,
        })
      );

  let config = {
    method: "put",
    url: "http://localhost:4000/api/companie/" + JSON.parse(user).userId,
    data: data,
  };

  axios(config)
    .then(function (response) {
      setsuccess("Bravo vos données ont bien été modifier.");
      // SUPPRESSION DU COOKIE
      document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // AJOUT DU NOUVEAU COOKIE
      let date = new Date(Date.now() + 8000000); //86400000ms = 1 jour
      date = date.toUTCString();
      document.cookie =
        "user=" + JSON.stringify(response.data) + "; path=/; expires=" + date;
      // REINSERTION DES DONNES
      setUser(JSON.stringify(response.data));
      setTimeout(() => {
        setsuccess("");
      }, 5000);
    })
    .catch(function (error) {
      console.log(error);
      seterror(error.response.data);
      setTimeout(() => {
        seterror("");
      }, 5000);
    });
};

// update password
export const ChangePassword = async (
  currentPassword,
  newpassword,
  user,
  validpassword,
  setsuccess,
  seterror
) => {
  let data = JSON.stringify({
    oldPassword: currentPassword,
    newPassword: newpassword,
  });

  let config = {
    method: "put",
    url:
      "http://localhost:4000/api/companie/password/" +
      JSON.parse(user).userId,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  if (newpassword === validpassword) {
    await axios(config)
      .then(function (response) {
        console.log(response);
        setsuccess("Bravo votre mot de passe à bien été changer.");
        setTimeout(() => {
          setsuccess("");
        }, 5000);
      })
      .catch(function (error) {
        seterror(error.response.data);
        setTimeout(() => {
          seterror("");
        }, 5000);
      });
  } else seterror("Les mots de passe ne corresponde pas.");
};

// disconnect
export const Logout = (setUser, setmodalSetting) => {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  setUser([]);
  setmodalSetting(false);
};

// sign up
export const Signup = async (
  emailCompanie,
  passewordCompanie,
  logoCompanie,
  nameCompanie,
  setloading,
  setUser,
  setisModal,
  seterr
) => {
  var data = new FormData();
  data.append("email", emailCompanie);
  data.append("username", "");
  data.append("password", passewordCompanie);
  data.append("profilPicture", logoCompanie);
  data.append("name", nameCompanie);

  if (emailCompanie && passewordCompanie && nameCompanie && logoCompanie) {
    // activation du loader
    setloading(true);

    // configuration axios
    var config = {
      method: "post",
      url: "http://localhost:4000/api/companie/",
      data: data,
    };

    setTimeout(() => {
      axios(config)
        .then(function (response) {
          setUser(JSON.stringify(response.data));
          setisModal(false);
          setloading(false);

          // CREATION DU COOKIE
          let date = new Date(Date.now() + 86400000); //86400000ms = 1 jour
          date = date.toUTCString();
          document.cookie =
            "user=" +
            JSON.stringify(response.data) +
            "; path=/; expires=" +
            date;
        })
        .catch(function (error) {
          seterr(error.response.data);
          setloading(false);
        });
    }, 2000);
  } else {
    seterr("Veuillez remplir tous les champs.");
  }
};
