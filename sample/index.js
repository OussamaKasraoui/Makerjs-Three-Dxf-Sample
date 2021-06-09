const makerjs = require('makerjs');
//var opentype = require('https://cdnjs.cloudflare.com/ajax/libs/opentype.js/1.0.0/opentype.min.js');

var progress = document.getElementById('file-progress-bar');
var $progress = $('.progress');
const data = [];

var $cadview = $('#cad-view');
var dxfContentEl = $('#dxf-content')[0];
var cadCanvas;

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
            "</tr>";
            
    }
            $('#jsonTable').html(tableRows);


    var model = allShapes(jsonObject);
    //var model = trialText();

    render(model);

}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}


// Oussama Kasraoui

/*      render xdf object       */
function render(object) {
    // XDF file handling
    var parser = new window.DxfParser();
    var model;
    
    /*  for TEXT tests reasons  */
    if (object.source && object.source == "text")
    {
        var model = object.model;
    }else{
        var model = makerjs.exporter.toDXF(object);
    }

    var dxf = parser.parseSync(model);

    // Three.js changed the way fonts are loaded, and now we need to use FontLoader to load a font
    //  and enable TextGeometry. See this example http://threejs.org/examples/?q=text#webgl_geometry_text
    //  and this discussion https://github.com/mrdoob/three.js/issues/7398 
    var font;
    var loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', function (response) {
        font = response;
        $('#cad-view').empty();
        cadCanvas = new window.ThreeDxf.Viewer(dxf, document.getElementById('cad-view'), 700, 700, font);
    });

}

/*     Table Row Selected     */
$(document).on("click", "#jsonT td", function (e) {
    var row = e.currentTarget.id.slice(4);
    
    var model = singleShape(row);

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
function myModel(jsonCoords) {

    var output = {
        layer: "black",
        units: makerjs.unitType.Millimeter,
        paths: {
        },
        models: {
            // Outer Left Rectangle               
            s1: new makerjs.models.Rectangle(404.00, 564.400),
            // Outer Right Rectangle
            s2: {
                layer: "blue",
                paths: {},
                models: {
                  mainFrame : new makerjs.models.Rectangle(404.00, 564.400)
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
            //Inner left Rectangle visa left           
            // s13: new makerjs.models.RoundRectangle(173.850, 57.600, 8),
            // //Inner left Rectangle visa right
            // s14: new makerjs.models.RoundRectangle(170.940, 47.450, 8),
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
            //Inner left Rectangle
            //allShapes: allShapes(jsonCoords)
            //Inner left Rectangle
            // s26: new makerjs.models.Rectangle(364.660, 548.210),
            // //Inner left Rectangle
            // s27: new makerjs.models.Rectangle(364.660, 548.210),
            // //Inner left Rectangle
            // s28: new makerjs.models.Rectangle(364.660, 548.210),
            // //Inner left Rectangle
            // s29: new makerjs.models.Rectangle(364.660, 548.210),
            // //Inner left Rectangle
            // s30: new makerjs.models.Rectangle(364.660, 548.210),
            // //Inner left Rectangle
            // s31: new makerjs.models.Rectangle(364.660, 548.210),
            // //Inner left Rectangle
            // s32: new makerjs.models.Rectangle(364.660, 548.210)

        }
    }

    //set round rectangle corner's color
    output.models.s13.paths.BottomLeft.layer = "black";
    output.models.s13.paths.BottomRight.layer = "black";
    output.models.s13.paths.TopRight.layer = "black";
    output.models.s13.paths.TopLeft.layer = "black";

    output.models.s14.paths.BottomLeft.layer = "black";
    output.models.s14.paths.BottomRight.layer = "black";
    output.models.s14.paths.TopRight.layer = "black";
    output.models.s14.paths.TopLeft.layer = "black";

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
        layer : "black",
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

// takes array of coordinates
// returns MakerJS model
function setPaths(jsonCoords) {
    return new makerjs.models.ConnectTheDots(false, allShapes(jsonCoords))

}

//  takes Table row id
//  return model object
function singleShape(row) {
    row = parseInt(row);
    var model = myModel(row);
    var coords = [];
    
    data[row].geometry.coordinates.forEach(element => {
        element.forEach(elm => {
            elm.forEach(el => {
                coords.push(el);
            })
        });
    });

    var mdl = new makerjs.models.ConnectTheDots(false, coords );

    var plan = {
        layer: "red",
      	origin: [202, 282],
        models: {
            frame:  new makerjs.models.Rectangle(202.00, 282.200)
        },
        paths: {
        }
    }
    
    delete plan.models.frame;

    plan.models.shape = {
        units: makerjs.unitType.Centimeter,
        models: {
          pln: makerjs.model.scale(mdl, 100000)
        },
        paths: {
        }
    }

    model.models.s2.models.shape = plan;
  	makerjs.model.center(plan.models.shape);

    return model;    
}

// trial
function trialText(){
    
    var modelOPENTYPEjs;

    opentype.load('/sample/fonts/FreeSans-LrmZ.ttf', function (err, fontOpenTypeJS) {

        if (err) {
            document.getElementById('cad-view').innerText = 'the font could not be loaded :(';
        } else {
    
            modelOPENTYPEjs = new makerjs.models.Text(fontOpenTypeJS, 'Wa akhiiiiirane  :D', 100);
        }
    });    

    return {"model": modelOPENTYPEjs,
            "source": 'text'};
}