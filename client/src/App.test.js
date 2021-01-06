import createTitle from './Pages/Main App/Helper Functions/createTitle';
import createURL from './Pages/Main App/Helper Functions/createURL';
import solveLevelUpRatio from './Pages/Main App/Helper Functions/solveLevelUpRatio';

describe('createTitle', () => {
    it('Returns a string with each first letter of each word capitalized from a URL friendly string.', () => {
        expect(createTitle('first-notebook'))
            .toMatch('First Notebook');
        expect(createTitle('software-development'))
            .toMatch('Software Development');
        expect(createTitle('fine-arts'))
            .toMatch('Fine Arts');
        expect(createTitle('foreign-language'))
            .toMatch('Foreign Language');
        expect(createTitle('social-studies'))
            .toMatch('Social Studies');
        expect(createTitle('computer-programming'))
            .toMatch('Computer Programming');
        expect(createTitle('fundamentals-of-hardware'))
            .toMatch('Fundamentals of Hardware');
        expect(createTitle('the-old-man-and-the-sea'))
            .toMatch('The Old Man and the Sea');
        expect(createTitle('alkaloids-from-callus-tissue-of-papaver'))
            .toMatch('Alkaloids from Callus Tissue of Papaver');
        expect(createTitle('the-grapes-of-wrath'))
            .toMatch('The Grapes of Wrath');
    });
});

describe('createURL', () => {
    it('Returns a URL friendly string from a title.', () => {
        expect(createURL('First Notebook'))
            .toMatch('first-notebook');
        expect(createURL('Software Development'))
            .toMatch('software-development');
        expect(createURL('Fine Arts'))
            .toMatch('fine-arts');
        expect(createURL('Foreign Language'))
            .toMatch('foreign-language');
        expect(createURL('Social Studies'))
            .toMatch('social-studies');
        expect(createURL('Computer Programming'))
            .toMatch('computer-programming');
        expect(createURL('Fundamentals of Hardware'))
            .toMatch('fundamentals-of-hardware');
        expect(createURL('The Old Man and the Sea'))
            .toMatch('the-old-man-and-the-sea');
        expect(createURL('Alkaloids from Callus Tissue of Papaver'))
            .toMatch('alkaloids-from-callus-tissue-of-papaver');
        expect(createURL('The Grapes of Wrath'))
            .toMatch('the-grapes-of-wrath');
    });
});

describe('solveLevelUpRatio', () => {
    it('Returns a value from 0 to 100 based on the ratio of how close the given current points are to the maximum points relative to the minimum points.', () => {
        expect(solveLevelUpRatio(0, 99, 50))
            .toBeCloseTo(50.505, 3);
        expect(solveLevelUpRatio(0, 99, 25))
            .toBeCloseTo(25.253, 3);
        expect(solveLevelUpRatio(0, 99, 0))
            .toEqual(0);
        expect(solveLevelUpRatio(0, 99, 99))
            .toEqual(100);
        expect(solveLevelUpRatio(100, 299, 200))
            .toBeCloseTo(50.251, 3);
        expect(solveLevelUpRatio(100, 299, 150))
            .toBeCloseTo(25.126, 3);
        expect(solveLevelUpRatio(100, 299, 100))
            .toEqual(0);
        expect(solveLevelUpRatio(100, 299, 299))
            .toEqual(100);
        expect(solveLevelUpRatio(300, 599, 450))
            .toBeCloseTo(50.167, 3);
        expect(solveLevelUpRatio(300, 599, 500))
            .toBeCloseTo(66.890, 3);
    });
});