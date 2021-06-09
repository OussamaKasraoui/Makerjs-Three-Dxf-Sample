# Makerjs Three-Dxf Sample
.dxf file builder from JSON file using [MakerJS (Microsoft's Javascript Library)](https://github.com/Microsoft/maker.js) to generate a .DXF file, in addition to [THREE-DXF (project wich takes care of THREE Library to output the DXF content on the Web browser)](https://github.com/gdsestimating/three-dxf).

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install foobar.

```bash
npm install three-dxf
```

## Usage

```python
# first, compile three-dxf
> npm install
> npm run build

# then install the sample's dependencies
> cd sample
> npm install

# go back to the root and run http-server to run the sample
> cd ..
> npm install -g http-server@0.9.0
> http-server .
# use `http-server -c-1 .` to prevent caching
```
#### Supported DXF Features
Supports:
* Header
* Most LW entities (lines, polylines, circles, etc)
* Layers
* Some support for line types
* Simple Text
* Viewport
* Splines (Quadratic and Cubic)
* Ellipses
 
Does not yet support:
* Attributes
* 3DSolids
* All types of Leaders
* MText
* other less common objects and entities.


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
