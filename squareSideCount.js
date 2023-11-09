class Square {
  square(arr) {
    const N = arr.length;
    const dp = new Array(N).fill(0).map(() => new Array(N).fill(0));
    let maxSideLength = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (arr[j] > i) {
          dp[i][j] = 1 + (j > 0 ? dp[i][j - 1] : 0);
          const sideLength = Math.min(dp[i][j], i + 1);
          maxSideLength = Math.max(maxSideLength, sideLength);
        } else {
          dp[i][j] = 0;
        }
      }
    }

    return maxSideLength;
  }
}

const solutionInstance = new Square();
const result = solutionInstance.square([1, 1, 2, 2, 3]);
console.log(result);
