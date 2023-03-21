import { WalkUtils } from './walk';
import { EdgeUtils } from './edge';
import { GraphUtils } from './graph';
import { VertexUtils } from './vertex';

import { IGraph, Graph } from '../Graph';
import {
    IVertexUtils, IEdgeUtils, IGraphUtils, IGraphManipulation,
    IAdjacencyList, GraphType, WalkType, EulerTypes, IWalkUtils
} from './interfaces';

// istanbul ignore file
/**
 * A class that contains all the graph manipulation functions
 * @class
 * @implements IGraphManipulation
 * @param {IGraph} graph - The graph to manipulate
 * @returns {IGraphManipulation} - The graph manipulation functions
 */
class Utils extends Graph implements IGraphManipulation {
    vertexUtils: IVertexUtils;
    edgeUtils: IEdgeUtils;
    graphUtils: IGraphUtils;
    walkUtils: IWalkUtils;
    constructor(graph: IGraph) {
        super(graph.getVertices(), graph.getEdges());
        this.vertexUtils = new VertexUtils(graph);
        this.edgeUtils = new EdgeUtils(this.vertexUtils);
        this.graphUtils = new GraphUtils(this.edgeUtils);
        this.walkUtils = new WalkUtils(this.graphUtils);
    }
}


/**
 * Creates a utility object for manipulating a graph
 * @param graph The graph to manipulate
 * @returns An object containing all the graph manipulation functions, which organized into
 * vertexUtils, edgeUtils, and graphUtils.
 * @example This example shows how to create a basic graph and then use the graph manipulation
 * functions to see if the graph is a complete bipartite graph.
 *
 * ```ts
 * import { graphUtils, IVertex, IEdge, IGraphManipulation } from 'GraphUtils';
 * import { Graph } from 'Graph';
 *
 *
 * // create an array of objects for the vertices
 *  const vertData: IVertex[] = [
 *      {id:'1', label: 'A'},
 *      {id:'2', label: 'B'},
 *      {id:'3', label: 'C'},
 *      {id:'4', label: 'D'},
 *      {id:'5', label: 'E'}
 * ];
 *
 *
 * // create an array of objects for the edges
 * const edgeData: IEdge[] = [
 *      {id:'1', label:'AB' source: vertData[0], target: vertData[1]},
 *      {id:'2', label:'BC' source: vertData[1], target: vertData[2]},
 *      {id:'3', label:'AC' source: vertData[0], target: vertData[2]},
 *      {id:'4', label:'CD' source: vertData[2], target: vertData[3]},
 *      {id:'5', label:'DE' source: vertData[3], target: vertData[4]},
 *      {id:'6', label:'EB' source: vertData[4], target: vertData[1]}
 * ];
 *
 *
 * // create the graph utility object
 * const graph : IGraphManipulation = graphUtils(new Graph(vertData, edgeData));
 *
 *
 * // check if the graph is a complete bipartite graph
 * const isBipartite: boolean = graph.graphUtils.isCompleteBipartite();
 *
 *
 * console.log(isBipartite); // false
 * ```
 */
const graphUtils: (graph: IGraph) => IGraphManipulation = (graph: IGraph) => new Utils(graph);

// export the utils as function
export default graphUtils;

// export all the interfaces, enums, types, etc.
export {
    IGraphManipulation, GraphType, IAdjacencyList, IGraphUtils,
    IEdgeUtils, IVertexUtils, IGraph, WalkType, EulerTypes
};
