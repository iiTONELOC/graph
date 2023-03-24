import { IGraphManipulation } from '../GraphUtils';

interface ITreeManipulation extends IGraphManipulation {

    /**
     * Determines if the given vertex is a leaf
     *
     * A Leaf is a vertex with only one edge
     * @param vertex the id of the vertex to check
     */
    isLeaf(vertex: string): boolean;

    /**
     * Determines if the given vertex is an internal vertex
     *
     * An internal vertex is a vertex with more than one edge
     * @param vertex the id of the vertex to check
     */
    isInternalVertex(vertex: string): boolean;

    /**
     * Determines if the tree is a path
     * 
     * @returns true if the tree is a path, false otherwise
     */
    isPnTree(): boolean;

    /**
     * Determines if the tree is a star
     *
     * A Star is a topology where all vertices are connected to a single vertex
     * Like the hub and spoke of a wheel
     * @returns true if the tree is a star, false otherwise
     **/
    isStarTree(): boolean;


    /**
     * Determines if the tree is a spanning tree
     *
     * A spanning tree is a sub-tree of a tree that contains all the vertices of the tree
     * @param path id's of the vertices in the path
     * @returns true if the path is a spanning tree, false otherwise
     */
    isSpanningTree(path: string[]): boolean;

    /**
     * Generates a spanning tree for the given graph
     * 
     * @param vertexId an optional vertex to start the spanning tree from
     * @returns a spanning tree for the given graph
     */
    generateSpanningTree(vertexId?: string): string[] | undefined;
}

export { ITreeManipulation };
