import { IEdge, IVertex } from '../../Graph';
import { describe, expect, it } from '@jest/globals';
import TreeUtils, { ITreeManipulation } from '../../TreeUtils';

import graphUtils, { IGraph, IGraphManipulation, Graph, randomWeightOptions } from '../index';

const weightedVertices: IVertex[] = [
    { id: '1', label: 'A' },
    { id: '2', label: 'B', },
    { id: '3', label: 'C' },
    { id: '4', label: 'D' },
    { id: '5', label: 'E' },
    { id: '6', label: 'F' },
    { id: '7', label: 'G' },
    { id: '8', label: 'H' },
    { id: '9', label: 'I' },
];

const basicWeightedEdges: IEdge[] = [
    { id: '1', label: 'A-F', source: weightedVertices[0], target: weightedVertices[5], weight: 1 },
    { id: '2', label: 'A-G', source: weightedVertices[0], target: weightedVertices[6], weight: 1 },
    { id: '3', label: 'A-I', source: weightedVertices[0], target: weightedVertices[8], weight: 1 },
    { id: '4', label: 'B-D', source: weightedVertices[1], target: weightedVertices[3], weight: 1 },
    { id: '5', label: 'B-H', source: weightedVertices[1], target: weightedVertices[7], weight: 1 },
    { id: '6', label: 'B-I', source: weightedVertices[1], target: weightedVertices[8], weight: 1 },
    { id: '7', label: 'C-D', source: weightedVertices[2], target: weightedVertices[3], weight: 1 },
    { id: '8', label: 'C-E', source: weightedVertices[2], target: weightedVertices[4], weight: 1 },
    { id: '9', label: 'C-F', source: weightedVertices[2], target: weightedVertices[5], weight: 1 },
    { id: '10', label: 'C-H', source: weightedVertices[2], target: weightedVertices[7], weight: 1 },
    { id: '11', label: 'D-H', source: weightedVertices[3], target: weightedVertices[7], weight: 1 },
    { id: '12', label: 'D-I', source: weightedVertices[3], target: weightedVertices[8], weight: 1 },
    { id: '13', label: 'E-F', source: weightedVertices[4], target: weightedVertices[5], weight: 1 },
    { id: '14', label: 'E-G', source: weightedVertices[4], target: weightedVertices[6], weight: 1 },
    { id: '15', label: 'E-H', source: weightedVertices[4], target: weightedVertices[7], weight: 1 },
    { id: '16', label: 'F-G', source: weightedVertices[5], target: weightedVertices[6], weight: 1 },
    { id: '17', label: 'F-H', source: weightedVertices[5], target: weightedVertices[7], weight: 1 },
    { id: '18', label: 'F-I', source: weightedVertices[5], target: weightedVertices[8], weight: 1 },
    { id: '19', label: 'G-I', source: weightedVertices[6], target: weightedVertices[8], weight: 1 },
];

const basicWeightedGraph: IGraph = new Graph(weightedVertices, basicWeightedEdges);
const WeightedGraph: IGraphManipulation = graphUtils(basicWeightedGraph);


describe('Weighted Graph Utils', () => {

    it('Should allow for graphs to be created with weighted edges', () => {
        expect(WeightedGraph.graph.getEdges()).toEqual(basicWeightedEdges);
    });

    /**
     * Weighted Edges
     */
    describe('A weighted graph should have the ability to assign a random weight to an edge', () => {

        /**
         * Base method for assigning a weight to an edge
         */
        describe('The method assignWeightToEdge', () => {
            it('Should be defined', () => {
                expect(WeightedGraph.assignWeightToEdge).toBeDefined();
                expect.assertions(1);
            });

            it('Should apply the weight to the edge', () => {
                const weightToAdd = 5;
                const edge: IEdge = basicWeightedEdges[0];

                // ensure the weight is 1
                expect(edge.weight).toEqual(1);

                // assign the weight
                WeightedGraph.assignWeightToEdge(edge.id, weightToAdd);
                // ensure the weight is 5
                expect(edge.weight).toEqual(weightToAdd);
                // reset the weight
                WeightedGraph.assignWeightToEdge(edge.id, 1);

                expect.assertions(2);
            });

            expect.assertions(1);
        });

        /**
         * Base method for assigning a random weight to an edge
         */
        describe('The method assignRandomWeightToEdge', () => {
            it('Should be defined', () => {
                expect(WeightedGraph.assignRandomWeightToEdge).toBeDefined();
                expect.assertions(1);
            });

            it('Should apply a random weight to the edge', () => {
                const edge: IEdge = basicWeightedEdges[0];

                // ensure the weight is 1
                expect(edge.weight).toEqual(1);

                // assign the weight
                WeightedGraph.assignRandomWeightToEdge(edge.id);
                // ensure the weight is 5
                expect(edge.weight).not.toEqual(1);
                // the weight should be a number
                expect(typeof edge.weight).toEqual('number');
                // the weight should be less than 100
                expect(edge.weight).toBeLessThan(100);

                // reset the weight
                WeightedGraph.assignWeightToEdge(edge.id, 1);
                // ensure the weight is 1
                expect(edge.weight).toEqual(1);
                expect.assertions(5);
            });

            expect.assertions(2);
        });

        /**
         * Base method for assigning a random weight to all edges in a graph
         */
        describe('The method assignRandomWeightToAllEdges', () => {
            // make a copy of the graph
            const graphCopy = WeightedGraph.clone();

            it('Should be defined', () => {
                expect(graphCopy.assignRandomWeightsToEdges).toBeDefined();
                expect.assertions(1);
            });

            it('Should apply a random weight to all edges in the graph', () => {
                graphCopy.assignRandomWeightsToEdges();

                graphCopy.graph.getEdges().forEach((edge: IEdge) => {
                    // ensure the weight is 1
                    // expect(edge.weight).not.toEqual(1);
                    // the weight should be a number
                    expect(typeof edge.weight).toEqual('number');
                    // the weight should be greater than 0
                    expect(edge.weight).toBeGreaterThan(-1);
                    // the weight should be less than 100
                    expect(edge.weight).toBeLessThan(101);

                    // weights should not have a decimal
                    expect(edge.weight as number % 1).toEqual(0);
                });
            });

            it('Should allow for a custom range of weights to be assigned', () => {
                const randomOptions: randomWeightOptions = {
                    min: -10,
                    max: 15,
                    forceInteger: true,
                    allowNegative: true
                };
                let hasNegativeWeight = false;

                graphCopy.assignRandomWeightsToEdges(randomOptions);

                graphCopy.graph.getEdges().forEach((edge: IEdge) => {
                    // the weight should be a number
                    expect(typeof edge.weight).toEqual('number');
                    // the weight should be greater than our min
                    expect(edge.weight).toBeGreaterThanOrEqual(randomOptions.min as number);
                    // the weight should be less than our max
                    expect(edge.weight).toBeLessThanOrEqual(randomOptions.max as number);

                    // weights should not have a decimal
                    expect(Math.abs(edge.weight as number) % 1).toEqual(0);

                    // should have at least one negative weight
                    if (edge.weight as number < 0) {
                        hasNegativeWeight = true;
                    }
                });

                expect(hasNegativeWeight).toEqual(true);

                // reset the weights, the copy appears to be mutating the original graph?
                graphCopy.graph.getEdges().forEach((edge: IEdge) => {
                    WeightedGraph.assignWeightToEdge(edge.id, 1);
                });
            });
        });
    });

    /**
  * A weighted graph should be able to use Prim's algorithm to find the minimum spanning tree
  */
    describe('A weighted graph should be able to use Prim\'s algorithm to find the minimum spanning tree', () => {

        describe('The returned data', () => {
            const mst = WeightedGraph.prim();

            expect(true).toBe(true);
            const mstVertices = mst?.graph.vertices;
            const mstEdges = mst?.graph.edges;

            const MST: ITreeManipulation = TreeUtils(new Graph(mstVertices, mstEdges));

            it('Should be an object', () => {
                expect(typeof mst).toEqual('object');
                expect.assertions(1);
            });

            it('should have a vertices property', () => {
                expect(mstVertices).toBeDefined();
                expect(typeof mstVertices).toEqual(typeof WeightedGraph.graph.getVertex('1'));
                expect.assertions(2);
            });

            it('should have an edges property', () => {
                expect(mstEdges).toBeDefined();
                expect(typeof mstEdges).toEqual(typeof WeightedGraph.graph.getEdges());
                expect.assertions(2);
            });

            it('Should be a subgraph of the original graph', () => {
                expect(WeightedGraph.isSubgraph(MST.graph)).toEqual(true);
                expect.assertions(1);
            });

            it('Should be a tree', () => {
                expect(MST.isTree()).toEqual(true);
                expect.assertions(1);
            });

            it('Should have the correct number of vertices', () => {
                expect(MST.graph.getVertices().length)
                    .toEqual(WeightedGraph.graph.getVertices().length);
                expect.assertions(1);
            });

            it('Should have the correct number of edges', () => {
                expect(MST.graph.getEdges().length)
                    .toEqual(WeightedGraph.graph.getVertices().length - 1);
                expect.assertions(1);
            });

            it('Should have the correct total weight', () => {
                expect(MST.totalWeight()).toEqual(8);
                expect.assertions(1);
            });

            it('Should always have a total weight less than the original graph', () => {
                expect(MST.totalWeight()).toBeLessThan(WeightedGraph.totalWeight());
                expect.assertions(1);
            });
        });
    });

    describe('A Weighted graph should be able to use Dijsktra\'s algorithm to find the shortest path between two vertices', () => {
        const vertData = [
            { id: '1', label: 'A' },
            { id: '2', label: 'B' },
            { id: '3', label: 'C' },
            { id: '4', label: 'D' },
            { id: '5', label: 'E' },
            { id: '6', label: 'F' },
            { id: '7', label: 'G' }
        ];

        const edgeData = [
            { id: '1', label: 'A-B', source: vertData[0], target: vertData[1], weight: 4 },
            { id: '2', label: 'A-C', source: vertData[0], target: vertData[2], weight: 7 },
            { id: '3', label: 'A-D', source: vertData[0], target: vertData[3], weight: 3 },
            { id: '4', label: 'A-F', source: vertData[0], target: vertData[5], weight: 6 },
            { id: '5', label: 'B-C', source: vertData[1], target: vertData[2], weight: 6 },
            { id: '6', label: 'B-E', source: vertData[1], target: vertData[4], weight: 3 },
            { id: '7', label: 'B-F', source: vertData[1], target: vertData[5], weight: 5 },
            { id: '8', label: 'B-G', source: vertData[1], target: vertData[6], weight: 4 },
            { id: '9', label: 'C-E', source: vertData[2], target: vertData[4], weight: 4 },
            { id: '10', label: 'C-G', source: vertData[2], target: vertData[6], weight: 4 },
            { id: '11', label: 'D-E', source: vertData[3], target: vertData[4], weight: 2 },
            { id: '12', label: 'E-F', source: vertData[4], target: vertData[5], weight: 7 },
            { id: '13', label: 'F-G', source: vertData[5], target: vertData[6], weight: 4 }
        ];

        const weightedGraph = graphUtils(new Graph(vertData, edgeData));

        const shortestPath = weightedGraph.dijkstra('1', '4');

        it('Should be defined', () => {
            expect(shortestPath).toBeDefined();
            expect.assertions(1);
        });

        it('Should return an array of vertices that represent the walk', () => {
            expect(Array.isArray(shortestPath?.path)).toEqual(true);
            expect.assertions(1);
        });

        it('Should return the correct path', () => {
            expect(shortestPath?.path).toEqual(['1', '4']);
            expect.assertions(1);
        });

        it('Should return the correct total weight', () => {
            expect(shortestPath?.distance).toEqual(3);
            expect.assertions(1);
        });

        const pathFromAtoG = weightedGraph.dijkstra('1', '7');

        it('Should return the correct path', () => {
            expect(pathFromAtoG?.path).toEqual(['1', '2', '7']);
            expect.assertions(1);
        });

        it('Should return the correct total weight', () => {
            expect(pathFromAtoG?.distance).toEqual(8);
            expect.assertions(1);
        });

        // F-D
        const pathFromFtoD = weightedGraph.dijkstra('6', '4');

        it('Should return the correct path', () => {
            expect(pathFromFtoD?.path).toEqual(['6', '1', '4']);
            expect.assertions(1);
        });

        it('Should return the correct total weight', () => {
            expect(pathFromFtoD?.distance).toEqual(9);
            expect.assertions(1);
        });
    });

});