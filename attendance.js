// Smart Attendance Manager Logic

let attendanceChart = null;

document.addEventListener('DOMContentLoaded', () => {
    const totalInput = document.getElementById('total-classes');
    const attendedInput = document.getElementById('attended-classes');
    const ctx = document.getElementById('attendance-chart');

    if (totalInput && attendedInput && ctx) {
        // Initialize Chart
        attendanceChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Attended', 'Missed'],
                datasets: [{
                    data: [0, 100],
                    backgroundColor: ['#0ea5e9', '#1e293b'],
                    borderWidth: 0,
                    cutout: '75%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                }
            }
        });

        // Event Listeners
        [totalInput, attendedInput].forEach(input => {
            input.addEventListener('input', calculateAttendance);
        });
    }
});

function calculateAttendance() {
    const total = parseInt(document.getElementById('total-classes').value) || 0;
    const attended = parseInt(document.getElementById('attended-classes').value) || 0;
    const percentageEl = document.getElementById('attendance-percentage');
    const messageEl = document.getElementById('attendance-message');
    const statusEl = document.getElementById('attendance-status');

    if (total === 0) {
        updateChart(0, 100, '#1e293b');
        percentageEl.textContent = '0%';
        messageEl.textContent = 'Enter your class details to check status.';
        statusEl.className = 'text-slate-500 font-medium';
        statusEl.textContent = 'Waiting for input...';
        return;
    }

    if (attended > total) {
        messageEl.textContent = 'Attended classes cannot be more than total classes.';
        return;
    }

    const percentage = (attended / total) * 100;
    percentageEl.textContent = percentage.toFixed(1) + '%';

    // Logic for 75% Requirement
    const target = 75;
    let color = '#22c55e'; // Green

    if (percentage >= target) {
        // Safe Scenario
        // Formula: (attended) / (total + x) = 0.75  =>  attended = 0.75*total + 0.75x => 0.75x = attended - 0.75*total
        // Wait, "Safe to skip" means: (attended) / (total + x) >= 0.75. 
        // Actually, simpler: How many can I miss? 
        // Current: 8/10 = 80%. 
        // If I miss next X classes: 8 / (10 + X) = 0.75 => 8 = 7.5 + 0.75X => 0.5 = 0.75X => X = 0.66.

        // Let's use the formula: Max classes I can miss while keeping 75%
        // (attended) / (total + future_missed) = 0.75
        // attended = 0.75 * total + 0.75 * future_missed
        // future_missed = (attended - 0.75 * total) / 0.75

        const skippable = Math.floor((attended - (0.75 * total)) / 0.75);

        if (skippable > 0) {
            statusEl.textContent = 'Safe Zone 🟢';
            statusEl.className = 'text-green-400 font-bold';
            messageEl.innerHTML = `You can safely skip <span class="text-white font-bold">${skippable}</span> classes and still maintain 75%.`;
            color = '#22c55e';
        } else {
            statusEl.textContent = 'On the Edge 🟡';
            statusEl.className = 'text-yellow-400 font-bold';
            messageEl.textContent = 'You are just above 75%. Don\'t miss the next class!';
            color = '#eab308';
        }

    } else {
        // Danger Scenario
        // Need to attend X classes continuously
        // (attended + x) / (total + x) = 0.75
        // attended + x = 0.75*total + 0.75x
        // 0.25x = 0.75*total - attended
        // x = (0.75*total - attended) / 0.25

        const needed = Math.ceil(((0.75 * total) - attended) / 0.25);

        statusEl.textContent = 'Low Attendance 🔴';
        statusEl.className = 'text-red-400 font-bold';
        messageEl.innerHTML = `You need to attend <span class="text-white font-bold">${needed}</span> classes continuously to reach 75%.`;
        color = '#ef4444';
    }

    updateChart(percentage, 100 - percentage, color);
}

function updateChart(val1, val2, color) {
    if (attendanceChart) {
        attendanceChart.data.datasets[0].data = [val1, val2];
        attendanceChart.data.datasets[0].backgroundColor = [color, '#1e293b'];
        attendanceChart.update();
    }
}
