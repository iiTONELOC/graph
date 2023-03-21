import { describe, expect, it } from '@jest/globals';
import { GraphUtils } from '../graphTestData';

const basicGraph = GraphUtils;

describe('WalkUtils', () => {
    it('Should be able to determine if a walk has non-repeating edges', () => {
        const nonRepeatingWalk: string[] = ['1', '2', '3', '4', '5'];
        const repeatingWalk: string[] = ['1', '2', '3', '4', '5', '1'];

        expect(basicGraph.walkUtils.hasNonRepeatingEdges(nonRepeatingWalk)).toBeTruthy();
        expect(basicGraph.walkUtils.hasNonRepeatingEdges(repeatingWalk)).toBeFalsy();
    });

    it('Should be able to determine if a walk has non-repeating vertices', () => {
        const nonRepeatingWalk: string[] = ['1', '2', '3', '4', '5'];
        const repeatingWalk: string[] = ['1', '2', '3', '4', '5', '1'];

        expect(basicGraph.walkUtils.hasNonRepeatingVertices(nonRepeatingWalk)).toBeTruthy();
        expect(basicGraph.walkUtils.hasNonRepeatingVertices(repeatingWalk)).toBeFalsy();
    });

    it('Should be able to determine if a sequence of vertices is a valid walk', () => {
        const validWalk: string[] = ['1', '2', '3', '4', '5'];
        const invalidWalk: string[] = ['1', '5', '3', '4', '1'];

        expect(basicGraph.walkUtils.isValidWalk(validWalk)).toBeTruthy();
        expect(basicGraph.walkUtils.isValidWalk(invalidWalk)).toBeFalsy();
    });

    it('Should be ale to determine if a walk is open', () => {
        const openWalk: string[] = ['1', '2', '3', '4', '5'];
        const closedWalk: string[] = ['1', '2', '3', '4', '5', '1'];

        expect(basicGraph.walkUtils.isOpenWalk(openWalk)).toBeTruthy();
        expect(basicGraph.walkUtils.isOpenWalk(closedWalk)).toBeFalsy();
    });

    it('Should be able to determine if a walk is closed', () => {
        const openWalk: string[] = ['1', '2', '3', '4', '5'];
        const closedWalk: string[] = ['2', '1', '3', '4', '5', '2'];

        expect(basicGraph.walkUtils.isClosedWalk(closedWalk)).toBeTruthy();
        expect(basicGraph.walkUtils.isClosedWalk(openWalk)).toBeFalsy();
    });

    it('Should be able to determine if a walk is a trail', () => {
        const trail: string[] = ['1', '2', '3', '4', '5'];
        const notTrail: string[] = ['1', '2', '3', '4', '5', '1'];

        expect(basicGraph.walkUtils.isTrail(trail)).toBeTruthy();
        expect(basicGraph.walkUtils.isTrail(notTrail)).toBeFalsy();
    });

    it('Should be able to determine if a walk is a circuit', () => {
        const circuit: string[] = ['2', '1', '3', '4', '5', '2'];
        const notCircuit: string[] = ['1', '2', '3', '4', '5'];

        expect(basicGraph.walkUtils.isCircuit(circuit)).toBeTruthy();
        expect(basicGraph.walkUtils.isCircuit(notCircuit)).toBeFalsy();
    });

    it('Should be able to determine if a walk is a path', () => {
        const path: string[] = ['1', '2', '3', '4', '5'];
        const notPath: string[] = ['1', '2', '3', '4', '5', '1'];

        expect(basicGraph.walkUtils.isPath(path)).toBeTruthy();
        expect(basicGraph.walkUtils.isPath(notPath)).toBeFalsy();
    });

    it('Should be able to determine if a walk is a cycle', () => {
        const cycle: string[] = ['2', '3', '4', '5', '2'];
        const notCycle: string[] = ['1', '2', '3', '4', '5'];

        expect(basicGraph.walkUtils.isCycle(cycle)).toBeTruthy();
        expect(basicGraph.walkUtils.isCycle(notCycle)).toBeFalsy();
    });
});
