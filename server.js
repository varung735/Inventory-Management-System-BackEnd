const app = require('./app');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`The app is listening on port: ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});