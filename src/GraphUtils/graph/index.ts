import { EdgeUtils } from '../edge';
import { IGraph, IEdge, IVertex } from '../../Graph';
import { IEdgeUtils, IGraphUtils, GraphType, IAdjacencyList } from '../interfaces';

export class GraphUtils extends EdgeUtils implements IGraphUtils {
    constructor(graph: IEdgeUtils) {
        super(graph);
    }

    /**
  * Determines if the graph has parallel edges
  * @returns true if the graph has parallel edges, false otherwise
  */
    hasParallelEdges(): boolean {
        // a parallel edge is defined as multiple edges between the same two vertices
        // we can determine this by checking if the number of edges is equal to the number of unique edges
        const edges = this.getEdges();
        const uniqueEdges = new Set(edges.map((e: IEdge) => `${e.source.id}-${e.target.id}`));
        return edges.length !== uniqueEdges.size;
    }

    /**
     * Determines if the graph has self loops
     * @returns true if the graph has self loops, false otherwise
     */
    hasSelfLoops(): boolean {
        return this.getEdges().some((e: IEdge) => e.source.id === e.target.id);
    }

    /**
     * Determines the total degree of the graph.
     * This is the sum of the degrees of all vertices
     *
     * @returns The total degree of the graph
     */
    getTotalDegree(): number {
        return this
            .getEdges().length * 2;
    }

    /**
 * Creates an adjacency matrix representation of the graph
 * This is a 2D array where the rows and columns represent the vertices
 * ex. [[0, 1, 1], [1, 0, 1], [1, 1, 0]]
 * @returns An adjacency matrix of the graph
 */
    getAdjacencyMatrix(): number[][] {
        const vertices = this.getVertices();
        const edges = this.getEdges();

        const matrix = new Array(vertices.length)
            .fill(0).map(() => new Array(vertices.length).fill(0));

        edges.forEach((e: IEdge) => {
            const sourceIndex = vertices.findIndex((v: IVertex) => v.id === e.source.id);
            const targetIndex = vertices.findIndex((v: IVertex) => v.id === e.target.id);
            matrix[sourceIndex][targetIndex] = 1;
            matrix[targetIndex][sourceIndex] = 1;
        });

        return matrix;
    }

    /**
     * Creates an adjacency list representation of the graph
     * This is an object where the keys are the vertices and the values are the neighbors
     * ex. { A: ['B', 'C'], B: ['A', 'C'], C: ['A', 'B']}
     * @returns An adjacency list of the graph
     */
    getAdjacencyList(): IAdjacencyList {
        const vertices = this.getVertices();
        const edges = this.getEdges();

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

    /**
     * Determines if the graph is a subgraph of another graph
     * @param graph The graph to compare to
     * @returns true if the graph is a subgraph of the other graph, false otherwise
     **/
    isSubgraph(graph: IGraph): boolean {
        const vertices = this.getVertices();
        const edges = this.getEdges();

        return graph.getVertices().every((v: IVertex) => vertices.includes(v))
            && graph.getEdges().every((e: IEdge) => edges.includes(e));
    }

    /**
     * Determines if the graph is regular
     * This is true if all vertices have the same degree
     * @returns true if the graph is regular, false otherwise
     */
    isRegular(): boolean {
        return this.getVertices()
            .every((v: IVertex) => this.getDegree(v.id) === this.getDegree(this.getVertices()[0].id));
    }

    /**
     * Determines the degree of a regular graph
     * @returns The degree of the graph or -1 if the graph is not regular
     */
    getRegularDegree(): number {
        return this.isRegular() ? this.getDegree(this.getVertices()[0].id) : -1;
    }

    /**
     * Determines if the graph is complete
     * This is true if all vertices are adjacent to each other
     * @returns true if the graph is complete, false otherwise
     */
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

    /**
     * Determines if the graph is cyclic
     * This can only be true if the edges are arranged in a ring topology
     * @returns true if the graph is cyclic, false otherwise
     */

    isCyclic(): boolean {
        const vertices = this.getVertices();
        const edges = this.getEdges();

        return vertices.every((v: IVertex) => this.getNeighbors(v.id).length === 2)
            && edges.length === vertices.length;
    }

    isBipartite(): boolean {
        const vertices = this.getVertices();
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

    /**
     * Determines if the graph is complete bipartite
     *
     * This is true if the graph is bipartite and complete
     * To satisfy the bipartite condition, no vertex can be connected by an edge to any vertex
     * in the same group (including itself) each vertex in the first group must be connected
     * by exactly one edge to each vertex in the second group.
     * @returns true if the graph is complete bipartite, false otherwise
     * */
    isCompleteBipartite(): boolean {
        const vertices = this.getVertices();


        // we can use the backtracking algorithm m coloring to determine if the graph is bipartite
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


    /**
     * Determines if the graph is a hypercube
     * To be a hypercube, the graph must be regular and have 2^(n-1) * n edges
     * where n is the degree of the graph
     * @see https://en.wikipedia.org/wiki/Hypercube_graph
     * @returns true if the graph is a hypercube, false otherwise
     */
    isHypercube(): boolean {
        const vertices = this.getVertices();
        const edges = this.getEdges();

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

    /**
     * Determines the type of graph
     *
     * @returns the type of graph, the types are defined in the GraphType enum
     */
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

    /**
     * Determines if the graph is the same as another graph
     * @param other the other graph to compare to
     * @returns true if the graphs are the same, false otherwise
     */
    isTheSameAs(other: IGraph): boolean {
        const vertices = this.getVertices();
        const otherVertices = other.getVertices();

        const edges = this.getEdges();
        const otherEdges = other.getEdges();

        // create a set of the vertices and edges of both graphs and compare them
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

    /**
     * Determines if two vertices have an edge between them and returns the edge if they do
     * @param vertex1 An IVertex object representing the first vertex
     * @param vertex2 An IVertex object representing the second vertex
     * @returns an IEdge object if the vertices are adjacent, undefined otherwise
     */
    getEdgeBetweenVertices(vertex1: IVertex, vertex2: IVertex): IEdge | undefined {
        // if the vertices are adjacent, return the edge that connects them
        const areAdjacent = this.areAdjacent(vertex1.id, vertex2.id);

        return areAdjacent ? this.getEdges().find((e: IEdge) => {
            const opt1 = e.source.id === vertex1.id && e.target.id === vertex2.id;
            const opt2 = e.source.id === vertex2.id && e.target.id === vertex1.id;
            return opt1 || opt2;
        })

            : undefined;
    }
}
