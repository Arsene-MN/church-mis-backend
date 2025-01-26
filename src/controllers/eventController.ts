import { Response } from 'express';
import pool from '../db';
import { AuthenticatedRequest } from '../types/customRequest';

export const createEvent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { title, description, date } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO events (title, description, date, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, date, req.user!.id] // Use req.user
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating event' });
  }
};

export const getEvents = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching events' });
  }
};

export const updateEvent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, date } = req.body;

  try {
    const result = await pool.query(
      'UPDATE events SET title = $1, description = $2, date = $3 WHERE id = $4 RETURNING *',
      [title, description, date, id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating event' });
  }
};

export const deleteEvent = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM events WHERE id = $1', [id]);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting event' });
  }
};