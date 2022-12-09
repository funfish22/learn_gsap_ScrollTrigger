var frameNumber = 0
var playbackConst = 1000
var section4 = document.querySelector('.section4')
var scrollHeight = 0
var vid = document.querySelector('.video-fingers')
var videoTop = 0
var windowHeight = window.innerHeight;
var requestId

gsap.to(".box--left", {
    opacity: 1,
    x: "0",
    scrollTrigger: {
        trigger: ".section1", // 觸發選擇器
        start: "top 70%", // 當觸發選擇器的頂端 (左邊的 top) 碰到檢視區頂端 (右邊的 top) 時啟用
        end: "top 40%", // 當觸發選擇器的頂端 (左邊的 top) 碰到檢視區頂端 (右邊的 top) 時啟用, 也可以使用移動幾px end: "+=100",
        scrub: 1, // 是否根據捲動程度決定動畫完成程度，如果填寫數字，則在會延遲 n 秒後才到定位
    },
});
gsap.to(".box--center", {
    opacity: 1,
    scrollTrigger: {
        trigger: ".section1",
        start: "top 60%",
        end: "+=100",
        scrub: !0,
        // pin: true,  // 當動畫執行中的時候，讓觸發選擇器位置固定住
    },
});
gsap.to(".box--right", {
    opacity: 1,
    x: "0",
    scrollTrigger: {
        trigger: ".section1",
        start: "top 50%",
        end: "top 40%",
        scrub: 1, // 是否根據捲動程度決定動畫完成程度，如果填寫數字，則在會延遲 n 秒後才到定位
    },
});

gsap.timeline({
    scrollTrigger: {
        trigger: ".circleRoot",
        start: "top 80%",
        end: "top 20%",
        scrub: !0,
    },
    ease: "strong.inOut",
})
    .fromTo(".circle--left .circleInner", { x: 100 }, { x: 0, opacity: 1 })
    .fromTo(".circle--center .circleInner", { x: 200 }, { x: 0, opacity: 1 })
    .fromTo(".circle--right .circleInner", { x: 300 }, { x: 0, opacity: 1 });

gsap.timeline({
    scrollTrigger: {
        trigger: ".section3",
        start: "top center",
        end: "+=3000",
        scrub: !0,
        pin: true,  // 當動畫執行中的時候，讓觸發選擇器位置固定住
    },
    ease: "strong.inOut",
})
    .fromTo(".x-axis", { x: 0 }, { x: "-75%" });


vid.addEventListener('loadedmetadata', () => {
    scrollHeight = Math.floor(vid.duration) * playbackConst
    // section4.style.height = Math.floor(vid.duration) * playbackConst + "px";
    videoTop = section4.offsetTop
    gsap.timeline({
        scrollTrigger: {
            trigger: ".section4",
            start: "top 0%",
            end: `+=${scrollHeight}`,
            scrub: !0,
            pin: true,  // 當動畫執行中的時候，讓觸發選擇器位置固定住
            onEnter: () => {
                start()
            },
            onEnterBack: () => {
                start()
            },
            onLeaveBack: () => {
                stop()
            },
            onLeave: () => {
                stop()
            }
        }
    })
})

function scrollPlay() {
    requestId = undefined
    var frameNumber  = (window.pageYOffset - videoTop)/playbackConst;
    vid.currentTime  = frameNumber
    start()
}

function start() {
    var frameNumber  = (window.pageYOffset - videoTop)/playbackConst;
    vid.currentTime  = frameNumber
    if (!requestId) {
        requestId = window.requestAnimationFrame(scrollPlay);
    }
}

function stop() {
    if (requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
    }
}