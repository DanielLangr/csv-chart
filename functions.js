function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function setupFileSelector() {
  const fileSelector = document.getElementById('file-selector');

  fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    readFile(fileList.item(0));
  });
}

function readFile(file) {
  console.log("Reading file: ", file);

  const reader = new FileReader();

  reader.onload = function(e) {
    const csv_data = e.target.result;
    const data = $.csv.toArrays(csv_data);
    const tdata = transpose(data);

    const datasets = data[0].slice(1);
    setupDatasetSelector(datasets);

    addChart(tdata);
  };

  reader.readAsText(file);
}

function setupDatasetSelector(arr) {
  let select = document.createElement("select");
  select.name = "dataset";
  select.id = "dataset";

  for (const val of arr) {
    let option = document.createElement("option");
    option.text = val;
    select.appendChild(option);
  }

  let label = document.createElement("lable");
  label.innerHTML = "Select dataset: ";
  label.htmlFor = "dataset";
    
  document.getElementById("container").appendChild(label).appendChild(select);
}

function addChart(data) {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data[0].slice(1),
      datasets: [{
        data: data[2].slice(1)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
