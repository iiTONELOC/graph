import { Graph, IGraph } from '../../Graph';
import { describe, expect, it } from '@jest/globals';
import { GraphType, IAdjacencyList, IGraphManipulation } from '../interfaces';
import {
    vertData, edgeData, GraphUtils, bipartGraphUtils, cyclicGraphUtils,
    completeGraphUtils, hypercubeGraphUtils, treeUtils
} from '../graphTestData';
import { default as graph } from '..';

// rename the graphUtils object to something more descriptive for the tests
const basicGraph = GraphUtils;
const completeGraph = completeGraphUtils;
const cyclicGraph = cyclicGraphUtils;
const bipartiteGraph = bipartGraphUtils;
const hypercubeGraph = hypercubeGraphUtils;

describe('GraphUtils', () => {
    it('Should be able to determine the total-degree of a graph', () => {
        expect(basicGraph.getTotalDegree()).toEqual(12);
    });

    it('Should be able to determine if a set of vertices and edges is a subgraph', () => {
        const subgraph: IGraph = new Graph(
            [vertData[0], vertData[1], vertData[2], vertData[3]],
            [edgeData[0], edgeData[2], edgeData[3]]
        );

        expect(basicGraph.isSubgraph(subgraph)).toBeTruthy();
    });

    it('Should be able to determine if a graph has parallel edges', () => {
        expect(basicGraph.hasParallelEdges()).toBeFalsy();
    });

    it('Should be able to determine if a graph has self-loops', () => {
        expect(basicGraph.hasSelfLoops()).toBeFalsy();
    });

    it('Should be able to determine if the graph is regular', () => {
        expect(basicGraph.isRegular()).toBeFalsy();
    });

    it('Should be able to return the regular degree of a graph', () => {
        expect(basicGraph.getRegularDegree()).toEqual(-1);
    });

    it('Should be able to determine if the graph is complete', () => {
        expect(basicGraph.isComplete()).toBeFalsy();
        expect(completeGraph.isComplete()).toBeTruthy();
    });

    it('Should be able to determine if the graph is configured in a cycle', () => {
        expect(basicGraph.isCyclic()).toBeFalsy();
        expect(cyclicGraph.isCyclic()).toBeTruthy();
    });

    it('Should be able to determine if the graph is a complete bipartite graph', () => {
        expect(basicGraph.isCompleteBipartite()).toBeFalsy();
        // create a complete bipartite graph to verify
        expect(bipartiteGraph.isCompleteBipartite()).toBeTruthy();
    });

    it('Should be able to determine if the graph is a hypercube', () => {
        expect(basicGraph.isHypercube()).toBeFalsy();
        expect(hypercubeGraph.isHypercube()).toBeTruthy();
    });

    it('Should be able to determine if the graph is bipartite', () => {
        expect(basicGraph.isBipartite()).toBeFalsy();
        expect(bipartiteGraph.isBipartite()).toBeTruthy();
    });

    it('Should be able to determine the type of graph, ie. regular, complete, etc.', () => {
        expect(basicGraph.getGraphType()).toEqual([GraphType.Other]);
        expect(completeGraph.getGraphType())
            .toEqual([GraphType.Complete, GraphType.Regular]);
        expect(cyclicGraph.getGraphType())
            .toEqual([GraphType.Cyclic, GraphType.CompleteBipartite,
            GraphType.Hypercube, GraphType.Regular, GraphType.Bipartite]);
        expect(bipartiteGraph.getGraphType())
            .toEqual([GraphType.CompleteBipartite, GraphType.Bipartite]);
        expect(hypercubeGraph.getGraphType())
            .toEqual([GraphType.Hypercube, GraphType.Regular, GraphType.Bipartite]);
    });

    it('Should be able to determine if two graphs are the same', () => {
        expect(basicGraph.isTheSameAs(GraphUtils.graph)).toBeTruthy();
        expect(basicGraph.isTheSameAs(completeGraph.graph)).toBeFalsy();
    });

    it('Should be able to create an Adjacency Matrix from a graph', () => {
        const expectedMatrix: number[][] = [
            [0, 1, 1, 0, 0],
            [1, 0, 1, 0, 1],
            [1, 1, 0, 1, 0],
            [0, 0, 1, 0, 1],
            [0, 1, 0, 1, 0]
        ];

        expect(basicGraph.getAdjacencyMatrix()).toEqual(expectedMatrix);
    });

    it('Should be able to create an adjacency list from a graph', () => {
        const expectedAdjList: IAdjacencyList = {
            '1': ['2', '3'],
            '2': ['1', '3', '5'],
            '3': ['2', '1', '4'],
            '4': ['3', '5'],
            '5': ['4', '2']
        }

        expect(basicGraph.getAdjacencyList()).toEqual(expectedAdjList);
    });

    it('Should be able to get an edge between two vertices', () => {
        const expectedEdge = edgeData[0];
        const vertex1 = vertData[0];
        const vertex2 = vertData[1];

        const vert5 = vertData[4];
        expect(basicGraph.getEdgeBetweenVertices(vertex1, vertex2)).toEqual(expectedEdge);
        expect(basicGraph.getEdgeBetweenVertices(vertex1, vert5)).toBeUndefined();
    });

    it('Should be able to determine if the graph has cycles', () => {
        expect(basicGraph.hasCycles()).toBeTruthy();
        expect(cyclicGraph.hasCycles()).toBeTruthy();
        expect(completeGraph.hasCycles()).toBeTruthy();
        expect(hypercubeGraph.hasCycles()).toBeTruthy();
        expect(bipartiteGraph.hasCycles()).toBeTruthy();
        expect(treeUtils.hasCycles()).toBeFalsy();
    });


    it('Should be able to determine if the graph is connected', () => {
        const disconnectedGraph: IGraphManipulation = graph(new Graph(
            [vertData[0], vertData[1], vertData[2], vertData[3]],
            [edgeData[0], edgeData[2]]
        ));

        expect(disconnectedGraph.isConnected()).toBeFalsy();
        expect(basicGraph.isConnected()).toBeTruthy();
    });

    it('Should be able to determine if the graph is a tree', () => {
        expect(basicGraph.isTree()).toBeFalsy();
        expect(treeUtils.isTree()).toBeTruthy();
        expect(completeGraph.isTree()).toBeFalsy();
    });

});