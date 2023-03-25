import { Utils as GraphUtils, IGraph } from '../GraphUtils';
import { ITreeManipulation } from './interfaces';
import { IVertex, IEdge } from '../Graph';

class TreeUtils extends GraphUtils implements ITreeManipulation {

    constructor(graph: IGraph) {
        super(graph);
    }

    isLeaf(vertex: string): boolean {
        return this.getDegree(vertex) === 1;
    }

    isInternalVertex(vertex: string): boolean {
        return this.getDegree(vertex) > 1;
    }

    isPnTree(): boolean {
        const isTree = this.isTree();

        if (!isTree) {
            return false;
        }

        const walk = this.graph.getVertices().map((vertex: IVertex) => vertex.id);

        return this.isPath(walk);
    }

    isStarTree(): boolean {
        const isTree = this.isTree();

        if (!isTree) {
            return false;
        }

        // a star has only one internal vertex
        const internalVertices = this.graph.getVertices().filter((vertex: IVertex) => this.isInternalVertex(vertex.id));

        return internalVertices.length === 1;
    }


    preOrderTraversal(startVertex: string, callback: (vertex: string) => void): void {
        const visited = new Set<string>();

        const traverse = (vertex: string) => {
            visited.add(vertex);
            callback(vertex);

            const neighbors = this.getNeighbors(vertex);

            neighbors.forEach((neighbor: string) => {
                if (!visited.has(neighbor)) {
                    traverse(neighbor);
                }
            });
        };

        traverse(startVertex);
    }

    postOrderTraversal(startVertex: string, callback: (vertex: string) => void): void {
        const visited = new Set<string>();

        const traverse = (vertex: string) => {
            visited.add(vertex);

            const neighbors = this.getNeighbors(vertex);

            neighbors.forEach((neighbor: string) => {
                if (!visited.has(neighbor)) {
                    traverse(neighbor);
                }
            });

            callback(vertex);
        };

        traverse(startVertex);
    }
}

const treeUtils = (graph: IGraph): ITreeManipulation => new TreeUtils(graph);

export { treeUtils as default, TreeUtils, ITreeManipulation };
