import { describe, expect, it } from '@jest/globals';
import { GraphUtils } from '../graphTestData';

GraphUtils;

describe('EdgeUtils', () => {
    it('Should be able to detect parallel edges', () => {
        expect(GraphUtils.hasParallelEdges()).toBeFalsy();
    });

    it('Should be able to detect self-loops', () => {
        expect(GraphUtils.hasSelfLoops()).toBeFalsy();
    });

    it('Should be able to return the edge id for an edge given the source and target vertices', () => {
        expect(GraphUtils.getEdgeId('1', '2')).toEqual('1');
    });

    it('Should be able to determine if an edge is a bridge', () => {
        expect(GraphUtils.isBridge('1')).toBeFalsy();
        expect(GraphUtils.isBridge('2')).toBeFalsy();
        expect(GraphUtils.isBridge('3')).toBeFalsy();
        expect(GraphUtils.isBridge('4')).toBeFalsy();
        expect(GraphUtils.isBridge('5')).toBeFalsy();
        expect(GraphUtils.isBridge('6')).toBeFalsy();
    });
});