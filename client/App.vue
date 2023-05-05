<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useGame } from './includes/useGame'

export default defineComponent({
	name: 'App',
})
</script>

<script setup lang="ts">
const route = useRoute()
const game = useGame()

const open = ref(true)

game.on('open', () => {
	open.value = true
})

game.on('close', () => {
	open.value = false
})

onMounted(() => game.emit('init'))
</script>

<template>
	<ConstructLayout
		class="main-layout"
		:class="{ hide: !open }"
	>
		<NavigationSidebar v-if="!route.path.startsWith('/login')" />
		<RouterView />
	</ConstructLayout>
</template>

<style lang="scss">
@keyframes flicker {
	0% {
		opacity: 0.27861;
	}
	5% {
		opacity: 0.34769;
	}
	10% {
		opacity: 0.23604;
	}
	15% {
		opacity: 0.90626;
	}
	20% {
		opacity: 0.18128;
	}
	25% {
		opacity: 0.83891;
	}
	30% {
		opacity: 0.65583;
	}
	35% {
		opacity: 0.67807;
	}
	40% {
		opacity: 0.26559;
	}
	45% {
		opacity: 0.84693;
	}
	50% {
		opacity: 0.96019;
	}
	55% {
		opacity: 0.08594;
	}
	60% {
		opacity: 0.20313;
	}
	65% {
		opacity: 0.71988;
	}
	70% {
		opacity: 0.53455;
	}
	75% {
		opacity: 0.37288;
	}
	80% {
		opacity: 0.71428;
	}
	85% {
		opacity: 0.70419;
	}
	90% {
		opacity: 0.7003;
	}
	95% {
		opacity: 0.36108;
	}
	100% {
		opacity: 0.24387;
	}
}

$text-shadow-color-1: rgba(0, 30, 255, 0.25);
$text-shadow-color-2: rgba(255, 0, 80, 0.25);

@keyframes textShadow {
	0% {
		text-shadow: 0.4389924193300864px 0 1px $text-shadow-color-1,
			-0.4389924193300864px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	5% {
		text-shadow: 2.7928974010788217px 0 1px $text-shadow-color-1,
			-2.7928974010788217px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	10% {
		text-shadow: 0.02956275843481219px 0 1px $text-shadow-color-1,
			-0.02956275843481219px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	15% {
		text-shadow: 0.40218538552878136px 0 1px $text-shadow-color-1,
			-0.40218538552878136px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	20% {
		text-shadow: 3.4794037899852017px 0 1px $text-shadow-color-1,
			-3.4794037899852017px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	25% {
		text-shadow: 1.6125630401149584px 0 1px $text-shadow-color-1,
			-1.6125630401149584px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	30% {
		text-shadow: 0.7015590085143956px 0 1px $text-shadow-color-1,
			-0.7015590085143956px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	35% {
		text-shadow: 3.896914047650351px 0 1px $text-shadow-color-1,
			-3.896914047650351px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	40% {
		text-shadow: 3.870905614848819px 0 1px $text-shadow-color-1,
			-3.870905614848819px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	45% {
		text-shadow: 2.231056963361899px 0 1px $text-shadow-color-1,
			-2.231056963361899px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	50% {
		text-shadow: 0.08084290417898504px 0 1px $text-shadow-color-1,
			-0.08084290417898504px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	55% {
		text-shadow: 2.3758461067427543px 0 1px $text-shadow-color-1,
			-2.3758461067427543px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	60% {
		text-shadow: 2.202193051050636px 0 1px $text-shadow-color-1,
			-2.202193051050636px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	65% {
		text-shadow: 2.8638780614874975px 0 1px $text-shadow-color-1,
			-2.8638780614874975px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	70% {
		text-shadow: 0.48874025155497314px 0 1px $text-shadow-color-1,
			-0.48874025155497314px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	75% {
		text-shadow: 1.8948491305757957px 0 1px $text-shadow-color-1,
			-1.8948491305757957px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	80% {
		text-shadow: 0.0833037308038857px 0 1px $text-shadow-color-1,
			-0.0833037308038857px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	85% {
		text-shadow: 0.09769827255241735px 0 1px $text-shadow-color-1,
			-0.09769827255241735px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	90% {
		text-shadow: 3.443339761481782px 0 1px $text-shadow-color-1,
			-3.443339761481782px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	95% {
		text-shadow: 2.1841838852799786px 0 1px $text-shadow-color-1,
			-2.1841838852799786px 0 1px $text-shadow-color-2, 0 0 3px;
	}
	100% {
		text-shadow: 2.6208764473832513px 0 1px $text-shadow-color-1,
			-2.6208764473832513px 0 1px $text-shadow-color-2, 0 0 3px;
	}
}

@font-face {
	font-family: CodePage437;
	src: url(/PerfectDOSVGA437.ttf);
}

* {
	box-sizing: border-box;
}

/* Firefox */
* {
	scrollbar-width: thin;
	scrollbar-color: $color-green #000000;
}

/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
	width: 12px;
	width: 12px;
}
*::-webkit-scrollbar-track {
	border-radius: 0px;
	background-color: #000000;
}

*::-webkit-scrollbar-track:hover {
	background-color: #000000;
}

*::-webkit-scrollbar-track:active {
	background-color: #000000;
}

*::-webkit-scrollbar-thumb {
	border-radius: 0px;
	background-color: $color-green;
	border: 2px solid #000000;
}

*::-webkit-scrollbar-thumb:hover {
	background-color: #62a34b;
}

*::-webkit-scrollbar-thumb:active {
	background-color: #62a34b;
}

::selection {
	background-color: $text-color; /* WebKit/Blink Browsers */
	color: black;
}
::-moz-selection {
	background-color: $text-color; /* Gecko Browsers */
	color: black;
}

html,
body,
#app {
	width: 100%;
	height: 100%;
	margin: 0px;
}

body {
	padding: 0.5em;
}

button {
	animation: textShadow 0.01s infinite;
}

.main-layout::after {
	content: ' ';
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(18, 16, 16, 0.1);
	opacity: 0;
	z-index: 100000;
	pointer-events: none;
	animation: flicker 0.15s infinite;
}

.main-layout::before {
	content: ' ';
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%),
		linear-gradient(
			90deg,
			rgba(255, 0, 0, 0.06),
			rgba(0, 255, 0, 0.02),
			rgba(0, 0, 255, 0.06)
		);
	z-index: 100000;
	background-size: 100% 2px, 3px 100%;
	pointer-events: none;
}

.main-layout {
	@include flex(row);
	// font-size: 1.5em;
	letter-spacing: 0.2em;
	background-color: #000;
	color: $text-color;
	font-family: 'Share Tech Mono', monospace;
	border: $line-width solid $color-green;
	overflow: hidden;
	animation: textShadow 0.01s infinite;
	line-height: 1.5em;

	&.hide {
		display: none;
	}
}

h1,
h2,
h3,
h4,
h5,
h6 {
	margin: 0px;
	font-weight: lighter;
	line-height: 1em;
}

img {
	filter: saturate(0.5);
}

a {
	color: $text-color;

	&:hover {
		background-color: $color-green;
		color: black;
	}
}
</style>
