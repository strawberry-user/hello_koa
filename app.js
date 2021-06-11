const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const templating = require('./templating')
const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

if (! isProduction) {
    let staticFiles = require('./static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

//由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser());

app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
}));

// add router middleware:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');

