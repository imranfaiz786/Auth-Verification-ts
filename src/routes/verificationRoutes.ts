import express, { Request, Response } from 'express';
import { sendVerification, verifyCode } from '../controllers/verificationController';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Route to send verification
router.post('/send-verification', 
  body('email').isEmail().withMessage('Invalid email format'),
  body('phone').isString().isLength({ min: 10 }).withMessage('Phone number must be at least 10 digits'),
  async (req: Request, res: Response): Promise<void> => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return; // Exit the function if validation fails
    }
    
    try {
      // Call the sendVerification controller to handle sending the email
      await sendVerification(req, res);
    } catch (error) {
      console.error("Error in send-verification route:", error);
      res.status(500).json({ error: "Error in send-verification route" });
    }
  }
);

// Route to verify the code
router.post('/verify-code', 
  body('hash').isString().withMessage('Hash must be a string'),
  body('code').isString().isLength({ min: 6, max: 6 }).withMessage('Code must be 6 digits'),
  async (req: Request, res: Response): Promise<void> => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return; // Exit the function if validation fails
    }

    try {
      // Call the verifyCode controller to handle verification logic
      await verifyCode(req, res);
    } catch (error) {
      console.error("Error in verify-code route:", error);
      res.status(500).json({ error: "Error in verify-code route" });
    }
  }
);

export default router;
