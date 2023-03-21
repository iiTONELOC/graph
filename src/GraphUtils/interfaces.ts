import { IGraph, IVertex, IEdge } from '../Graph';

export interface IVertexUtils extends IGraph {
    // Dealing with individual vertices(nodes) set V
    getDegree(vertex: string): number;
    isIsolated(vertex: string): boolean;
    getNeighbors(vertex: string): string[];
    areAdjacent(vertex1: string, vertex2: string): boolean;
}

export interface IEdgeUtils extends IVertexUtils, IGraph {
    // Dealing with individual edges
    hasSelfLoops(): boolean;
    hasParallelEdges(): boolean;
}

export interface IGraphUtils extends IEdgeUtils, IVertexUtils, IGraph {
    // Information regarding the graph as a whole
    isCyclic(): boolean;
    isRegular(): boolean;
    isComplete(): boolean;
    isHypercube(): boolean;
    isBipartite(): boolean;
    getTotalDegree(): number;
    getRegularDegree(): number;
    getGraphType(): GraphType[];
    isCompleteBipartite(): boolean;
    getAdjacencyMatrix(): number[][];
    getAdjacencyList(): IAdjacencyList;
    isSubgraph(graph: IGraph): boolean;
    isTheSameAs(graph: IGraph): boolean;
    getEdgeBetweenVertices(vertex1: IVertex, vertex2: IVertex): IEdge | undefined
}

export interface IWalkUtils extends IGraphUtils, IEdgeUtils, IVertexUtils, IGraph {
    isPath(walk: string[]): boolean;
    isCycle(walk: string[]): boolean;
    isTrail(walk: string[]): boolean;
    isCircuit(walk: string[]): boolean;
    isOpenWalk(walk: string[]): boolean;
    isValidWalk(walk: string[]): boolean;
    isClosedWalk(walk: string[]): boolean;
    hasNonRepeatingEdges(walk: string[]): boolean;
    hasNonRepeatingVertices(walk: string[]): boolean;
}

export interface IGraphManipulation extends IGraph {
    vertexUtils: IVertexUtils;
    edgeUtils: IEdgeUtils;
    graphUtils: IGraphUtils;
    walkUtils: IWalkUtils;
}

export enum GraphType {
    Complete = 1,
    Cyclic = 2,
    Regular = 3,
    CompleteBipartite = 4,
    Bipartite = 5,
    Hypercube = 6,
    Other = 7
}

export enum WalkType {
    Open = 1,
    Closed = 2,
    Invalid = 3,
    Trail = 4,
    Circuit = 5,
    Path = 6,
    Cycle = 7
}

export enum EulerTypes {
    Circuit = 1,
    Path = 2,
    Trail = 3,
    None = 4
}

export interface IAdjacencyList {
    [key: string]: string[];
}
