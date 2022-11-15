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
