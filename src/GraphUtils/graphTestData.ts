import { IVertex, IEdge, Graph } from '../Graph';
import graphUtils from './index';


//Bipartite graph
const bipartVerts: IVertex[] = [
    { id: '1', label: 'A' },
    { id: '2', label: 'B' },
    { id: '3', label: 'C' },
    { id: '4', label: 'D' },
    { id: '5', label: 'E' },
    { id: '6', label: 'F' }
];
const bipartEdges: IEdge[] = [
    { id: '1', label: 'AC', source: bipartVerts[0], target: bipartVerts[2] },
    { id: '2', label: 'AD', source: bipartVerts[0], target: bipartVerts[3] },
    { id: '3', label: 'AE', source: bipartVerts[0], target: bipartVerts[4] },
    { id: '4', label: 'AF', source: bipartVerts[0], target: bipartVerts[5] },
    { id: '5', label: 'BC', source: bipartVerts[1], target: bipartVerts[2] },
    { id: '6', label: 'BD', source: bipartVerts[1], target: bipartVerts[3] },
    { id: '7', label: 'BE', source: bipartVerts[1], target: bipartVerts[4] },
    { id: '8', label: 'BF', source: bipartVerts[1], target: bipartVerts[5] }
];

// Cyclic graph
const cyclicVerts: IVertex[] = [
    { id: '1', label: 'A' },
    { id: '2', label: 'B' },
    { id: '3', label: 'C' },
    { id: '4', label: 'D' }
];

const cyclicEdges: IEdge[] = [
    { id: '1', label: 'AB', source: cyclicVerts[0], target: cyclicVerts[1] },
    { id: '2', label: 'BC', source: cyclicVerts[1], target: cyclicVerts[2] },
    { id: '3', label: 'CD', source: cyclicVerts[2], target: cyclicVerts[3] },
    { id: '4', label: 'DA', source: cyclicVerts[3], target: cyclicVerts[0] }
];

// Complete graph
const completeVerts: IVertex[] = [
    { id: '1', label: 'A' },
    { id: '2', label: 'B' },
    { id: '3', label: 'C' },
    { id: '4', label: 'D' }
];

const completeEdges: IEdge[] = [
    { id: '1', label: 'AB', source: completeVerts[0], target: completeVerts[1] },
    { id: '2', label: 'AC', source: completeVerts[0], target: completeVerts[2] },
    { id: '3', label: 'AD', source: completeVerts[0], target: completeVerts[3] },
    { id: '4', label: 'BC', source: completeVerts[1], target: completeVerts[2] },
    { id: '5', label: 'BD', source: completeVerts[1], target: completeVerts[3] },
    { id: '6', label: 'CD', source: completeVerts[2], target: completeVerts[3] },
    { id: '7', label: 'BA', source: completeVerts[1], target: completeVerts[0] },
    { id: '8', label: 'CA', source: completeVerts[2], target: completeVerts[0] },
    { id: '9', label: 'DA', source: completeVerts[3], target: completeVerts[0] },
    { id: '10', label: 'CB', source: completeVerts[2], target: completeVerts[1] },
    { id: '11', label: 'DB', source: completeVerts[3], target: completeVerts[1] },
    { id: '12', label: 'DC', source: completeVerts[3], target: completeVerts[2] }
];

// Graph 5 Hypercube graph
const hypercubeVerts: IVertex[] = [
    { id: '1', label: 'A' },
    { id: '2', label: 'B' },
    { id: '3', label: 'C' },
    { id: '4', label: 'D' },
    { id: '5', label: 'E' },
    { id: '6', label: 'F' },
    { id: '7', label: 'G' },
    { id: '8', label: 'H' }
];

const hypercubeEdges: IEdge[] = [
    // Contains unique edges for each vertex
    // A-H, A-B, A-D
    { id: '1', label: 'AB', source: hypercubeVerts[0], target: hypercubeVerts[1] },
    { id: '2', label: 'AH', source: hypercubeVerts[0], target: hypercubeVerts[7] },
    { id: '3', label: 'AD', source: hypercubeVerts[0], target: hypercubeVerts[3] },
    // B-A, B-C, B-G
    { id: '4', label: 'BC', source: hypercubeVerts[1], target: hypercubeVerts[2] },
    { id: '5', label: 'BG', source: hypercubeVerts[1], target: hypercubeVerts[6] },
    // C-B, C-D, C-F
    { id: '6', label: 'CD', source: hypercubeVerts[2], target: hypercubeVerts[3] },
    { id: '7', label: 'CF', source: hypercubeVerts[2], target: hypercubeVerts[5] },
    // D-E,
    { id: '8', label: 'DE', source: hypercubeVerts[3], target: hypercubeVerts[4] },
    // E-F,E-H
    { id: '9', label: 'EF', source: hypercubeVerts[4], target: hypercubeVerts[5] },
    { id: '10', label: 'EH', source: hypercubeVerts[4], target: hypercubeVerts[7] },
    // h-g
    { id: '11', label: 'HG', source: hypercubeVerts[7], target: hypercubeVerts[6] },
    // g-f
    { id: '12', label: 'GF', source: hypercubeVerts[6], target: hypercubeVerts[5] }
];

// create vertices and edges for a graph with a Eulerian path
const eulerTrailVerts: IVertex[] = [
    { id: '1', label: 'A' },
    { id: '2', label: 'B' },
    { id: '3', label: 'C' },
    { id: '4', label: 'D' },
    { id: '5', label: 'E' },
    { id: '6', label: 'F' }
];

const eulerTrailEdges: IEdge[] = [
    { id: '1', label: 'AB', source: eulerTrailVerts[0], target: eulerTrailVerts[1] },
    { id: '2', label: 'AC', source: eulerTrailVerts[0], target: eulerTrailVerts[2] },
    { id: '3', label: 'AD', source: eulerTrailVerts[0], target: eulerTrailVerts[3] },
    { id: '4', label: 'AE', source: eulerTrailVerts[0], target: eulerTrailVerts[4] },
    { id: '5', label: 'BC', source: eulerTrailVerts[1], target: eulerTrailVerts[2] },
    { id: '6', label: 'BF', source: eulerTrailVerts[1], target: eulerTrailVerts[5] },
    { id: '7', label: 'CD', source: eulerTrailVerts[2], target: eulerTrailVerts[3] },
    { id: '8', label: 'CF', source: eulerTrailVerts[2], target: eulerTrailVerts[5] },
    { id: '9', label: 'DE', source: eulerTrailVerts[3], target: eulerTrailVerts[4] }
];

const eulerCircuitEdges: IEdge[] = [
    ...eulerTrailEdges,
    { id: '10', label: 'DB', source: eulerTrailVerts[3], target: eulerTrailVerts[1] }
];

export const vertData: IVertex[] = [
    { id: '1', label: 'A' },
    { id: '2', label: 'B' },
    { id: '3', label: 'C' },
    { id: '4', label: 'D' },
    { id: '5', label: 'E' }
];

export const edgeData: IEdge[] = [
    { id: '1', label: 'AB', source: vertData[0], target: vertData[1] },
    { id: '2', label: 'BC', source: vertData[1], target: vertData[2] },
    { id: '3', label: 'AC', source: vertData[0], target: vertData[2] },
    { id: '4', label: 'CD', source: vertData[2], target: vertData[3] },
    { id: '5', label: 'DE', source: vertData[3], target: vertData[4] },
    { id: '6', label: 'EB', source: vertData[4], target: vertData[1] }
];

export const GraphUtils = graphUtils(new Graph(vertData, edgeData));
export const bipartGraphUtils = graphUtils(new Graph(bipartVerts, bipartEdges));
export const cyclicGraphUtils = graphUtils(new Graph(cyclicVerts, cyclicEdges));
export const completeGraphUtils = graphUtils(new Graph(completeVerts, completeEdges));
export const hypercubeGraphUtils = graphUtils(new Graph(hypercubeVerts, hypercubeEdges));
export const eulerTrailGraphUtils = graphUtils(new Graph(eulerTrailVerts, eulerTrailEdges));
export const eulerCircuitGraphUtils = graphUtils(new Graph(eulerTrailVerts, eulerCircuitEdges));

const defaultExports = {
    GraphUtils,
    bipartGraphUtils,
    cyclicGraphUtils,
    completeGraphUtils,
    hypercubeGraphUtils,
    eulerTrailGraphUtils,
    eulerCircuitGraphUtils,
    vertData,
    edgeData
};

export default defaultExports;
