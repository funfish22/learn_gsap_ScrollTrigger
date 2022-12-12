var frameNumber = 0;
var playbackConst = 1000;
var section4 = document.querySelector(".section4");
var scrollHeight = 0;
var vid = document.querySelector(".video-fingers");
var videoTop = 0;
var windowHeight = window.innerHeight;
var requestId;
var headphoneCanvas = document.querySelector(".headphone");
const context = headphoneCanvas.getContext("2d");
let headphoneProportion = 800 / 536;

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
		start: "top 0%",
		end: "+=3000",
		scrub: !0,
		pin: true, // 當動畫執行中的時候，讓觸發選擇器位置固定住
	},
	ease: "strong.inOut",
}).fromTo(".x-axis", { x: 0 }, { x: "-75%" });

vid.addEventListener("loadedmetadata", () => {
	scrollHeight = Math.floor(vid.duration) * playbackConst;
	// section4.style.height = Math.floor(vid.duration) * playbackConst + "px";
	videoTop = section4.offsetTop;
	gsap.timeline({
		scrollTrigger: {
			trigger: ".section4",
			start: "top 0%",
			end: `+=${scrollHeight}`,
			scrub: !0,
			pin: true, // 當動畫執行中的時候，讓觸發選擇器位置固定住
			onEnter: () => {
				start();
			},
			onEnterBack: () => {
				start();
			},
			onLeaveBack: () => {
				stop();
			},
			onLeave: () => {
				stop();
			},
		},
	});

	const frameCount = 56;
	const currentFrame = (index) =>
		`https://www.apple.com/105/media/us/airpods-3rd-generation/2021/3c0b27aa-a5fe-4365-a9ae-83c28d10fa21/anim/battery/medium/${index
			.toString()
			.padStart(4, "0")}.jpg`;

	const images = [];
	const airpods = {
		frame: 0,
	};

	for (let i = 0; i < frameCount; i++) {
		const img = new Image();
		img.src = currentFrame(i);
		images.push(img);
	}

	// gsap.to(airpods, {
	// 	frame: frameCount - 1,
	// 	snap: "frame",
	// 	ease: "none",
	// 	scrollTrigger: {
	// 		trigger: ".section5",
	// 		start: "top 0%",
	// 		end: `+=1500`,
	// 		scrub: 0.5,
	// 		pin: true, // 當動畫執行中的時候，讓觸發選擇器位置固定住
	// 	},
	// 	onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
	// })

	let section5 = gsap.timeline({
		scrollTrigger: {
			trigger: ".section5",
			start: "top 0%",
			end: `+=5000`,
			scrub: 0.5,
			pin: true, // 當動畫執行中的時候，讓觸發選擇器位置固定住
		},
	});
	section5
		.to(airpods, {
			frame: frameCount - 1,
			snap: "frame",
			ease: "none",
			onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
		})
		.addLabel("section5Phone");

	section5.to(
		".headphone",
		{
			display: "block",
			scale: 5,
			duration: 2
		},
		"section5Phone"
	);

	section5.to(
		".green",
		{
			keyframes: {
				"3%": { opacity: 1 },
				"50%": {scale: 100}
			},
			display: "block",
			duration: 2
		},
		"section5Phone"
	);

	section5.to(
		".section5__title",
		{
			keyframes: {
				"15%": { opacity: 0 },
				"20%": { opacity: 1 },
			},
			display: "block",
			scale: 10,
			duration: 2
		},
		"section5Phone"
	);

	// gsap.to('.green', {
	// 	scrollTrigger: {
	// 		trigger: ".section5",
	// 		start: "top 100%",
	// 		end: `+=1500`,
	// 	}
	// }, { scale: 1 }, { display: 'block', scale: 5 })

	// section5.to(".green", {
	// 	display: "block",
	// 	scale: 5,
	// });

	// section5.from('green', {
	// 	scrollTrigger: {
	// 		trigger: ".section5",
	// 		start: "top 0%"
	// 	},

	// }, { opacity: 0, scale: 1 }, { opacity: 1, scale: 2.3 })
	// section5.fromTo(".green", { scale: 1 }, { scale: 2.3 });

	images[0].onload = render;

	headphoneCanvas.width = window.innerWidth;
	headphoneCanvas.height = window.innerHeight;

	function render() {
		context.clearRect(0, 0, headphoneCanvas.width, headphoneCanvas.height);
		context.drawImage(
			images[airpods.frame],
			headphoneCanvas.width / 2 - 700,
			headphoneCanvas.height / 2 - 1400 / headphoneProportion / 2,
			1400,
			1400 / headphoneProportion
		);
	}
});

function scrollPlay() {
	requestId = undefined;
	var frameNumber = (window.pageYOffset - videoTop) / playbackConst;
	vid.currentTime = frameNumber;
	start();
}

function start() {
	var frameNumber = (window.pageYOffset - videoTop) / playbackConst;
	vid.currentTime = frameNumber;
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

// headphoneCanvas.width = 800;
// headphoneCanvas.height = 536;
