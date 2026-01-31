import { Request, Response, NextFunction } from 'express';

export function validateAgent(req: Request, res: Response, next: NextFunction) {
  const { firstName, lastName, email, mobileNumber } = req.body;

  if (!firstName || !lastName || !email || !mobileNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  next();
}
