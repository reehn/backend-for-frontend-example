"use strict";

function validator(opts, options = {}) {
    options = {
        ...{
            abortEarly: false,
            allowUnknown: false,
            stripUnknown: false
        },
        ...options
    };
    return (req, res, next) => {
        let validationError;
        for (const field of ["body", "query", "params"]) {
            if (opts[field]) {
                const { error, value } = opts[field].validate(req[field], options);
                if (error) {
                    console.log('error :>> ', error);
                    validationError = buildError(field, error.details.find(Boolean))
                }
                req[field] = value;
            }
        }
        if (validationError) {
            console.error(
                `Validation error on ${req.method} ${req.path} error: ${JSON.stringify(validationError)} body: ${JSON.stringify(
                    req.body
                )}`,
                req.debugMeta
            );
            res.status(400).json({ error: validationError });
            return;
        }
        next();
    };
}

function buildError(field, detail) {
    return {
        title: `ValidationError in ${field}`,
        status: 400,
        source: `${field}[${detail.path.join(".")}]`,
        detail: detail.message
    };
}

function partial(fieldname, schema, options) {
    const opts = {};
    opts[fieldname] = schema;
    return validator(opts, options);
}

module.exports = {
    body: partial.bind(partial, "body"),
    query: partial.bind(partial, "query"),
    params: partial.bind(partial, "params"),
    validator
};