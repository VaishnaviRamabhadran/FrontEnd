function minSum(nums, k) {
  for (var i = 0; i < k; i++) {
    var maxIndex = 0;
    for (var j = 1; j < nums.length; j++) {
      if (nums[j] > nums[maxIndex]) maxIndex = j;
    }

    nums[maxIndex] = Math.ceil(nums[maxIndex] / 2);
  }

  let sum = 0;
  nums.forEach((num) => (sum += num));
  console.log(sum);
  return sum;
}
