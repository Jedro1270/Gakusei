export default function solveLevelUpRatio(minPoints, maxPoints, currentPoints) {
    return ((currentPoints - minPoints) / (maxPoints - minPoints)) * 100;
}