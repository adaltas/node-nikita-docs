
export default `
// User configuration
const options = {
  // url: 'http://download.redis.io/redis-stable.tar.gz',
  // config: {
  //   bind: '127.0.0.1',
  //   port: 6379,
  //   ...
  // }
}
// Nikita instantiation
require('nikita')
// Activate CLI reporting
.log.cli()
// Define and execute a custom Redis action
.call(options, header: 'Redis', function(options){
  // Default options
  if(!options.url){ options.url = 'http://download.redis.io/redis-stable.tar.gz' }
  if(!options.config){ options.config = {} }
  if(!options.config['bind']){ options.config['bind'] = '127.0.0.1' }
  if(!options.config['protected-mode']){ options.config['protected-mode'] = 'yes' }
  if(!options.config['port']){ options.config['port'] = 6379 }
  // Do the job
  this
  .file.download({
    header: 'Download',
    source: options.url,
    target: 'cache/redis-stable.tar.gz'
  })
  .system.execute({
    header: 'Compilation',
    unless_exists: 'redis-stable/src/redis-server',
    cmd: \`
    tar xzf cache/redis-stable.tar.gz
    cd redis-stable
    make
    \`
  })
  .file.properties({
    header: 'Configuration',
    target: 'conf/redis.conf',
    separator: ' ',
    content: options.config
  })
  .system.execute({
    header: 'Startup',
    code_skipped: 3,
    cmd: \`
    ./src/redis-cli ping && exit 3
    nohup ./redis-stable/src/redis-server conf/redis.conf &
    \`
  })
})
`.trim()
