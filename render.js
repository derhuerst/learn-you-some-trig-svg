'use strict'

const yo = require('yo-yo')



const clip = (alpha, r) => {
	const points = [[0, 0]] // start at the center

	// add helper edges to fully contain the clock
	                  points.push([0 , -r]) // middle top
	if (alpha >= 1/8) points.push([r , -r]) // right  top
	if (alpha >= 2/8) points.push([r , 0 ]) // right  middle
	if (alpha >= 3/8) points.push([r , r ]) // right  bottom
	if (alpha >= 4/8) points.push([0 , r ]) // middle bottom
	if (alpha >= 5/8) points.push([-r, r ]) // left   bottom
	if (alpha >= 6/8) points.push([-r, 0 ]) // left   middle
	if (alpha >= 7/8) points.push([-r, -r]) // left   top

	// add the actual edge to cut the ring off
	points.push([x(alpha, r), y(alpha, r)])

	return yo `
		<polygon points="${points
			.map((p) => _(p[0]) + ',' + _(p[1]))
			.join(' ')}"/>`
}

const _ = (x) => Math.round(x * 10000) / 10000
const x = (a, r) => _(Math.cos(a)) * r
const y = (a, r) => _(Math.sin(a)) * r

const render = (alpha, r) => {
	const s = r + 10
	const o = y(alpha, r)
	const a = x(alpha, r)
	return yo `
	<svg id="trig" viewBox="-50 -50 100 100">
		<defs>
			<clipPath id="angle">${clip(alpha, r / 5)}</clipPath>
		</defs>
		<circle class="circle" cx="0" cy="0" r="${r}" />
		<polyline class="x-axis" points="-${s},0 ${s},0" />
		<polyline class="y-axis" points="0,-${s} 0,${s}" />
		<circle class="angle" cx="0" cy="0" r="${r / 5}" clip-path="url(#angle)" />
		<path class="hypotenuse" d="M 0,0 l ${a} ${o}" />
		<g class="opposite">
			<path class="area" d="M -${s},0 v ${o} h ${2 * s} v ${-o} h ${-2 * s}" />
			<path class="axis" d="M ${a},0 v ${o}" />
			<path class="mirror" d="M 0,0 v ${o}" />
		</g>
		<g class="adjacent">
			<path class="area" d="M 0,-${s} h ${o} v ${2 * s} h ${-o} v ${-2 * s}" />
			<path class="axis" d="M 0,0 h ${a}" />
			<path class="mirror" d="M 0,${o} h ${a}" />
		</g>
		<circle class="center" cx="0" cy="0" r="1" />
	</svg>`
}

module.exports = render
