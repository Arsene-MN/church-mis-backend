import { AuthenticatedRequest } from '../types/customRequest';
import { Response } from 'express';
import pool from '../db';
import bcrypt from 'bcrypt';
import { sendPasswordSetupEmail } from '../utils/email';
import jwt from 'jsonwebtoken';



export const addPastor = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { name, email, password, ministry } = req.body;
  
    // Only admins can add pastors
    if (req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Access denied. Only admins can add pastors.' });
      return;
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO members (name, email, password, role, ministry) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, hashedPassword, 'pastor', ministry]
      );
  
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding pastor' });
    }
  };


  export const addMember = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { name, email, role, ministry } = req.body;
  
    try {
      // Generate a password reset token
      const passwordResetToken = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  
      // Insert the member without a password
      const result = await pool.query(
        'INSERT INTO members (name, email, role, ministry, password_reset_token) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, email, role || 'member', ministry, passwordResetToken]
      );
  
      const newMember = result.rows[0];
  
      // Send an email to the member with the password setup link
      await sendPasswordSetupEmail(email, passwordResetToken);
  
      res.status(201).json(newMember);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding member' });
    }
  };
export const updateMember = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email, role, status } = req.body;

  try {
    const result = await pool.query(
      'UPDATE members SET name = $1, email = $2, role = $3, status = $4 WHERE id = $5 RETURNING *',
      [name, email, role, status, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating member' });
  }
};

export const deleteMember = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM members WHERE id = $1', [id]);
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting member' });
  }
};

export const getMembers = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM members');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching members' });
  }
};