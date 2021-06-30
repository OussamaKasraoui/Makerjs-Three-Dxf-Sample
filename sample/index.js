const makerjs = require('makerjs');
const jsZip = turf.JSZip;
var progress = document.getElementById('file-progress-bar');
var $progress = $('.progress');

var _font;

var allParcelle = [];
var allCoords = [];
var allDXF = [];

// var $cadview = $('#cad-view');
// var dxfContentEl = $('#dxf-content')[0];
// var cadCanvas;

// const data = [];
// var row_selected;
// var boundaries;
// var echelle;

const mapStyle = 'mapbox://styles/mapbox/light-v9';
const accessToken = 'pk.eyJ1Ijoia2FzcmFvdWlvdXNzYW1hIiwiYSI6ImNqemN1MXF6YzAyZ3ozZ3J6OXgxcTEwengifQ.rGsVJ8ZJ2HW-0hcbtF3wig';
const center = [-5.961763, 32.762239]
const zoomLevel = 3;
const container = 'map';
const ressource = 'national-park';
const ressourceName = 'national-park';
const ressourceType = 'FeatureCollection';
const ressourceObject = [
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Polygon',
            'coordinates': [
                [
                    [-121.353637, 40.584978],
                    [-121.284551, 40.584758],
                    [-121.275349, 40.541646],
                    [-121.246768, 40.541017],
                    [-121.251343, 40.423383],
                    [-121.32687, 40.423768],
                    [-121.360619, 40.43479],
                    [-121.363694, 40.409124],
                    [-121.439713, 40.409197],
                    [-121.439711, 40.423791],
                    [-121.572133, 40.423548],
                    [-121.577415, 40.550766],
                    [-121.539486, 40.558107],
                    [-121.520284, 40.572459],
                    [-121.487219, 40.550822],
                    [-121.446951, 40.56319],
                    [-121.370644, 40.563267],
                    [-121.353637, 40.584978]
                ]
            ]
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-121.415061, 40.506229]
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-121.505184, 40.488084]
        }
    },
    {
        'type': 'Feature',
        'geometry': {
            'type': 'Point',
            'coordinates': [-121.354465, 40.488737]
        }
    }
];



mapboxgl.accessToken = accessToken;
const _map = new mapboxgl.Map({
    container: container, // container id
    style: mapStyle, // stylesheet location
    center: center, // starting position [lng, lat]
    zoom: zoomLevel // starting zoom
});


_map.on('load', function () {
    _map.addSource(ressourceName, {
        'type': 'geojson',
        'data': {
            'type': ressourceType,
            'features': ressourceObject
        }
    });


    // // set up the center marker
    // const centerMarker = new mapboxgl.Marker();
    // centerMarker.setLngLat(center);
    // centerMarker.addTo(_map);
    // // set up the custom control
    // const createButton = (text, onclick) => {
    //     const button = document.getElementById(text)
    //     //button.setAttribute('type', 'button');
    //     //button.appendChild(document.createTextNode(text));
    //     button.addEventListener('click', onclick);
    //     return button;
    // };

    // const markButton = () /*createButton('marquer', (ev)*/ => {
    //     centerMarker.setLngLat(_map.getCenter());
    // };

    // const returnButton = ()/*createButton('centrer', (ev)*/ => {
    //     _map.setCenter(centerMarker.getLngLat());
    // };

    // let lat, lng;
    // const updateLatLon = (ev) => {
    //     let currentCenter = _map.getCenter();
    //     lat.textContent = currentCenter.lat.toFixed(6);
    //     lng.textContent = currentCenter.lng.toFixed(6);
    // };

    // const mapboxglLatLngControl = {
    //     onAdd: (map) => {
    //         const latLonContainer = document.getElementById('data_container') //document.createElement('div');
    //         latLonContainer.classList.add('lat-lng', 'mapboxgl-ctrl');
    //         latLonContainer.classList.add('lat-lng');
    //         //latLonContainer.classList.add('custom-control');
    //         //latLonContainer.textContent = 'Centre: ';
    //         lat = latLonContainer.appendChild(document.createElement('span'));
    //         latLonContainer.appendChild(document.createTextNode(','));
    //         lng = latLonContainer.appendChild(document.createElement('span'));
    //         latLonContainer.appendChild(markButton);
    //         latLonContainer.appendChild(returnButton);
    //         map.on('moveend', updateLatLon);
    //         updateLatLon();
    //         return latLonContainer;
    //     },
    //     getDefaultPosition: () => {
    //         return 'bottom-left'
    //     },
    //     onRemove: () => {
    //         map.off('moveend', updateLatLon);
    //     }
    // };

    // // _map.addControl(mapboxglLatLngControl);


})


// set up the center marker
const centerMarker = new mapboxgl.Marker();
centerMarker.setLngLat(center);
centerMarker.addTo(_map);

const returnButton = ()/*createButton('centrer', (ev)*/ => {
    _map.setCenter(centerMarker.getLngLat());
};

const updateLatLon = (ev) => {
    let lat = {};
    let lng = {};

    let currentCenter = _map.getCenter();
    lat.textContent = currentCenter.lat.toFixed(6);
    lng.textContent = currentCenter.lng.toFixed(6);
};

const markButton = () /*createButton('marquer', (ev)*/ => {
    centerMarker.setLngLat(_map.getCenter());
};


// Setup the dnd listeners.
var dropZone = $('.drop-zone');
dropZone.on('dragover', handleDragOver, false);
dropZone.on('drop', onFileSelected, false);

document.getElementById('dxf').addEventListener('change', onFileSelected, false);


function onFileSelected(evt) {
    progress.style.width = '0%';
    progress.textContent = '0%';

    var file = evt.target.files[0];

    $progress.addClass('loading');

    var reader = new FileReader();
    reader.onprogress = updateProgress;
    reader.onloadend = onSuccess;
    reader.onabort = abortUpload;
    reader.onerror = errorHandler;
    reader.readAsText(file);
    // Loader
    $(".loader").css("visibility", "visible");
}

function abortUpload() {
    console.log('Aborted read!')
}

function errorHandler(evt) {
    switch (evt.target.error.code) {
        case evt.target.error.NOT_FOUND_ERR:
            alert('File Not Found!');
            break;
        case evt.target.error.NOT_READABLE_ERR:
            alert('File is not readable');
            break;
        case evt.target.error.ABORT_ERR:
            break; // noop
        default:
            alert('An error occurred reading this file.');
    }
}

function updateProgress(evt) {
    console.log('progress');
    console.log(Math.round((evt.loaded / evt.total) * 100));
    if (evt.lengthComputable) {
        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        if (percentLoaded < 100) {
            progress.style.width = percentLoaded + '%';
            progress.textContent = percentLoaded + '%';
        }
    }
}

function onSuccess(evt) {
    
    console.log("onsuccess  time start : " + new Date().toTimeString().split(' ')[0])

    // get file content
    var fileReader = evt.target;
    if (fileReader.error) return console.log("error onloadend!?");
    progress.style.width = '100%';
    progress.textContent = '100%';
    setTimeout(function () { $progress.removeClass('loading'); }, 2000);

    // parse file contenet to GeoJSON object
    var fileObject = JSON.parse(fileReader.result);

    /* Half Life  starts */
    // parcelle points
    let points = [];

    // all parcelles holder
    let geos = [];
    
    let progresser = 100 / fileObject.features.length;
    let progression = progresser;

    for( var i = 0 ; i < fileObject.features.length; i++ ){
        let feature = fileObject.features[i];

        console.log(i)



        animation(progression, i+1, fileObject.features.length)

        // geoJSON instance : gonna be sent to MongoDB
        var geojson = {};
        //  DXF model
        let model = myModel();
        // grabbing all coordinates
        feature.geometry.coordinates.forEach(element => {
            element.forEach(elm => {
                elm.forEach(el => {
                    points.push(el);
                })
            });
        });
        //parcelle makerjs model
        let parcelleMakerjs = new makerjs.models.ConnectTheDots(false, points);
        
        // Parcelle Layer container
        var plan = {
            layer: "red",
            origin: [202, 282],
            models: {
                frame: new makerjs.models.Rectangle(202.00, 282.200),
                shape: {
                    units: makerjs.unitType.Centimeter,
                    models: {
                        parcelle: makerjs.model.scale(parcelleMakerjs, /* 100000 */
                            getScale(parcelleMakerjs, model.models.s2, "loading"))
                    },
                    paths: {
                    }
                }
            },
            paths: {
            }
        }

        // hide container's frames
        //delete plan.models.frame;
        // append container to  S2  sub Model in myModel() 
        model.models.s2.models.shape = plan;
        // center Parcell into the container  
        makerjs.model.center(plan.models.shape);



        //RightRect : right parcelle holder
        var _plan = {
            layer: "red",
            origin: [87.21, 51.48],
            models: {
                frame: new makerjs.models.Rectangle(87.21, 51.48),
                shape: {
                    units: makerjs.unitType.Centimeter,
                    models: {
                        parcelle: makerjs.model.scale(parcelleMakerjs, /*_mdl 100000 _mdl*/ 
                            getScale(parcelleMakerjs, model.models.s17.models.mainFrame, null))
                    },
                    paths: {
                    }
                }
            },
            paths: {
            }
        };

        // //   hide sub template frames
        // //   delete _plan.models.frame;
        //delete textLayer.models.satellitaire.models.parcelle;
        // append sub template to  S2  sub Model in myModel() 
        model.models.s17.models.shape = _plan;
        // let sub template centering sub models  
        makerjs.model.center(_plan.models.shape);



        //Left Rect : left parcelle holder
        var _plan_ = {
            layer: "blue",
            origin: [87.345, 51.48],
            models: {
                frame: new makerjs.models.Rectangle(87.345, 51.48),
                shape: {
                    units: makerjs.unitType.Centimeter,
                    models: {
                        parcelle: (makerjs.model.scale(parcelleMakerjs, /*boundaries 100000 boundaries*/ getScale(parcelleMakerjs, model.models.s16.models.mainFrame, null) * 1.2))
                    },
                    paths: {
                    }
                }
            },
            paths: {
            }
        };

        // // hide sub template frames
        // delete _plan_.models.frame;
        // delete textLayer.models.exploitation.models.parcelle;
        // append sub template to  S2  sub Model in myModel() 
        model.models.s16.models.shape = _plan_;
        // let sub template centering sub models  
        makerjs.model.center(_plan_.models.shape);


        //console.log('\n\n' + 'cartouche ('+ i +')  = ' + JSON.stringify(cartouch) + '\n\n')
        
        geojson.DXF                     = parcelleMakerjs;
        geojson.N_ordre                 = feature.properties.N_ordre;
        geojson.NUMERO_DOSSIER          = feature.properties.NUMERO_DOSSIER;
        geojson.Nom_AR                  = feature.properties.Nom_AR;
        geojson.NOm_FR                  = feature.properties.NOm_FR;
        geojson.CIN                     = feature.properties.CIN;
        geojson.PROVINCE                = feature.properties.PROVINCE;
        geojson.CERCLE                  = feature.properties.CERCLE;
        geojson.CAIDAT                  = feature.properties.CAIDAT;
        geojson.COMMUNE                 = feature.properties.COMMUNE;
        geojson.LIEUX_RESIDENCE         = feature.properties.LIEUX_RESIDENCE;
        geojson.QUALITE                 = feature.properties.QUALITE;
        geojson.cote_part_empietement   = feature.properties.cote_part_empietement;
        geojson.COLLECTIVITE_REF        = feature.properties.COLLECTIVITE_REF;
        geojson.REF_FONCIERE            = feature.properties.REF_FONCIERE;
        geojson.CONSISTANCE             = feature.properties.CONSISTANCE;
        geojson.CODE_PARCELLE           = feature.properties.CODE_PARCELLE;
        geojson.SEXE                    = feature.properties.SEXE;
        geojson.FRACTION                = feature.properties.FRACTION;
        geojson.LISTE_AD                = feature.properties.LISTE_AD;
        geojson.N_ORDRE_LISTE_AD        = feature.properties.N_ORDRE_LISTE_AD;
        geojson.Superficie_Si           = feature.properties.Superficie_Si;
        geojson.PLU_VALU_EXPLOITATION   = feature.properties.PLU_VALU_EXPLOITATION;
        geojson.LIVRAISON               = feature.properties.LIVRAISON;
        geojson.INTEGRATION             = feature.properties.INTEGRATION;
        geojson.ORGANISME               = feature.properties.ORGANISME;
        geojson.Location                = feature.geometry;

        geos.push(geojson);

        progression += progresser;

        
    }
    /* Half Life    ends */

    // insert all Features at Onece
    postData('http://localhost:8080/api/geojson', geos)
        .then(data => {
            
    console.log("postData().then  time start : " + new Date().toTimeString().split(' ')[0])

            // Get Points to draw Main Polygon
            data.all_parcelles.forEach(element => {
                element.coordinates.forEach(elm => {

                    allCoords.push(elm);

                    coords = [];
                });
            });

            // collect all DXF files in one array
            data.response.ops.forEach(parcelle => {
                allDXF.push(parcelle);
            })


            //  Get Bounding Box
            var _bbox = turf.turf.bbox(fileObject)

            console.log('_bbox : \n' + _bbox.toString());

            // change map center 
            // var bounds = point.reduce(function (bounds, coord) {
            //     return bounds.extend(coord);
            //     }, new mapboxgl.LngLatBounds(fileObject[0], fileObject[0]));

            $(".loader").css("visibility", "hidden");
            $(".data_container").css("visibility", "inherit");
            $(".data_container").css("z-index", "1");

            _map.fitBounds([
                [_bbox[0], _bbox[1]],
                [_bbox[2], _bbox[3]]
            ], {
                padding: 20
            });

            // Add a data source containing GeoJSON data.
            _map.addSource('maine', {
                'type': 'geojson',
                'data': fileObject
            });
            // Add a new layer to visualize the polygon.
            _map.addLayer({
                'id': 'maine',
                'type': 'fill',
                'source': 'maine', // reference the data source
                'layout': {},
                'paint': {
                    'fill-color': '#c50000', // blue color fill
                    'fill-opacity': 0.5
                }
            });
            // Add a black outline around the polygon.
            _map.addLayer({
                'id': 'outline',
                'type': 'line',
                'source': 'maine',
                'layout': {},
                'paint': {
                    'line-color': '#ffffff',
                    'line-width': 1
                }
            });

            updateLatLon(0);
            markButton();

            // Table to List file content
            var tableRows = '';
            for (var i = 0; i < data.dataList.length; i++) {
                // set element id
                //data.dataList[i].idRow = i;

                var document = data.dataList[i];
                // save element to array for later use
                //data.push(document);
                // save coordinates for later use 
                //allCoords.push(document.geometry.coordinates);


                tableRows +=
                    "<tr>"
                    + "<td id='row_" + document._id + "' hidden>" + document._id + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.N_ordre + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.NUMERO_DOSSIER + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.Nom_AR + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.NOm_FR + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.CIN + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.PROVINCE + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.CERCLE + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.CAIDAT + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.COMMUNE + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.LIEUX_RESIDENCE + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.QUALITE + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.cote_part_empietement + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.COLLECTIVITE_REF + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.REF_FONCIERE + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.CONSISTANCE + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.CODE_PARCELLE + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.SEXE + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.FRACTION + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.LISTE_AD + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.N_ORDRE_LISTE_AD + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.Superficie_Si + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.PLU_VALU_EXPLOITATION + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.LIVRAISON + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.INTEGRATION + "</td>"
                    + "<td id='row_" + document._id + "'>" + document.ORGANISME + "</td>" +
                    "</tr>";

            }
            $('#jsonTable').html(tableRows);

        
    console.log("postData().then  time finish : " + new Date().toTimeString().split(' ')[0])
        })
        .catch(err => {
            console.log('error from post data : \n' + JSON.stringify(err))
        }) 

    // Creat 'Parcelles' from fileObject
    var model = allShapes(fileObject);
    boundaries = model;
    render(model);
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}


// Oussama Kasraoui
/*      get Scaling Factor        */
function getScale(model, container, stage) {
    // scale Factor 
    var factor;

    // object to change its size
    var m = makerjs.measure.modelExtents(model);
    var modelWidth = m.high[0] - m.low[0];
    var modelHeight = m.high[1] - m.low[1];
    var mBase = (modelHeight > modelWidth ? modelHeight : modelWidth);

    // container that holds the object 
    var c = makerjs.measure.modelExtents(container);
    var containerWidth = c.high[0] - c.low[0];
    var containerHeight = c.high[1] - c.low[1];
    var cBase = containerHeight > containerWidth ? containerHeight : containerWidth;

    // finding the scalling direction small2big or big2small
    if (cBase > mBase) {
        factor = (parseInt(cBase / mBase));
        stage === "loading" ? echelle = " 1 / " + factor.toString() : null;
    } else {
        factor = parseInt(mBase / cBase);
        stage === "loading" ? echelle = factor.toString() + " : 1" : null;
    }



    return factor / 2.5;
}
/*      loading Open Types.js fonts     */
$(document).ready(function () {
    $('#jsonT').dataTable();
    var table = $('#jsonT').dataTable();

    table.on('select', function (e, dt, type, indexes) {
        if (type === 'row') {
            var data = table.rows(indexes).data().pluck('id');

            alert(data);

            // do something with the ID of the selected items
        }
    });


    opentype.load('/sample/fonts/FreeSans-LrmZ.ttf', function (err, fontOpenTypeJS) {

        if (err) {
            //alert('the font could not be loaded :(/n'+ fontOpenTypeJS);
        } else {
            _font = fontOpenTypeJS;
            //alert('the font could not be loaded :(\n'+_font);
        }
    });
});

/*      render xdf object       */
function render(object) {
    // XDF file handling
    var parser = new window.DxfParser();
    var loader = new THREE.FontLoader();
    var model;

    model = makerjs.exporter.toDXF(object);

    $('#text').val(model.toString());
    $('#test').html("download");


    var dxf = parser.parseSync(model);

    // Three.js changed the way fonts are loaded, and now we need to use FontLoader to load a font
    //  and enable TextGeometry. See this example http://threejs.org/examples/?q=text#webgl_geometry_text
    //  and this discussion https://github.com/mrdoob/three.js/issues/7398 
    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
        $('#cad-view').empty();
        cadCanvas = new window.ThreeDxf.Viewer(dxf, document.getElementById('cad-view'), 760, 600, font);
    });

}

/*     Table Row Selected     */
$(document).on("click", "#jsonT td", function (e) {
    let parcelle = e.currentTarget.id.slice(4);


    console.log('Parcelle :\n' + JSON.stringify(parcelle))

    fetch('http://localhost:8080/api/geojson/' + parcelle)
        .then(response => response.body)
        .then(rb => {
            const reader = rb.getReader();

            return new ReadableStream({
                start(controller) {
                    // The following function handles each data chunk
                    function push() {
                        // "done" is a Boolean and value a "Uint8Array"
                        reader.read().then(({ done, value }) => {
                            // If there is no more data to read
                            if (done) {
                                console.log('done', done);
                                controller.close();
                                return;
                            }
                            // Get the data and send it to the browser via the controller
                            controller.enqueue(value);
                            // Check chunks by logging to the console
                            console.log(done, value);
                            push();
                        })
                    }

                    push();
                }
            });
        })
        .then(stream => {
            // Respond with our stream
            return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
        })
        .then(res => {
            console.log('req.body:\n' + JSON.stringify(res.body))

            //let cartouche = res;

            $('#jsonTree').css('visibility', 'hidden');
            $('.rightSide').css('visibility', 'visible');

            //render(res);

        })
        .catch(err => {
            console.error("Error fetching DTB for cartouche:\n" + err.message);
        })





    ///////////////////////////////////////////////var model = singleShape(row_selected);

});


/*      Render SVG      */
function renderSVG(SVGobject) {
    /*      SVGR    endrer     */
    let renderer = new THREE.SVGRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(600, 350);
    document.getElementById('svgCanvas').appendChild(renderer.domElement);

    var camera = new THREE.PerspectiveCamera(75, 600 / 350, 0.1, 1000);
    camera.position.z = 35;
    var scene = new THREE.Scene();

    //3.1. Controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    //3.2 GUI
    var options = {
        Rotation: false
    };

    var gui = new dat.GUI();
    var f = gui.addFolder('Movement');
    f.open();
    f.add(options, 'Rotation');

    var ambient = new THREE.AmbientLight(0x80ffff);
    scene.add(ambient);
    var directional = new THREE.DirectionalLight(0xffff00);
    directional.position.set(-1, 0.5, 0);
    scene.add(directional);

    //4. Geometric Obj
    var geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    console.log('\n\ninfo geometry1:\n' + JSON.stringify(geometry))
    var geometry1 = SVGobject
    console.log('\n\ninfo geometry:\n' + geometry1.toString())

    var material = new THREE.MeshBasicMaterial({
        color: 0x1c1c1c,
        wireframe: true
    });
    var torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    //To start the infinite loop
    function render() {
        requestAnimationFrame(render);
        if (options.Rotation) {
            animateGeom();
        }
        renderer.render(scene, camera);
    }

    render();

    function animateGeom() {
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
    };

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }, false);
}

/*      DXF Plan Model            */
function myModel() {

    var output = {
        layer: "black",
        units: makerjs.unitType.Millimeter,
        paths: {
        },
        models: {
            // Outer Left Rectangle               
            s1: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(404.00, 564.400),
                }
            },
            // Outer Right Rectangle
            s2: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(404.00, 564.400)
                }
            },
            //Inner Left Rectangle
            s3: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 548.210)
                }
            },
            //Inner Left Rectangle Title
            s4: {
                mainFrame: new makerjs.models.Rectangle(364.660, 34.260),
                l1: {
                    layer: "red",
                    origin: [135, 27],
                    paths: {},
                    models: {
                        text: new makerjs.models.Text(_font, "Royaume du maroc", 60)
                    }
                },
                l2: {
                    layer: "green",
                    origin: [90, 19],
                    paths: {},
                    models: {
                        text: new makerjs.models.Text(_font, "Ministère de l\'interieur", 60)
                    }
                },
                l3: {
                    layer: "black",
                    origin: [45, 11],
                    paths: {},
                    models: {
                        text: new makerjs.models.Text(_font, "Secrétariat Général", 60)
                    }
                },
                l4: {
                    layer: "black",
                    origin: [0, 3],
                    paths: {},
                    models: {
                        text: new makerjs.models.Text(_font, "Direction des affaires", 60)
                    }
                }
            },
            //Inner Left Rectangle Plan Parcellaire
            s5: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 31.040)
                }
            },
            //Inner Left Rectangle Administratif fonciere
            s6: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 86.270)
                }
            },
            //Inner Left Rectangle occupation et superfidie
            s7: {
                layer: "red",
                origin: [0, 0],
                mainFrame: new makerjs.models.Rectangle(364.660, 91.600),
                l1: {
                    paths: {},
                    models: {
                    }
                },
                l2: {
                    layer: "green",
                    origin: [0, 20],
                    paths: {},
                    models: {
                    }
                }
            },
            //Inner Left Rectangle photo
            s8: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 125.050)
                }
            },
            //Inner Left Rectangle apercue exploitation holder
            s9: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 115.370)
                }
            },
            //Inner Left Rectangle Visa
            s10: {
                layer: "teal",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 64.770)
                }
            },
            //Inner right Rectangle KeyMap
            s11: {
                layer: "fuchsia",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(90.400, 53.550)
                }
            },
            //Inner right Rectangle
            s12: {
                layer: "navy",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 548.210)
                }
            },
            //Inner left Rectangle visa left           
            s13: {
                units: makerjs.unitType.Millimeter,
                models: {
                    RoundRectangle: new makerjs.models.RoundRectangle(173.850, 57.600, 8)
                },
                paths: {
                    BottomLeft: {
                        layer: "black"
                    },
                    BottomRight: {
                        layer: "black"
                    },
                    TopRight: {
                        layer: "black"
                    },
                    TopLeft: {
                        layer: "black"
                    }
                }
            },
            //Inner left Rectangle visa right
            s14: {
                models: {
                    RoundRectangle: new makerjs.models.RoundRectangle(170.940, 47.450, 8)
                },
                paths: {
                    BottomLeft: {
                        layer: "black"
                    },
                    BottomRight: {
                        layer: "black"
                    },
                    TopRight: {
                        layer: "black"
                    },
                    TopLeft: {
                        layer: "black"
                    }
                }
            },
            // date visa
            s15: {
                layer: "olive",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(92.820, 10.680)
                }
            },
            //aperçu de l'exploitation
            s16: {
                layer: "maroon",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(174.690, 102.960)
                }
            },
            //?
            s17: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(174.420, 102.960)
                }
            },
            //cadre photo
            s18: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(187.460, 120.840)
                }
            },
            //Inner left Rectangle
            s19: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(174.980, 75.000)
                }
            },
            //Inner left Rectangle 
            s20: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 548.210)
                }
            },
            //Inner left Rectangle  echelle                 
            s21: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(174.440, 13.00)
                }
            },
            //Inner left Rectangle
            s22: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(174.440, 60.860)
                }
            },
            //Inner left Rectangle
            s23: {
                layer: "pink",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(174.690, 66.380)
                }
            },
            //Inner left Rectangle
            s24: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(175.570, 66.3680)
                }
            },
            //Inner left Rectangle Title
            s25: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(327.070, 21.420)
                }
            },
        }
    }


    //move Rectangle 
    output.models.s2.origin = [404.00, 0];		//ok
    output.models.s3.origin = [19.670, 6.330];    //ok
    output.models.s4.origin = [19.670, 520];		//ok
    output.models.s5.origin = [19.670, 488.96];	//ok
    output.models.s6.origin = [19.670, 402.69];	//ok
    output.models.s7.origin = [19.670, 311.09];	//ok
    output.models.s8.origin = [19.670, 186.04];	//ok
    output.models.s9.origin = [19.670, 70.67];	//ok
    output.models.s10.origin = [19.670, 6];		//ok
    output.models.s11.origin = [428.860, 14.130];	//ok
    output.models.s12.origin = [19.670, 6];		//ok
    output.models.s13.origin = [26, 9.500];		//ok
    output.models.s14.origin = [205.110, 20.030];	//

    // aperçu de l'exploitation
    output.models.s15.origin = [249.610, 7.280];		//
    output.models.s16.origin = [25.720, 72.760];
    //cadre photo
    output.models.s17.origin = [205.470, 72.760];
    // image satellitaire
    output.models.s18.origin = [102.400, 189.030];
    //
    output.models.s19.origin = [23.1, 313.580];
    //
    output.models.s20.origin = [19.670, 6];
    //
    output.models.s21.origin = [204.250, 313.580];		//
    output.models.s22.origin = [204.250, 327.700];		//
    output.models.s23.origin = [23.390, 406.470];		//
    output.models.s24.origin = [204.720, 406.470];		//
    output.models.s25.origin = [41.580, 493.750];		//
    //output.models.allShapes.origin = [250.00, 293.50];		//

    return output;
}

// takes json object
// return array of coordination
function allShapes(jsonCoords) {

    var model = {
        layer: "black",
        units: makerjs.unitType.Millimeter,
        models: {},
        paths: {}
    }


    var coords = [];
    var i = 1;

    jsonCoords.features.forEach(element => {
        element.geometry.coordinates.forEach(elm => {
            elm.forEach(el => {
                coords.push(el);
            })

            model.models[i] = new makerjs.models.ConnectTheDots(false, coords);

            //allCoords.push(coords);
            allParcelle.push(model.models[i]);

            coords = [];
            i++;
        });
    });


    function wgs84TOepsg26192(geojson){

        var wgs84 = geojson; 
        var epsg26192 = geojson;

        var from = "+proj=gnom +lat_0=90 +lon_0=0 +x_0=6300000 +y_0=6300000 +ellps=WGS84 +datum=WGS84 +units=m +no_defs";
        var to = "+proj=lcc +lat_1=29.7 +lat_0=29.7 +lon_0=-5.4 +k_0=0.9996155960000001 +x_0=500000 +y_0=300000 +a=6378249.2 +b=6356515 +towgs84=31,146,47,0,0,0,0 +units=m +no_defs ";

        proj4(from, to, geojson);

        geojson.forEach(geo => {

        })
    }


    /* // var positions = [];
    //     var neighbours = [];

    var _allCoords = data;
    var boundary =  _allCoords[0]
    
    var daak = [];
    var level1 = 0; 
    var level2 = 0; 
    var level3 = 0; 
    var level4 = 0; 
    var level5 = 0; 
    var level6 = 0; 
    allCoords.forEach(coord => {
        
        if(coord.length < 2){
            coord.forEach(crd => {

                crd.forEach(_crd => {
                    daak.push(turf.turf.point(_crd));
                    level3 ++;
                })
                
                level2 ++;
            })
        }else{
            coord.forEach(crd => {
                crd.forEach(_crd => {
                    if(_crd.length == 2){
                        daak.push(turf.turf.point(_crd));
                    }else{
                        _crd.forEach(_crd_ => {
                            daak.push(_crd_);
                            level4 ++;
                        });
                    }
                    level3 ++;
                });

                level2++;
                
            });
        }
        level1++;
    });

    var polygon = turf.turf.convex(daak);

    console.log('\n\nha daak :\n'+ JSON.stringify(daak))

    for(var i=1 ; i < _allCoords.length; i++){

        var coord = _allCoords[i];

        var pol0 = turf.turf.polygon(coord.geometry.coordinates);
        var poli = turf.turf.polygon(boundary.geometry.coordinates);

        var bool = turf.turf.intersect(pol0, poli);

        if(bool){
            //saving neighboors for later use 
            //neighbours.push(coord);

            // combine the insersecting Parcelles 
            var united  = turf.turf.union(pol0, poli);
            _allCoords.slice(i, 1);
            _allCoords.push(united)
            i= i-1;
        }
        

    } */



    // // make boundaries

    // var point;
    // var polygon;
    // var boundary = {
    //     models: {
    //         neighbours:{
    //         }
    //     }
    // };



    // //iter all coords 
    // allCoords.forEach(coord => {
    //     // iter all Points 
    //     coord.forEach(pnt => {
    //         // get point to check if its intersecting another Parcelle
    //         point = pnt;

    //         // get all Parcelles One by One to test intersection
    //         allParcelle.forEach(p => {
    //             polygon = p;
    //             // if point intersects polygon
    //             if (geo.pointInPolygon(point, polygon)){

    //                 //save parcelles by closest to farest One to The initiating parcelle (point of test)
    //                 boundary.models.neighbours[]
    //             }

    //         });


    //     })
    // });

    return model;
}



function downloadZip() {

    var zip = new turf.jszip();

    var fldr = zip.folder("DXF folder")


    allDXF.forEach(parcelle => {
        let dxf = parcelle.DXF;

        // parcelle
        var mdl = new makerjs.models.ConnectTheDots(false, coords );
        mdl.layer = "red";
        //console.log('mdl-- origin bf scale : ' + dxf.paths.ShapeLine1.origin);

        var scaleval = getScale(myModel(), mdl, "loading") * 10


        // resize cartouche
        var model = makerjs.model.distort(dxf, scaleval, scaleval);
        console.log('model origin fb scale : ' + model.origin);

        
        model.origin = mdl.paths.ShapeLine1.origin
        model.origin =  turf.turf.centroid(mdl.Location)

        mdl.models = {
            cartouche : model
        }



        fldr.file("dxf_" + parcelle.N_ordre + ".dxf", makerjs.exporter.toDXF(mdl))
    })
    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            // see FileSaver.js
            turf.fileSaver.saveAs(content, "example.zip");
        });
}

// Upload Data to Backend
// POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

function animation(total, i, count) {
    
    // Loader
    $(".loader").css("visibility", "hidden");

    var _width = $('#dbProgress').width();
    // _width = parseFloat(_width.substr(0, _width.length - 2))

    $('#dbBar').animate({
        'width': (_width * total) / 100
    }, 100)

    $({ counter: 0 }).animate({ counter: total }, {
        duration: 3000,
        step: function () {
            $('#dbBar').text(i+'/'+count)
        }
    })
}

function fetchPromise(url, item) {
    var httpHeaders = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(item) // body data type must match "Content-Type" header
    };

    return new Promise(() => fetch(url, httpHeaders))
}

function saveAsync(url, item) {
    item.from = "saveAsync(url, item)"
    fetchPromise(url, item)
        .then(res => {
            res.from = "saveAsync(url, item)"

            console.log('\n\n saveAsync(url, item) res =  ' + JSON.stringify(res))

            return res;
        })
        .catch(err => {
            console.error("\n\nError while saving items individually to DTB :\n" + JSON.stringify(err));
        })
}

const forLoop_ = async (fileObject, url) => {
    // collect all items in One [Array, of, objects ...]
    var Features = [];
    fileObject.features.forEach(feature => {
        // Keep a Copy of sent Data to Handle in case of Error
        Features.push(feature);
    });

    // Progress bar animator
    var size = Features.length;
    var indic = 100 / size;
    var recent = 0;

    console.log("Start");



    // for (var i = 0; i < size; i++) {
    while (true) {

        const feature = Features[i];

        feature.from = "forLoop(fileObject, url)";

        const saved = await saveAsync(url, feature);

        //alert('\n\nitem '+ i +' saved :\n' + JSON.stringify(saved))
        console.log('\n\nitem ' + i + ' saved :\n' + JSON.stringify(saved))


        // if saving == OK
        if (saved) {

            recent += indic
            // console.log('recent = ' + recent);
            animation(Math.ceil(recent));

        } else {
            //alert('\n\nerror occured while saving item '+ i +' :\n' + JSON.stringify(saved))
            console.error('\n\nerror occured while saving item ' + i + ' :\n' + JSON.stringify(saved))
        }


    }
    console.log("end");


};



// promise based function 
const wait = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

// intermediate func 
const insertNwait = feature => {

    return wait(10000).then(v => {
        var url = 'http://localhost:8080/api/geojson/s';
        // start //
        fetchPromise(url, feature)
            .then(res => {
                res.from = "saveAsync(url, feature)"

                console.log('\n\n saveAsync(url, feature) res =  ' + JSON.stringify(res))

                return res;
            })
            .catch(err => {
                console.error("\n\nError while saving items individually to DTB :\n" + JSON.stringify(err));
            })

        // end  //

        //Features[feature]

    })
}


const insertLoop = async (array) => {
    // Array to iterate
    var Features = [];
    array.forEach(feature => {
        // Keep a Copy of sent Data to Handle in case of Error
        Features.push(feature);
    });

    console.log('Start')

    for (let index = 0; index < Features.length; index++) {



        const feature = Features[index]
        const saved = await insertNwait(feature)
        console.log("iter : " + index + ' finished  \nsaved : \n ' + JSON.stringify(saved))
    }

    console.log('End')
}



document.getElementById('telecharger').addEventListener('click', downloadZip);
document.getElementById('centrer').addEventListener('click', markButton);
document.getElementById('marquer').addEventListener('click', returnButton);