
class PublicCtrl {
    notifyUser = (req, res, next)=>{
    res.json({
        data: 'any',
        message: 'notification for notify',
        status: 'OK',
        options: null,
    })
}

    aboutUs = (req, res, next)=>{
    res.json({
        data: 'any',
        message: 'I am about us',
        status: 'OK',
        options: null,
    })
}

}

const publicCtrl = new PublicCtrl()

module.exports = publicCtrl