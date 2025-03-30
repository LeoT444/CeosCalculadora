document.addEventListener("DOMContentLoaded", function () {
    const sobreBtn = document.getElementById("btn-sobre"); // ID do botão na navbar
    const container2 = document.querySelector(".container2"); // Seleciona o container2

    if (sobreBtn && container2) {
        sobreBtn.addEventListener("click", function (event) {
            event.preventDefault(); // Evita comportamento padrão do link

            container2.scrollIntoView({
                behavior: "smooth", // Rolagem suave
                block: "start" // Alinha com o topo
            });
        });
    }
});
