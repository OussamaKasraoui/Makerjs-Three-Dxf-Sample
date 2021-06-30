// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.send({
        status: 'API Its Working',
        message: 'Welcome to DXF Backend with Hugs!'
    });
});


let multer = require('multer');
let { v4: uuidv4 } = require('uuid');
// test 
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/json") {
            //console.log('file:\n'+ JSON.stringify(file))
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .json (geoJSON) format allowed!'));
        }
    }
});


// Import geoJson controller
var geoJsonController = require('./geoJsonController');
// geoJSON routes
router.route('/geojson')
    .get(geoJsonController.index)
    .post(upload.single('file'), geoJsonController.new);
router.route('/geojson/s')
    .post(geoJsonController.newOne)
router.route('/geojson/:geo_id')
    .get(geoJsonController.view)
    .patch(geoJsonController.update)
    .put(geoJsonController.update)
    .delete(geoJsonController.delete);
    
// Export API routes
module.exports = router;