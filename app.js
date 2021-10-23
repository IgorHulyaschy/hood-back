const Koa = require("koa");
const Router = require("koa-router");

const serve = require("koa-static");
const bodyParser = require("koa-bodyparser");
const { koaSwagger } = require("koa2-swagger-ui")
const config = require('config');
const cors = require('@koa/cors')

const passport = require("./src/libs/passport/koaPassport");
const ErrorCatcher = require("./src/middlewares/errorCatcher");

passport.initialize();

const port = config.get('server.port') || 3001;
const app = new Koa();


app.use(cors())
app.use(serve('src/docs'));
app.use(koaSwagger({
  routePrefix: '/docs',
  hideTopbar: true,
  swaggerOptions: {
    url: `${config.get('server.baseUrl')}/docs.yml`,
  },
}));

const router = new Router();

app.use(bodyParser());
app.use(ErrorCatcher);

router.use("/", require("./src/user/router"));
app.use(router.middleware());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
