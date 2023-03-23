import { IGraph, IEdge, IVertex, Graph } from '../Graph';
import { IGraphManipulation, IAdjacencyList, GraphType, WalkType, EulerTypes } from './interfaces';

// istanbul ignore file
/**
 * A class that contains all the graph manipulation functions
 * @class
 * @implements IGraphManipulation
 * @param {IGraph} graph - The graph to manipulate
 * @returns {IGraphManipulation} - The graph manipulation functions
 */
class Utils implements IGraphManipulation {
    graph: IGraph;
    constructor(graph: IGraph) {
        this.graph = graph;
    }
    //  ___ Vertex Manipulation Functions ___
    getDegree(vertex: string): number {
        return this.getNeighbors(vertex).length;
    }

    getNeighbors(vertex: string): string[] {
        // a vertex is only a neighbor if you can travel to it from the current vertex
        // this means that the edge must contain the current vertex as the source id,

        const neighbors: string[] = this.graph.getEdges().map((e: IEdge) => {
            if (e.source.id === vertex) {
                return e.target.id;
            }
            if (e.target.id === vertex) {
                return e.source.id;
            }
            return '-1';
        });

        return neighbors.filter((n: string) => n !== '-1');
    }

    areAdjacent(vertex1: string, vertex2: string): boolean {
        return this.getNeighbors(vertex1).includes(vertex2);
    }

    isIsolated(vertex: string): boolean {
        return this.getDegree(vertex) === 0;
    }

    areConnected(vertexIds: string[]): boolean {
        for (let i = 0; i < vertexIds.length - 1; i++) {
            if (!this.areAdjacent(vertexIds[i], vertexIds[i + 1])) {
                return false;
            }
        }
        return true;
    }

    // ___ End Vertex Manipulation Functions ___

    // ___ Edge Manipulation Functions ____

    hasParallelEdges(): boolean {
        // a parallel edge is defined as multiple edges between the same two vertices
        // we can determine this by checking if the number of edges is equal to the number of unique edges
        const edges = this.graph.getEdges();
        const uniqueEdges = new Set(edges.map((e: IEdge) => `${e.source.id}-${e.target.id}`));
        return edges.length !== uniqueEdges.size;
    }

    hasSelfLoops(): boolean {
        return this.graph.getEdges().some((e: IEdge) => e.source.id === e.target.id);
    }

    getEdgeId(vertex1: string, vertex2: string): string {
        const edge = this.graph.getEdges()
            .find((e: IEdge) => (e.source.id === vertex1 && e.target.id === vertex2)
                || (e.source.id === vertex2 && e.target.id === vertex1));
        return edge?.id || '';
    }

    isBridge(edgeId: string): boolean {
        // a bridge is an edge that if removed, would disconnect the graph
        // we can determine this by checking if the graph is connected before and after removing the edge
        const edge = this.graph.getEdge(edgeId);
        if (!edge) {
            return false;
        }

        // create a copy of the graph
        const graphCopy = graphUtils(new Graph(this.graph.getVertices(), this.graph.getEdges()));
        const graphConnected = graphCopy.isConnected();

        // remove the edge
        const edgeCopy: IEdge = graphCopy.graph.getEdge(edgeId) as IEdge;
        graphCopy.graph.removeEdge(edgeId);

        // check if the graph is still connected
        const graphStillConnected = graphCopy.isConnected();

        // add the edge back
        graphCopy.graph.addEdge(edgeCopy);

        return graphConnected && !graphStillConnected;
    }

    // ___ End Edge Manipulation Functions ___

    // ___ Graph Manipulation Functions ___


    getTotalDegree(): number {
        return this.graph.getEdges().length * 2;
    }

    getAdjacencyMatrix(): number[][] {
        const vertices = this.graph.getVertices();
        const edges = this.graph.getEdges();

        const matrix = new Array(vertices.length).fill(0)
            .map(() => new Array(vertices.length).fill(0));

        edges.forEach((e: IEdge) => {
            const sourceIndex = vertices.findIndex((v: IVertex) => v.id === e.source.id);
            const targetIndex = vertices.findIndex((v: IVertex) => v.id === e.target.id);
            matrix[sourceIndex][targetIndex] = 1;
            matrix[targetIndex][sourceIndex] = 1;
        });

        return matrix;
    }

    getAdjacencyList(): IAdjacencyList {
        const vertices = this.graph.getVertices();
        const edges = this.graph.getEdges();

        const list: IAdjacencyList = {};

        vertices.forEach((v: IVertex) => {
            list[v.id] = [];
        });

        edges.forEach((e: IEdge) => {
            list[e.source.id].push(e.target.id);
            list[e.target.id].push(e.source.id);
        });

        return list;
    }


    isSubgraph(graph: IGraph): boolean {
        const vertices = this.graph.getVertices();
        const edges = this.graph.getEdges();

        return graph.getVertices().every((v: IVertex) => vertices.includes(v))
            && graph.getEdges().every((e: IEdge) => edges.includes(e));
    }

    isRegular(): boolean {
        return this.graph.getVertices()
            .every((v: IVertex) => this.getDegree(v.id) === this.getDegree(this.graph.getVertices()[0].id));
    }

    getRegularDegree(): number {
        return this.isRegular() ? this.getDegree(this.graph.getVertices()[0].id) : -1;
    }

    isComplete(): boolean {
        // get an adjacency matrix of the graph
        const adjacencyMatrix = this.getAdjacencyMatrix();
        // check to see if the adjacency matrix is a square
        const n = adjacencyMatrix.length;

        // istanbul ignore next
        if (n !== adjacencyMatrix[0].length) {
            return false;
        }

        // check the diagonal to see if it is all 0s
        for (let i = 0; i < n; i++) {
            // istanbul ignore next
            if (adjacencyMatrix[i][i] !== 0) {
                return false;
            }
        }

        // check that every non-diagonal element is a 1
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i !== j && adjacencyMatrix[i][j] !== 1) {
                    return false;
                }
            }
        }

        return true;
    }

    isCyclic(): boolean {
        const vertices = this.graph.getVertices();
        const edges = this.graph.getEdges();

        return vertices.every((v: IVertex) => this.getNeighbors(v.id).length === 2)
            && edges.length === vertices.length;
    }

    isBipartite(): boolean {
        const vertices = this.graph.getVertices();
        // we can use the backtracking algorithm m coloring to determine if the graph is bipartite
        const color = new Map<string, number>();
        const visited = new Set<string>();

        const isBipartite = (vertex: string, c: number): boolean => {
            visited.add(vertex);
            color.set(vertex, c);

            // if any of the neighbors of the vertex are the same color, the graph is not bipartite
            if (this.getNeighbors(vertex).some((v: string) => color.get(v) === c)) {
                return false;
            }

            // if any of the unvisited neighbors of the vertex are not bipartite, the graph is not bipartite
            if (this.getNeighbors(vertex).some((v: string) => !visited.has(v) && !isBipartite(v, 1 - c))) {
                return false;
            }

            return true;
        };

        return isBipartite(vertices[0].id, 0);
    }

    isCompleteBipartite(): boolean {
        const vertices = this.graph.getVertices();
        const color = new Map<string, number>();
        const visited = new Set<string>();

        const isBipartite = (vertex: string, c: number): boolean => {
            visited.add(vertex);
            color.set(vertex, c);

            // if any of the neighbors of the vertex are the same color, the graph is not bipartite
            return this.getNeighbors(vertex).every((v: string) => {
                if (!visited.has(v)) {
                    return isBipartite(v, 1 - c);
                }

                return color.get(v) !== c;
            });
        };

        // if the graph is not bipartite, it cannot be complete bipartite
        if (!isBipartite(vertices[0].id, 0)) {
            return false;
        }

        // if the graph is bipartite, we can determine if it is complete bipartite
        // by checking if each vertex in the first group is connected to each vertex in the second group
        const firstGroup = vertices.filter((v: IVertex) => color.get(v.id) === 0);
        const secondGroup = vertices.filter((v: IVertex) => color.get(v.id) === 1);

        // checks if each vertex in the first group is connected to each vertex in the second group
        return firstGroup.every((v: IVertex) => secondGroup.every((w: IVertex) => this.areAdjacent(v.id, w.id)));
    }

    isHypercube(): boolean {
        const vertices = this.graph.getVertices();
        const edges = this.graph.getEdges();

        // returns -1 if the graph is not regular
        const degree = this.getRegularDegree();

        // if the graph is not regular, it cannot be a hypercube
        if (degree === -1) {
            return false;
        }

        // n should be 2^k for some k
        const n = Math.log2(vertices.length);
        // the number of edges should be 2^(n-1) * n
        const twoToTheNMinus1TimesN = Math.pow(2, n - 1) * n;

        // Does n equal our degree?
        const doesNEqualDegree = (): boolean => n === degree;
        // Do the number of edges equal 2^(n-1) * n?
        const doesTwoToTheNMinus1TimesNEqualEdges = (): boolean => twoToTheNMinus1TimesN === edges.length;

        // Does n equal our degree and do the number of edges equal 2^(n-1) * n?
        return doesNEqualDegree() && doesTwoToTheNMinus1TimesNEqualEdges();
    }

    getGraphType(): GraphType[] {
        const graphTypes: GraphType[] = [];

        if (this.isComplete()) {
            graphTypes.push(GraphType.Complete);
        }
        if (this.isCyclic()) {
            graphTypes.push(GraphType.Cyclic);
        }
        if (this.isCompleteBipartite()) {
            graphTypes.push(GraphType.CompleteBipartite);
        }
        if (this.isHypercube()) {
            graphTypes.push(GraphType.Hypercube);
        }
        if (this.isRegular()) {
            graphTypes.push(GraphType.Regular);
        }
        if (this.isBipartite()) {
            graphTypes.push(GraphType.Bipartite);
        }

        if (graphTypes.length === 0) {
            graphTypes.push(GraphType.Other);
        }

        return graphTypes;
    }

    isTheSameAs(other: IGraph): boolean {
        const vertices = this.graph.getVertices();
        const otherVertices = other.getVertices();

        const edges = this.graph.getEdges();
        const otherEdges = other.getEdges();

        const verticesSet = new Set<string>(vertices.map((v: IVertex) => v.id));
        const otherVerticesSet = new Set<string>(otherVertices.map((v: IVertex) => v.id));

        const edgesSet = new Set<string>(edges.map((e: IEdge) => e.id));
        const otherEdgesSet = new Set<string>(otherEdges.map((e: IEdge) => e.id));

        // the sets need to be identical
        const areTheSame = (set1: Set<string>, set2: Set<string>): boolean => {
            if (set1.size !== set2.size) {
                return false;
            }

            // istanbul ignore next
            for (const value of set1) {
                if (!set2.has(value)) {
                    return false;
                }
            }

            return true;
        };

        return areTheSame(verticesSet, otherVerticesSet) && areTheSame(edgesSet, otherEdgesSet);
    }

    getEdgeBetweenVertices(vertex1: IVertex, vertex2: IVertex): IEdge | undefined {
        // if the vertices are adjacent, return the edge that connects them
        const areAdjacent = this.areAdjacent(vertex1.id, vertex2.id);

        return areAdjacent ? this.graph.getEdges().find((e: IEdge) => {
            const opt1 = e.source.id === vertex1.id && e.target.id === vertex2.id;
            const opt2 = e.source.id === vertex2.id && e.target.id === vertex1.id;
            return opt1 || opt2;
        })

            : undefined;
    }

    isConnected(): boolean {
        // a graph is a connected graph if every pair of vertices is connected

        const vertices = this.graph.getVertices();
        let hasIsolated = false;

        // if a vertex is isolated, the graph is not connected
        for (const vertex of vertices) {
            hasIsolated = this.getNeighbors(vertex.id).length === 0;
        }

        return !hasIsolated;
    }

    // __ End of Graph Manipulation Functions __

    // ___ Walk Analysis Functions ___

    isValidWalk(walk: string[]): boolean {
        // the walk must be at least 2 vertices long
        // istanbul ignore next
        if (walk.length < 2) {
            return false;
        }

        return this.areConnected(walk);
    }

    isOpenWalk(walk: string[]): boolean {
        // the walk must be at least 2 vertices long
        // istanbul ignore next
        if (walk.length < 2) {
            return false;
        }

        // must be a valid walk and the first and last vertices must not be the same
        return this.isValidWalk(walk) && walk[0] !== walk[walk.length - 1];
    }

    isClosedWalk(walk: string[]): boolean {
        // the walk must be at least 2 vertices long
        // istanbul ignore next
        if (walk.length < 2) {
            return false;
        }

        // must be a valid walk and the first and last vertices must be the same
        return this.isValidWalk(walk) && walk[0] === walk[walk.length - 1];
    }

    hasNonRepeatingEdges(walk: string[]): boolean {
        // convert the walk which is an array of vertex ids to an array of traversed edges
        const traversedEdges = this._traverseEdges(walk);

        // create a unique set of the traversed edges
        const uniqueTraversedEdges = [...new Set(traversedEdges)];

        // If an edge comes back undefined, immediately return false because the vertices are not adjacent
        // if the length differs between the sets then there were duplicates edges in the walk
        return traversedEdges.includes(undefined) ? false : uniqueTraversedEdges.length === traversedEdges.length;
    }

    hasNonRepeatingVertices(walk: string[]): boolean {
        // create a unique set of the vertices in the walk
        const uniqueVertices = [...new Set(walk)];

        // if the length differs between the sets then there were duplicates vertices in the walk
        return uniqueVertices.length === walk.length;
    }

    /**
     * @Private
     * Raw function that attempts to traverse the edges in a given walk
     * @param walk An array of vertex ids representing a walk
     * @returns an array of IEdge objects representing the edges in the walk
     * some of the edges may be undefined if the vertices are not adjacent or an edge doesn't exist
     * and therefore the walk is not valid
     *
     * If there are any undefined values in the array, the walk is not valid
     */
    private _traverseEdges(walk: string[]): (IEdge | null | undefined)[] {
        return walk.map((vertex: string, index: number): IEdge | undefined | null => {
            // don't check the last vertex in the walk because there is no edge after it
            if (index !== walk.length - 1) {
                const currentVertex = this.graph.getVertex(vertex);
                const nextVertex = this.graph.getVertex(walk[index + 1]);
                // if the vertices are adjacent, return the edge that connects them
                if (currentVertex && nextVertex && this.areAdjacent(currentVertex.id, nextVertex.id)) {
                    return this.getEdgeBetweenVertices(currentVertex, nextVertex);
                }

                // undefined means that the vertices are not adjacent and an edge does not exist
                // this shouldn't happen because the walk is valid if we got this far
                // however if it does happen, return undefined so we know to immediately return false
                return undefined;
            } else {
                // means we are at the last vertex in the walk
                return null;
            }
        }).filter((e: IEdge | undefined | null) => e !== null);
    }

    isTrail(walk: string[]): boolean {
        // a trail is an open walk with no repeated edges
        if (!this.isOpenWalk(walk)) {
            return false;
        }
        return this.hasNonRepeatingEdges(walk);
    }

    isCircuit(walk: string[]): boolean {
        // a circuit is a closed walk with no repeated edges
        if (!this.isClosedWalk(walk)) {
            return false;
        }
        return this.hasNonRepeatingEdges(walk);
    }

    isPath(walk: string[]): boolean {
        // a path is a walk with no repeated vertices
        if (!this.isTrail(walk)) {
            return false;
        }
        return this.hasNonRepeatingVertices(walk);
    }

    isCycle(walk: string[]): boolean {
        // a cycle is a circuit with no repeated vertices except for the first and last vertices
        if (!this.isCircuit(walk)) {
            return false;
        }
        const firstLastVerticesTheSame = walk[0] === walk[walk.length - 1];
        // istanbul ignore next
        return firstLastVerticesTheSame ? this.hasNonRepeatingVertices(walk.slice(1, walk.length - 1)) : false;
    }

    isEulerTrail(walk: string[]): boolean {
        // is trail that traverses every edge in the graph exactly once
        // the graph must be connected
        if (!this.isConnected()) {
            return false;
        }

        // a trail by definition must be an open walk with no repeated edges
        if (!this.isTrail(walk)) {
            return false;
        }

        // Check the degree of the first and last vertices
        // get a reference to the first and last vertices
        const firstVertex = this.graph.getVertex(walk[0]);
        const lastVertex = this.graph.getVertex(walk[walk.length - 1]);

        // shouldn't happen because the walk is valid, but prevents returning undefined
        if (!firstVertex || !lastVertex) {
            return false;
        }

        // get their degrees
        const firstVertexDegree = this.getDegree(firstVertex.id);
        const lastVertexDegree = this.getDegree(lastVertex.id);

        // if they are even then the walk is not a valid euler trail
        if (firstVertexDegree % 2 === 0 || lastVertexDegree % 2 === 0) {
            return false;
        }

        // if we get here, the walk is a valid euler trail
        return true;
    }

    isEulerCircuit(walk: string[]): boolean {

        // check for odd degree vertices
        const oddDegreeVertices = this.graph.getVertices()
            .filter((v: IVertex) => this.getDegree(v.id) % 2 !== 0);

        if (oddDegreeVertices.length > 0) {
            return false;
        }

        // contains every edge in the graph exactly once
        // the graph must be connected
        if (!this.isConnected()) {
            return false;
        }

        // a circuit by definition must be a closed walk with no repeated edges
        if (!this.isCircuit(walk)) {
            return false;
        }

        // ensure that we have every vertex in the walk
        // create a set of the vertices by looping through the walk
        const verticesInWalk = new Set(walk);
        // create a set of the vertices in the graph
        const verticesInGraph = new Set(this.graph.getVertices().map((v: IVertex) => v.id));

        for (const vertex of verticesInGraph) {
            if (!verticesInWalk.has(vertex)) {
                return false;
            }
        }
        return true;
    }


    getEulerCircuitOrPath(): string[] | undefined { //NOSONAR

        // create a copy of the graph so we can modify it
        const graphCopy = graphUtils(new Graph(this.graph.getVertices(), this.graph.getEdges()));

        const oddDegreeVertices = graphCopy.graph.getVertices()
            .filter((v: IVertex) => graphCopy.getDegree(v.id) % 2 !== 0);

        // if we don't have an even number of odd degree vertices
        // or the graph is not connected we can't have an euler circuit
        if (oddDegreeVertices.length > 2 || !this.isConnected()) {
            return undefined;
        }

        // pick the starting vertex to be one of the odd degree vertices or the first vertex
        const startingVertex = oddDegreeVertices.length === 2 ? oddDegreeVertices[0] :
            graphCopy.graph.getVertices()[0];

        // holds our euler circuit or path
        const walk: string[] = [];

        // tracks the current vertex
        let currentVertexId = startingVertex.id;
        // tracks the degree of the current vertex
        let currentDegree = this.getDegree(currentVertexId);

        // if we hit a vertex with degree 0 we are done,
        // We set the current vertex to -1 to indicate that there were no neighbors
        while (currentDegree > 0 && currentVertexId !== '-1') {
            const neighbors = graphCopy.getNeighbors(currentVertexId);

            if (neighbors.length === 1) {
                // delete the edge
                const edgeToRemove = graphCopy.getEdgeId(currentVertexId, neighbors[0]);

                // set the current vertex to the neighbor
                walk.push(currentVertexId);
                // move to the next vertex
                currentVertexId = neighbors[0];
                // remove the edge
                graphCopy.graph.removeEdge(edgeToRemove);
            } else if (neighbors.length > 1) {
                // if there is more than one neighbor
                // choose a neighbor that is not a bridge
                // set the current vertex to the neighbor
                // delete the edge

                // find a neighbor that is not a bridge
                let neighbor = neighbors[0];
                let edgeToRemove = graphCopy.getEdgeId(currentVertexId, neighbor);

                edgeToRemove && (() => {
                    // ensure the edge is not a bridge
                    const neighborsCopy = [...neighbors];
                    while (graphCopy.isBridge(edgeToRemove)) {
                        neighborsCopy.shift();
                        neighbor = neighborsCopy[0];
                        edgeToRemove = graphCopy.getEdgeId(currentVertexId, neighbor);
                    }
                })();

                // // remove the edge
                graphCopy.graph.removeEdge(edgeToRemove);
                walk.push(currentVertexId);
                currentVertexId = edgeToRemove ? neighbor : '-1';
            } else {
                // if there are no neighbors
                // we are done
                walk.push(currentVertexId);
                currentVertexId = '-1';
            }
            currentDegree = this.getDegree(currentVertexId);
        }
        return walk;
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
export { IGraphManipulation, GraphType, IAdjacencyList, IGraph, WalkType, EulerTypes };
