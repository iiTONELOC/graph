import { ITreeManipulation } from 'TreeUtils';
import { IGraph, IVertex, IEdge } from '../Graph';
import type { randomWeightOptions } from '../utils';

export interface IGraphManipulation {

    graph: IGraph;

    // Dealing with individual vertices(nodes) set V

    /**
     * Determines if a vertex is isolated on the graph
     * @param vertex The id of the vertex on the graph
     * @returns true if the vertex is isolated, false otherwise
     */
    getDegree(vertex: string): number;
    /**
     * Determines the neighbors of a given vertex on the graph
     * @param vertex The id of the vertex on the graph
     * @returns an array of the ids of the neighbors of the vertex
     */
    isIsolated(vertex: string): boolean;

    /**
     * Determines the neighbors of a given vertex on the graph
     * @param vertex The id of the vertex on the graph
     * @returns an array of the ids of the neighbors of the vertex
     */
    getNeighbors(vertex: string): string[];

    /**
     * Determines if two vertices are adjacent on the graph
     * @param vertex1 The id of the first vertex on the graph
     * @param vertex2 The id of the second vertex on the graph
     * @returns true if the vertices are adjacent, false otherwise
     */
    areAdjacent(vertex1: string, vertex2: string): boolean;

    /**
     * Determines if a set of vertices are connected on the graph
     * @param vertexIds An array of the ids of the vertices on the graph
     * @returns true if they are connected, false otherwise
     */
    areConnected(vertexIds: string[]): boolean;
    // ____ End of vertex methods ____

    // Dealing with individual edges set E

    /**
    * Determines if the graph has self loops
    * @returns true if the graph has self loops, false otherwise
    */
    hasSelfLoops(): boolean;

    /**
     * Determines if the graph has parallel edges
     * @returns true if the graph has parallel edges, false otherwise
     */
    hasParallelEdges(): boolean;

    /**
     * Returns the edge id of the edge between two vertices
     * @param vertex1 The id of the first vertex on the graph
     * @param vertex2 The id of the second vertex on the graph
     * @returns the id of the edge between the two vertices -1 if the edge does not exist
     */
    getEdgeId(vertex1: string, vertex2: string): string;

    /**
     * Determines if the given edge is a bridge
     * @param edgeId The id of the edge on the graph
     * @returns true if the edge is a bridge, false otherwise
     */
    isBridge(edgeId: string): boolean;

    /**
     * This method assigns a weight to the specified edge
     *
     * @param edgeId The id of the edge to assign a weight to
     * @param weight The weight to assign to the edge
     */
    assignWeightToEdge(edgeId: string, weight: number): void;

    /**
     * This method assigns a random weight to the specified edge
     * @param edgeId The id of the edge to assign a weight to
     * @param options The options to use when assigning a random weight
     * @param options.seed The seed to use when generating the random number
     * @param options.max The maximum weight to assign to the edge
     * @param options.min The minimum weight to assign to the edge
     * @param options.allowNegative Determines if negative weights are allowed
     * @param options.allowZero Determines if zero weights are allowed
     * @see randomWeightOptions for optional parameters

     *
     * When no options are provided, the following defaults are used:
     * ```json
     * {
     *    seed: 0,
     *    max: 100,
     *    min: 0,
     *    allowNegative: false,
     *    allowZero: false
     * }
     * ```
     */
    assignRandomWeightToEdge(edgeId: string, options?: randomWeightOptions): void;

    /**
     * This method assigns a random weight to all edges in the graph
     * @param options The options to use when assigning a random weight
     * @see randomWeightOptions for optional parameters
     * @see assignRandomWeightToEdge for more information
     * */
    assignRandomWeightsToEdges(options?: randomWeightOptions): void;

    /**
     * This method returns the weight of the specified edge
     *
     * @param edgeId The id of the edge to get the weight of
     * @returns The weight of the edge or null if the edge does not exist
     */
    getEdgeWeight(edgeId: string): number | null;

    // ____ End of edge methods ___

    // Information regarding the graph as a whole
    /**
     * Determines if the graph is cyclic
     * This can only be true if the edges are arranged in a ring topology
     * @returns true if the graph is cyclic, false otherwise
     */
    isCyclic(): boolean;

    /**
     * Determines if the graph is regular
     * This is true if all vertices have the same degree
     * @returns true if the graph is regular, false otherwise
     */
    isRegular(): boolean;

    /**
     * Determines if the graph is complete
     * This is true if all vertices are adjacent to each other
     * @returns true if the graph is complete, false otherwise
     */
    isComplete(): boolean;

    /**
     * Determines if the graph is a hypercube
     * To be a hypercube, the graph must be regular and have 2^(n-1) * n edges
     * where n is the degree of the graph
     * @see https://en.wikipedia.org/wiki/Hypercube_graph
     * @returns true if the graph is a hypercube, false otherwise
     */
    isHypercube(): boolean;

    /**
     * Determines if the graph is bipartite
     * A bipartite graph is a graph whose vertices can be divided into two disjoint sets U and V
     * such that every edge connects a vertex in U to one in V
     *
     * @returns true if the graph is bipartite, false otherwise
     */
    isBipartite(): boolean;

    /**
     * Determines the total degree of the graph.
     * This is the sum of the degrees of all vertices
     *
     * @returns The total degree of the graph
     */
    getTotalDegree(): number;

    /**
     * Determines the degree of a regular graph
     * @returns The degree of the graph or -1 if the graph is not regular
     */
    getRegularDegree(): number;

    /**
     * Determines the type of graph
     *
     * @returns the type of graph, the types are defined in the GraphType enum
     */
    getGraphType(): GraphType[];

    /**
     * Determines if the graph is complete bipartite
     *
     * This is true if the graph is bipartite and complete
     * To satisfy the bipartite condition, no vertex can be connected by an edge to any vertex
     * in the same group (including itself) each vertex in the first group must be connected
     * by exactly one edge to each vertex in the second group.
     * @returns true if the graph is complete bipartite, false otherwise
     * */
    isCompleteBipartite(): boolean;

    /**
     * Determines if the graph contains a cycle recursively
     *
     * This is useful for determining if the graph is a tree
     * @returns true if the graph contains a cycle, false otherwise
     */
    hasCycles(): boolean;

    /**
     * Determines if the graph is a tree
     *
     * A tree is a connected graph with no cycles
     * @returns true if the graph is a tree, false otherwise
     */
    isTree(): boolean;

    /**
     * Creates an adjacency matrix representation of the graph
     * This is a 2D array where the rows and columns represent the vertices
     * ex. [[0, 1, 1], [1, 0, 1], [1, 1, 0]]
     * @returns An adjacency matrix of the graph
     */
    getAdjacencyMatrix(): number[][];

    /**
     * Creates an adjacency list representation of the graph
     * This is an object where the keys are the vertices and the values are the neighbors
     * ex. { A: ['B', 'C'], B: ['A', 'C'], C: ['A', 'B']}
     * @returns An adjacency list of the graph
     */
    getAdjacencyList(): IAdjacencyList;

    /**
     * Determines if the graph is a subgraph of another graph
     * @param graph The graph to compare to
     * @returns true if the graph is a subgraph of the other graph, false otherwise
     **/
    isSubgraph(graph: IGraph): boolean;

    /**
     * Determines if the graph is the same as another graph
     * @param other the other graph to compare to
     * @returns true if the graphs are the same, false otherwise
     */
    isTheSameAs(graph: IGraph): boolean;

    /**
     * Determines if two vertices have an edge between them and returns the edge if they do
     * @param vertex1 An IVertex object representing the first vertex
     * @param vertex2 An IVertex object representing the second vertex
     * @returns an IEdge object if the vertices are adjacent, undefined otherwise
     */
    getEdgeBetweenVertices(vertex1: IVertex, vertex2: IVertex): IEdge | undefined

    /**
     * Determines if a graph is connected
     * @returns true if the graph is connected, false otherwise
     */
    isConnected(): boolean;

    /**
     * Breadth first search
     *
     * Builds a tree of vertices that are reachable from the starting vertex
     * @param vertexId optional id of the vertex to start the search from.
     * @return An array of vertex ids representing the vertices in the order they were visited
     */
    breadthFirstSearch(vertexId?: string): string[];

    /**
     * Depth first search
     *
     * Builds a tree of vertices that are reachable from the starting vertex
     * @param vertexId optional id of the vertex to start the search from.
     * @return An array of vertex ids representing the vertices in the order they were visited
     */
    depthFirstSearch(vertexId?: string): string[];

    /**
     * Methods for generating a spanning tree of the graph
     *
     *  A spanning tree is a subgraph of the graph that includes all vertices
     *  and is a tree.
     *
     * A tree is a connected graph with no cycles
     */
    createSpanningTree(options?: {
        searchMethod?: SearchMethod;
        vertexId?: string;
    }): string[] | undefined;

    /**
     * Determines if the tree is a spanning tree
     *
     * A spanning tree is a sub-tree of a tree that contains all the vertices of the tree
     * @param path id's of the vertices in the path
     * @returns true if the path is a spanning tree, false otherwise
     */
    isSpanningTree(path: string[]): boolean;

    /**
       * This method calculates the totalWeight of the graph
       * @returns the totalWeight of the graph
       */
    totalWeight(): number;
    // ______ End of graph information methods ______

    // ______ Walks and paths ______

    /**
        * Determines if a walk or an array of vertex ids is a valid path
        *
        * A path is defined as a trail with no repeated vertices
        * @param walk An array of vertex ids representing a walk
        * @returns true if the walk is a path, false otherwise
        */
    isPath(walk: string[]): boolean;

    /**
     * Determines if a walk or an array of vertex ids is a valid cycle
     *
     * A cycle is a circuit of at least length 1 with no repeated vertices except for the first and last vertices
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk is a cycle, false otherwise
     */
    isCycle(walk: string[]): boolean;

    /**
     * Determines if a walk or an array of vertex ids is a valid trail
     *
     * A trail is defined as an open walk with no repeated vertices or edges
     *
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk is a trail, false otherwise
     */
    isTrail(walk: string[]): boolean;

    /**
     * Determines if a walk or an array of vertex ids is a valid circuit
     *
     * A circuit is defined as a closed walk with no repeated edges
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk is a circuit, false otherwise
     */
    isCircuit(walk: string[]): boolean;

    /**
     * Determines if the walk is an open walk
     * An open walk is a walk that starts and ends at different vertices
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk is an open walk, false otherwise
     */
    isOpenWalk(walk: string[]): boolean;

    /**
     * Determines if the graph is a tree
     * @param walk An array of vertex ids representing a walk
     *  @returns true if the walk is valid, false otherwise
     */
    isValidWalk(walk: string[]): boolean;

    /**
     * Determines if the walk is a closed walk
     * A closed walk is a walk that starts and ends at the same vertex
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk is a closed walk, false otherwise
     */
    isClosedWalk(walk: string[]): boolean;

    /**
     * Determines if the a walk has non-repeating edges
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk can be traversed, false otherwise
     */
    hasNonRepeatingEdges(walk: string[]): boolean;

    /**
     * Determines if a walk has non-repeating vertices
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk has non-repeating vertices, false otherwise
     */
    hasNonRepeatingVertices(walk: string[]): boolean;

    /**
     * Determines if a walk is an Euler trail
     *
     * An Euler trail is a trail that visits every edge exactly once
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk is an Euler trail, false otherwise
     * */
    isEulerTrail(walk: string[]): boolean;

    /**
     * Determines if a walk is an Euler circuit
     * 
     * An Euler circuit is a circuit that visits every edge exactly once and contains every vertex
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk is an Euler circuit, false otherwise
     * */
    isEulerCircuit(walk: string[]): boolean;

    /**
     * Returns a Euler circuit if one exists
     *
     * Uses Fleury's algorithm to find an Euler circuit or path
     * @see https://slaystudy.com/fleurys-algorithm/ for more information
     * @param vertexId The id of the vertex to start the Euler circuit or path from. This is an optional parameter,
     * the algorithm will pick the best vertex to start from if one is not provided. Unless you want to know explicitly
     * if a path or circuit exists from a specific vertex, you should not provide this parameter
     *
     * @returns An array of vertex ids representing an Euler circuit or path or undefined if one does not exist
     */
    getEulerCircuitOrPath(vertexId?: string): string[] | undefined;

    /**
     * Determines if a walk is a Hamiltonian Cycle
     *
     * A Hamiltonian cycle is a cycle that includes every vertex exactly once
     * @param walk An array of vertex ids representing a walk
     */
    isHamiltonianCycle(walk: string[]): boolean;

    /**
     * Determines if a walk is a Hamiltonian Path
     *
     * A Hamiltonian path is a path that includes every vertex exactly once
     * @param walk An array of vertex ids representing a walk
     */
    isHamiltonianPath(walk: string[]): boolean;

    /**
     * Generates a Hamiltonian path using a breadth first search
     *
     * @param vertexId the optional id of the vertex to start the path from.
     * If this parameter is not provided, the algorithm will pick the best vertex to start from
     */
    generateHamiltonianPath(vertexId?: string): string[] | undefined;

    /**
     * Creates a minimum spanning tree of the graph using Prim's algorithm
     *
     * @param vertexId The id of the vertex to start the minimum spanning tree from.
     * This is an optional parameter, if it is not provided, the algorithm will pick the
     *  best vertex to start from
     * @returns An object containing the vertices and edges of the minimum spanning tree
     * or undefined if one does not exist
     *
     * The object can be destructured as follows:
     * ```
     * const { vertices, edges } = graph.prim();
     * ```
     */
    prim(vertexId?: string): { vertices: IVertex[], edges: IEdge[] } | undefined;

}

// TO DO: Refactor the GraphType enum to be more descriptive
export enum GraphType {
    Complete = 1,
    Cyclic = 2,
    Regular = 3,
    CompleteBipartite = 4,
    Bipartite = 5,
    Hypercube = 6,
    Tree = 7,
    Other = 8
}

export enum SearchMethod {
    DepthFirst = 1,
    BreadthFirst = 2
}

export interface IAdjacencyList {
    [key: string]: string[];
}
