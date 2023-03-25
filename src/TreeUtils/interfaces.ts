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
     * This method performs a pre-order traversal of the tree
     *
     * @param startVertex the vertex to start the traversal from
     * @param callback the callback to call for each vertex
     */
    preOrderTraversal(startVertex: string, callback: (vertex: string) => void): void;

    /**
     * This method performs a post-order traversal of the tree
     *
     * @param startVertex the vertex to start the traversal from
     * @param callback the callback to call for each vertex
     **/
    postOrderTraversal(startVertex: string, callback: (vertex: string) => void): void;
}


export { ITreeManipulation };
