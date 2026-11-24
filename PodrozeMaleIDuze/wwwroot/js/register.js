document.addEventListener("DOMContentLoaded", () => {
    const haslo = document.getElementById("Password");
    const pasek = document.getElementById("passwordStrengthBar");
    const opis = document.getElementById("passwordStrengthText");

    document.querySelectorAll("[data-password-toggle]")
        .forEach(przycisk => {
            przycisk.addEventListener("click", () => {
                const pole = document.getElementById(
                    przycisk.dataset.passwordToggle
                );

                if (!pole) return;

                const widoczne = pole.type === "password";

                pole.type = widoczne ? "text" : "password";

                przycisk.setAttribute(
                    "aria-label",
                    widoczne ? "Ukryj hasło" : "Pokaż hasło"
                );
            });
        });

    function sprawdzHaslo() {
        if (!haslo || !pasek || !opis) return;

        const wartosc = haslo.value;
        let punkty = 0;

        if (wartosc.length >= 8) punkty++;
        if (/[a-z]/.test(wartosc) && /[A-Z]/.test(wartosc)) punkty++;
        if (/\d/.test(wartosc)) punkty++;
        if (wartosc.length >= 12) punkty++;

        const poprawne =
            wartosc.length >= 8 &&
            /[a-z]/.test(wartosc) &&
            /[A-Z]/.test(wartosc) &&
            /\d/.test(wartosc);

        if (wartosc.length === 0) {
            pasek.style.width = "0";
            opis.textContent = "Min. 8 znaków, w tym wielka i mała litera oraz cyfra.";
        } else if (!poprawne) {
            pasek.style.width = `${Math.max(punkty, 1) * 25}%`;
            pasek.style.background = "#C2604F";
            opis.textContent = "Hasło nie spełnia wymagań";
        } else if (punkty < 4) {
            pasek.style.width = "65%";
            pasek.style.background = "#E5AB60";
            opis.textContent = "Prawidłowe, ale słabe hasło";
        } else {
            pasek.style.width = "100%";
            pasek.style.background = "#5F9678";
            opis.textContent = "Hasło ma dobrą długość";
        }
    }

    haslo?.addEventListener("input", sprawdzHaslo);

    const formularz = document.getElementById("registerForm");
    const zgoda = document.getElementById("AcceptPrivacy");
    const bladZgody = document.getElementById("privacyLiveError");

    function sprawdzZgode() {
        if (!zgoda || !bladZgody) return true;

        if (!zgoda.checked) {
            bladZgody.textContent =
                "Zaakceptuj politykę prywatności, aby założyć konto.";
            return false;
        }

        bladZgody.textContent = "";
        return true;
    }

    zgoda?.addEventListener("change", sprawdzZgode);

    formularz?.addEventListener("submit", event => {
        if (!sprawdzZgode()) {
            event.preventDefault();
        }
    });

    const link = document.getElementById("registerPrivacyLink");

    link?.addEventListener("click", event => {
        event.preventDefault();

        const przyciskPolityki = document.getElementById("privacyBtn");

        if (przyciskPolityki?.getAttribute("aria-expanded") !== "true") {
            przyciskPolityki?.click();
        }

        document.getElementById("stopka")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
    });
});