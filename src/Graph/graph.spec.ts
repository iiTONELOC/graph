import { describe, expect, it } from '@jest/globals';

import { IVertex, IEdge, IGraph, Graph } from './index';

describe('Graph', () => {

    const graph: IGraph = new Graph();
    const vertex1: IVertex = { id: '1', label: 'A' };
    const vertex2: IVertex = { id: '2', label: 'B' };
    const edge: IEdge = { id: '1', label: 'AB', source: vertex1, target: vertex2 };

    it('Should have a set of vertices', () => {
        graph.addVertex(vertex1);
        graph.addVertex(vertex2);
        expect(graph.getVertices()).toEqual([vertex1, vertex2]);
    });

    it('Should have a set of edges', () => {
        graph.addEdge(edge);
        expect(graph.getEdges()).toEqual([edge]);
    });

    it('Should be able to get a vertex by id', () => {
        expect(graph.getVertex('1')).toEqual(vertex1);
    });

    it('Should be able to get an edge by id', () => {
        expect(graph.getEdge('1')).toEqual(edge);
    });

    it('Should be able to get all vertices', () => {
        expect(graph.getVertices()).toEqual([vertex1, vertex2]);
    });

    it('Should be able to get all edges', () => {
        expect(graph.getEdges()).toEqual([edge]);
    });

    it('Should be able to create a graph given a set of vertices and edges', () => {
        const graph2: IGraph = new Graph([vertex1, vertex2], [edge]);
        expect(graph2.getVertices()).toEqual([vertex1, vertex2]);
        expect(graph2.getEdges()).toEqual([edge]);
    });
});

