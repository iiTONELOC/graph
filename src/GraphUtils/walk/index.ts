import { IEdge } from '../../Graph';
import { GraphUtils } from '../graph';
import { IGraphUtils } from '../interfaces';

export class WalkUtils extends GraphUtils implements IGraphUtils {
    constructor(graph: IGraphUtils) {
        super(graph);
    }
    /**
        * Determines if the graph is a tree
        * @param walk An array of vertex ids representing a walk
        * @returns true if the walk is valid, false otherwise
        */
    isValidWalk(walk: string[]): boolean {
        // the walk must be at least 2 vertices long
        // istanbul ignore next
        if (walk.length < 2) {
            return false;
        }

        // the walk must be a valid path
        return walk.every((vertex: string, index: number) => {
            // the first vertex in the walk can be any vertex
            if (index === 0) {
                return true;
            }

            // the previous vertex in the walk must be adjacent to the current vertex
            return this.areAdjacent(walk[index - 1], vertex);
        });
    }

    /**
     * Determines if the walk is an open walk
     * An open walk is a walk that starts and ends at different vertices
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk is an open walk, false otherwise
     */
    isOpenWalk(walk: string[]): boolean {
        // the walk must be at least 2 vertices long
        // istanbul ignore next
        if (walk.length < 2) {
            return false;
        }

        // must be a valid walk and the first and last vertices must not be the same
        return this.isValidWalk(walk) && walk[0] !== walk[walk.length - 1];
    }

    /**
     * Determines if the walk is a closed walk
     * A closed walk is a walk that starts and ends at the same vertex
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk is a closed walk, false otherwise
     */
    isClosedWalk(walk: string[]): boolean {
        // the walk must be at least 2 vertices long
        // istanbul ignore next
        if (walk.length < 2) {
            return false;
        }

        // must be a valid walk and the first and last vertices must be the same
        return this.isValidWalk(walk) && walk[0] === walk[walk.length - 1];
    }
    /**
        * Determines if the a walk has non-repeating edges
        * @param walk An array of vertex ids representing a walk
        * @returns true if the walk can be traversed, false otherwise
        */
    hasNonRepeatingEdges(walk: string[]): boolean {
        // convert the walk which is an array of vertex ids to an array of traversed edges
        const traversedEdges = this._traverseEdges(walk);

        // create a unique set of the traversed edges
        const uniqueTraversedEdges = [...new Set(traversedEdges)];

        // If an edge comes back undefined, immediately return false because the vertices are not adjacent
        // if the length differs between the sets then there were duplicates edges in the walk
        return traversedEdges.includes(undefined) ? false : uniqueTraversedEdges.length === traversedEdges.length;
    }

    /**
     * Determines if a walk has non-repeating vertices
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk has non-repeating vertices, false otherwise
     */
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
                const currentVertex = this.getVertex(vertex);
                const nextVertex = this.getVertex(walk[index + 1]);
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

    /**
     * Determines if a walk or an array of vertex ids is a valid trail
     *
     * A trail is defined as an open walk with no repeated vertices or edges
     *
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk is a trail, false otherwise
     */
    isTrail(walk: string[]): boolean {
        // a trail is an open walk with no repeated vertices or edges
        if (!this.isOpenWalk(walk)) {
            return false;
        }
        return this.hasNonRepeatingEdges(walk);
    }

    /**
     * Determines if a walk or an array of vertex ids is a valid circuit
     *
     * A circuit is defined as a closed walk with no repeated edges
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk is a circuit, false otherwise
     */
    isCircuit(walk: string[]): boolean {
        // a circuit is a closed walk with no repeated vertices or edges
        if (!this.isClosedWalk(walk)) {
            return false;
        }
        return this.hasNonRepeatingEdges(walk);
    }

    /**
     * Determines if a walk or an array of vertex ids is a valid path
     *
     * A path is defined as a trail with no repeated vertices
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk is a path, false otherwise
     */
    isPath(walk: string[]): boolean {
        // a path is a walk with no repeated vertices
        if (!this.isTrail(walk)) {
            return false;
        }
        return this.hasNonRepeatingVertices(walk);
    }

    /**
     * Determines if a walk or an array of vertex ids is a valid cycle
     *
     * A cycle is a circuit of at least length 1 with no repeated vertices except for the first and last vertices
     * @param walk An array of vertex ids representing a walk
     * @returns true if the walk is a cycle, false otherwise
     */
    isCycle(walk: string[]): boolean {
        // a cycle is a circuit with no repeated vertices except for the first and last vertices
        if (!this.isCircuit(walk)) {
            return false;
        }
        const firstLastVerticesTheSame = walk[0] === walk[walk.length - 1];
        // istanbul ignore next
        return firstLastVerticesTheSame ? this.hasNonRepeatingVertices(walk.slice(1, walk.length - 1)) : false;
    }
}
