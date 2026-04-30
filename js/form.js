const form = document.getElementById("formContacto");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const formData = new FormData(form);

    fetch("form.php", {
        method: "POST",
        body: formData
    })
    .then(res => res.text())
    .then(data => {
        if(data.trim() === "OK"){
            alert("Mensaje enviado correctamente");
            form.reset();
        } else if(data.trim() === "EMAIL"){
            alert("Email inválido");
        } else {
            alert("Error al enviar");
        }
    })
    .catch(() => {
        alert("Error de conexión");
    });
});
