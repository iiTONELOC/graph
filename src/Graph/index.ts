interface IVertex {
    id: string;
    label: string;
}

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
}


class Graph implements IGraph {
    vertices: IVertex[];
    edges: IEdge[];

    constructor(vertices?: IVertex[], edges?: IEdge[]) {
        this.vertices = vertices || [];
        this.edges = edges || [];
        // loop over the edges and set the weight to zero if it is undefined
        this.edges.forEach((edge: IEdge) => {
            if (edge.weight === undefined) {
                edge.weight = 0;
            }
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
}

export { IVertex, IEdge, IGraph, Graph };
