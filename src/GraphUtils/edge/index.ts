import { IEdge } from '../../Graph';
import { VertexUtils } from '../vertex';
import { IEdgeUtils, IVertexUtils } from '../interfaces';

export class EdgeUtils extends VertexUtils implements IEdgeUtils {
    constructor(graph: IVertexUtils) {
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
}
