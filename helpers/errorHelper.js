"use strict";

function render404(res, detail) {
    res.status(404).json({
        error: {
            status: 404,
            title: "Not Found",
            detail
        }
    });
}

module.exports = {
    render404
}