function CLOOK(arr, head) {
    let seek_count = 0;
    let distance, cur_track;
    let left = [];
    let right = [];
    let seek_sequence = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < head)
            left.push(arr[i]);
        if (arr[i] > head)
            right.push(arr[i]);
    }

    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    for (let i = 0; i < right.length; i++) {
        cur_track = right[i];
        seek_sequence.push(cur_track);
        distance = Math.abs(cur_track - head);
        seek_count += distance;
        head = cur_track;
    }

    seek_count += Math.abs(head - left[0]);
    head = left[0];

    for (let i = 0; i < left.length; i++) {
        cur_track = left[i];
        seek_sequence.push(cur_track);
        distance = Math.abs(cur_track - head);
        seek_count += distance;
        head = cur_track;
    }

    return {
        seek_count: seek_count,
        seek_sequence: seek_sequence
    };
}

function runCLOOK() {
    let size = parseInt(document.getElementById("size").value);
    let requestArrayInput = document.getElementById("requestArray").value;
    let head = parseInt(document.getElementById("head").value);

    let arr = requestArrayInput.split(" ").map(Number);

    let outputDiv = document.getElementById("output");
    outputDiv.style.display = "block";

    let result = CLOOK(arr, head);

    let seekOperationsOutput = document.getElementById("seekOperations");
    seekOperationsOutput.innerHTML = "Total number of seek operations = " + result.seek_count;

    let seekSequenceOutput = document.getElementById("seekSequence");
    seekSequenceOutput.innerHTML = "Seek Sequence is <br>" + result.seek_sequence.join("<br>");

    let ctx = document.getElementById('seekGraph').getContext('2d');
    let labels = [];
    for (let i = 0; i < result.seek_sequence.length; i++) {
        labels.push(i);
    }
    let data = {
        labels: labels,
        datasets: [{
            label: 'Seek Sequence',
            data: result.seek_sequence,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };
    let options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    let seekGraph = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
}
