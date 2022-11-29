import axios from "axios";

// Update password
export const ChangePassword = async (
  currentPassword,
  newpassword,
  validpassword,
  setsuccess,
  seterror,
  user
) => {
  let data = JSON.stringify({
    currentPassword: currentPassword,
    password: newpassword,
    validPassword: validpassword,
  });

  let config = {
    method: "put",
    url:
      "http://141.94.31.123:4000/api/user/password/" + JSON.parse(user).userId,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  if (newpassword === validpassword) {
    await axios(config)
      .then(function (response) {
        setsuccess(response.data);
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
  } else seterror("Les mots de passe ne correspondent pas.");
};

// Update data user
export const UpdateDataUser = async (
  name,
  firstname,
  email,
  adresse,
  postalcode,
  city,
  tel,
  profilPicture,
  cv,
  user,
  setsuccess,
  seterror,
  setUser
) => {
  if (name && firstname && email && adresse && postalcode && city && tel) {
    // response et datapicture son charger de récupurer l'image de profil ainsi que les octets si seul le cv est envoyer
    let fetchPicture = await fetch(JSON.parse(user).profilPicture);
    let datapicture = await fetchPicture.blob();

    let fetchcv = await fetch(JSON.parse(user).cv);
    let datacv = await fetchcv.blob();

    var data = new FormData();
    data.append("name", name);
    data.append("firstname", firstname);
    data.append("email", email);
    data.append("adress", adresse);
    data.append("postalcode", postalcode);
    data.append("city", city);
    data.append("tel", tel);
    // verification afin de savoir si un nouveau cv a été ajouter afin de lui laisser l'ancien
    !Array.isArray(cv)
      ? data.append("cv", cv)
      : data.append(
          "cv",
          new File([datacv], JSON.parse(user).cv, {
            type: null,
          })
        );

    // verification afin de savoir si une nouvelle photo a été ajouter afin de lui laisser l'ancien
    !Array.isArray(profilPicture)
      ? data.append("profilPicture", profilPicture)
      : data.append(
          "profilPicture",
          new File([datapicture], JSON.parse(user).profilPicture, {
            type: null,
          })
        );
    var config = {
      method: "put",
      url: "http://141.94.31.123:4000/api/user/" + JSON.parse(user).userId,
      data: data,
      headers: {
        Authorization: `Bearer ${JSON.parse(user).token}`,
      },
    };

    axios(config)
      .then(function (response) {
        setsuccess("Bravo vos données ont bien été modifier.");
        // SUPPRESSION DU COOKIE
        document.cookie =
          "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
      });
  } else {
    seterror("Veuillez remplir tous les champs");
    setTimeout(() => {
      seterror("");
    }, 5000);
  }
};

// Read data user
export const ReadUserData = async (
  user,
  setname,
  setfirstname,
  setemail,
  setadress,
  setpostalcode,
  setcity,
  settel
) => {
  var config = {
    method: "get",
    url: "http://141.94.31.123:4000/api/user/" + JSON.parse(user).userId,
    headers: {},
  };

  await axios(config)
    .then(function (response) {
      setname(response.data.name);
      setfirstname(response.data.firstname);
      setemail(response.data.email);
      setadress(response.data.adress);
      setpostalcode(response.data.postalcode.toString());
      setcity(response.data.city);
      settel(response.data.tel.toString());
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const Logout = (setUser, setmodalSetting) => {
  document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  setUser([]);
  setmodalSetting(false);
};

export const SignUp = async (
  name,
  firstname,
  email,
  password,
  adress,
  postalcode,
  city,
  tel,
  cv,
  profilPicture,
  setloading,
  setUser,
  setisModal,
  seterr
) => {
  var formData = new FormData();
  formData.append("name", name);
  formData.append("firstname", firstname);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("adress", adress);
  formData.append("postalcode", postalcode);
  formData.append("city", city);
  formData.append("tel", tel);
  formData.append("cv", cv);
  formData.append("profilPicture", profilPicture);

  var config = {
    method: "post",
    url: "http://141.94.31.123:4000/api/user",
    data: formData,
  };

  setloading(true);

  setTimeout(() => {
    axios(config)
      .then(function (response) {
        console.log(response);
        setUser(JSON.stringify(response.data));
        setisModal(false);
        setloading(false);

        // CREATION DU COOKIE
        let date = new Date(Date.now() + 86400000); //86400000ms = 1 jour
        date = date.toUTCString();
        document.cookie =
          "user=" + JSON.stringify(response.data) + "; path=/; expires=" + date;
      })
      .catch(function (error) {
        console.log(error);
        seterr(error.response.data);
      });
  }, 2000);
};
