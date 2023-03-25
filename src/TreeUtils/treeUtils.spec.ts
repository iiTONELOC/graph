import { describe, expect, it } from '@jest/globals';
// import TreeUtils, { ITreeManipulation } from './index';
import { testTree, starTestTree, pathTestTree } from './treeTestData';

describe('TreeUtils', () => {
    it('Should be defined', () => {
        expect(testTree).toBeDefined();
    });

    it('Should be able to determine if it is a tree', () => {
        expect(testTree.isTree()).toBeTruthy();
    });

    it('Should be able to determine if a vertex is a leaf', () => {
        expect(testTree.isLeaf('1')).toBeFalsy();
        expect(testTree.isLeaf('2')).toBeTruthy();
        expect(testTree.isLeaf('3')).toBeTruthy();
        expect(testTree.isLeaf('4')).toBeTruthy();

        expect(starTestTree.isLeaf('1')).toBeFalsy();
        expect(starTestTree.isLeaf('2')).toBeTruthy();
        expect(starTestTree.isLeaf('3')).toBeTruthy();
        expect(starTestTree.isLeaf('4')).toBeTruthy();
        expect(starTestTree.isLeaf('5')).toBeTruthy();
    });

    it('Should be able to determine if a vertex is an internal vertex', () => {
        expect(testTree.isInternalVertex('1')).toBeTruthy();
        expect(testTree.isInternalVertex('2')).toBeFalsy();
        expect(testTree.isInternalVertex('3')).toBeFalsy();
        expect(testTree.isInternalVertex('4')).toBeFalsy();

        expect(starTestTree.isInternalVertex('1')).toBeTruthy();
        expect(starTestTree.isInternalVertex('2')).toBeFalsy();
        expect(starTestTree.isInternalVertex('3')).toBeFalsy();
        expect(starTestTree.isInternalVertex('4')).toBeFalsy();
        expect(starTestTree.isInternalVertex('5')).toBeFalsy();
    });


    it('Should be able to determine is the tree is a path', () => {
        expect(testTree.isPnTree()).toBeFalsy();
        expect(starTestTree.isPnTree()).toBeFalsy();
        expect(pathTestTree.isPnTree()).toBeTruthy();
    });

    it('Should be able to determine if the tree is a star', () => {
        expect(testTree.isStarTree()).toBeTruthy();
        expect(starTestTree.isStarTree()).toBeTruthy();
        expect(pathTestTree.isStarTree()).toBeFalsy();
    });

    it('Should be able to determine if a path is a spanning tree', () => {
        const spanningTreePath: string[] = ['1', '2', '3', '4'];
        const testTreePath: string[] = ['1', '2', '1', '3', '1', '4'];

        expect(pathTestTree.isSpanningTree(spanningTreePath)).toBeTruthy();
        expect(testTree.isSpanningTree(testTreePath)).toBeFalsy();
    });
});
