const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const Post = require('../models/post.model')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const saltRounds = 10
const JWT_SECRET = process.env.JWT_SECRET
const verifyToken = require('../middleware/verifyToken')

router.get('/posts', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ author: req.userId })
        res.json(posts)
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ message: 'Error fetching user posts.' })
    }
})

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Missing data.' })
    }

    const existingUser = await User.findOne({
        $or: [{ username: username }, { email: email }],
    })

    if (existingUser) {
        return res
            .status(400)
            .json({ message: 'Username or email already in use.' })
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const user = new User({ username, email, password: hashedPassword })
    await user.save()
    res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(401).json({ message: 'User does not exist.' })
    }

    const result = await bcrypt.compare(password, user.password)
    if (!result) {
        return res.status(401).json({ message: 'Unauthorized.' })
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET)
    res.status(200).json({ token })
})

module.exports = router
