var to = "labelartsurvie@gmail.com";
var subject = "Nouveau Message";

document.getElementById("sendBtn").addEventListener("click", function () {
  var nom = document.getElementById("nom").value.trim();
  var mail = document.getElementById("mail").value.trim();
  var subj = document.getElementById("subj").value.trim();
  var message =
    " Nom : " +
    nom +
    "\n Email : " +
    mail +
    "\n Subject : " +
    subj +
    "\n\n" +
    document.getElementById("message").value.trim();
  // Vérifier si tous les champs sont remplis
  if (nom === "" || mail === "" || subj === "" || message === "") {
    alert("Veuillez remplir tous les champs du formulaire.");
    return; // Arrêter l'exécution de la fonction si un champ est vide
  }

  fetch("https://codingmailer.onrender.com/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: to,
      subject: subject,
      message: message,
    }),
  })
    .then(function (response) {
      if (response.ok) {
        alert("E-mail envoyé avec succès.");
        // Réinitialiser les champs du formulaire
        document.getElementById("nom").value = "";
        document.getElementById("mail").value = "";
        document.getElementById("subj").value = "";
        document.getElementById("message").value = "";
        document.getElementById("errorContainer").textContent = ""; // Effacer le message d'erreur précédent
      } else {
        response.json().then(function (data) {
          var errorMessage =
            data && data.message
              ? data.message
              : "Erreur lors de l'envoi de l'e-mail.";
          document.getElementById("errorContainer").textContent =
            "Erreur : " + errorMessage;
        });
      }
    })
    .catch(function (error) {
      console.log("Erreur lors de la requête :", error);
      document.getElementById("errorContainer").textContent =
        "Erreur lors de la requête : " + error;
    });
});
