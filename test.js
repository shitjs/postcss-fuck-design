const test = require('tape')
const postcss = require('postcss')
const plugin = require('./index')

function run(t, input, output, opts = {}) {
	return postcss([ plugin(opts) ])
		.process(input)
    .then( result => {
      t.deepEqual(result.css, output)
      t.deepEqual(result.warnings().length, 0)
			t.end()
    })
}

test('some', (t) => {
	run(t, `
		.header {
			font-size: 1pt;
			margin-top: 10px;
			margin-bottom: 10px;
		}
	`, `
		.header {
			font-size: 4pt;
			margin-top: 10px;
			margin-bottom: 13px;
		}
	`)
})
