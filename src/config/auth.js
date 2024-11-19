module.exports = {
    JWT: {
        secret: process.env.AUTH_SECRET,
        expiresIn: "1d",
    }
}