import express, { Request, Response, NextFunction } from 'express';
import { signUp, signIn, logout } from '../controllers/authController';

const router = express.Router();

// Route for user signup
router.post('/signup', async (req: Request, res: Response) => {
  try {
    await signUp(req, res);
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).json({ error: "Error in signup route" });
  }
});

// Route for user signin
router.post('/signin', async (req: Request, res: Response) => {
  try {
    await signIn(req, res);
  } catch (error) {
    console.error("Error in signin route:", error);
    res.status(500).json({ error: "Error in signin route" });
  }
});

// Route for user logout
router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
  try {
    logout(req, res, next);
  } catch (error) {
    console.error("Error in logout route:", error);
    res.status(500).json({ error: "Error in logout route" });
  }
});

export default router;
