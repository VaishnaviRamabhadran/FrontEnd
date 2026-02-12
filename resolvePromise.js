const resolvedPromises = [];

async function resolvePromises(promises, order) {
  for (var i = 0; i < promises.length; i++) {
    let index = order[i] - 1;
    let value = promises[index];
    let res = await new Promise((resolve, reject) => {
      if (value == 0) return reject("Error");
      else resolve(value);
    });
    resolvedPromises.push(res);
  }
}

resolvePromises([1, 2, 1], [2, 1, 3]).then(() => console.log(resolvedPromises));
