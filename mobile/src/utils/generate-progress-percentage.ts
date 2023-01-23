export default function generateProgressPercentage(total: number, completed: number) {
    return Math.ceil((completed / total)* 100)
}