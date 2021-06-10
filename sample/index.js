const makerjs = require('makerjs');
//var opentype = require('https://cdnjs.cloudflare.com/ajax/libs/opentype.js/1.0.0/opentype.min.js');

var progress = document.getElementById('file-progress-bar');
var $progress = $('.progress');

var $cadview = $('#cad-view');
var dxfContentEl = $('#dxf-content')[0];
var cadCanvas;

var _font;
const data = [];
var row_selected;

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
    var fileReader = evt.target;
    if (fileReader.error) return console.log("error onloadend!?");
    progress.style.width = '100%';
    progress.textContent = '100%';
    setTimeout(function () { $progress.removeClass('loading'); }, 2000);

    var jsonObject = JSON.parse(fileReader.result)
    var tableRows = '';

    for (var i = 0; i < jsonObject.features.length; i++) {
        jsonObject.features[i].idRow = i;
        var arr = jsonObject.features[i];
        data.push(arr);
        tableRows +=
            "<tr>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.N_ordre + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.NUMERO_DOSSIER + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.Nom_AR + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.NOm_FR + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.CIN + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.PROVINCE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.CERCLE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.CAIDAT + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.COMMUNE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.LIEUX_RESIDENCE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.QUALITE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.cote_part_empietement + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.COLLECTIVITE_REF + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.REF_FONCIERE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.CONSISTANCE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.CODE_PARCELLE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.SEXE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.FRACTION + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.LISTE_AD + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.N_ORDRE_LISTE_AD + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.Superficie_Si + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.PLU_VALU_EXPLOITATION + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.LIVRAISON + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.INTEGRATION + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.ORGANISME + "</td>" +
            + "<td scope='row' id='row_" + i + "_bu' hidden>" + JSON.stringify(arr) + "</td>" +
            "</tr>";

    }
    $('#jsonTable').html(tableRows);


    var model = allShapes(jsonObject);

    render(model);

}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}


// Oussama Kasraoui
/*      loading Open Types.js fonts     */
$(document).ready(function () {

    opentype.load('/sample/fonts/FreeSans-LrmZ.ttf', function (err, fontOpenTypeJS) {

        if (err) {
            aler('the font could not be loaded :(');
        } else {
            _font = fontOpenTypeJS;
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
    row_selected = e.currentTarget.id.slice(4);
    var data_backup = $('#row_' + row_selected + '_bu').html();

    var model = myModel();
    var coords = [];



    var textLayer = {
        origin: [0, 0],
        layer: 'black',
        models: {
            title: {
            }
        },
        paths: {
        }
    };


    if (!data) {
        data = [data_backup];
    }
    /////////////   TEXT     ////////////////
    textLayer.models.title = new makerjs.models.Text(_font, data[row_selected].properties.CAIDAT, 72);

    /*title  s4*/
    textLayer.models.l1 = new makerjs.models.Text(_font, 'ROYAUME DU MAROC', 12);
    textLayer.models.l1.origin = [273.560, 943,730]
    textLayer.models.l1.layer = "red";

    textLayer.models.l2 = new makerjs.models.Text(_font, 'Ministère de l\'interieur', 12);
    textLayer.models.l1.origin = [0, 200]
    textLayer.models.l2.layer = "green";

    textLayer.models.l3 = new makerjs.models.Text(_font, 'Secrétariat Général', 12);
    textLayer.models.l1.origin = [0, 300]
    textLayer.models.l3.layer = "yellow";

    textLayer.models.l4 = new makerjs.models.Text(_font, 'Direction des affaires', 12);
    textLayer.models.l1.origin = [0, 400]
    textLayer.models.l4.layer = "bleu";


    /*plan parcellaire */
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    /* localisation administratif */
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    /* données fonciere */
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    /* données de l'occupation */
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    /* ta bleau des superficie */
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    /* echel */
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    /* photo */
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    /* apercue satellitaire */
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    /* appercue de l'exploiteur */
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    /* topographe */
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    /* Visa */
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);




    model.models["textLayer"] = textLayer;

    ////////////////////////////////////////


    // get parcelle points
    data[row_selected].geometry.coordinates.forEach(element => {
        element.forEach(elm => {
            elm.forEach(el => {
                coords.push(el);
            })
        });
    });

    // make model of points
    var mdl = new makerjs.models.ConnectTheDots(false, coords);

    // sub template makes the "Parcell" gets to the center of the container
    var plan = {
        layer: "red",
        origin: [202, 282],
        models: {
            frame: new makerjs.models.Rectangle(202.00, 282.200)
        },
        paths: {
        }
    }

    // hide sub template frames
    delete plan.models.frame;

    // append "Parcelle" to the sub Template (centerer)
    plan.models.shape = {
        units: makerjs.unitType.Centimeter,
        models: {
            parcelle: makerjs.model.scale(mdl, 100000)
        },
        paths: {
        }
    }

    // append sub template to  S2  sub Model in myModel() 
    model.models.s2.models.shape = plan;
    // append textLayer to  S1  sub Model in myModel() 
    model.models.s1.models.text = textLayer;

    // let sub template centering sub models  
    makerjs.model.center(plan.models.shape);





    ///////////////////////////////////////////////var model = singleShape(row_selected);
    render(model);


});


/*      Render SVG      */
function renderSVG(SVGobject) {
    /*      SVGR    endrer     */
    let renderer = new THREE.SVGRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(600, 350);
    document.getElementById('cad-view').appendChild(renderer.domElement);

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
            s3: new makerjs.models.Rectangle(364.660, 548.210),
            //Inner Left Rectangle Title
            s4: new makerjs.models.Rectangle(364.660, 34.260),
            //Inner Left Rectangle Plan Parcellaire
            s5: new makerjs.models.Rectangle(364.660, 31.040),
            //Inner Left Rectangle Administratif fonciere
            s6: new makerjs.models.Rectangle(364.660, 86.270),
            //Inner Left Rectangle occupation et superfidie
            s7: new makerjs.models.Rectangle(364.660, 91.600),
            //Inner Left Rectangle photo
            s8: new makerjs.models.Rectangle(364.660, 125.050),
            //Inner Left Rectangle apercue exploitation
            s9: new makerjs.models.Rectangle(364.660, 115.370),
            //Inner Left Rectangle Visa
            s10: new makerjs.models.Rectangle(364.660, 64.770),
            //Inner right Rectangle KeyMap
            s11: new makerjs.models.Rectangle(90.400, 53.550),
            //Inner right Rectangle
            s12: new makerjs.models.Rectangle(364.660, 548.210),
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
            //Inner left Rectangle
            s15: new makerjs.models.Rectangle(92.820, 10.680),
            //Inner left Rectangle
            s16: new makerjs.models.Rectangle(174.690, 66.380),
            //Inner left Rectangle
            s17: new makerjs.models.Rectangle(174.420, 102.960),
            //Inner left Rectangle
            s18: new makerjs.models.Rectangle(187.460, 120.840),
            //Inner left Rectangle
            s19: new makerjs.models.Rectangle(174.980, 75.000),
            //Inner left Rectangle
            s20: new makerjs.models.Rectangle(364.660, 548.210),
            //Inner left Rectangle                   
            s21: new makerjs.models.Rectangle(174.440, 13.00),
            //Inner left Rectangle
            s22: new makerjs.models.Rectangle(174.440, 60.860),
            //Inner left Rectangle
            s23: new makerjs.models.Rectangle(174.690, 66.380),
            //Inner left Rectangle
            s24: new makerjs.models.Rectangle(175.570, 66.3680),
            //Inner left Rectangle
            s25: new makerjs.models.Rectangle(327.070, 21.420),
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
    output.models.s15.origin = [249.610, 7.280];		//
    output.models.s16.origin = [25.720, 72.760];		//
    output.models.s17.origin = [205.470, 72.760];		//
    output.models.s18.origin = [102.400, 189.030];		//
    output.models.s19.origin = [23.1, 313.580];		//
    output.models.s20.origin = [19.670, 6];		//
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
                /* handle   edges*/
            })

            model.models[i] = new makerjs.models.ConnectTheDots(false, coords);

            coords = [];
            i++;
        });
    });
    return model;
}
