//////////////////////
// LEMONPI CALLBACK //
//////////////////////

// Set values from LemonPI Manage-r

var nextClick = false;
var threshold = 5;
var start = 0;

lemonpi.subscribe(function callback(content) {
  // PLACEHOLDER SETTINGS
  // All text
  console.log(content);
  $(".text1").html(content.text1.value);
  $(".text2").html(content.text2.value);
  $(".text3").html(content.text3.value);
  $(".text4").html(content.text4.value);
  $(".btnText").html(content.btnText.value);

  // if (content.blueText && content.blueText.value === true) {
  //   $('.stationText').css('color', '#003082');
  //   $('.stationTextBottom').css('color', '#003082');
  //   }
  // All images
  // creative_container
  $(".img1").css("background-image", "url(" + content.img1.value + ")");
  $(".img2").css("background-image", "url(" + content.img2.value + ")");
  $(".img3").css("background-image", "url(" + content.img3.value + ")");
  $(".phone").css("background-image", "url(" + content.phone.value + ")");
  $(".phoneShadow").css("background-image", "url(" + content.phoneShadow.value + ")");
  $(".btnArrow").css("background-image", "url(" + content.btnArrow.value + ")");
  $(".gradient").css("background-image", "url(" + content.gradient.value + ")");
  $(".logoBlue").css("background-image", "url(" + content.logoBlue.value + ")");

  // CLICKOUT SETTINGS
  // Element for clickout
  var selector1 = document.getElementById("click1");

  // On click function
  selector1.onclick = function () {
    return window.dispatchEvent(
      // Call lemonpi function
      new CustomEvent("lemonpi.interaction/click", {
        detail: {
          // Current placeholder name of url
          placeholder: "clickUrl1",
          query: {},
        },
      })
    );
  };
  var selector2 = document.getElementById("click2");

  // On click function
  selector2.onclick = function () {
    return window.dispatchEvent(
      // Call lemonpi function
      new CustomEvent("lemonpi.interaction/click", {
        detail: {
          // Current placeholder name of url
          placeholder: "clickUrl2",
          query: {},
        },
      })
    );
  };
  var selector3 = document.getElementById("click3");

  // On click function
  selector3.onclick = function () {
    return window.dispatchEvent(
      // Call lemonpi function
      new CustomEvent("lemonpi.interaction/click", {
        detail: {
          // Current placeholder name of url
          placeholder: "clickUrl3",
          query: {},
        },
      })
    );
  };
  var selector4 = document.getElementById("click4");

  // On click function
  selector4.onclick = function () {
    return window.dispatchEvent(
      // Call lemonpi function
      new CustomEvent("lemonpi.interaction/click", {
        detail: {
          // Current placeholder name of url
          placeholder: "clickUrl4",
          query: {},
        },
      })
    );
  };
});

// Debug:
// video = $('.videoSecond').append('<video muted style="width:450px;" src="./video.mp4"></video>').find('video')[0];

window.swiper = new Swiper(".swiper", {
  autoplay: {
    stopOnLastSlide: true,
    delay: 6000,
  },
  grabCursor: true,

  effect: "cube",
  // loop: false,
  stopOnLastSlide: true,
  speed: 600, // 800,
  shortSwipes: true,
  edgeSwipeThreshold: 0.01,

  longSwipes: false,
  longSwipesMs: 50,
  longSwipesRatio: 0.01,

  loopPreventsSlide: true,
  edgeSwipeDetection: true,
  nested: true,
  observer: true,

  preventInteractionOnTransition: true,

  touchMoveStopPropagation: true,
  touchReleaseOnEdges: true,
  touchStartForcePreventDefault: true,

  resistanceRatio: 0.01,
  resizeObserver: false,

  navigation: {
    nextEl: "#navigation-next",
    prevEl: "#navigation-prev",
  },

  cubeEffect: {
    slideShadows: false, // true,
    // shadowScale: 0.34,
    // shadowOffset: 20,
    shadow: false, // true,
  },

  on: {
    slideChange: function (event) {
      event.touches.diff > 0 &&
        setTimeout(function () {
          if (nextClick)
            return setTimeout(function () {
              nextClick = false;
            });

          var duplicate = document.querySelector(
            ".swiper-slide-prev.swiper-slide-duplicate-next"
          );
          duplicate &&
            duplicate.classList.remove("swiper-slide-duplicate-next");
          duplicate && duplicate.classList.remove("swiper-slide-prev");
        });
    },

    touchStart: function (swiper, event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      var left = event.currentTarget.offsetLeft;
      start = event.clientX || event.touches[0].clientX;

      var lStart = threshold + 5;
      var rStart = threshold - 5;

      var l = start - left > lStart;
      var r = start - left < window.swiper.width - rStart;

      window.swiper.allowTouchMove = l && r;
    },

    touchMove: function (swiper, event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (!window.swiper.allowTouchMove) return;
      var clientX = event.clientX || event.touches[0].clientX;

      if (Math.abs(clientX - start) > threshold) {
        var direction = -Math.sign(clientX - start);

        if (!swiper.activeIndex && direction < 0) return;
        if (swiper.activeIndex === 3 && direction > 0) return;

        setTimeout(function () {
          start = clientX;
          window.swiper.allowTouchMove = false;
          window.swiper.slideTo(swiper.activeIndex + direction, 600);
        });
      }
    },

    touchEnd: function (swiper, event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      window.swiper.enabled = true;
      window.swiper.allowTouchMove = false;
    },
  },
});

document
  .getElementById("navigation-prev")
  .addEventListener("click", function () {
    setTimeout(function () {
      var duplicate = document.querySelector(
        ".swiper-slide-prev.swiper-slide-duplicate-next"
      );
      duplicate && duplicate.classList.remove("swiper-slide-duplicate-next");
      duplicate && duplicate.classList.remove("swiper-slide-prev");
    });
  });

document
  .getElementById("navigation-next")
  .addEventListener("click", function () {
    nextClick = true;
  });
