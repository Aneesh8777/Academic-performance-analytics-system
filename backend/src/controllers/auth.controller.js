import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';

function sign(user) {
  return jwt.sign({ id: user._id, role: user.role, email: user.email }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });
}

export async function signup(req, res, next) {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password, role });
    return res.status(201).json({ token: sign(user), user: { id: user._id, name: user.name, role: user.role } });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.compare(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    return res.json({ token: sign(user), user: { id: user._id, name: user.name, role: user.role } });
  } catch (e) { next(e); }
}
