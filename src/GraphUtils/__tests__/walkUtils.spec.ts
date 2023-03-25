import { describe, expect, it } from '@jest/globals';
import { GraphUtils, eulerTrailGraphUtils, eulerCircuitGraphUtils, hypercubeGraphUtils } from '../graphTestData';

const basicGraph = GraphUtils;

describe('WalkUtils', () => {
    it('Should be able to determine if a walk has non-repeating edges', () => {
        const nonRepeatingWalk: string[] = ['1', '2', '3', '4', '5'];
        const repeatingWalk: string[] = ['1', '2', '3', '4', '5', '1'];

        expect(basicGraph.hasNonRepeatingEdges(nonRepeatingWalk)).toBeTruthy();
        expect(basicGraph.hasNonRepeatingEdges(repeatingWalk)).toBeFalsy();
    });

    it('Should be able to determine if a walk has non-repeating vertices', () => {
        const nonRepeatingWalk: string[] = ['1', '2', '3', '4', '5'];
        const repeatingWalk: string[] = ['1', '2', '3', '4', '5', '1'];

        expect(basicGraph.hasNonRepeatingVertices(nonRepeatingWalk)).toBeTruthy();
        expect(basicGraph.hasNonRepeatingVertices(repeatingWalk)).toBeFalsy();
    });

    it('Should be able to determine if a sequence of vertices is a valid walk', () => {
        const validWalk: string[] = ['1', '2', '3', '4', '5'];
        const invalidWalk: string[] = ['1', '5', '3', '4', '1'];

        expect(basicGraph.isValidWalk(validWalk)).toBeTruthy();
        expect(basicGraph.isValidWalk(invalidWalk)).toBeFalsy();
    });

    it('Should be ale to determine if a walk is open', () => {
        const openWalk: string[] = ['1', '2', '3', '4', '5'];
        const closedWalk: string[] = ['1', '2', '3', '4', '5', '1'];

        expect(basicGraph.isOpenWalk(openWalk)).toBeTruthy();
        expect(basicGraph.isOpenWalk(closedWalk)).toBeFalsy();
    });

    it('Should be able to determine if a walk is closed', () => {
        const openWalk: string[] = ['1', '2', '3', '4', '5'];
        const closedWalk: string[] = ['2', '1', '3', '4', '5', '2'];

        expect(basicGraph.isClosedWalk(closedWalk)).toBeTruthy();
        expect(basicGraph.isClosedWalk(openWalk)).toBeFalsy();
    });

    it('Should be able to determine if a walk is a trail', () => {
        const trail: string[] = ['1', '2', '3', '4', '5'];
        const notTrail: string[] = ['1', '2', '3', '4', '5', '1'];

        expect(basicGraph.isTrail(trail)).toBeTruthy();
        expect(basicGraph.isTrail(notTrail)).toBeFalsy();
    });

    it('Should be able to determine if a walk is a circuit', () => {
        const circuit: string[] = ['2', '1', '3', '4', '5', '2'];
        const notCircuit: string[] = ['1', '2', '3', '4', '5'];

        expect(basicGraph.isCircuit(circuit)).toBeTruthy();
        expect(basicGraph.isCircuit(notCircuit)).toBeFalsy();
    });

    it('Should be able to determine if a walk is a path', () => {
        const path: string[] = ['1', '2', '3', '4', '5'];
        const notPath: string[] = ['1', '2', '3', '4', '5', '1'];

        expect(basicGraph.isPath(path)).toBeTruthy();
        expect(basicGraph.isPath(notPath)).toBeFalsy();
    });

    it('Should be able to determine if a walk is a cycle', () => {
        const cycle: string[] = ['2', '3', '4', '5', '2'];
        const notCycle: string[] = ['1', '2', '3', '4', '5'];

        expect(basicGraph.isCycle(cycle)).toBeTruthy();
        expect(basicGraph.isCycle(notCycle)).toBeFalsy();
    });

    it('Should be able to determine if a walk is an Euler trail', () => {
        const notEulerTrail: string[] = ['1', '2', '3', '4', '5'];
        const eulerTrail: string[] = ['2', '6', '3', '2', '1', '3', '4', '1', '5', '4'];

        expect(basicGraph.isEulerTrail(notEulerTrail)).toBeFalsy();
        expect(eulerTrailGraphUtils.isEulerTrail(eulerTrail)).toBeTruthy();
    });

    it('Should be able to determine if a walk is an Euler circuit', () => {
        const notEulerCircuit: string[] = ['1', '2', '3', '4', '5'];
        const eulerCircuit: string[] = ['1', '3', '4', '2', '6', '3', '2', '1', '4', '5', '1'];

        expect(basicGraph.isEulerCircuit(notEulerCircuit)).toBeFalsy();
        expect(eulerCircuitGraphUtils.isEulerCircuit(eulerCircuit)).toBeTruthy();
    });

    it('Should be able to return an Euler circuit or undefined if one doesn\'t exist', () => {
        expect(eulerCircuitGraphUtils.
            isEulerCircuit(eulerCircuitGraphUtils.getEulerCircuitOrPath() || [])
        ).toBeTruthy();

        // has a trail/path but not a circuit
        expect(basicGraph.isEulerCircuit(basicGraph.getEulerCircuitOrPath() || [])).toBeFalsy();

        // has neither this is a K3 graph
        expect(hypercubeGraphUtils.getEulerCircuitOrPath()).toBeUndefined();
    });

    it('Should be able to return an Euler trail or undefined if one doesn\'t exist', () => {
        expect(eulerTrailGraphUtils
            .isEulerTrail(eulerTrailGraphUtils.getEulerCircuitOrPath() || [])
        ).toBeTruthy();

        expect(hypercubeGraphUtils.getEulerCircuitOrPath()).toBeUndefined();
    });

    it('Should be able to determine if a walk is a Hamiltonian Cycle', () => {
        const hamiltonianCycle: string[] = ['1', '2', '5', '4', '3', '1'];
        const notHamiltonianCycle: string[] = ['1', '2', '3', '4', '5'];

        expect(basicGraph.isHamiltonianCycle(hamiltonianCycle)).toBeTruthy();
        expect(basicGraph.isHamiltonianCycle(notHamiltonianCycle)).toBeFalsy();
    });

    it('Should be able to determine if a walk is a Hamiltonian Path', () => {
        const hamiltonianPath: string[] = ['1', '2', '5', '4', '3'];
        const notHamiltonianPath: string[] = ['1', '2', '3', '4'];

        expect(basicGraph.isHamiltonianPath(hamiltonianPath)).toBeTruthy();
        expect(basicGraph.isHamiltonianPath(notHamiltonianPath)).toBeFalsy();
    });

    it('Should be able to generate a Hamiltonian Path or return undefined if one doesn\'t exist', () => {
        expect(basicGraph.generateHamiltonianPath()).toEqual(['2', '1', '3', '4', '5']);

        expect(hypercubeGraphUtils.generateHamiltonianPath())
            .toEqual(['2', '1', '8', '5', '4', '3', '6', '7']);
    });
});
