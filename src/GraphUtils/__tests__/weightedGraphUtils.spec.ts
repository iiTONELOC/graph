import { describe, expect, it } from '@jest/globals';
import { IEdge, IVertex } from '../../Graph';

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
                // the weight should be greater than 0
                expect(edge.weight).toBeGreaterThan(0);
                // the weight should be less than 100
                expect(edge.weight).toBeLessThan(100);

                // reset the weight
                WeightedGraph.assignWeightToEdge(edge.id, 1);
                expect.assertions(5);
            });

            expect.assertions(1);
        });

        /**
         * Base method for assigning a random weight to all edges in a graph
         */
        describe('The method assignRandomWeightToAllEdges', () => {
            // make a copy of the graph
            const graphCopy = graphUtils(basicWeightedGraph);

            it('Should be defined', () => {
                expect(WeightedGraph.assignRandomWeightsToEdges).toBeDefined();
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
            });
        });
    });

});