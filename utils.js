exports.Success = (code = 200, data = null) => ({ code, data });
exports.Error = (code = 500, data = null) => ({ code, data });