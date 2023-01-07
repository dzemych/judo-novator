const {Router} = require('express')
const blogRouter = require('./routes/blog.router')
const teamRouter = require('./routes/team.router')
const eventRouter = require('./routes/event.router')
const albumRouter = require('./routes/album.router')
const authRouter = require('./routes/auth.router')
const aboutRouter = require('./routes/about.router')
const tempImgRouter = require('./routes/tempImg.router')
const dataRouter = require('./routes/data.router')


const router = Router()

router.use('/blog', blogRouter)
router.use('/team', teamRouter)
router.use('/event', eventRouter)
router.use('/album', albumRouter)
router.use('/auth', authRouter)
router.use('/about', aboutRouter)
router.use('/img', tempImgRouter)
router.use('/data', dataRouter)

router.use('*', (req, res) => {
   res.status(404).json({
      ok: false,
      status: 'fail',
      message: 'This route is not yet defined.'
   })
})


module.exports = router