import { describe, expect, it } from '@jest/globals';
import { GraphUtils } from '../graphTestData';
import graphUtils from '../index';

const graph = graphUtils(GraphUtils);

describe('EdgeUtils', () => {
    it('Should be able to detect parallel edges', () => {
        expect(graph.edgeUtils.hasParallelEdges()).toBeFalsy();
    });

    it('Should be able to detect self-loops', () => {
        expect(graph.edgeUtils.hasSelfLoops()).toBeFalsy();
    });
});