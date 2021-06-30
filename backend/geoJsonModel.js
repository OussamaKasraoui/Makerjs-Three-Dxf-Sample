const { randomUUID } = require("crypto");
const mongoose = require("mongoose");

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/geoDB', { useNewUrlParser: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});


const polygonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Polygon'],
        required: true
    },
    coordinates: {
        type: [[[Number]]],
        required: true
    }
});


const geoSchema = mongoose.Schema(
    {
        N_ordre: {
            type: String,
        },
        NUMERO_DOSSIER: {
            type: String,
        },
        Nom_AR: {
            type: String,
        },
        NOm_FR: {
            type: String,
        },
        CIN: {
            type: String,
        },
        PROVINCE: {
            type: String,
        },
        CERCLE: {
            type: String,
        },
        CAIDAT: {
            type: String,
        },
        COMMUNE: {
            type: String,
        },
        LIEUX_RESIDENCE: {
            type: String,
        },
        QUALITE: {
            type: String,
        },
        cote_part_empietement: {
            type: String,
        },
        COLLECTIVITE_REF: {
            type: String,
        },
        REF_FONCIERE: {
            type: String,
        },
        CONSISTANCE: {
            type: String,
        },
        CODE_PARCELLE: {
            type: Number,
        },
        SEXE: {
            type: String,
        },
        FRACTION: {
            type: String,
        },
        LISTE_AD: {
            type: String,
        },
        N_ORDRE_LISTE_AD: {
            type: String,
        },
        Superficie_Si: {
            type: Number,
        },
        PLU_VALU_EXPLOITATION: {
            type: String,
        },
        LIVRAISON: {
            type: String,
        },
        INTEGRATION: {
            type: String,
        },
        ORGANISME: {
            type: String,
        },
        DXF: {
            type: String,
        },
        Location: polygonSchema,

    }
)

//module.export = mongoose.model("geojson", geoSchema)

// Export Contact model
var geojson_ = module.exports = mongoose.model('geoJSON', geoSchema);


module.exports.get = function (callback, limit) {
    geojson_.createIndexes({ Location: polygonSchema } , { sparse: true })
    geojson_.find(callback).limit(limit);
}