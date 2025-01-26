import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db';

export const signup = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password, role, ministry } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO members (name, email, password, role, ministry) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, hashedPassword, role || 'member', ministry]
      );
  
      const user = result.rows[0];
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  
      res.status(201).json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  };


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM members WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid password' });
      return;
    }

    // Include the ministry in the JWT payload
    const token = jwt.sign(
      { id: user.id, role: user.role, ministry: user.ministry }, // Add ministry here
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE members SET password = $1 WHERE email = $2', [hashedPassword, email]);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};





export const setPassword = async (req: Request, res: Response): Promise<void> => {
  const { token, password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    const { email } = decoded;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the member's password and mark it as set
    await pool.query(
      'UPDATE members SET password = $1, password_set = TRUE, password_reset_token = NULL WHERE email = $2',
      [hashedPassword, email]
    );

    res.status(200).json({ message: 'Password set successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};