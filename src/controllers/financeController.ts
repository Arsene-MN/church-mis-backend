import { AuthenticatedRequest } from '../types/customRequest';
import { Response } from 'express';
import pool from '../db';

export const addDonation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { amount, date } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO donations (amount, date, recorded_by) VALUES ($1, $2, $3) RETURNING *',
      [amount, date, req.user!.id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding donation' });
  }
};

export const updateDonation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { amount, date } = req.body;

  try {
    const result = await pool.query(
      'UPDATE donations SET amount = $1, date = $2 WHERE id = $3 RETURNING *',
      [amount, date, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating donation' });
  }
};

export const getDonations = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM donations');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching donations' });
  }
};