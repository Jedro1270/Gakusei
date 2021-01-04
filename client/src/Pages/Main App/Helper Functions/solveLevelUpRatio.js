export default function solveLevelUpRatio(minPoints, maxPoints, currentPoints) {
    return ((currentPoints - minPoints) / maxPoints) * 100;
}