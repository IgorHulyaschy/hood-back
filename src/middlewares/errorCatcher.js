module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    if (err.isJoi && err.status === 500) {
      ctx.status = 400;
      ctx.body = { error: err.message, type: 'OUTPUT_VALIDATION_ERROR' };
      return;
    }

    if (err.isJoi) {
      ctx.body = { error: err.details[0].message, type: 'VALIDATION_ERROR' };
      ctx.status = 400;
    }

    if (err.isPassport) {
      ctx.throw(401, err.message);
    }

    ctx.throw(err.status || 500, err.message);
  }
};