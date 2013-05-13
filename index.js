var opener = require('opener')
var npdx = require('commander')

npdx.version(require('./package.json').version)

npdx.command('www')
  .description('open the nodepdx site')
  .action(function () {
    opener('http://nodepdx.org')
  })


npdx.parse(process.argv)

if (!npdx.args.length) {
  npdx.help()
}