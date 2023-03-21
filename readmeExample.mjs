import { Graph, graphUtils } from './lib/index.js';

// Step 2. create an array of objects for the vertices
const vertData = [
    { id: '1', label: 'A' },
    { id: '2', label: 'B' },
    { id: '3', label: 'C' },
    { id: '4', label: 'D' },
    { id: '5', label: 'E' }
];

// Step 3. create an array of objects for the edges
const edgeData = [
    { id: '1', label: 'AB', source: vertData[0], target: vertData[1] },
    { id: '2', label: 'BC', source: vertData[1], target: vertData[2] },
    { id: '3', label: 'AC', source: vertData[0], target: vertData[2] },
    { id: '4', label: 'CD', source: vertData[2], target: vertData[3] },
    { id: '5', label: 'DE', source: vertData[3], target: vertData[4] },
    { id: '6', label: 'EB', source: vertData[4], target: vertData[1] }
];

// Step 4. create the graph utility object
const graph = graphUtils(new Graph(vertData, edgeData));

// Step 5. Do stuff!
// get the total degree
const totalDegree = graph.graphUtils.getTotalDegree();

console.log(totalDegree); // 12
