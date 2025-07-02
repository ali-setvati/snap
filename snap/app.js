const ImageSlider = {
  active: 1,
  isAnimating: false,
  transform: 0,
  dots: [],
  imagesSource: [
    { number: 0, description: "food", path: "./assets/img/carosel1.webp" },
    { number: 1, description: "food", path: "./assets/img/carosel2.webp" },
    { number: 2, description: "food", path: "./assets/img/carosel3.webp" },
    { number: 3, description: "food", path: "./assets/img/carosel4.webp" },
  ],
  container: document.getElementById("carousel-container"),
  carousel: null,
  init: function () {
    const carousel = document.createElement("div");
    this.carousel = carousel;
    carousel.classList.add("carousel");

    // add images
    this.imagesSource.forEach((image) => {
      const img = document.createElement("img");
      img.src = image.path;
      img.alt = image.description;

      carousel.appendChild(img);
    });

    const rightArrow = document.createElement("div");
    rightArrow.classList.add("right-arrow_carousel", "arrow_carousel");
    rightArrow.innerHTML = "&#10148;";
    const lefttArrow = document.createElement("div");
    lefttArrow.classList.add("left-arrow_carousel", "arrow_carousel");
    lefttArrow.innerHTML = "&#10148;";

    rightArrow.addEventListener("click", (e) => {
      if (this.transform === (this.imagesSource.length - 1) * 100) {
        this.slideImage("left", this.imagesSource.length - 1, "fast");
      } else {
        this.slideImage("right", 1);
      }
    });

    lefttArrow.addEventListener("click", (e) => {
      if (this.transform === 0) {
        this.slideImage("right", this.imagesSource.length - 1, "fast");
      } else {
        this.slideImage("left", 1);
      }
    });

    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add("dots-container_carousel");

    const length = this.imagesSource.length;
    for (let i = 1; i <= length; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dots_carousel");
      const dotDetail = { tagRef: dot, isActive: false };
      if (i === this.active) {
        dot.classList.add("active");
        dotDetail.isActive = true;
      }
      dotsContainer.appendChild(dot);
      dot.addEventListener("click", (e) => {
        if (i === this.active) {
          return;
        }

        const direction =
          i < this.active ? "left" : i > this.active ? "right" : null;
        const count =
          direction === "right"
            ? i - this.active
            : direction === "left"
            ? this.active - i
            : null;

        if (!direction && !count) {
          return;
        }
        const speed = count > 1 ? "fast" : "normal";
        this.slideImage(direction, count, speed);
      });
      this.dots.push(dotDetail);
      // const element = this.imagesSource[i];
    }

    this.container.appendChild(carousel);
    this.container.appendChild(lefttArrow);
    this.container.appendChild(rightArrow);
    this.container.appendChild(dotsContainer);
  },
  slideImage: function (direction, count, speed = "normal") {
    if (this.isAnimating === true) {
      return;
    }
    this.isAnimating = true;
    console.log(direction + " " + count);

    // change active number
    let SpecificIndex =
      direction === "left" ? this.active - count : this.active + count;

    if (SpecificIndex === 0) {
      SpecificIndex = this.imagesSource.length;
    } else if (SpecificIndex > this.imagesSource.length) {
      SpecificIndex = 1;
    }

    this.active = SpecificIndex;

    // change active dot color

    const theDot = this.dots.find((dot) => dot.isActive);
    theDot.tagRef.classList.remove("active");
    theDot.isActive = false;

    const newDot = this.dots[SpecificIndex - 1];

    newDot.tagRef.classList.add("active");
    newDot.isActive = true;

    // change the photo
    const lastPosition = this.transform;
    const goalPosition = (SpecificIndex - 1) * 100; //1 0, 2 100, 3 200, 4 300, 5 400
    let currentPosition = lastPosition;

    const unit = speed === "fast" ? 2 : speed === "normal" ? 1 : 0.5;

    const animationTimer = setInterval(() => {
      switch (direction) {
        case "right":
          if (currentPosition >= goalPosition) {
            clearTimeout(animationTimer);
            break;
          }
          currentPosition += unit;
          break;
        case "left":
          if (currentPosition <= goalPosition) {
            clearTimeout(animationTimer);
            break;
          }

          currentPosition -= unit;
          break;

        default:
          break;
      }

      this.carousel.style.transform = `translateX(-${currentPosition}%)`;
      this.transform = currentPosition;
    }, 1);

    this.isAnimating = false;

    // this.carousel.style.transform = `-400%`;
  },
};

window.addEventListener("DOMContentLoaded", (e) => {
  ImageSlider.init();
});
const down = document.querySelectorAll(".down");
const hiddenBox = document.querySelectorAll(".hiddenBox");
// down.addEventListener("click" , function () {
//   hiddenBox.forEach(element => {
//     this.classList.toggle("active")
//     element.classList.toggle("active")
//   });
// })
down.forEach((element) => {

element.addEventListener("click" , function (e) {

  // this.classList.toggle("active")
    element.classList.toggle("active")
    e.target.parentElement.nextSibling.classList.toggle("active")
    
    
})



});
