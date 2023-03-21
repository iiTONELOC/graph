import { describe, expect, it } from '@jest/globals';
import { GraphUtils } from '../graphTestData';
import { IVertex } from '../../Graph';

const graph = GraphUtils;

describe('VertexUtils', () => {
    it('Should provide a method to determine the degree of a vertex', () => {
        const expectedDegrees: number[] = [2, 3, 3, 2, 2];

        graph.vertexUtils.getVertices().forEach((v: IVertex, i: number) => {
            expect(graph.vertexUtils.getDegree(v.id)).toEqual(expectedDegrees[i]);
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

        graph.vertexUtils.getVertices().forEach((v: IVertex, i: number) => {
            expect(graph.vertexUtils.getNeighbors(v.id)).toEqual(expectedNeighbors[i]);
        });
    });


    it('Should be able to determine if two vertices are adjacent', () => {
        expect(graph.vertexUtils.areAdjacent('1', '2')).toBeTruthy();
        expect(graph.vertexUtils.areAdjacent('1', '3')).toBeTruthy();
        expect(graph.vertexUtils.areAdjacent('1', '4')).toBeFalsy();
        expect(graph.vertexUtils.areAdjacent('1', '5')).toBeFalsy();
        expect(graph.vertexUtils.areAdjacent('2', '3')).toBeTruthy();
        expect(graph.vertexUtils.areAdjacent('2', '4')).toBeFalsy();
        expect(graph.vertexUtils.areAdjacent('2', '5')).toBeTruthy();
        expect(graph.vertexUtils.areAdjacent('3', '4')).toBeTruthy();
        expect(graph.vertexUtils.areAdjacent('3', '5')).toBeFalsy();
        expect(graph.vertexUtils.areAdjacent('4', '5')).toBeTruthy();
    });

    it('Should be able to determine if a vertex is isolated', () => {
        expect(graph.vertexUtils.isIsolated('1')).toBeFalsy();
        expect(graph.vertexUtils.isIsolated('2')).toBeFalsy();
        expect(graph.vertexUtils.isIsolated('3')).toBeFalsy();
        expect(graph.vertexUtils.isIsolated('4')).toBeFalsy();
        expect(graph.vertexUtils.isIsolated('5')).toBeFalsy();
    });
});