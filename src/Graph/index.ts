
/**
 * A vertex is a node in a graph
 * @interface IVertex
 * @property {string} id - the id of the vertex
 * @property {string} label - the label of the vertex
 */
interface IVertex {
    id: string;
    label: string;
}

/**
 * An edge is a connection between two vertices
 * @interface IEdge
 * @property {string} id - the id of the edge
 * @property {string} label - the label of the edge
 * @property {IVertex} source - the source vertex
 * @property {IVertex} target - the target vertex
 * @property {number} weight - optional the weight of the edg
 **/
interface IEdge {
    id: string;
    label: string;
    source: IVertex;
    target: IVertex;
    // creates a weighted edge
    weight?: number;
}

interface IGraph {
    vertices: IVertex[];
    edges: IEdge[];

    addVertex(vertex: IVertex): void;
    addEdge(edge: IEdge): void;
    getVertex(id: string): IVertex | undefined;
    getEdge(id: string): IEdge | undefined;
    getVertices(): IVertex[];
    getEdges(): IEdge[];
    removeEdge(id: string): void;
    removeVertex(id: string): void;
    clone(): IGraph;
}


class Graph implements IGraph {
    vertices: IVertex[];
    edges: IEdge[];

    constructor(vertices?: IVertex[], edges?: IEdge[]) {
        this.vertices = vertices || [];
        this.edges = edges || [];
        // loop over the edges and set the weight to zero if it is undefined
        this.edges = this.edges.map((edge: IEdge) => {
            if (edge?.weight === undefined) {
                edge = { ...edge, weight: 0 };
            }
            return edge;
        });
    }


    addVertex(vertex: IVertex): void {
        this.vertices.push(vertex);
    }

    addEdge(edge: IEdge): void {
        this.edges.push(edge);
    }

    getVertex(id: string): IVertex | undefined {
        return this.vertices.find((v: IVertex) => v.id === id);
    }

    getEdge(id: string): IEdge | undefined {
        return this.edges.find((e: IEdge) => e.id === id);
    }

    getVertices(): IVertex[] {
        return this.vertices;
    }

    getEdges(): IEdge[] {
        return this.edges;
    }

    removeEdge(id: string): void {
        const updatedEdges = this.edges.filter((e: IEdge) => e.id !== id);
        this.edges = updatedEdges;
    }

    removeVertex(id: string): void {
        this.vertices = this.vertices.filter((v: IVertex) => v.id !== id);
        // istanbul ignore next
        this.edges = this.edges.filter((e: IEdge) => e.source.id !== id && e.target.id !== id);
    }

    clone(): IGraph {
        const vertices = this.vertices.map((v: IVertex) => ({ ...v }));
        const edges = this.edges.map((e: IEdge) => ({ ...e }));
        return new Graph(vertices, edges);
    }
}

export { IVertex, IEdge, IGraph, Graph };
