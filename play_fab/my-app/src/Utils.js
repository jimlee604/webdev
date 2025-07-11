export function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function computeBlockIndices() {
    // TODO: change to lower bound 0
    let blockSize = randInt(1, 2);
    const pool = [0,1,2,3];
    const blockIndices = new Set();
    while (blockSize > 0) {
        const indexToRemove = randInt(0, pool.length - 1)
        blockIndices.add(pool[indexToRemove])
        pool.splice(indexToRemove, 1)
        blockSize--
    }
    console.log("block indices:")
    console.log(blockIndices)
    return blockIndices;
}

export function computeTotalBlocks(blocks) {
    let result = 0
    for (const block in blocks) {
        result += block.block
    }
    return result
}