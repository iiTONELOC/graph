import { describe, expect, it } from '@jest/globals';
import { GraphUtils } from '../graphTestData';
import { IVertex } from '../../Graph';

GraphUtils;

describe('VertexUtils', () => {
    it('Should provide a method to determine the degree of a vertex', () => {
        const expectedDegrees: number[] = [2, 3, 3, 2, 2];

        GraphUtils.graph./*vertexUtils.*/getVertices().forEach((v: IVertex, i: number) => {
            expect(GraphUtils./*vertexUtils.*/getDegree(v.id)).toEqual(expectedDegrees[i]);
        });
    });

    it('Should provide a method to return a vertex\'s neighbors', () => {
        const expectedNeighbors: string[][] = [
            ['2', '3'],
            ['1', '3', '5'],
            ['2', '1', '4'],
            ['3', '5'],
            ['4', '2']
        ];

        GraphUtils.graph./*vertexUtils.*/getVertices().forEach((v: IVertex, i: number) => {
            expect(GraphUtils./*vertexUtils.*/getNeighbors(v.id)).toEqual(expectedNeighbors[i]);
        });
    });


    it('Should be able to determine if two vertices are adjacent', () => {
        expect(GraphUtils./*vertexUtils.*/areAdjacent('1', '2')).toBeTruthy();
        expect(GraphUtils./*vertexUtils.*/areAdjacent('1', '3')).toBeTruthy();
        expect(GraphUtils./*vertexUtils.*/areAdjacent('1', '4')).toBeFalsy();
        expect(GraphUtils./*vertexUtils.*/areAdjacent('1', '5')).toBeFalsy();
        expect(GraphUtils./*vertexUtils.*/areAdjacent('2', '3')).toBeTruthy();
        expect(GraphUtils./*vertexUtils.*/areAdjacent('2', '4')).toBeFalsy();
        expect(GraphUtils./*vertexUtils.*/areAdjacent('2', '5')).toBeTruthy();
        expect(GraphUtils./*vertexUtils.*/areAdjacent('3', '4')).toBeTruthy();
        expect(GraphUtils./*vertexUtils.*/areAdjacent('3', '5')).toBeFalsy();
        expect(GraphUtils./*vertexUtils.*/areAdjacent('4', '5')).toBeTruthy();
    });

    it('Should be able to determine if a vertex is isolated', () => {
        expect(GraphUtils./*vertexUtils.*/isIsolated('1')).toBeFalsy();
        expect(GraphUtils./*vertexUtils.*/isIsolated('2')).toBeFalsy();
        expect(GraphUtils./*vertexUtils.*/isIsolated('3')).toBeFalsy();
        expect(GraphUtils./*vertexUtils.*/isIsolated('4')).toBeFalsy();
        expect(GraphUtils./*vertexUtils.*/isIsolated('5')).toBeFalsy();
    });

    it('Should be able to determine if a set of vertices are connected', () => {
        expect(GraphUtils./*walkUtils.*/isValidWalk(['1', '2', '3', '4', '5'])).toBeTruthy();
        expect(GraphUtils./*walkUtils.*/isValidWalk(['1', '3', '5'])).toBeFalsy();
    });
});