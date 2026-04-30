document.getElementById("formContacto").addEventListener("submit", function(e){
    e.preventDefault();

    // 🔥 TU NÚMERO (CAMBIAR)
    const telefono = "5491134007699"; // formato: 549 + área + número

    // 📥 DATOS
    const nombre = document.querySelector('[name="nombre"]').value;
    const apellido = document.querySelector('[name="apellido"]').value;
    const empresa = document.querySelector('[name="empresa"]').value;
    const email = document.querySelector('[name="email"]').value;
    const tel = document.querySelector('[name="telefono"]').value;
    const pais = document.querySelector('[name="pais"]').value;
    const mensaje = document.querySelector('[name="mensaje"]').value;

    // 🧾 MENSAJE
    const texto = 
`📩 NUEVO CONTACTO WEB

👤 Nombre: ${nombre} ${apellido}
🏢 Empresa: ${empresa}
📧 Email: ${email}
📱 Teléfono: ${tel}
🌎 País: ${pais}

💬 Mensaje:
${mensaje}`;

    // 🔗 LINK WHATSAPP
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;

    // 🚀 ABRIR WHATSAPP
    alert("Te redirigimos a WhatsApp para enviar tu mensaje");
    window.open(url, "_blank");
});