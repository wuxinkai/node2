var CronJob = require('cron').CronJob;
//秒 分钟 小时 几号 月份 星期几
var job = new CronJob('*/5 * * * * *',function(){
    console.log('五秒执行一次');
});
job.start();