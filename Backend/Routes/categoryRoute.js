import express from 'express';
const router = express.Router();
import { auth, isAdmin } from '../middleware/authMiddleware.js';
import { createCategory,updateCategory,
    getCategories, getCategoryById, deleteCategory
} from '../controllers/CategoryController.js';

//create category
router.post('/create-category', auth, isAdmin, createCategory);
//update category
router.put('/update-category/:id', auth, isAdmin, updateCategory);
//get all categories
router.get('/get-categories', getCategories);
//get single category by slug
router.get('/get-category/:slug', auth, isAdmin, getCategoryById);
//delete category
router.delete('/delete-category/:id', auth, isAdmin, deleteCategory); 

export default router;