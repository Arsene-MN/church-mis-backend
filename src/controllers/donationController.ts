import { Request, Response } from 'express';
import pool from '../db';

export const addDonation = async (req: Request, res: Response): Promise<void> => {
  const { amount, member_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO donations (amount, member_id) VALUES ($1, $2) RETURNING *',
      [amount, member_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding donation' });
  }
};

export const getDonations = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM donations');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching donations' });
  }
};