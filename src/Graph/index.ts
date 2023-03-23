/**
 * This module contains the types, interfaces, and classes related to a graph.
 */

/**
 * Graphs are made up of a set of vertices V (nodes) and a set of edges E.
 *
 *
 * A vertex is a single element from set V.
 * An edge is a set of two vertices from set V.
 */

interface IVertex {
    id: string;
    label: string;
}

interface IEdge {
    id: string;
    label: string;
    source: IVertex;
    target: IVertex;
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
