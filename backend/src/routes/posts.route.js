const router = require('express').Router()
const Post = require('../models/post.model')
const verifyToken = require('../middleware/verifyToken')

router.get('/feed', async (req, res) => {
    // TODO accept page parameter and use limit for posts length
    try {
        const posts = await Post.find().populate('author', '_id username')
        res.json(posts)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: 'Error fetching posts.' })
    }
})
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId
    try {
        const post = Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' })
        }
        res.json(post)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: 'Error fetching post.' })
    }
})
router.post('/create', verifyToken, async (req, res) => {
    const { title, content } = req.body
    if (!title || !content) {
        return res.status(400).json({ message: 'Missing data.' })
    }
    try {
        const post = new Post({ title, content, author: req.userId })
        await post.save()
        res.status(201).json(post)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: 'Error creating post.' })
    }
})
router.put('/:postId', verifyToken, async (req, res) => {
    const postId = req.params.postId
    try {
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found.' })
        }
        if (post.author != req.userId) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }
        const { title, content } = req.body
        if (!title || !content) {
            return res.status(400).json({ message: 'Missing data.' })
        }
        post.title = title
        post.content = content
        await post.save()
        res.json(post)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: 'Error updating post.' })
    }
})
router.delete('/:postId', verifyToken, async (req, res) => {
    const postId = req.params.postId
    try {
        const post = await Post.findById(postId)
        if (!post) {
            res.status(404).json({ message: 'Post not found.' })
        }
        if (post.author != req.userId) {
            return res.status(401).json({ message: 'Unauthorized.' })
        }
        await post.remove()
        res.json(post)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: 'Error deleting post.' })
    }
})

module.exports = router
