module.exports = {
    mongoURL: process.env.MONGODB_URI||"mongodb://admin:password@127.0.0.1:27017/HackerEarth",
    secretOrKey: process.env.SECRET ||"secret"
}