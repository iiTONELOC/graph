import TreeUtils, { ITreeManipulation } from './';
import { IEdge, IVertex, Graph } from '../Graph';
import { treeUtils as testTreeGraphUtils } from '../GraphUtils/graphTestData';

const starTreeVertData: IVertex[] = [
    { id: '1', label: 'A' },
    { id: '2', label: 'B' },
    { id: '3', label: 'C' },
    { id: '4', label: 'D' },
    { id: '5', label: 'E' }
];

const starTreeEdgeData: IEdge[] = [
    { id: '1', label: 'AB', source: starTreeVertData[0], target: starTreeVertData[1] },
    { id: '2', label: 'AC', source: starTreeVertData[0], target: starTreeVertData[2] },
    { id: '3', label: 'AD', source: starTreeVertData[0], target: starTreeVertData[3] },
    { id: '4', label: 'AE', source: starTreeVertData[0], target: starTreeVertData[4] }
];

const pathTreeVertData: IVertex[] = [
    { id: '1', label: 'A' },
    { id: '2', label: 'B' },
    { id: '3', label: 'C' },
    { id: '4', label: 'D' },
];

const pathTreeEdgeData: IEdge[] = [
    { id: '1', label: 'AB', source: pathTreeVertData[0], target: pathTreeVertData[1] },
    { id: '2', label: 'BC', source: pathTreeVertData[1], target: pathTreeVertData[2] },
    { id: '3', label: 'CD', source: pathTreeVertData[2], target: pathTreeVertData[3] }
];

export const pathTestTree: ITreeManipulation = TreeUtils(new Graph(pathTreeVertData, pathTreeEdgeData));
export const starTestTree: ITreeManipulation = TreeUtils(new Graph(starTreeVertData, starTreeEdgeData));
export const testTree: ITreeManipulation = TreeUtils(testTreeGraphUtils.graph);
