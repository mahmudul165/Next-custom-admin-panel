export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
