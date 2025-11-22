import { Router } from 'express';
import { createPost, getPosts, getPost, updatePost, deletePost } from '../controllers/post.controller.js';

const router = Router();

router.route('/create').post(createPost);
router.route('/getPosts').get(getPosts);
router.route('/getPost/:id').get(getPost);
router.route('/update/:id').patch(updatePost);
router.route('/delete/:id').delete(deletePost);


export default router;