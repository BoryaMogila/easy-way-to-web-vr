import Koa from 'koa'
import serve from 'koa-static'
import mount from 'koa-mount'

let app = new Koa();

app.use(serve('./'));

app.listen(5000, function () {
    console.log('listening at port %d', 5000);
});