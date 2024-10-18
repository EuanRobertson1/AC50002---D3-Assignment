//Set the dimensions of the SVG container
const width = 500;
const height = 600;

//Create an SVG element
const svg = d3.select("svg")
  .attr("width", width)
  .attr("height", height);

//projection
const projection = d3.geoMercator()
  .center([-3.5, 55.9])
  .scale(1750) 
  .translate([width / 2, height / 2]);

//Create a path generator using the projection
const path = d3.geoPath().projection(projection);

//Load the map data
d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json').then(worldData => {
  const countries = topojson.feature(worldData, worldData.objects.countries).features;
  const uk = countries.filter(d => d.id === "826"); 
  const isleOfMan = countries.filter(d => d.id === "833");

  //add blue rectangle to represent the sea
  svg.append('rect')
    .attr("width", width)
    .attr("height", height)
    .attr('fill', '#87CEEB');

  //add UK
  svg.selectAll('path.uk')
    .data(uk)
    .enter().append('path')
    .attr('d', path)
    .attr('fill', '#3f9b0b')
    .attr('stroke', '#000')
    .attr('stroke-width', 0.5);
  //add Isle of Man
  svg.selectAll('path.isleOfMan')
    .data(isleOfMan)
    .enter().append('path')
    .attr('d', path)
    .attr('fill', '#3f9b0b')
    .attr('stroke', '#000')
    .attr('stroke-width', 0.5);

  

}).catch(error => {
  console.error('Error loading or parsing the TopoJSON file:', error);
});

//load towns data
d3.json("http://34.147.162.172/Circles/Towns/500").then(townData => {
  
})