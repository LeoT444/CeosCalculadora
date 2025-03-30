document.addEventListener("DOMContentLoaded", function () {
    const btnSobre = document.getElementById("btn-sobre");
    const sectionSobre = document.getElementById("sobre-nos");

    if (btnSobre && sectionSobre) {
        btnSobre.addEventListener("click", function () {
            sectionSobre.scrollIntoView({ behavior: "smooth" });
        });
    }
});
