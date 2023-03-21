import { Graph, IGraph } from '../../Graph';
import { describe, expect, it } from '@jest/globals';
import { GraphType, IAdjacencyList } from '../interfaces';
import {
    vertData, edgeData, GraphUtils, bipartGraphUtils, cyclicGraphUtils,
    completeGraphUtils, hypercubeGraphUtils
} from '../graphTestData';


// rename the graphUtils object to something more descriptive for the tests
const basicGraph = GraphUtils;
const completeGraph = completeGraphUtils;
const cyclicGraph = cyclicGraphUtils;
const bipartiteGraph = bipartGraphUtils;
const hypercubeGraph = hypercubeGraphUtils;

describe('GraphUtils', () => {
    it('Should be able to determine the total-degree of a graph', () => {
        expect(basicGraph.graphUtils.getTotalDegree()).toEqual(12);
    });

    it('Should be able to determine if a set of vertices and edges is a subgraph', () => {
        const subgraph: IGraph = new Graph(
            [vertData[0], vertData[1], vertData[2], vertData[3]],
            [edgeData[0], edgeData[2], edgeData[3]]
        );

        expect(basicGraph.graphUtils.isSubgraph(subgraph)).toBeTruthy();
    });

    it('Should be able to determine if a graph has parallel edges', () => {
        expect(basicGraph.graphUtils.hasParallelEdges()).toBeFalsy();
    });

    it('Should be able to determine if a graph has self-loops', () => {
        expect(basicGraph.graphUtils.hasSelfLoops()).toBeFalsy();
    });

    it('Should be able to determine if the graph is regular', () => {
        expect(basicGraph.graphUtils.isRegular()).toBeFalsy();
    });

    it('Should be able to return the regular degree of a graph', () => {
        expect(basicGraph.graphUtils.getRegularDegree()).toEqual(-1);
    });

    it('Should be able to determine if the graph is complete', () => {
        expect(basicGraph.graphUtils.isComplete()).toBeFalsy();
        expect(completeGraph.graphUtils.isComplete()).toBeTruthy();
    });

    it('Should be able to determine if the graph is configured in a cycle', () => {
        expect(basicGraph.graphUtils.isCyclic()).toBeFalsy();
        expect(cyclicGraph.graphUtils.isCyclic()).toBeTruthy();
    });

    it('Should be able to determine if the graph is a complete bipartite graph', () => {
        expect(basicGraph.graphUtils.isCompleteBipartite()).toBeFalsy();
        // create a complete bipartite graph to verify
        expect(bipartiteGraph.graphUtils.isCompleteBipartite()).toBeTruthy();
    });

    it('Should be able to determine if the graph is a hypercube', () => {
        expect(basicGraph.graphUtils.isHypercube()).toBeFalsy();
        expect(hypercubeGraph.graphUtils.isHypercube()).toBeTruthy();
    });

    it('Should be able to determine if the graph is bipartite', () => {
        expect(basicGraph.graphUtils.isBipartite()).toBeFalsy();
        expect(bipartiteGraph.graphUtils.isBipartite()).toBeTruthy();
    });

    it('Should be able to determine the type of graph, ie. regular, complete, etc.', () => {
        expect(basicGraph.graphUtils.getGraphType()).toEqual([GraphType.Other]);
        expect(completeGraph.graphUtils.getGraphType())
            .toEqual([GraphType.Complete, GraphType.Regular]);
        expect(cyclicGraph.graphUtils.getGraphType())
            .toEqual([GraphType.Cyclic, GraphType.CompleteBipartite,
            GraphType.Hypercube, GraphType.Regular, GraphType.Bipartite]);
        expect(bipartiteGraph.graphUtils.getGraphType())
            .toEqual([GraphType.CompleteBipartite, GraphType.Bipartite]);
        expect(hypercubeGraph.graphUtils.getGraphType())
            .toEqual([GraphType.Hypercube, GraphType.Regular, GraphType.Bipartite]);
    });

    it('Should be able to determine if two graphs are the same', () => {
        expect(basicGraph.graphUtils.isTheSameAs(GraphUtils as IGraph)).toBeTruthy();
        expect(basicGraph.graphUtils.isTheSameAs(completeGraph.graphUtils as IGraph)).toBeFalsy();
    });

    it('Should be able to create an Adjacency Matrix from a graph', () => {
        const expectedMatrix: number[][] = [
            [0, 1, 1, 0, 0],
            [1, 0, 1, 0, 1],
            [1, 1, 0, 1, 0],
            [0, 0, 1, 0, 1],
            [0, 1, 0, 1, 0]
        ];

        expect(basicGraph.graphUtils.getAdjacencyMatrix()).toEqual(expectedMatrix);
    });

    it('Should be able to create an adjacency list from a graph', () => {
        const expectedAdjList: IAdjacencyList = {
            '1': ['2', '3'],
            '2': ['1', '3', '5'],
            '3': ['2', '1', '4'],
            '4': ['3', '5'],
            '5': ['4', '2']
        }

        expect(basicGraph.graphUtils.getAdjacencyList()).toEqual(expectedAdjList);
    });

    it('Should be able to get an edge between two vertices', () => {
        const expectedEdge = edgeData[0];
        const vertex1 = vertData[0];
        const vertex2 = vertData[1];

        const vert5 = vertData[4];
        expect(basicGraph.graphUtils.getEdgeBetweenVertices(vertex1, vertex2)).toEqual(expectedEdge);
        expect(basicGraph.graphUtils.getEdgeBetweenVertices(vertex1, vert5)).toBeUndefined();
    });


});