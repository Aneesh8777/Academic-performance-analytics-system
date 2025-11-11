export function notFound(_req, res, _next) {
  res.status(404).json({ message: 'Not Found' });
}

export function errorHandler(err, _req, res, _next) {
  console.error(err);
  const status = res.statusCode >= 400 ? res.statusCode : 500;
  res.status(status).json({ message: err.message || 'Server error' });
}
