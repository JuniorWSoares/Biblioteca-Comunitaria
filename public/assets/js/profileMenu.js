const profileIcon = document.getElementById("profileIcon");
const profileMenu = document.getElementById("profileMenu");

profileIcon.addEventListener("click", () => {
    profileMenu.style.display =
        profileMenu.style.display === "flex" ? "none" : "flex";
});

document.addEventListener("click", (e) => {
    if (!profileIcon.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.style.display = "none";
    }
});