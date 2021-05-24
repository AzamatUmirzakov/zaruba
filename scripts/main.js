function adaptivity() {
  // centering cards
  let cards = document.querySelector("ul.cards");

  let margin = getComputedStyle(document.querySelector(".center")).marginLeft;

  // cards.style.left = margin;

  cards.style.top = `-${
    parseFloat(getComputedStyle(cards.firstElementChild).height) +
    parseFloat(getComputedStyle(cards.parentElement.parentElement).paddingTop)
  }px`;

  for (let li of cards.children) {
    let img = li.querySelector("img");
    img.style.left = `calc(50% - ${
      parseFloat(getComputedStyle(img).width) / 2
    }px`;
  }

  if (document.documentElement.clientWidth > 1270)
    for (let item of document.querySelectorAll(".feature-block")) {
      item.style.paddingLeft = margin;
      item.style.paddingRight = margin;
    }
  else {
    for (let item of document.querySelectorAll(".feature-block")) {
      item.style.paddingLeft = "0px";
      item.style.paddingRight = "0px";
    }
  }

  let img_text = document.querySelector(".image-text");
  img_text.style.left = `calc(50% - ${
    parseFloat(getComputedStyle(img_text).width) / 2
  }px)`;

  let line_images = document.querySelector(".line-images");
  for (let img of line_images.children) {
    img.addEventListener("load", () => {
      let left = parseFloat(getComputedStyle(img).left);
      setInterval(() => {
        let margin = getComputedStyle(
          document.querySelector(".center")
        ).marginLeft;
        img.style.left = parseFloat(margin) + left + "px";
      }, 100);
    });
  }

  if (window.matchMedia("(min-width: 2050px)")) {
    let feature_images = document.querySelector(".feature-images");
    feature_images.style.left = parseFloat(margin) + 900 + "px";
  }
}

setInterval(adaptivity, 100);
adaptivity();

// registration button

let registration_buttons = document.querySelectorAll(".registration-button");

for (let button of registration_buttons) {
  button.addEventListener("click", () => {
    show_popup();
  });
}

function show_popup() {
  function click_listener(e) {
    if (!popup.contains(e.target)) {
      document.body.style.overflow = "";
      document.querySelector(".popup").style.opacity = "0";
      setTimeout(() => {
        document.querySelector(".popup").remove();
        document.querySelector(".popup-bg").remove();
        for (let child of document.body.children) {
          child.style.filter = "";
          child.style.transform = "";
          // child.style.margin = "";
        }
        document.querySelector(".features").style.background =
          "linear-gradient(180deg, #edb613 0%, #eda00b 100%)";

        document.querySelector(".wave img").src = "assets/wave-up.png";
        document.removeEventListener("click", click_listener);
        Array.from(document.querySelectorAll(".wave"))[1].querySelector(
          "img"
        ).src = "assets/wave-bottom.svg";
        document.querySelector(".page-footer").style.background = "#eda00b";
      }, 350);
    }
  }
  document.body.style.overflow = "hidden";
  let popup = document.createElement("div");
  popup.className = "popup";
  popup.id = "unblurred";

  document.querySelector(".wave img").src = "assets/wave-up-blue.png";

  document.querySelector(".features").style.background = "#250f5e";
  // document.querySelector(".features").style.background = "#26105f";

  document.querySelector(".page-footer").style.background = "#2d1371";
  Array.from(document.querySelectorAll(".wave"))[1].querySelector("img").src =
    "assets/wave-bottom-blue.svg";

  for (let child of document.body.children) {
    if (child.id != "unblurred") {
      child.style.filter = "blur(10px)";
      child.style.transform = "scale(1.01)";
    }
  }
  document.querySelector(".features").style.transform = "scale(1.1)";

  let popup_bg = document.createElement("div");
  popup_bg.className = "popup-bg";
  let header = document.createElement("h1");
  header.innerHTML = "Регистрация";
  let form = document.createElement("form");
  // nickname
  let nickname = document.createElement("label");
  nickname.innerHTML = "Никнейм";
  nickname.htmlFor = "nickname";
  let nickname_input = document.createElement("input");
  nickname_input.type = "text";
  nickname_input.placeholder = "Никнейм";
  nickname_input.name = "nickname";
  nickname.append(nickname_input);
  // password
  let password = document.createElement("label");
  password.innerHTML = "Пароль";
  password.htmlFor = "password";
  let password_input = document.createElement("input");
  password_input.type = "password";
  password_input.placeholder = "Пароль";
  password_input.name = "password";
  password.append(password_input);
  // submit button
  let button = document.createElement("button");
  button.type = "submit";
  button.className = "yellow-button";
  button.innerHTML = "Зарегистрироваться";
  form.append(nickname);
  form.append(password);
  form.append(button);
  popup.append(header);
  popup.append(form);
  // pushing it to body
  popup.style.opacity = "0";
  document.body.append(popup_bg);
  document.body.append(popup);
  popup.style.transition = "all 0.3s ease-in-out";

  setTimeout(() => {
    popup.style.opacity = "1";
  }, 0);
  popup.style.left =
    document.documentElement.clientWidth / 2 - popup.offsetWidth / 2 + "px";
  popup.style.top =
    document.documentElement.clientHeight / 2 - popup.offsetHeight / 2 + "px";
  setTimeout(() => {
    document.addEventListener("click", click_listener);
  }, 0);
}

// window.onload = function () {
// animating header
document.querySelector(".header-image").style.opacity = "1";
document.querySelector(".header-image").style.right = "0px";
document.querySelector(".header-text").style.opacity = "1";
document.querySelector(".header-text h1").style.bottom = "0";
document.querySelector(".header-text p").style.bottom = "0";
//
// animating cards
// };

function cards_animate() {
  let scroll_y = window.pageYOffset;
  let cards = document.querySelector("ul.cards");
  let cards_children = Array.from(cards.children);
  if (
    scroll_y + document.documentElement.clientHeight >
    cards.getBoundingClientRect().top + window.pageYOffset
  ) {
    for (let card of cards_children) {
      card.style.opacity = "1";
      card.style.bottom = "0";
    }
    document.removeEventListener("scroll", cards_animate);
  }
}

function feature_images_animate() {
  let feature_block = document.querySelector(".feature-block:first-of-type");
  let feature_images = feature_block.querySelector(".feature-images");
  let scroll_y = window.pageYOffset;
  if (
    scroll_y + document.documentElement.clientHeight >
    feature_block.getBoundingClientRect().top + window.pageYOffset
  ) {
    feature_images.firstElementChild.style.transform = "rotate(-15deg)";
    feature_images.firstElementChild.style.bottom = "-50px";
    feature_images.firstElementChild.style.opacity = "1";
    feature_images.lastElementChild.style.transform = "rotate(9deg)";
    feature_images.lastElementChild.style.bottom = "40px";
    feature_images.lastElementChild.style.opacity = "1";
    document.removeEventListener("scroll", feature_images_animate);
  }
}

function feature_text_animate() {
  let feature_block = document.querySelector(".feature-block:last-of-type");
  let feature_text = feature_block.querySelector("img.image-text");
  let scroll_y = window.pageYOffset;
  if (
    scroll_y + document.documentElement.clientHeight >
    feature_block.getBoundingClientRect().top + window.pageYOffset
  ) {
    feature_text.style.opacity = "1";
    feature_text.style.top = "0";
    document.removeEventListener("scroll", feature_text_animate);
  }
}
document.addEventListener("scroll", cards_animate);
document.addEventListener("scroll", feature_images_animate);
document.addEventListener("scroll", feature_text_animate);
cards_animate();
feature_images_animate();
feature_text_animate();
