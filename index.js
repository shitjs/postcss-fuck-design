const postcss = require('postcss')
const crypto = require('crypto')

const declPatterns = [
	/(margin|padding)-(left|right|top|bottom)/,
	/font-size/,
]

function updateDecl(decl) {
	const hash = parseInt(crypto.createHash('sha1').update(JSON.stringify(decl)).digest('hex'), 16)
	const matches = /^(\d+)([a-z]+)$/i.exec(decl.value)

	if (!matches) return

	const diff = hash % 5

	decl.replaceWith(decl.clone({
		value: `${Number(matches[1]) + diff}${matches[2]}`
	}))
}

module.exports = postcss.plugin('postcss-pixel-imperfect', (opts) => (css) => {
	declPatterns.forEach((declPattern) => {
		css.walkDecls(declPattern, updateDecl)
	})
})
