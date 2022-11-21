const {Router} = require('express')
const blogRouter = require('./routes/blog.router')
const teamRouter = require('./routes/team.router')
const hallRouter = require('./routes/hall.router')
const eventRouter = require('./routes/event.router')
const albumRouter = require('./routes/album.router')
const authRouter = require('./routes/auth.router')


const router = Router()

router.use('/blog', blogRouter)
router.use('/team', teamRouter)
router.use('/halls', hallRouter)
router.use('/event', eventRouter)
router.use('/album', albumRouter)
router.use('/auth', authRouter)

router.use('*', (req, res) => {

   res.status(404).json({
      ok: false,
      status: 'fail',
      message: 'This route is not yet defined.'
   })
})


module.exports = router