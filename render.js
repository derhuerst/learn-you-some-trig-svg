'use strict'

const yo = require('yo-yo')
const partialCircle = require('svg-partial-circle')



const _ = (x, p = 4) => Math.round(x * Math.pow(10, p)) / Math.pow(10, p)
const x = (a, r) => Math.cos(Math.PI * 2 - a) * r
const y = (a, r) => Math.sin(Math.PI * 2 - a) * r

const angle = (cx, cy, r, start, end) => {
	const d = partialCircle(cx, cy, r, start, end)
	if (d.length === 0) return d
	d[0][0] = 'l'
	return [['M', 0, 0], ...d, ['L', 0, 0], ['z']]
		.map((c) => c.join(' '))
		.join(' ')
}

const render = (alpha, r) => {
	const s = r + 10
	const o = _(y(alpha, r))
	const a = _(x(alpha, r))

	return yo `
	<svg id="trig" viewBox="-50 -50 100 100">
		<circle class="circle" cx="0" cy="0" r="${r}" />
		<polyline class="x-axis" points="-${s},0 ${s},0" />
		<polyline class="y-axis" points="0,-${s} 0,${s}" />
		<path class="hypotenuse" d="M 0,0 l ${a} ${o}" />
		<g class="opposite">
			<path class="area" d="M -${s},0 v ${o} h ${2 * s} v ${-o} h ${-2 * s}" />
			<text class="caption" x="${a + 2}" y="${o / 2}">sin(α) = ${-_(y(alpha, 1), 1)}</text>
			<path class="axis" d="M ${a},0 v ${o}" />
			<path class="mirror" d="M 0,0 v ${o}" />
		</g>
		<g class="adjacent">
			<path class="area" d="M 0,-${s} h ${a} v ${2 * s} h ${-a} v ${-2 * s}" />
			<text class="caption" x="${a / 2}" y="${o + 5}">cos(α) = ${_(x(alpha, 1), 1)}</text>
			<path class="axis" d="M 0,0 h ${a}" />
			<path class="mirror" d="M 0,${o} h ${a}" />
		</g>
		<path class="angle" d="${angle(0, 0, r / 5, 0, 2 * Math.PI - alpha)}" />
		<circle class="center" cx="0" cy="0" r="1" />
	</svg>`
}

module.exports = render
