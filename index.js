var opener = require('opener')
var npdx = require('commander')
var _ = require('lodash')

npdx.version(require('./package.json').version)

npdx.command('www')
  .description('open the nodepdx site')
  .action(function () {
    opener('http://nodepdx.org')
  })

npdx.command('sched')
  .description('print the schedule')
  .action(function () {
    require('lanyrd').schedule('nodepdx', '2013', function(err, res, body) { 

    _(body).groupBy(function (s) { return s.day })
      .forEach(function (day, title) {
        console.log('== ' + title)
        day.forEach(function (session) {
          var pre = now(session) ? '> ' : '  '
          var speaker = (session.speakers[0] || {}).title
          console.log(pre + session.title + '   ' + (speaker || session.subtitle))
        })
      })

    })
  })

// (session) => Boolean
function now(session) {
  var start = new Date(session.start_time + '-0700')
  var end = new Date(session.end_time + '-0700')
  var now = Date.now()
  return now >= start && now <= end
}


npdx.parse(process.argv)

if (!npdx.args.length) {
  npdx.help()
}