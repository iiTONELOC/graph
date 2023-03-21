import { Graph, IGraph, IEdge } from '../../Graph';
import { IVertexUtils } from '../interfaces';

export class VertexUtils extends Graph implements IVertexUtils {
    constructor(graph: IGraph) {
        super(graph.getVertices(), graph.getEdges());
    }

    /**
     * Determines the degree of a given vertex on the graph
     * @param vertex The id of the vertex on the graph
     * @returns The degree of the vertex
     */
    getDegree(vertex: string): number {
        return this.getEdges()
            .filter((e: IEdge) => e.source.id === vertex || e.target.id === vertex).length;
    }

    /**
     * Determines the neighbors of a given vertex on the graph
     * @param vertex The id of the vertex on the graph
     * @returns an array of the ids of the neighbors of the vertex
     */
    getNeighbors(vertex: string): string[] {
        return this.getEdges()
            .filter((e: IEdge) => e.source.id === vertex || e.target.id === vertex)
            .map((e: IEdge) => e.source.id === vertex ? e.target.id : e.source.id);
    }

    /**
     * Determines if two vertices are adjacent on the graph
     * @param vertex1 The id of the first vertex on the graph
     * @param vertex2 The id of the second vertex on the graph
     * @returns true if the vertices are adjacent, false otherwise
     */
    areAdjacent(vertex1: string, vertex2: string): boolean {
        return this.getNeighbors(vertex1).includes(vertex2);
    }

    /**
     * Determines if a vertex is isolated on the graph
     * @param vertex The id of the vertex on the graph
     * @returns true if the vertex is isolated, false otherwise
     */
    isIsolated(vertex: string): boolean {
        return this.getDegree(vertex) === 0;
    }
}
